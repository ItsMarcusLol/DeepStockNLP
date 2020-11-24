#Used to test MySQL library and functions

from MySQLdb import _mysql

conn = _mysql.connect("localhost","leemg","MarLee21!","CAP_stock2020")

print(conn)

conn.close()