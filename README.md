# DeepStockNLP

### About the Project:
For our capstone project we are creating a stock prediction tool website that uses machine learning to create the predictions. On our website, the user will have access to features that will help them on their decsion on stock making. Depending on whether or not the user has created an account with us, their access to some features might be limited. The features that both registered and unregistered users have are that they can view the daily price of the stock, historical prices, our predictions, the headlines we used to make our predicitons, and a search feature. As a registered user, you will be able to have access to our forum where you will be able to interact with other users and share your opinions on how a stock will move. 

For our predictions, we are predicting whether a stock price will go up or down based off of the most recent 270 days worth of headlines and the prices from that stock. We are doing this with headlines from the NYTimes archived headlines and prices from Yahoo Finance. We use this data in our model and it will generate either a 1 if it predicts the stock will go up or a 0 if it predicts a stock will go down. We will then share this information on our website for our users to know and use as they wish.

### Progress and Results as of **<strong>April 2021</strong>**:
We have chosen XGBoost with Sentiment Analysis as our main model to make our predictions. From all the other models we trained, this model had the best accuracy. We're still training our models on archieved headlines and prices, but now we're doing it only on the most recent 270 days worth of data as that gave us the best results, which our results ranged depending on what stock you looked at was 62% - 67%. We also weren't able to get Twitter data to work with our model and now is only focusing on archieved headlines and historical prices.

### Progress and Results as of **<strong>December 2020</strong>**:
Right now we're focusing on using XGBoost as our model and testing the model with archived news headlines from NYT and prices we got from Yahoo Finance. We tried weighing the model more towards dates that had more headlines and our most recent resutls were around 0.61. Recently we were looking to integrate Twitter headlines as well as headlines we got from twitter to try to test a different model.
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
- Sentiment Analysis
#### Data: 
- NYTimes API
- Yahoo Finance

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
___

### Running The Model
   Daily-Prediction.py: This script trains the XGBoost XGBClassifier (binary logistic rergressive model) on the last 270 days of headlines, that are related to a particular stock. This script then makes an API request to the NYT API and Finacial Modeling Prep API for recent headlines. These headlines are then filtered through and checked that they were published for the current day and that the headline is relevant to the particular stock. These are then used to make the prediction for the current day.
   
   1. sudo apt install python3-venv python3-pip
   2. Create a python enviornment 
      1. pip3 install virtualenv 
      2. python3 -m venv virtual-env
      3. source virtual-env/bin/activate
  3. Install Anaconda (if you already installed Anaconda from above, you can skip this step)
  4. Create an anaconda enviornment 
      - conda create --name my_env python=3
      - conda activate my_env
  6. List of other installs:
      - conda install pandas
      - conda install -c intel scikit-learn
      - conda install -c conda-forge textblob
      - conda install -c conda-forge xgboost
      - conda install -c anaconda requests
  7. Download an input for the model. Right now in our Data/20-21-csv are our most recent inputs and are named after the stocks ticker and the date they were updated
  8. Change path of saved_H to where the csv input is saved
  9. Change the variables "ticker" and "stock" to the corresponding ticker and stock of your input
  10. Run by: **python3 Daily-Predictions.py**
      - You will see the Accuracy and the F1 score and the prediction at the bottom (1: increase, 0: decrease) 
___

### Running The Website
  
  #### Docker Compose Backend

  1. Make sure docker is installed properly 
  2. Clone/pull latest version of the repository for github
  3. docker-compose build 
    - Should take a second
    - There should be a few warnings
  4. docker-compose up
    - To test if it's working
  5. docker-compose down
    - Wait for containers to be taken
  6. docker-compose up -d
  7. docker ps
  8. docker exec -it container_id sh  (the container_id is copied from the previous step's output next to TCPIP)
  9. mysql -u root -p
    - MarLee21!
  10. create the databases
    - create database accounts;
    - create database forum;
    - create database predictions;
    - create headlines; # not needed
  11. Add account data table
    - use accounts;
    - create table account_data(username varchar(20), user_id int, password varchar(60));
  12. Add forum data table
    - use forum;
    - create table chat_data(username varchar(20), text varchar(250));
  13. Add prediction table
    - use predictions;
    - create table prediction_data(ticker varchar(6), date datetime, prediction int, con int, acc int);
  14. Add all the headline tables  # This one is not needed
      - use headlines;
      - Then use the script called createTables.sql inside of Data/Headlines-DB/createTables.sql
      - Run command :  source createTables.sql;


  ### command used for website:
  #apt get update </br>
  #apt install docker </br>
  #apt  install docker-compose </br>
  #docker-compose build </br>
  #apt upgrade docker    # ??? </br>
 
  **Step 1:** follow this to install docker! https://linuxize.com/post/how-to-install-and-use-docker-on-ubuntu-20-04/
  **Step 2** docker-compose build, docker-compose up, docker-compose down, docker-compose up -d, docker ps, sudo docker exec -it 5f50399ea93e sh, and then follow the command instructions above
  
  
  
