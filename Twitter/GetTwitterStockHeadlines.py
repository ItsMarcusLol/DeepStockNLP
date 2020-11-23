import tweepy
from datetime import datetime
import time
from queue import Queue
from threading import Thread

# API Key
customer_key = "i4YbObSsZEC1pvY0FZ34Z6wIM"
# API Secret Key
customer_key_secret = "WAEtBR185ImpB73fChDchlwMLxVogLPpu90taAB9p8DLhETkGO"

# Access Token
access_token = "1194387311988920321-9ANtEeV7cdW8rZHcFV8pa5ne4A8mLv"
# Access Token Secret
access_token_secret = "by4EULNXAJvnRQ8P5M6AigFsTt4PI6kNaHaJWoiKZR2Xb"

auth = tweepy.OAuthHandler(customer_key, customer_key_secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

try:
	api.me().name
	print("Authentication OK")
except:
	print("Error during authentication")

# ID of developer list
list_id='1320842731472580608'

def fromToday(today, statusDate):
	if (today.date() > statusDate.date()):
		return False
	else:
		return True

# Get the current trending hashtags
# python GetTwitterData.py
def getWorldWideTrends():
	trends_result = api.trends_place(1)
	for trend in trends_result[0]["trends"]:
		print(trend["name"])

# python GetTwitterData.py today <(w)rite/(a)ppend>
def getTimeLineListTweetDataToday(queue):
	while(True):
		try:
			utc_now = datetime.utcnow()
			for status in tweepy.Cursor(api.list_timeline, list_id=list_id, tweet_mode="extended").items():
				if fromToday(utc_now, status.created_at):
					process_status = status.full_text.replace('\n','').strip('\n')
					process_status = process_status.encode("ascii", "ignore").decode()
					csv_timeline.write(f"{status.user.name},{status.created_at},{process_status}\n")
					queue.put([status.user.name,status.user.followers_count,status.user.friends_count,status.created_at,process_status])
				else:
					break
			time.sleep(60*60)
		except tweepy.TweepError:
			print("Waiting on rate limit...")
			time.sleep(60*15)
			continue
		except StopIteration:
			break

'''
def getTimeLineListTweetDataToday(queue):
	try:
		utc_now = datetime.utcnow()
		for status in tweepy.Cursor(api.list_timeline, list_id=list_id, tweet_mode="extended").items():
			if fromToday(utc_now, status.created_at):
				process_status = status.full_text.replace('\n','').strip('\n')
				process_status = process_status.encode("ascii", "ignore").decode()
				csv_timeline.write(f"{status.user.name},{status.created_at},{process_status}\n")
				queue.put([status.user.name,status.user.followers_count,status.user.friends_count,status.created_at,process_status])
			else:
				break
	except tweepy.TweepError:
		print("Waiting on rate limit...")
		time.sleep(60*15)
		continue
	except StopIteration:
		break
'''

def getTwitterHeadlines():
	q = Queue()
	thread = Thread(target=getTimeLineListTweetDataToday, args=(q, ))
	thread.start()
	while(True):
		tweet_data = q.get()
		print(tweet_data)

getTwitterHeadlines()
