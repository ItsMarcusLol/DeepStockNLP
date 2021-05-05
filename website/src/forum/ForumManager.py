from random import randint
import mysql.connector
import datetime
from flask import Flask, jsonify, make_response

# TODO test if valid user ID
conn = mysql.connector.connect(user='root', password='MarLee21!', host='db', database='forum', buffered=True)

class ForumManager():
    def getConversation(self, id):
        cursor = conn.cursor()
        query = "SELECT * FROM forum_data WHERE conversation_id=" + str(id)
        cursor.execute(query)
        msg = cursor.fetchall()
        if (not msg):
            cursor.close()
            return None
        else:
            cursor.close()
            return msg
    
    def get_user_conversation(self, user_id):
        cursor = conn.cursor()
        query = "SELECT * FROM forum_data WHERE conversation_id=" + str(user_id)
        cursor.execute(query)
        msg = cursor.fetchall()
        if (not msg):
            cursor.close()
            return None
        else:
            cursor.close()
            return msg

    # TODO check to see if user_id is valid and if message length is adequate (250 chars)
    def create_conversation(self, user_id, message):
        id = self.create_conversation_id()
        cursor = conn.cursor() 
        utc = datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
        query = "INSERT INTO forum_data(conversation_id, user_id, date_time, count, text) VALUES(%s,%s,\"%s\",%s,\"%s\")" % (str(id),str(user_id),str(utc),str(0),message)
        cursor.execute(query)
        conn.commit()
        cursor.close()
        return True

    def create_conversation_id(self):
        cursor = conn.cursor()
        while(True):
            id = randint(1, 2147483647)
            query = "SELECT * FROM forum_data WHERE conversation_id=" + str(id)
            cursor.execute(query)
            msg = cursor.fetchone()
            if not msg:
                cursor.close()
                return id

class MessageManager():
    def getMessage(self, id, user_id, count):
        cursor = conn.cursor()
        query = "SELECT * FROM forum_data WHERE conversation_id=" + str(id)+  " AND user_id=" + str(user_id) + " AND count=" + str(count)
        cursor.execute(query)
        msg = cursor.fetchone()
        cursor.close()
        if (not msg):
            return None
        else:
            return msg

    # TODO check to see if user_id is valid and if message length is adequate
    def create_messsage(self, conversation_id, user_id, message):
        cursor = conn.cursor()
        query = "SELECT * FROM forum_data WHERE conversation_id=" + str(conversation_id)
        cursor.execute(query)
        cursor.fetchall()
        rows = cursor.rowcount
        if (rows == 0):
            cursor.close()
            return False
        else:
            utc = datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
            query = "INSERT INTO forum_data(conversation_id, user_id, date_time, count, text) VALUES(%s,%s,\"%s\",%s,\"%s\")" % (str(conversation_id),str(user_id),str(utc),str(rows),message)
            cursor.execute(query)
            conn.commit()
            cursor.close()
            return True

class ChatManager():
    def saveChat(self, username, text):
        try: 
            cursor = conn.cursor()
            query = "INSERT INTO chat_data(username, text) VALUES (\"" + username + "\", \"" + text + "\")"
            cursor.execute(query)
            conn.commit()
            cursor.close()
            return make_response(jsonify({"message": "Chat saved"}), 200)
        except: 
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
            return make_response(jsonify({"message": "Get Chat server error"}), 500)

