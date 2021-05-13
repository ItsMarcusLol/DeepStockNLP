from flask import Flask, jsonify, make_response
from urllib.request import urlopen
import json
import time
import mysql.connector

conn = mysql.connector.connect(user='root', password='MarLee21!', host='db', database='forum')

class HomepageManager():
    def get_headlines(self, symbol):
        try: 
            key = "f0448bd30a7028e245052fcf3caa0837"
            url = "https://financialmodelingprep.com/api/v3/stock_news?tickers=" + symbol + "&limit=20&apikey=" + key
            response = urlopen(url)
            data = response.read().decode("utf-8")
            headlines = json.loads(data)
            return make_response(jsonify(headlines), 200)
        except: 
            return make_response(jsonify({"message": "Get headlines server error"}), 500)
    
    def get_current(self):
        try: 
            key = "f0448bd30a7028e245052fcf3caa0837"
            url = "https://financialmodelingprep.com/api/v3/quote/GOOGL,AAPL,BA,WMT,AMZN,TSLA,MSFT,F,DELL,TGT?apikey=" + key
            response = urlopen(url)
            data = response.read().decode("utf-8")
            prices = json.loads(data)
            return make_response(jsonify(prices), 200)
        except:
            return make_response(jsonify({"message": "Get prices server error"}), 500)
    

    