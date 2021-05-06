#!/usr/bin/env python
# coding: utf-8


#!/usr/bin/env python
import pandas as pd
import json
from datetime import datetime
from datetime import date
try:
    # For Python 3.0 and later
    from urllib.request import urlopen
except ImportError:
    # Fall back to Python 2's urllib2
    from urllib2 import urlopen

import requests
import mysql.connector


#ADD USERNAME
#Database connection
conn=mysql.connector.connect(user= )
max =  {"google" : 35, "target" : 29 , "walmart" : 57, "dell" : 24, "amazon" : 56, 'tesla' : 61,
         "boeing" : 54, "microsoft" : 46, "ford" : 25, "apple":70}
dict = {"google" : "googl", "target" : "tgt" , "walmart" : "wmt", "dell" : "dell", "amazon" : "amzn", 'tesla' : "tsla",
         "boeing" : "ba", "microsoft" : "msft", "ford" : "f", "apple":"aapl"}




def getNYT(stock):
    your_key = 'XrEpgzLniLeuVv9Rwai6PZfol6OhEN91'

    url = 'https://api.nytimes.com/svc/news/v3/content/all/all/title.json?api-key=' +your_key
    r = requests.get(url)
    json_data = r.json()
    jdata = json_data['results']
    daily_Headlines = []

    for x in jdata:
        if stock in x['title'].lower() :
            daily_Headlines.append(x['title'].lower())
    df1 = pd.DataFrame(daily_Headlines, columns = ["Ticker", "Date", "Headline"])
    return daily_Headlines



def f_modeling(stock):
    key = "f0448bd30a7028e245052fcf3caa0837"
    stocks = ['AAPL','AMZN','MSFT','TSLA','TGT','WMT','DELL','F','BA']
    f_output = []
    
    url = ("https://financialmodelingprep.com/api/v3/stock_news?tickers="+ dict[stock].upper() + "&apikey=" + key)
    data = get_jsonparsed_data(url)

    output = parse_data(data)
    df = pd.DataFrame(output, columns = ["Ticker", "Date", "Headline"])
    today = date.today()
    i = 0;
    for x in df['Date']:
        if x == today:
             if stock in df['Headline'][i].lower() or dict[stock] in df['Headline'][i].lower() or (stock == "google" and "alphabet" in df['Headline'][i].lower()):
                f_output.append( df['Headline'][i].lower())                
        i = i +1

    return f_output;




def get_jsonparsed_data(url):
    """
    Receive the content of ``url``, parse it as JSON and return the object.

    Parameters
    ----------
    url : str

    Returns
    -------
    dict
    """
    response = urlopen(url)
    data = response.read().decode("utf-8")
    return json.loads(data)




def parse_data(data):
    output = []
    for d in data:
        date = datetime.strptime(d['publishedDate'], '%Y-%m-%d  %H:%M:%S').date()
        output.append((d['symbol'],date,d['title']))
    return output




def getPrice(stock):
    key = "f0448bd30a7028e245052fcf3caa0837"
    stocks = ['AAPL','AMZN','MSFT','TSLA','TGT','WMT','DELL','F','BA']
    f_output = []
    
    url = ("https://financialmodelingprep.com/api/v3/historical-price-full/"+ dict[stock].upper() + "?apikey=" + key)
    data = get_jsonparsed_data(url)
    data = data['historical']
    open = data[0]['open']
    close = data[0]['close']
    change = close - open
    return change
    
def insertH(stock, df):
    cursor = conn.cursor()
    query = "insert into " + str(stock) + " values("
    for x in df:
       if x == 'Label':
            query = query + str(df['Label'][0]) + ", "
        elif x == 'Date':
             query = query + str(df['Date'][0]) + ", '"
        else:
            query = query + str(df[x][0]) + "', '"
    query = query[:-3]    
    query = query + ")" 
    cursor.execute(query)
    conn.commit()
    cursor.close()
    
def reachedMax(max, allH):
    new = []
    for x in range(max):
        new.append(allH[x])
    return new

def main():
    for x in dict:
        head1 = getNYT(x)
        head2 = f_modeling(x)
        head2.extend(head1)
        allH = []
        col = []
        last = []
        if len(head2) > max[x]:
            head2 = reachedMax(max[x],head2)
        i = 0
        col.append("Label")
        col.append("Date")
        if getPrice(x) > 0:
            allH.append(1)
        else:
            allH.append(0)
        allH.append( date.today())
        for y in head2:
            allH.append(str(y).lower())
            col.append("top" + str(i + 1))
            i = i + 1

        last.append(allH)
        dfH = pd.DataFrame(last, columns = col)
        #Insert into DB here
        insertH(x, dfH)
        
        
        

main()









