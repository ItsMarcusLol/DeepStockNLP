from flask import Flask, jsonify, make_response
import mysql.connector
import bcrypt
from random import randint

conn = mysql.connector.connect(user='root', password='MarLee21!', host='db', database='accounts', buffered=True)

class AccountManager():
    def login(self, username, password):
        cursor = conn.cursor()
        try: 
            pw = password.encode()
            query = "SELECT * FROM account_data WHERE username=\"" + username + "\""
            cursor.execute(query)
            result = cursor.fetchone()
            if (result is None):
                cursor.close()
                return make_response(jsonify({"message": "Username does not exist"}), 400)
            hashed_inDB = result[2]
            hashed_str = hashed_inDB.encode()
            cursor.close()
            if bcrypt.checkpw(pw, hashed_str): 
                return make_response(jsonify({"message": "Login successful"}), 200)
            else:
                return make_response(jsonify({"message": "Login failed"}), 400)
        except: 
            cursor.close()
            return make_response(jsonify({"message": "Login server error"}), 500)
    
    def get_account_id(self, userId):
        cursor = conn.cursor()
        query = "SELECT username,user_id FROM account_data WHERE user_id=" + userId
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        return result

    def get_account_name(self, username):
        cursor = conn.cursor()
        query = "SELECT username,user_id FROM account_data WHERE username=\"" + username + "\""
        cursor.execute(query)
        result = cursor.fetchone()
        cursor.close()
        return result
    
    def create_account(self, username, password):
        try: 
            if not (username.isascii() and password.isascii()): 
                return make_response(jsonify({"message": "ASCII characters only"}), 400)
            if len(username) < 2 or len(username) > 20:
                return make_response(jsonify({"message": "Username too short or too long"}), 400)
            elif self.validPassword(password):
                return make_response(jsonify({"message": "Invalid password"}), 400)
            elif self.account_exists(username):
                return make_response(jsonify({"message": "Username already exists"}), 400)
            else:
                userId = self.genUserId()
                cursor = conn.cursor()
                pw = password.encode()
                pw_hashed = bcrypt.hashpw(pw, bcrypt.gensalt(rounds=15))
                pw_hashed_str = pw_hashed.decode()
                query = "INSERT INTO account_data(username, user_id, password) VALUES(\"" + username +"\","+str(userId)+",\""+pw_hashed_str+"\")"
                cursor.execute(query)
                conn.commit()
                cursor.close()
                return make_response(jsonify({"message": "Account created successfully"}), 200)
        except: 
            cursor.close()
            return make_response(jsonify({"message": "Create Account server error"}), 500)

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
    
    # TODO fill function
    def validPassword(self, password):
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