import sys
import pymysql
# Adds a stock and table name to database

conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')

for arg in sys.argv:
	print(arg)

stock_name = sys.argv[1]
table_name = sys.argv[2]

cursor = conn.cursor()

query = "SELECT * FROM %s"

args = (table_name)
 
msg = cursor.execute(query, args)
conn.commit()

print(msg)

cursor.close()
conn.close()