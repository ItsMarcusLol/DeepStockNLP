#Used to test MySQL library and functions

from MySQLdb import _mysql

conn = _mysql.connect("localhost","leemg","Mahl2000","CAP_stock2020")

print(conn)

conn.close()