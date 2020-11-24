#Used to test MySQL library and functions

import pymysql

#conn = _mysql.connect(host='localhost',user='leemg',passwd='MarLee21!',db='CAP_stock2020')
#conn = _mysql.connect(host='127.0.0.1',user='leemg',passwd='MarLee21!',db='CAP_stock2020',ssl_disabled='True')

conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')

cursor = conn.cursor()

query = "SELECT * FROM GoogleStockTweets"

cursor.execute(query)
results = cursor.fetchall()

for row in results:
	print(row)

#print(conn)

conn.close()