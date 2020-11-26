import sys
import pymysql
# Adds a stock and table name to database

conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')

stock_name = sys.argv[1]
table_name = sys.argv[2]

cursor = conn.cursor()

query = "SELECT * FROM " + table_name
try:
	cursor.execute(query)
	conn.commit()

	query = "INSERT INTO ListOfStocks(name,tablename) " \
				"VALUES(%s,%s)"
	ags = (stock_name, table_name)

	print("Stock added")
except pymysql.err.ProgrammingError as e:
	code, msg = e.args
	if code == 1050:
		print("Stock already added")
	else:
		print(e)
finally:
	conn.rollback()
	conn.close()
	cursor.close()