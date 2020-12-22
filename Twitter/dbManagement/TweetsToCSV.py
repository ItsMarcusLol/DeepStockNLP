import pymysql
import tweepy
from threading import Thread
from queue import Queue


conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')

def tweetsToCsv(table_name):
	print(table_name)
	#filename = table_name+".csv"
	#file = open(filename, "w")
	#file.write("Woops! I have deleted the content!")
	#file.close()
	query = "SELECT * FROM " + table_name
	cur = conn.cursor()
	cur.execute(query)
	results = cur.fetchall()
	for row in results:
		line = ""
		for element in row:
			line = line + " " + str(element)
	cur.close()
	print("Done")

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
		table_name = stock_tables[stock]
		thread = Thread(target=tweetsToCsv, args=(table_name, ))
		thread.start()

createThreads()