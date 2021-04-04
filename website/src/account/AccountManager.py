import mysql.connector
import bcrypt
from random import randint

conn = mysql.connector.connect(user='root', password='MarLee21!', host='db', database='accounts')

class AccountManager():
    def login(self, username, password):
        cursor = conn.cursor()
        pw = password.encode()
        query = "SELECT * FROM account_data WHERE username=\"" + username + "\""
        cursor.execute(query)
        result = cursor.fetchone()
        hashed_inDB = result[2]
        hashed_str = hashed_inDB.encode()
        if bcrypt.checkpw(pw, hashed_str): 
            cursor.close()
            return True
        else:
            cursor.close()
            return False
    
    def get_account_id(self, userId):
        cursor = conn.cursor()
        query = "SELECT * FROM account_data WHERE user_id=" + userId
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        return result

    def get_account_name(self, username):
        cursor = conn.cursor()
        query = "SELECT * FROM account_data WHERE username=\"" + username + "\""
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        return result
    
    def create_account(self, username, password):
        if len(username) > 20 or str.isspace(username):
            return -1
        elif self.account_exists(username):
            return -2
        else:
            userId = self.genUserId()
            cursor = conn.cursor()
            pw = password.encode()
            pw_hashed = bcrypt.hashpw(pw, bcrypt.gensalt(rounds=15))
            pw_hashed_str = pw_hashed.decode()
            query = "INSERT INTO account_data(username, user_id, password) VALUES(\"" + username +"\","+str(userId)+",\""+pw_hashed_str+"\")"
            #try: 
            cursor.execute(query)
            conn.commit()
            '''except:
                print("Query failed")
                print(query)
                cursor.close()
                return -1'''
            cursor.close()
            return 1

    def account_exists(self, username):
        cursor = conn.cursor()
        query = "SELECT * FROM account_data WHERE username=\"" + username + "\""
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        if result is not None:
            return True
        else:
            return False
    
    def genUserId(self):
        cursor = conn.cursor()
        while(True):
            userId = randint(1, 2147483647)
            query = "SELECT * FROM account_data WHERE user_id=" + str(userId)
            cursor.execute(query)
            msg = cursor.fetchone()
            if not msg:
                cursor.close()
                return userId
            '''result = cursor.fetchone()
            if (result is None):
                cursor.close()
                return userId'''