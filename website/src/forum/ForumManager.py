from random import randint
import mysql.connector
import datetime
from flask import Flask, jsonify, make_response

# TODO test if valid user ID
conn = mysql.connector.connect(user='root', password='MarLee21!', host='db', database='forum', buffered=True)

class ChatManager():
    def saveChat(self, username, text):
        try: 
            if len(text) > 250: 
                return make_response(jsonify({"message": "Chat too long to post"}), 400)
            else: 
                cursor = conn.cursor()
                query = "INSERT INTO chat_data(username, text) VALUES (\"" + username + "\", \"" + text + "\")"
                cursor.execute(query)
                conn.commit()
                cursor.close()
                return make_response(jsonify({"message": "Chat saved"}), 200)
        except: 
            cursor.close()
            return make_response(jsonify({"message": "Save Chat server error"}), 500)

    def getChat(self):
        try: 
            cursor = conn.cursor()
            query = "SELECT * FROM chat_data"
            cursor.execute(query)
            chats = cursor.fetchall()
            cursor.close()
            return make_response(jsonify(chats), 200)
        except: 
            cursor.close()
            return make_response(jsonify({"message": "Get Chat server error"}), 500)

    def clear(self): 
        cursor = conn.cursor()
        query = "DELETE FROM chat_data"
        cursor.execute(query)
        cursor.close()
        return make_response(jsonify(chats), 200)