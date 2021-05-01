#!/usr/bin/env python
# coding: utf-8

# ### Get the packages
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



# ## Want to Train and Test on last 270 days put true
train_270 = True

def analize_sentiment(tweet):
    if str(tweet) == "nan":
        analysis = TextBlob((str(tweet)))
        return analysis.polarity
    else:
        analysis = TextBlob((str(tweet)))
        if analysis.polarity == 0.0:
            return (analysis.polarity + .05)
    return analysis.polarity


# ### Get the path for the CSV and put it in here 


saved_H = pd.read_csv(r'C:/Users/dcard/Cap-Repo/DeepStockNLP/Data/20-21-csv/GOOGL-2021-input-4-26-21.csv')
ticker = "GOOGL"
stock = "google"


getPW = {'googl':60, 'tsla':20, 'aapl':0.75, 'amzn':50, 'ba':0, 'msft':7, 'dell':3, 'wmt':0, 'tgt': 0.948, 'F': 1.22}



col = []
for x in saved_H:
    col.append(x)
    
    


if train_270 == True: 
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
    
else:
    news = saved_H


# ### Get the train news and test news datasets


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


# ## Splits Data into Train and Test:


num_column = (len(news.columns))
# day, month, year

train_date = news['Date'][(int(len(news) * .7))]
year = train_date[0:4]
month = train_date[5:7]
day = train_date[8:10]

test_date =  news['Date'][(int(len(news) * .7)-1)]
 
tst_day =  test_date[8:10]
tst_month = test_date[5:7]
tst_year =test_date[0:4]


train_news = get_train_news(int(day), int(month), int(year), news)
test_news = get_test_news(int(tst_day), int(tst_month), int(tst_year), news)



train_news_list = []
for row in range (0, len(train_news.index)):
    train_news_list.append(' '.join(str(k) for k in train_news.iloc[row,12:num_column]))


# ### XG Boost/Sentiment Analysis

# ### Model- scaling positive weight:


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
print("1:",count)
print("0:",count0)
print(count - count0)
n = (count - count0 )
# scale_weight =((n + 9) // 10 * 10) 

# if scale_weight < 0:
#     scale_weight = 0;
scale_weight = count0/count



scale_weight = getPW[ticker.lower()]



weighted_XGB1 = XGBClassifier(scale_pos_weight = scale_weight)
weighted_XGB1.fit(train_sentiment_weight, train_news['Label'], sample_weight = weighted_data)
y_pred_weight1 = weighted_XGB1.predict(test_sentiment_weight)



# ##### All scores are printed out for comparison
print("Weighted Accuracy", accuracy_score(test_news['Label'], y_pred_weight1))
print("F1 weighted", f1_score(test_news['Label'], y_pred_weight1, average='weighted'))


# ## Get Headlines for the Day

def get_NYT():
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
            d = datetime.datetime.strptime(date, '%Y-%m-%d').date()
            
            NYT_Headlines.append(((stock, d , x['title'])))
    df_2 = pd.DataFrame(NYT_Headlines, columns = ["Ticker", "Date", "Headline"])
    return df_2
            




def parse_data(data):
    output = []
    for d in data:
        date = datetime.strptime(d['publishedDate'], '%Y-%m-%d  %H:%M:%S').date()
        output.append((d['symbol'],date,d['title']))
    return output




try:
    # For Python 3.0 and later
    from urllib.request import urlopen
except ImportError:
    # Fall back to Python 2's urllib2
    from urllib2 import urlopen




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



def get_FM(ticker):
    key2 = "f0448bd30a7028e245052fcf3caa0837"
    f_output = []

 
    url2 = ("https://financialmodelingprep.com/api/v3/stock_news?tickers="+ticker+"&apikey=" + key2)


    data = get_jsonparsed_data(url2)
    output = parse_data(data)
    df_1 = pd.DataFrame(output, columns = ["Ticker", "Date", "Headline"])
    return df_1






df_2=get_NYT()
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


all_train = copy.deepcopy(news)
all_train = all_train.drop(['Date', 'Label'], axis=1)
for column in all_train:
    all_train[column] = all_train[column].apply(analize_sentiment)



weighted_All = XGBClassifier(scale_pos_weight =scale_weight )
weighted_All.fit(all_train, news['Label'])

# ## Prediction for the day:
y_d2 = weighted_XGB1.predict(df_d)


def insertP():
    utc = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S")
    r = requests.post('http://104.196.230.228:80/post', json={"ticker": ticker, "date":utc,"prediction":y_d2,"confidence":0, "accuracy":accuracy_score(test_news['Label'], y_pred_weight1)})
    r.status_code


insertP()






