"""
#######################################################################################################
# Name: TwitterUser class
# Purpose: This code will use AI for prediction.
# Attention: This script will load the CSV file without twitter description, later on for the new twitter CSV file, we may need to update this code
#     Input:
#           You need to provide the input CSV file which contains the features we need, like AmazonStockTweets.csv
#     Output:
#           There is an output file as prediction, one per row
#
# Developed by: Dr. Renzhi Cao
# Developed on: 12/23/2020
# Modified by:
# Change log:
# Reference: https://github.com/ayush0824/Classifier-Approach-Towards-Twitter-Spam-Detection
#######################################################################################################
"""
import re
import os.path
import numpy as np
import pickle
from sklearn.feature_extraction.text import TfidfVectorizer
from scipy.sparse import csr_matrix
from sklearn import metrics
from sklearn.naive_bayes import GaussianNB
from sklearn import svm
from sklearn.ensemble import RandomForestClassifier, AdaBoostClassifier
from sklearn.tree import DecisionTreeClassifier
from TwitterUser import TwitterUser
import argparse
import sys
import csv

#################################################################
#
# Imports data from csv file, stores it into TwitterUser object
# and finally return a list TwitterUser objects.
# Format:
# username, user_id (which is none), followers, following, date created, retweet author if it was a retweet,
# retweet author followers if retweet, retweet author following if it was retweet, number of retweets,
# number of favorites and the actual tweet text
#################################################################
def import_csv_data(csv_file):
    twitter_users = []
    with open(csv_file, newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',',quotechar='|')
        for row in spamreader:
            #print(row)
            if len(row) < 11:
                print("something is wrong for this row, is that empty? We have to skip it for now, but you need to double check here, the total number of outputs maybe different compared to your input")
                print(row)
                continue
            twitter_user_ob = TwitterUser(user_name = row[0], idd = row[1], followers = float(row[2]), followings = float(row[3]), created = row[4], length_name = len(row[0]))
            twitter_users.append(twitter_user_ob)
    # we now read the file again to get all tweets
    with open(csv_file, newline='') as csvfile:
        spamreader = csv.reader(csvfile, delimiter=',')
        for row in spamreader:
            if len(row) < 11:
                print("something is wrong for this row, is that empty? We have to skip now")
                print(row)
                continue
            for twitter_user in twitter_users:
                if twitter_user.user_name == row[0]:
                    tweets = twitter_user.tweets
                    #print(row[10])
                    tweets.append(row[10])
                    twitter_user.tweets = tweets

    return twitter_users


#################################################################
#
# Calculates various features derived from the existing data types
# of the TwitterUser object, and add those calculated features back
# to the object.
#
#################################################################
def calculate_features(twitter_users):
    for user in twitter_users:
        try:
            tfidf = TfidfVectorizer(min_df=1).fit_transform(user.tweets)
            pairwise_similarity = tfidf * tfidf.T
            user.tfidf = csr_matrix.mean(pairwise_similarity).item()
        except Exception:
            user.tfidf = 0.0
            pass

        if user.numb_followings > 0:
            user.ratio_follower_following = user.numb_followers / user.numb_followings
        else:
            user.ratio_follower_following = 0
        at_count = 0
        http_count = 0
        for tweet in user.tweets:
            at_count += tweet.count("@")
            http_count += tweet.count("http")
        user.count_at = at_count
        user.count_http = http_count

        # new feature, check percent of bot words. Reference: https://github.com/jubins/MachineLearning-Detecting-Twitter-Bots/blob/master/FinalProjectAndCode/BotDetection.py

        bag_of_words_bot = "bot|b0t|cannabis|tweet me|mishear|follow me|updates every|gorilla|yes_ofc|forget|expos|kill|clit|bbb|butt|fuck|XXX|sex|truthe|fake|anony|free|virus|funky|RNA|kuck|jargon|nerd|swag|jack|bang|bonsai|chick|prison|paper|pokem|xx|freak|ffd|dunia|clone|genie|bbb|ffd|onlyman|emoji|joke|troll|droop|free|every|wow|cheese|yeah|bio|magic|wizard|face".split('|')
        countBotWords = 0
        for k in bag_of_words_bot:
            for tweet in user.tweets:
                if k in tweet:
                    countBotWords=countBotWords+1
        if countBotWords > len(bag_of_words_bot):
            user.bot_word_percentage = 1
        else:
            user.bot_word_percentage = countBotWords / len(bag_of_words_bot)

####################################################################
#
# Converts the features into numpy arrray / matrix and normalizes it
#
####################################################################
def build_feature_matrix(twitter_users):
    features_matrix = []

    for user in twitter_users:
        features_matrix.append([user.bot_word_percentage, user.name_length,  user.count_http, user.count_at, user.ratio_follower_following, user.tfidf]) # let's try this idea without the length

    features_matrix_np = np.array(features_matrix)
    features_matrix_normalized = features_matrix_np / features_matrix_np.max(axis=0)

    return features_matrix_normalized


#------------------------arguments------------------------------#
#Shows one example to user                                      #
#---------------------------------------------------------------#
def printExample():
    print("\nHere is one example you can run this program: ")
    print("python "+sys.argv[0] + " --AIModel ../models/NB_without_description.model --CSVFile ../data/AmazonStockTweets.csv --out ../result/AI_prediction_without_description")

#------------------------arguments------------------------------#
#Shows help to the users                                        #
#---------------------------------------------------------------#
parser = argparse.ArgumentParser()

parser._optionals.title = "Arguments"
parser.add_argument('--AIModel', dest='AIModel',
        default = '',    # default empty!
        help = 'path for the trained machine learning model')
parser.add_argument('--CSVFile', dest='CSVFile',
        default = '',    # default empty!
        help = 'path for input csv file containing tweet information')
parser.add_argument('--out', dest='output_path',
        default = '',    # default empty!
        help = 'Output directory for prediction. one per row, and 0 means that is a spammer, 1 means that is a good tweet')


if len(sys.argv) < 4:
    parser.print_help(sys.stderr)
    printExample()
    sys.exit(1)

options = parser.parse_args()
AIModel = options.AIModel
CSVFile = options.CSVFile

dir_output = options.output_path

try:
    os.system("mkdir "+dir_output)
except:
    print("output directory has been created")

# first we load the AI model
print("loading model ...")
model = pickle.load(open(AIModel, 'rb'))
# now we will load file and generate features
twitter_data = import_csv_data(CSVFile)
calculate_features(twitter_data)
twitter_feature_matrix = build_feature_matrix(twitter_data)

# save the feature file
with open(dir_output+'/twitter_data_features.dat', 'wb') as outfile:
    pickle.dump(twitter_feature_matrix, outfile)

# make predictions
AIResult = dir_output + "/prediction.txt"
predicted = model.predict(twitter_feature_matrix)
fh = open(AIResult, "w")
for predict in predicted:
    fh.write(str(predict))
    fh.write("\n")
fh.close()
