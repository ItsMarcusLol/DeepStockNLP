import pymysql
import datetime
import time


conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')

cursor = conn.cursor()

stock_tables = {}

query = "SELECT * FROM ListOfStocks"

try:
	cursor.execute(query)
	results = cursor.fetchall()
	for row in results:
		stock = row[0]
		table_name = row[1]
		stock_tables[stock] = table_name
except:
	print ("Error: unable to fetch data")

stock_table_name = stock_tables['tesla']
time = datetime.datetime(2020, 11, 26, 19, 29, 13)
print(time)
tweet_data = ['tesla', 'Ant', 359, 456, time, 'None', 0, 0, 0, 0, 'Told my mom how I made $800+ just from Tesla and stocks in the past week using Robinhood and she said it was a scam']

query = "INSERT INTO %s(username,followers,following,date_tweeted,retweet_author,retweet_followers,retweet_following,retweets,favorites,status) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
args = (str(stock_table_name),tweet_data[1],tweet_data[2],tweet_data[3],str(tweet_data[4]),tweet_data[5],tweet_data[6],tweet_data[7],tweet_data[8],tweet_data[9],tweet_data[10])
cursor.execute(query, args)
conn.commit()
print(cursor._last_executed)
print("Tweet added")

cursor.close()
conn.close()