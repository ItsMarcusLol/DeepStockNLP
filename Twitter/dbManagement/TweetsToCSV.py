import pymysql
import tweepy
from threading import Thread
from queue import Queue


conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')

def tweetsToCsv(table_name):
	#filename = table_name+".csv"
	#file = open(filename, "w")
	#file.write("Woops! I have deleted the content!")
	#file.close()
	query = "SELECT * FROM " + table_name
	cursor = conn.cursor()
	try:
		cursor.execute(query)
		results = cursor.fetchall()
		for row in results:
			print(row)
	except:
		print(sys.exc_info()[0])
		print("ERROR")

def createThreads():
	q = Queue()
	query = "SELECT * FROM List_Of_Stocks"
	cursor = conn.cursor()
	stock_tables = {}
	try:
		cursor.execute(query)
		results = cursor.fetchall()
		for row in results:
			stock = row[0]
			table_name = row[1]
			stock_tables[stock] = table_name
	except:
   		print ("Error: unable to fetch data")
   		sys.exit(1)
	finally:
		cursor.close()
		for stock in stock_tables:
			thread = Thread(target=tweetsToCsv, args=(stock_tables[stock_tables]), )
			thread.start()
		print("Threads Started...")