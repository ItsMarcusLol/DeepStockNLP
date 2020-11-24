#Used to test MySQL library and functions

from MySQLdb import _mysql

#conn = _mysql.connect(host='localhost',user='leemg',passwd='MarLee21!',db='CAP_stock2020')
conn = _mysql.connect(host='127.0.0.1',user='leemg',passwd='MarLee21!',db='CAP_stock2020',use_pure=True)

print(conn)

conn.close()