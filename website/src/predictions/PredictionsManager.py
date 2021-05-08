import json
import mysql.connector
from flask import Flask, jsonify, make_response

conn = mysql.connector.connect(user='root', password='MarLee21!', host='db', database='predictions', buffered=True)

class PredictionsManager():
    def get_predictions(self, ticker):
        try: 
            cursor = conn.cursor()
            query = "SELECT * FROM prediction_data WHERE ticker=" + "\"" + str(ticker) + "\""
            cursor.execute(query) 
            result = cursor.fetchall()
            predictions = []
            for i in result:
                row = {'ticker': i[0], 'date': i[1], 'prediction': i[2], 'con': i[3], 'acc': i[4]}
                predictions.insert(0, row)
            cursor.close()
            return make_response(jsonify(predictions), 200)
        except: 
            cursor.close()
            return make_response(jsonify({"message": "Get predictions server error"}), 500)

    def post_predictions(self, ticker, date, prediction, con, acc):
        try: 
            cursor = conn.cursor()
            query = "INSERT INTO prediction_data(ticker,date,prediction,con, acc) VALUES(\""+ticker+"\",\""+str(date)+"\","+str(prediction)+","+str(con)+","+str(acc)+")"
            cursor.execute(query)
            conn.commit()
            cursor.close()
            return make_response(jsonify({"message": "Prediction Added"}), 200)
        except: 
            cursor.close()
            return make_response(jsonify({"message": "Post predictions server error"}), 500)

    def delete_predictions(self, ticker):
        try: 
            cursor = conn.cursor()
            query = "DELETE FROM prediction_data WHERE ticker=" + "\"" + ticker + "\""
            cursor.execute(query)
            cursor.close()
            return make_response(jsonify({"message": "Prediction deleted"}), 204)
        except: 
            cursor.close()
            return make_response(jsonify({"message": "Delete predictions server error"}), 500)
