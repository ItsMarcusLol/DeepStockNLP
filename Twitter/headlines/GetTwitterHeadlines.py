import tweepy
import pymysql
from datetime import datetime
from queue import Queue
from threading import Thread
import time

# API Key
customer_key = "kT4Mr92rV0NoWjq1AEH9fIzsv"
# API Secret Key
customer_key_secret = "1qKyrhsEnlXaMYJEnvyQduf8zalhrqGs4IUwE0GyGChzxOGo4a"
# Access Token
access_token = "1120777508754821120-NLdfKhCNg1QPvqvGhgAEOGHe48HVwB"
# Access Token Secret
access_token_secret = "KVVK4K1epKVJvD3xnmJ1Lx70x2Cxi225Sui9HibgwApqv"

auth = tweepy.OAuthHandler(customer_key, customer_key_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

try:
	api.me().name
	print("Authentication OK")
except:
	print("Error during authentication")


list_id = '1336889993894084608'

#api.add_list_member(list_id=list_id, screen_name='HarvardBiz')
#print(len(api.list_members(list_id=list_id)))

conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')

def fromToday(today, statusDate):
	if (today.date() > statusDate.date()):
		return False
	else:
		return True

def getTimeLineListTweetDataToday(out_q):
	while(True):
		try:
			utc_now = datetime.utcnow()
			for status in tweepy.Cursor(api.list_timeline, list_id=list_id, tweet_mode="extended").items():
				if fromToday(utc_now, status.created_at):
					process_status = status.full_text.replace('\n','').strip('\n')
					process_status = process_status.encode("ascii", "ignore").decode()

					out_q.put([status.user.name,status.user.followers_count,status.user.friends_count,status.created_at,"None",0,0,0,0,process_status])
				else:
					time.sleep(60*15)
					break
		except tweepy.TweepError:
			time.sleep(60*10)
			continue
		except StopIteration:
			break

def tweetAlreadySeen(tweet_data, cursor):
	query = "SELECT * FROM headlines WHERE username=%s AND followers=%s AND following=%s AND date_tweeted=%s AND retweet_author=%s AND retweet_followers=%s AND retweet_following=%s AND retweets=%s AND favorites=%s AND status=%s"
	args = (tweet_data[0],tweet_data[1],tweet_data[2],str(tweet_data[3].replace(hour=0,minute=0, second=0)),tweet_data[4],tweet_data[5],tweet_data[6],tweet_data[7],tweet_data[8],tweet_data[9])
	cursor.execute(query, args)
	result = cursor.fetchone()
	row_count = cursor.rowcount
	if row_count == 1:
		return True
	else:
		return False

def processThread(in_q):
	cursor = conn.cursor()
	while(True):
		tweet_data = in_q.get()
		if (len(tweet_data[9]) > 800):
			continue
		if (tweetAlreadySeen(tweet_data, cursor)):
			continue
		try:
			query = "INSERT INTO headlines(username,followers,following,date_tweeted,retweet_author,retweet_followers,retweet_following,retweets,favorites,status) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
			args = (tweet_data[1],tweet_data[2],tweet_data[3],str(tweet_data[4]),tweet_data[5],tweet_data[6],tweet_data[7],tweet_data[8],tweet_data[9],tweet_data[10])
			cursor.execute(query, args)
			conn.commit()
		except:
			print(sys.exc_info()[0])
			print("Stopping process thread")
			conn.rollback()
			conn.close()
			cursor.close()
			sys.exit(1)


def spawnThreads():
	q = Queue()
	process_Thread = Thread(target=processThread, args=(q, ))
	headlines_thread = Thread(target=getTimeLineListTweetDataToday, args=(q, ))
	headlines_thread.start()
	process_Thread.start()
	print("Threads started...")

spawnThreads()