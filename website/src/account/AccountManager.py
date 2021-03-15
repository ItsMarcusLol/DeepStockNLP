import mysql.connector
from random import randint

conn = mysql.connector.connect(user='root', password='MarLee21!', host='db', database='accounts')

class AccountManager():
    def login(self, username, password):
        cursor = conn.cursor()

        cursor.close()
        return True
    
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
            return False
        elif self.account_exists(username):
            return False
        else:
            userId = self.genUserId()
            cursor = conn.cursor()
            query = "INSERT INTO account_data(username, user_id) VALUES(" + username +","+userId+")" 
            cursor.execute(query)
            cursor.close()
            return True

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
        while(True):
            userId = randint(1000000000, 9999999999)
            cursor = conn.cursor()
            query = "SELECT * FROM account_data WHERE user_id=" + userId
            cursor.execute(query)
            result = cursor.fetchone()
            if (result is None):
                cursor.close()
                return userId