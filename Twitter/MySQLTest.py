#Used to test MySQL library and functions

import MySQLdb

conn = MySQLdb.Connection(
	host="localhost",
	user="leemg",
	passwd="Mahl2000",
	db="CAP_stock2020"
)

conn.query("""SELECT * FROM mytable""")
result = conn.store_result()
for i in range(result.num_rows()):
    print(result.fetch_row())

conn.close()