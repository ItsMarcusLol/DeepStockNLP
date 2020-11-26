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
	conn.close()
	cursor.close()