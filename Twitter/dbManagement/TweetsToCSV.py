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
	cursor.execute(query)
	results = cursor.fetchall()
	for row in results:
		print(row)
	print(sys.exc_info()[0])
	print("ERROR")

def createThreads():
	q = Queue()
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
	for stock in stock_tables:
		thread = Thread(target=tweetsToCsv, args=(stock_tables[stock_tables]), )
		thread.start()
	print("Threads Started...")

createThreads()