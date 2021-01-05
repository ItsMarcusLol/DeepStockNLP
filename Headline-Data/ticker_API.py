import pandas as pd
import numpy as np
import json
from datetime import datetime
from datetime import date
try:
    # For Python 3.0 and later
    from urllib.request import urlopen
except ImportError:
    # Fall back to Python 2's urllib2
    from urllib2 import urlopen

def main():
    key = "f0448bd30a7028e245052fcf3caa0837"
    url = ("https://financialmodelingprep.com/api/v3/stock_news?tickers=GOOG,AAPL,AMZN,MSFT,TSLA,TGT,WMN,DELL,F,BOE&apikey=" + key)
    data = get_jsonparsed_data(url)

    output = parse_data(data)
    frame = pd.DataFrame()
    df = pd.DataFrame(output, columns = ["Ticker", "Date", "Headline"])
#     df.to_csv('Ticker-Headlines.csv', index = False)    



    
    
    


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

