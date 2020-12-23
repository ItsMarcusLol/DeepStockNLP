# DeepStockNLP

Explore few other github for your reference: 
https://github.com/achillesrasquinha/bulbea
https://github.com/shirosaidev/stocksight
https://github.com/happynoom/DeepTrade
https://github.com/yumoxu/stocknet-dataset


### About the Project:
    For our capstone project we are creating a stock prediction tool website. On the website, a user will the current prices of stocks, our prediction for the day of the stock. We also, will have a chat feature where users can chat about their own predictions or thoughts, this is for the users benefeit and ours, because we can also use this information for our model. 
    We are predicting whether a stock price will go up or down based off of headlines and the last ten days of prices from that stock. We are doing this with headlines from the NYTimes archived headlines, and from Twitter we are collecting tweets from users that have tweeted about stocks. Also from twitter we are collecting headlines, from the more news networks that are more business or finacially driven headlines. 


### Built With:
XGBoost
NYTimes API
Twitter API


## Setup:

1. Install Anaconda- this will help not having to install other 

2. Get Data: Before you run the model, you will need to get the data ( you can skip to Running the Model if you would like to run the data we already have provided in the Data folder) 
   - Get the NYT Archived Headlines:
     - Get a NYT Api Key 
     - In the “NYT_Archived_Headlines”
       - Insert your API key into the variable your_key
       - In the variable months, add how many months you want
       - In the variable years insert which years you want
       - Run and this will output a csv with (date, headline)
     - Get the YFinace Prices:
     
     - Get Twitter Data: 

3. Clean Data: 
   - Prices_csv- this takes the csv and gets the last 10 days of prices for each date, and the open and close price
     - add your price csv into the "prices" varible 
     - Run- output will be a new csv with the ( date, open, close, (the last ten days of (close - open))
   - Clean_Headlines- this takes Headlines that you have collected and matches them based on date to the price csv
     - In main put your price csv in to the prices varible
     - In main put your headline csv into the "news" varible 
     - Run, this ouputs a csv with ( date, (close - open), (last ten days of (close - open), ( column for each headline for that date ))  

4. Run Model: 
   - Will need to install:
     - textblob 
     - XGBoost
   - Put the clean csv in the vews varible
   - Run- will ouput the Accuracies

 




