import mysql.connector

conn = mysql.connector.connect(user='root', password='MarLee21!', host='db', database='accounts')

class AccountManager():
    def login(self, username, password):
        return True
    
    def get_account_id(self, userId):
        return {
            'account': [
                'marcus',
                '1/1/1950',
                123456]        
        }

    def get_account_name(self, username):
        print(username)
        cursor = conn.cursor()
        print(username)
        query = "SELECT * FROM account_data WHERE username=%s;"
        args = (username)
        cursor.execute(query, args)
        print(username)
        result = cursor.fetchone()
        print(result)
        cursor.close()
        return result

    def account_exists(self, username):
        return False
    
    def create_account(self, username, password):
        if len(username) > 20 or str.isspace(username):
            return False
        elif self.account_exists(username):
            return False
        else:
            return {
                'username': username,
                'password': password
            }