import tweepy
from datetime import datetime
import time
from queue import Queue
from threading import Thread
import pymysql
import os

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

conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')

# List of stocks to look at
stocks = ['google', 'amazon', 'tesla', 'apple', 'microsoft']

stock_tables = {}


# queue <string of search words> language
def searchTweets(out_q, word, langauge):
	stock_name = (word.split())[0]
	while(True):
		try:
			for tweet in tweepy.Cursor(api.search, q=word, lang=langauge, tweet_mode="extended", wait_on_rate_limit_notify=True).items(100):
				if tweet.full_text.startswith("RT @"):
					retweet_author = tweet.retweeted_status.author.name.replace(',', ' ')
					retweet_author = retweet_author.replace('\n',' ')
					retweet_author = retweet_author.encode("ascii", "ignore").decode()
					tweet_status = tweet.retweeted_status.full_text.replace(',', ' ')
					retweet_author_followers = tweet.retweeted_status.author.followers_count
					retweet_author_following = tweet.retweeted_status.author.friends_count
				else:
					retweet_author = "None"
					tweet_status = tweet.full_text.replace(',', ' ')
					retweet_author_followers = 0
					retweet_author_following = 0
				author_followers = tweet.user.followers_count
				author_following = tweet.user.friends_count
				process_status = tweet_status.replace('\n',' ').replace('\"', ' ')
				process_status = process_status.encode("ascii", "ignore").decode()
				user_name = tweet.user.name.replace(',', ' ').encode("ascii", "ignore").decode()
				out_q.put([stock_name, user_name, author_followers, author_following, tweet.created_at, retweet_author, retweet_author_followers, retweet_author_following, tweet.retweet_count, tweet.favorite_count, process_status])
				#out_q.put(f"{stock_name},{user_name},{author_followers},{author_following},{tweet.created_at},{retweet_author},{retweet_author_followers},{retweet_author_following},{tweet.retweet_count},{tweet.favorite_count},{process_status}")
				#csv_tweets.write(f"{user_name},{author_followers},{author_following},{tweet.created_at},{retweet_author},{retweet_author_followers},{retweet_author_following},{tweet.retweet_count},{tweet.favorite_count},{process_status}\n")
				#print(f"{user_name},{tweet.created_at},{retweet_author},{tweet.retweet_count},{tweet.favorite_count},{process_status}\n")
		except tweepy.TweepError:
			#print("Waiting on rate limit...")
			time.sleep(60*15)
			continue
		except StopIteration:
			break

def processThread(in_q):
	cursor = conn.cursor()
	while(True):
		tweet_data = in_q.get()
		stock_name = tweet_data[0]
		try: 
			query = "INSERT INTO TestTweetStockData(username,followers,following,date_tweeted,retweet_author,retweet_followers,retweet_following,retweets,favorites,status) " \
				"VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
			args = (tweet_data[1],tweet_data[2],tweet_data[3],str(tweet_data[4]),tweet_data[5],tweet_data[6],tweet_data[7],tweet_data[8],tweet_data[9],tweet_data[10],)
			insertCursor.execute(query, args)
			conn.commit()
		except:
			conn.rollback()
			conn.close()
			cursor.close()
			os.exit(1)

def getStockNames():
	return

def spawnTreads():
	q = Queue()
	process_Thread = Thread(target=processThread, args=(q, ))
	for stock in stocks:
		created_word = stock + " stocks" 
		thread = Thread(target=searchTweets, args=(q,created_word,'en', ))
		thread.start()
	process_Thread.start()

spawnTreads()