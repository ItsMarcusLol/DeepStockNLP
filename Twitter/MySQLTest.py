#Used to test MySQL library and functions

import MySQLdb

conn = pymysql.connect("localhost","leemg","Mahl2000","CAP_stock2020")

conn = MySQLdb.Connection(
	host="localhost",
	user="leemg",
	passwd="Mahl2000",
	db="CAP_stock2020"
)

print(conn)

conn.close()