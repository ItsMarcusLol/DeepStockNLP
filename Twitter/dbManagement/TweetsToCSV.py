import pymysql
import tweepy
from threading import Thread
from queue import Queue

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

def tweetsToCsv(table_name, cursor, conn):
	print(table_name)
	#filename = table_name+".csv"
	#file = open(filename, "w")
	#file.write("Woops! I have deleted the content!")
	#file.close()
	connection = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')
	cur = connection.cursor()
	query = "SELECT * FROM " + table_name
	cursor.execute(query)
	results = cursor.fetchall()
	for row in results:
		user = api.get_user(row[0])
		user_id = user.id_str
		update_query = "UPDATE %s SET id=%s WHERE username=%s"
		args=(table_name,user_id,row[0])
		print(user_id)
		#cur.execute(update_query, args)
	cur.close()
	connection.close()
	cursor.close()
	conn.close()
	print("Done")

def createThreads():
	q = Queue()
	conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')
	query = "SELECT * FROM List_Of_Stocks"
	cursor = conn.cursor()
	stock_tables = {}
	cursor.execute(query)
	results = cursor.fetchall()
	for row in results:
		stock = row[0]
		table_name = row[1]
		stock_tables[stock] = table_name
	cursor.close()
	conn.close()
	for stock in stock_tables:
		conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')
		cursor = conn.cursor()
		table_name = stock_tables[stock]
		thread = Thread(target=tweetsToCsv, args=(table_name, cursor, conn, ))
		thread.start()
createThreads()