#Used to test MySQL library and functions

import pymysql
import tweepy

conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')

cursor = conn.cursor()

query = "SELECT * FROM GoogleStockTweets"

cursor.execute(query)
results = cursor.fetchall()

for row in results:
	print(row)

#print(conn)

conn.close()