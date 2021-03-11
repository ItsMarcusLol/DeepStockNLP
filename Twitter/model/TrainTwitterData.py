from queue import Queue
from threading import Thread
import pymysql
import os
import sys

conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')

stock_tables = {}

def getStockNames():
	cursor = conn.cursor()
	query = "SELECT * FROM List_Of_Stocks"
	global stock_tables
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

def train():
	getStockNames()
	global stock_tables
	for stock in stock_tables:

train()