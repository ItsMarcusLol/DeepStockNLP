import pymysql

stock_tables = {}

conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')

cursor = conn.cursor()

query = "SELECT * FROM ListOfStocks"

try:
	cursor.execute(query)
	results = cursor.fetchall()
	for row in results:
		stock = row[0]
		table_name = row[1]
		stock_tables[stock] = table_name
	print(stock_tables)
except:
	print ("Error: unable to fetch data")
finally:
	# Test query building from the dictionary
	for stock in stock_tables:
		stock_table_name = stock_tables[stock]
		query = "INSERT INTO %s(username,followers,following,date_tweeted,retweet_author,retweet_followers,retweet_following,retweets,favorites,status) VALUES(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)"
		args = (stock_table_name,tweet_data[1],tweet_data[2],tweet_data[3],str(tweet_data[4]),tweet_data[5],tweet_data[6],tweet_data[7],tweet_data[8],tweet_data[9],tweet_data[10],)
		print(query, args)	
	conn.close()
	cursor.close()