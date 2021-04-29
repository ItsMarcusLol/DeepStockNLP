# DeepStockNLP

### About the Project:
For our capstone project we are creating a stock prediction tool website. On the website, a user will the current prices of stocks, our prediction for the day of the stock. We also, will have a chat feature where users can chat about their own predictions or thoughts, this is for the users benefeit and ours, because we can also use this information for our model. We are predicting whether a stock price will go up or down based off of headlines and the last ten days of prices from that stock. We are doing this with headlines from the NYTimes archived headlines, and from Twitter we are collecting tweets from users that have tweeted about stocks. Also from twitter we are collecting headlines, from the more news networks that are more business or finacially driven headlines. 

### Current Progress and Results:
Right now we're focusing on using XGBoost as our model and testing the model with archived news headlines from NYT and prices we got from Yahoo Finance. We tried weighing the model more towards dates that had more headlines and our most recent resutls were around 0.61. Recently we were looking to integrate Twitter headlines as well as headlines we got from twitter to try to test a different model and Dr. Cao helped us with that using Naive Bayes with results around 0.7.

___
### Other sources:
<p>Explore few other github for your reference:<br>
https://github.com/achillesrasquinha/bulbea<br>
https://github.com/shirosaidev/stocksight<br>
https://github.com/happynoom/DeepTrade<br>
https://github.com/yumoxu/stocknet-dataset</p>

___

### Project Built With:
#### Models:
- XGBoost
- Random Forest
- Naive Bayes
#### Data: 
- NYTimes API
- Twitter API

___

### Setup:
**Install [Anaconda](https://docs.anaconda.com/anaconda/install/)** - this will help so that you don't have to install other packages. You will also need to install:
- [textblob](https://textblob.readthedocs.io/en/dev/install.html) 
- [XGBoost](https://xgboost.readthedocs.io/en/latest/build.html)
- yfinance using:
  > **pip:** $ pip install yfinance --upgrade --no-cache-dir\
  > **conda:** $ conda install -c ranaroussi yfinance

### Getting the data
Before you can run the model, you will need to get the data (you can skip this and go to Running the Model if you would like to, we have already provided some data in the Data folder)
   - Get the NYT Archived Headlines:
     - Get a NYT Api Key 
     - In the “NYT_Archived_Headlines”
       - Insert your API key into the variable "your_key"
       - In the variable months, add how many months you want
       - In the variable years insert which years you want
       - Run and this will output a csv with (date, headline)
  - Get the YFinace Prices:
       - Make sure you have the latest version of python
       - Get the ticker of the stocks you want the prices of
       - For individual stocks:
          - Set up a varible name and make it equal to "yf.Ticker("Ticker name")" (Example: msft = yf.Ticker("MSFT"))
          - To get the stock information do variable name.info (Example: msft.info)
          - To get the price history do variable name.history(period="valid intervals") <p>valid intervals: 1m,2m,5m,15m,30m,60m,90m,1h,1d,5d,1wk,1mo,3mo</p>
          - For more actions look at the documentation in the code historicalData-yfinance.ipynb
      - For many stocks at once:
          - Do "data = yf.download(" name of all the stock tickers here seperated by a space", start=start date, end=end date)"
          - To get the data of one specific stock do "data['action you want']['stock ticker']" (Example: data['Close']['GOOGL'] will give all the closing prices for google from the start date to the end date)
          - The actions for this is the same as the actions for the individual stocks.
      - For more details check out this [blog](https://aroussi.com/post/python-yahoo-finance)
  - Get Twitter Data: 
      - Set up a MySQL database to store the tweets
      - In "GetTwitterData.py" set the Twitter API keys to the proper credentials as well as the database connection
      - Do the same in "AddStock.py"
      - Create a table in the database List_Of_Stocks with fields of name and tablename
      - To add a stock to look at do "python AddStock.py {stock name} {preferred name of table}"
      - Now run GetTwitterData and the tweets will continuously be added to the database and corresponding table

### Clean Data
   - Prices_csv- this takes the csv and gets the last 10 days of prices for each date, and the open and close price
     - add your price csv into the "prices" varible 
     - Run- output will be a new csv with the ( date, open, close, (the last ten days of (close - open))
   - Clean_Headlines- this takes Headlines that you have collected and matches them based on date to the price csv
     - In main put your price csv in to the prices varible
     - In main put your headline csv into the "news" varible 
     - Run, this ouputs a csv with ( date, (close - open), (last ten days of (close - open), ( column for each headline for that date ))  

### Running The Model
   - Daily-Prediction.py: This script trains the XGBoost XGBClassifier (binary logistic rergressive model) on the last 270 days of headlines, that are related to a particular stock. This script then makes an API request to the NYT API and Finacial Modeling Prep API for recent headlines. These headlines are then filtered through and checked that they were published for the current day and that the headline is relevant to the particular stock. These are then used to make the prediction for the current day.

         1. sudo apt install python3-venv python3-pip
         2. Create a python enviornment 
                  - pip3 install virtualenv 
                  - python3 -m venv virtual-env
                  - source virtual-env/bin/activate
         3. Install Anaconda
         4. List of other installs:
                  - conda install pandas
                  - conda install -c intel scikit-learn
                  - conda install -c conda-forge textblob
                  - conda install -c conda-forge xgboost
                  - conda install -c anaconda requests
         5. Download a input for the model. Right now in our Data/20-21-csv are our most recent inputs and are named after the stocks ticker and the date they were updated
         6. Change path of saved_H to where the csv input is saved
         7. Change the variables "ticker" and "stock" to the corresponding ticker and stock of your input
         8. Run by: python3 Daily-Predictions.py
                  - You will see the Accuracy and the F1 score and the prediction at the bottom (1: increase, 0: decrease) 
