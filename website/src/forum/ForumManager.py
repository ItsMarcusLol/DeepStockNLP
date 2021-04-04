from random import randint
import mysql.connector
import datetime

conn = mysql.connector.connect(user='root', password='MarLee21!', host='db', database='forum')

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
    
    # TODO check to see if user_id is valid and if message length is adequate
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
        query = "SELECT COUNT(*) FROM forum_data WHERE conversation_id=" + str(conversation_id)
        rows = cursor.execute(query)
        if (int(rows) == 0):
            cursor.close()
            return False
        else:
            utc = datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
            query = "INSERT INTO forum_data(conversation_id, user_id, date_time, count, text) VALUES(%s,%s,\"%s\",%s,\"%s\")" % (str(id),str(user_id),str(utc),str(rows),message)
            cursor.execute(query)
            conn.commit()
            cursor.close()
            return True