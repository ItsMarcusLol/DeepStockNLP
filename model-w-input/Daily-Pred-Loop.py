import pandas as pd
import copy
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix, f1_score
from textblob import TextBlob
from xgboost import XGBClassifier
import requests
import json
from datetime import datetime
from datetime import date
import requests
from urllib.request import urlopen
import mysql.connector
from pytz import timezone
import pytz


# ## Stocks 

conn=mysql.connector.connect(user="admin" ,password="password", database = "headlines")

allS = {'GOOGL': 'google', 'TSLA':'tesla', 'AAPL':'apple', 'AMZN':'amazon', 'BA':'boeing', 'MSFT':'microsoft', 'DELL':'dell', 'WMT':'walmart', 'TGT': 'target', 'F': 'ford'}
getPW = {'googl':0.5, 'tsla':20, 'aapl':0.75, 'amzn':50, 'ba':1.39, 'msft':7, 'dell':3, 'wmt':1.3, 'tgt': 0.948, 'f': 1.22}


# ## Goes through headlines and returns sentiment value

def analize_sentiment(tweet):
    if str(tweet) == "nan":
        analysis = TextBlob((str(tweet)))
        return analysis.polarity
    else:
        analysis = TextBlob((str(tweet)))
        if analysis.polarity == 0.0:
            return (analysis.polarity + .05)
    return analysis.polarity


# ## Gets the last 270 days 

def get270(saved_H):
    col = getCol(saved_H); 
    length = len(saved_H)
    start = length - 270
    new_news = []
    i = 0
  
    for x in saved_H['Date']:
        if i >= start:
            row = []
            for y in col:
                 row.append(saved_H[y][i])
            new_news.append(row)   
        i = i +1
    news = pd.DataFrame(new_news, columns=col)
    return news;


def makeDF(db):
    col = getCol(db)
    length = len(db)
    col = []
    col.append('Date')
    col.append('Label')
    i = -1
    for y in db[0]:
        if i > 0:
            col.append(str("top"+str(i)))
        i = i +  1
    df = pd.DataFrame(db, columns=col)
    return df;

    

# ## Gets all the Column names

def getCol(saved_H):
    col = []
    for x in saved_H:
        col.append(x)
    return col
    


# Get train data and test data

def get_train_news(day, month, year, data):
    index = 0
    dataset = []
    d1 = datetime(year, month, day).date() 
    for date in data['Date']:
        d = datetime.strptime(date, '%Y-%m-%d').date()
        if d1 > d:
            dataset.append(data.iloc[index])
        index = index +1
        df = pd.DataFrame(dataset)
    return df




def get_test_news(day, month, year,data):
    index = 0
    dataset = []
    d1 = datetime(year, month, day).date() 
    for date in data['Date']:
        d = datetime.strptime(date, '%Y-%m-%d').date()
        if d1 < d:
            dataset.append(data.iloc[index])
        index = index +1
        df = pd.DataFrame(dataset)
    return df


# ## Model- scaling positive weight
# ### Returning the accuracy 


def getAccuracy(train_news, test_news,  ticker):
    train_sentiment_weight = train_news
    test_sentiment_weight = test_news
    weighted_data=[]
    empty_data=[]


    train_sentiment_weight = train_sentiment_weight.drop(['Date', 'Label'], axis=1)
    for column in train_sentiment_weight:
        train_sentiment_weight[column] = train_sentiment_weight[column].apply(analize_sentiment)
    train_sentiment_weight = train_sentiment_weight 

    test_sentiment_weight = test_sentiment_weight.drop(['Date', 'Label'], axis=1)
    for column in test_sentiment_weight:
        test_sentiment_weight[column] = test_sentiment_weight[column].apply(analize_sentiment)
    test_sentiment_weight = test_sentiment_weight 

    for column in train_news:
        if not train_news[column].empty:
            empty_data = train_news[column]
        else:
            weighted_data = train_news[column]

    scale_weight = 0
    count = 0
    count0 = 0
    for x in train_news['Label']:
        if x == 1:
            count = count + 1
        if x == 0:
            count0 = count0 + 1
    n = (count - count0 )

    scale_weight = getPW[ticker.lower()]
    weighted_XGB1 = XGBClassifier(scale_pos_weight = scale_weight)
    weighted_XGB1.fit(train_sentiment_weight, train_news['Label'], sample_weight = weighted_data)
    y_pred_weight1 = weighted_XGB1.predict(test_sentiment_weight)
    return accuracy_score(test_news['Label'], y_pred_weight1)


# ## Get Headlines for the Day

def get_NYT(stock):
    your_key = 'XrEpgzLniLeuVv9Rwai6PZfol6OhEN91'

    url = 'https://api.nytimes.com/svc/news/v3/content/all/all/title.json?api-key=' +your_key
    r = requests.get(url)
    json_data = r.json()
    jdata = json_data['results']

    daily_Headlines = []
    NYT_Headlines = []

    for x in jdata:
        if stock in x['title'].lower(): 
            oldformat = x['published_date']
            date = oldformat.partition("T")[0]
            d = datetime.strptime(date, '%Y-%m-%d').date()
            
            NYT_Headlines.append(((stock, d , x['title'])))
    df_2 = pd.DataFrame(NYT_Headlines, columns = ["Ticker", "Date", "Headline"])
    return df_2
            




def parse_data(data):
    output = []
    for d in data:
        date = datetime.strptime(d['publishedDate'], '%Y-%m-%d  %H:%M:%S').date()
        output.append((d['symbol'],date,d['title']))
    return output




def get_jsonparsed_data(url):
    response = urlopen(url)
    data = response.read().decode("utf-8")
    return json.loads(data)



# Gets finacial modeling prep headlines
def get_FM(ticker):
    key2 = "f0448bd30a7028e245052fcf3caa0837"
    f_output = []

 
    url2 = ("https://financialmodelingprep.com/api/v3/stock_news?tickers="+ticker+"&apikey=" + key2)


    data = get_jsonparsed_data(url2)
    output = parse_data(data)
    df_1 = pd.DataFrame(output, columns = ["Ticker", "Date", "Headline"])
    return df_1



# Format Headlines so they are in correct format for model

def formatHead(stock, ticker, news):
    df_2=get_NYT(stock)
    df_1 = get_FM(ticker)
    df_final = pd.concat([df_1, df_2], ignore_index=True, sort=False)
    today = date.today()
    today_H = []
    i = 0
    num = 0
    headL_d = []
    for x in df_final['Date']:
        if x == today:
            if stock in df_final['Headline'][i].lower() or ticker.lower() in df_final['Headline'][i].lower() or (stock == "google" and "alphabet" in df_final['Headline'][i].lower()):
                headL_d.append(df_final['Headline'][i].lower())
                num = num + 1
        i = i +1

    col_num = 0
    for x in news:
        col_num = col_num + 1
    col_num = col_num -2
    col2 = []
    for x in range(col_num):
        col2.append("top" + str(x + 1))

        if x < num  :
            sent =analize_sentiment( headL_d[x])
        else:
            sent = int(0)

        today_H.append(sent)

    last = []
    last.append(today_H)
    df_d = pd.DataFrame(last, columns = col2)
    return df_d


# ### Get the model input from DB

def getInput(stock):
    cursor = conn.cursor()
    query = "select * from "+ stock
    cursor.execute(query)
    msg = cursor.fetchall()
    cursor.close()
    return msg


# ## Train Model
# ### Return the prediction for the day ( 0 or 1)

def predictD(df_d,  news, ticker):
    all_train = copy.deepcopy(news)
    
    all_train = all_train.drop(['Date', 'Label'], axis=1)
    for column in all_train:
        all_train[column] = all_train[column].apply(analize_sentiment)


    weighted_All = XGBClassifier(scale_pos_weight = getPW[ticker.lower()])
    weighted_All.fit(all_train, news['Label'])

    y_d2 = weighted_All.predict(df_d)
    
    return y_d2


# ### Insert's Prediction into DB

def insertP(ticker, utc, y_d2, accuracy):
    utc = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    r = requests.post('http://35.247.73.118:6023/post', json={"ticker": ticker, "date":utc,"prediction":y_d2,"confidence":0, "accuracy":accuracy})
    r.status_code


def get_pst_time():
    date_format="%Y-%m-%d %H:%M:%S"
    date = datetime.now(tz=pytz.utc)
    date = date.astimezone(timezone('US/Pacific'))
    pstDateTime=date.strftime(date_format)
    return pstDateTime
# ## Run to get predictions:

def main():
    for x in allS:
        ticker = x
        stock = allS[x]
        train_270 = True
        saved_H = getInput(stock)
        saved_H = makeDF(saved_H)
        if train_270 == True:
            news = get270(saved_H)
        else:
            news = saved_H
        num_column = (len(news.columns))

        train_date = news['Date'][(int(len(news) * .7))]
        year = train_date[0:4]
        month = train_date[5:7]
        day = train_date[8:10]

        test_date =  news['Date'][(int(len(news) * .7)-1)]

        tst_day =  test_date[8:10]
        tst_month = test_date[5:7]
        tst_year =test_date[0:4]

        # day, month, year
        train = get_train_news(int(day), int(month), int(year), news)
        test = get_test_news(int(tst_day), int(tst_month), int(tst_year), news)

        accuracy = getAccuracy(train, test, ticker)

        df = formatHead(stock, ticker, news)
        prediction = predictD(df, news,  ticker)
    
        now = get_pst_time()
        insertP(ticker, now, prediction, accuracy )





main()

