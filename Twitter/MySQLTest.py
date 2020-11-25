#Used to test MySQL library and functions

import pymysql
import tweepy
from queue import Queue
import sys

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

cursor = conn.cursor()

query = "SELECT * FROM GoogleStockTweets"

cursor.execute(query)
results = cursor.fetchall()

for row in results:
	print(row)

# Test adding a tweet to the test table

q = Queue()

word = 'google stock'
langauge = 'en'

for tweet in tweepy.Cursor(api.search, q=word, lang=langauge, tweet_mode="extended", wait_on_rate_limit_notify=True).items(5):
	if tweet.full_text.startswith("RT @"):
		retweet_author = tweet.retweeted_status.author.name
		retweet_author = retweet_author.replace('\n','')
		retweet_author = retweet_author.encode("ascii", "ignore").decode()
		tweet_status = tweet.retweeted_status.full_text
		retweet_author_followers = tweet.retweeted_status.author.followers_count
		retweet_author_following = tweet.retweeted_status.author.friends_count
	else:
		retweet_author = None
		tweet_status = tweet.full_text
		retweet_author_followers = None
		retweet_author_following = None
	author_followers = tweet.user.followers_count
	author_following = tweet.user.friends_count
	process_status = tweet_status.replace('\n','')
	process_status = process_status.encode("ascii", "ignore").decode()
	user_name = tweet.user.name.encode("ascii", "ignore").decode()
	q.put([stock_name, user_name, author_followers, author_following, tweet.created_at, retweet_author, retweet_author_followers, retweet_author_following, tweet.retweet_count, tweet.favorite_count, process_status])

insertCursor = conn.cursor()

while not q.empty():
	tweet_data = q.get()
	try: 
		sql = "INSERT INTO TestTweetStockData(username, followers, following, data_tweeted, retweet_author, retweet_followers, retweet_following, retweets, favorites, status) VALUES("
		values = "\'" + tweet_data[1] + "\', " + str(tweet_data[2]) + ", " + str(tweet_data[3]) + ", " + str(tweet_data[4]) + ", \'" + tweet_data[5] +"\', \'" + str(tweet_data[6]) + "\', \'" + str(tweet_data[7]) + "\', " + str(tweet_data[8]) + ", " + str(tweet_data[9]) + ", \'" + tr(tweet_data[10]) + "\',)"
		sql += values
		print(sql)
		insertCursor.execute(sql)
		conn.commit()
	except:
		conn.rollback()
		conn.close()
		sys.exit(1)

conn.close()