import tweepy
import sys
from datetime import datetime
import time

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

# Get the current trending hashtags
# python GetTwitterData.py
def getWorldWideTrends():
	trends_result = api.trends_place(1)
	for trend in trends_result[0]["trends"]:
		print(trend["name"])

# python GetTwitterData.py today <(w)rite/(a)ppend>
def getTimeLineListTweetDataToday(file_command):
	csv_timeline = open("TweetsFromTimelineToday.csv", file_command)
	while(True):
		try:
			utc_now = datetime.utcnow()
			csv_timeline.truncate(0)
			for status in tweepy.Cursor(api.list_timeline, list_id=list_id, tweet_mode="extended").items():
				if fromToday(utc_now, status.created_at):
					process_status = status.full_text.replace('\n','').strip('\n')
					process_status = process_status.replace(',', ' ')
					process_status = process_status.encode("ascii", "ignore").decode()
					csv_timeline.write(f"{status.user.name},{status.created_at},{process_status}\n")
				else:
					break
			time.sleep(60*15)
			print("Waiting on new tweets...")
		except tweepy.TweepError:
			print("Waiting on rate limit...")
			time.sleep(60*15)
			continue
		except StopIteration:
			break
		
	csv_timeline.close()

# python GetTwitterData.py search <(w)rite/(a)ppend> <string of search words>
# Ex: python GetTwitterData.py search w 'google stock'
def searchTweets(word, langauge, file_command):
	csv_tweets = open("SearchTweetsByKeywords.csv", file_command)
	while(True):
		try:
			csv_tweets.truncate(0)
			for tweet in tweepy.Cursor(api.search, q=word, lang=langauge, tweet_mode="extended", wait_on_rate_limit_notify=True).items(1000):
				if tweet.full_text.startswith("RT @"):
					retweet_author = tweet.retweeted_status.author.name
					retweet_author = retweet_author.replace('\n','').replace(',', ' ')
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
				process_status = process_status.replace(',', ' ')
				process_status = process_status.encode("ascii", "ignore").decode()
				user_name = tweet.user.name.encode("ascii", "ignore").decode()
				csv_tweets.write(f"{user_name},{author_followers},{author_following},{tweet.created_at},{retweet_author},{retweet_author_followers},{retweet_author_following},{tweet.retweet_count},{tweet.favorite_count},{process_status}\n")
				#print(f"{user_name},{tweet.created_at},{retweet_author},{tweet.retweet_count},{tweet.favorite_count},{process_status}\n")
		except tweepy.TweepError:
			print("Waiting on rate limit...")
			time.sleep(60*15)
			continue
		except StopIteration:
			break
	csv_tweets.close()



def fromToday(today, statusDate):
	if (today.date() > statusDate.date()):
		return False
	else:
		return True

def processCommandLine(args):
	if (args[1] == "stock"):
		getTweets(args[3], 'en', args[2], args[4])
	elif (args[1] == "help"):
		help()
	elif (args[1] == "trends"):
		getWorldWideTrends()
	elif (args[1] == "timeline"):
		getTimelineListTweetData(args[2], args[3])
	elif (args[1] == "today"):
		getTimeLineListTweetDataToday(args[2])
	elif (args[1] == "search"):
		searchTweets(args[3], 'en', args[2])
	else:
		print("Invalid command")

processCommandLine(sys.argv)
print("Done")
