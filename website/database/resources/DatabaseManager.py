import pymysql

conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')

class DatabaseManager():
	def insert(self,table_name,fields,values):
		if (len(fields) != len(values)):
			return -1
		else:
			flag = False
			query = "INSERT INTO "+table_name+"("
			fields_str = ""
			fields_values = ""
			for field in fields:
				fields_str += fields+","
				fields_values += "%s,"
			fields_str = fields_str[:-1]
			fields_str += ") VALUES("
			fields_values = fields_str[:-1]
			fields_values += ")"
			query += fields_str
			query += fields_values
			args = tuple(values)
			try:
				cursor = conn.cursor()
				cursor.execute(query, args)
				conn.commit()
				flag = True
			except:
				print(sys.exc_info()[0])
				conn.rollback()
			finally:
				cursor.close()
				return flag

	def fetch(self, table_name, fields, values):
		query = "SELECT * FROM " + table_name + " WHERE "
		for field in fields:
			query += (fields + "=%s AND ")
		query = query[:-5]
		args = tuple(values)
		try:
			cursor = conn.cursor()
			cursor.execute(query, args)
			result = cursor.fetchone()
			row_count = cursor.rowcount
			cursor.close()
			return cursor.fetchall()
		except:
			print(sys.exc_info()[0])
			conn.rollback()
			cursor.close()
			return ('record not found')