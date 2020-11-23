#Used to test MySQL library and functions

import pymysql

conn = pymysql.connect("localhost","leemg","Mahl2000","CAP_stock2020")

cursor = db.cursor()

print("connected")

conn.close()