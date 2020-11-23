#Used to test MySQL library and functions

import mysql.connector

db = mysql.connector.connect(
	host="localhost",
	user="leemg",
	passwd="Mahl2000"
)

print(db)