import pandas as pd
import numpy as np
import json
from datetime import datetime
from datetime import date
import pymysql

try:
    # For Python 3.0 and later
    from urllib.request import urlopen
except ImportError:
    # Fall back to Python 2's urllib2
    from urllib2 import urlopen

conn = pymysql.connect('localhost', 'leemg', 'MarLee21!', 'CAP_stock2020')

def main():
    key = "f0448bd30a7028e245052fcf3caa0837"
    url = ("https://financialmodelingprep.com/api/v3/stock_news?tickers=GOOG,AAPL,AMZN,MSFT,TSLA,TGT,WMN,DELL,F,BOE&apikey=" + key)
    data = get_jsonparsed_data(url)

    output = parse_data(data)
    frame = pd.DataFrame()
    df = pd.DataFrame(output, columns = ["Ticker", "Date", "Headline"])

    cursor = conn.cursor()
    for record in output:
        if not recordAlreadySeen(record, cursor):
            try:
                query = "INSERT INTO headline_table (ticker,date_of,headline) VALUES(%s,%s,%s)"
                args = (record[0], str(tweet_data[1]), tweet_data[2])
                cursor.execute(query, args)
                conn.commit()
            except:
                print(sys.exc_info()[0])
                print(record)
                conn.rollback()
#     df.to_csv('Ticker-Headlines.csv', index = False) 
    cursor.close()   



def recordAlreadySeen(record, cursor):
    query = "SELECT * FROM headline_table WHERE ticker=%s AND date_of=%s AND headline=%s"
    args = (record[0], str(tweet_data[1]), tweet_data[2])
    cursor.execute(query, args)
    result = cursor.fetchone()
    row_count = cursor.rowcount
    if row_count == 1:
        return True
    else:
        return False



    
    
    


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
        print(d['symbol'],date,d['title'])
        output.append((d['symbol'],date,d['title']))
    return output





main()
conn.close()

