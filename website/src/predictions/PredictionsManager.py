import json
import mysql.connector
from flask import Flask, jsonify, make_response

conn = mysql.connector.connect(user='root', password='MarLee21!', host='db', database='predictions')

class PredictionsManager():
    def get_predictions(self, ticker):
        cursor = conn.cursor()
        query = "SELECT * FROM prediction_data WHERE ticker=" + "\"" + ticker + "\""
        cursor.execute(query)
        result = cursor.fetchall()
        cursor.close()
        return make_response(jsonify(result), 200)

    def post_predictions(self, ticker, date, prediction, con, acc):
        cursor = conn.cursor()
        query = "INSERT INTO prediction_data(ticker,date,prediction,con, acc) VALUES(\""+ticker+"\","+str(date)+","+str(prediction)+","+str(con)+","+str(acc)+")"
        cursor.execute(query)
        conn.commit()
        cursor.close()
        return make_response(jsonify({"message": "Prediction Added"}), 200)
    
    def delete_predictions(self, ticker):
        cursor = conn.cursor()
        query = "DELETE FROM prediction_data WHERE ticker=" + "\"" + ticker + "\""
        cursor.execute(query)
        cursor.close()
        return make_response(jsonify({"message": "Prediction deleted"}), 204)