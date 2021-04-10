from flask import Flask, jsonify, make_response
from urllib.request import urlopen
import json
import time

class HomepageManager():
    def get_headlines(self, symbol):
        key = "f0448bd30a7028e245052fcf3caa0837"
        url = "https://financialmodelingprep.com/api/v3/stock_news?tickers=" + symbol + "&limit=4&apikey=" + key
        response = urlopen(url)
        data = response.read().decode("utf-8")
        headlines = json.loads(data)
        return make_response(jsonify(headlines), 200)