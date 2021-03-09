import mariadb
import sys

try:
    conn = mariadb.connect(
        user="root",
        password="MarLee21!",
        host="34.82.243.213",
        port=3306,
        database="accounts"
    )
except mariadb.Error as e:
    print(f"Error connecting to MariaDB: {e}")

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
        return {
            'account': [
                'marcus',
                '1/1/1950',
                123456]        
        }

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