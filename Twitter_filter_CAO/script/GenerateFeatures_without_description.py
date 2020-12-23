"""
#######################################################################################################
# Name: TwitterUser class
# Purpose: This code will generate features from the twitter data.
#     Input:
#           You need to provide the training dataset like:
#           spammers.txt, spammers_tweets.txt, legitimate_users.txt,legitimate_users_tweets.txt
#     Output:
#           You will generate pickle format feature files like:
#           training_labels.dat, training_features_matrix.dat, testing_labels.dat, testing_features_matrix.dat
# Developed by: Dr. Renzhi Cao
# Developed on: 12/22/2020
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

#################################################################
#
# Imports data from text files, stores it into TwitterUser object
# and finally return a list TwitterUser objects.
#
#################################################################
def import_user_data(user_file, tweet_file):
    twitter_users = []
    with open(user_file) as f1:
        all_user_info = f1.readlines()
        for user_info in all_user_info:
            twitter_user_ob = TwitterUser(re.split(r'\t+', user_info)[0], re.split(r'\t+', user_info)[1],
                                          re.split(r'\t+', user_info)[2], float(re.split(r'\t+', user_info)[3]),
                                          float(re.split(r'\t+', user_info)[4]), float(re.split(r'\t+', user_info)[5]),
                                          float(re.split(r'\t+', user_info)[6]), float(re.split(r'\t+', user_info)[7][:-1]))
            twitter_users.append(twitter_user_ob)

    with open(tweet_file) as f2:
        all_user_tweets = f2.readlines()
        for line_tweets_info in all_user_tweets:
            for twitter_user in twitter_users:
                if twitter_user.user_id == re.split(r'\t+', line_tweets_info)[0]:
                    tweets = twitter_user.tweets
                    tweets.append(re.split(r'\t+', line_tweets_info)[2])
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

####################################################################
#
# Importing files, creating training & testing features and labels
#
####################################################################
predictUsers = []
def appendToUsers(predictThis):
    for i in predictThis:
        predictUsers.append(i.user_id)

#------------------------arguments------------------------------#
#Shows one example to user                                      #
#---------------------------------------------------------------#
def printExample():
    print("\nHere is one example you can run this program: ")
    print("python "+sys.argv[0] + " --spm ../data/Training_data/spammers.txt --spmTW ../data/Training_data/spammers_tweets.txt --leg ../data/Training_data/legitimate_users.txt --legTW ../data/Training_data/legitimate_users_tweets.txt --testspm ../data/Testing_data/spammers1.txt --testspmTW ../data/Testing_data/spammers_tweets.txt --testleg ../data/Testing_data/legitimate_users1.txt --testlegTW ../data/Testing_data/legitimate_users_tweets.txt --out ../data/Features_without_description")

#------------------------arguments------------------------------#
#Shows help to the users                                        #
#---------------------------------------------------------------#
parser = argparse.ArgumentParser()

parser._optionals.title = "Arguments"
parser.add_argument('--spm', dest='spammers',
        default = '',    # default empty!
        help = 'path for spammers information like ID, number of followers, etc')
parser.add_argument('--spmTW', dest='spammers_tweets',
        default = '',    # default empty!
        help = 'path for spammers tweets')
parser.add_argument('--leg', dest='legitimate_users',
        default = '',    # default empty!
        help = 'path for legitimate users information like ID, number of followers, etc')
parser.add_argument('--legTW', dest='legitimate_users_tweets',
        default = '',    # default empty!
        help = 'path for legitimate user tweets')

parser.add_argument('--testspm', dest='Testspammers',
        default = '',    # default empty!
        help = 'for testing, path for spammers information like ID, number of followers, etc')
parser.add_argument('--testspmTW', dest='Testspammers_tweets',
        default = '',    # default empty!
        help = 'for testing, path for spammers tweets')
parser.add_argument('--testleg', dest='Testlegitimate_users',
        default = '',    # default empty!
        help = 'for testing, path for legitimate users information like ID, number of followers, etc')
parser.add_argument('--testlegTW', dest='Testlegitimate_users_tweets',
        default = '',    # default empty!
        help = 'for testing, path for legitimate user tweets')

parser.add_argument('--out', dest='output_path',
        default = '',    # default empty!
        help = 'Output directory path to save your generated features')



if len(sys.argv) < 9:
    parser.print_help(sys.stderr)
    printExample()
    sys.exit(1)

options = parser.parse_args()
spm = options.spammers
spmTW = options.spammers_tweets
leg = options.legitimate_users
legTW = options.legitimate_users_tweets
testspm = options.Testspammers
testspmTW = options.Testspammers_tweets
testleg = options.Testlegitimate_users
testlegTW = options.Testlegitimate_users_tweets
dirOut = options.output_path

try:
    os.system("mkdir "+dirOut)
except:
    print("the output directory has been created")


# now we are going to generate features and save them in the output directory
training_spammers = import_user_data(spm, spmTW)
calculate_features(training_spammers)
training_spammers_feature_matrix = build_feature_matrix(training_spammers)

training_legit = import_user_data(leg, legTW)
calculate_features(training_legit)
training_legit_feature_matrix = build_feature_matrix(training_legit)

# saving the generated features
training_labels = [0] * len(training_spammers_feature_matrix) + [1] * len(training_legit_feature_matrix) #0 spammers, 1 - legit
with open(dirOut+'/training_labels.dat', 'wb') as outfile:
    pickle.dump(training_labels, outfile)

training_features = np.concatenate((training_spammers_feature_matrix, training_legit_feature_matrix), axis=0)
with open(dirOut+'/training_features_matrix.dat', 'wb') as outfile:
    pickle.dump(training_features, outfile)

# now processing testing data
testing_spammers = import_user_data(testspm, testspmTW)
calculate_features(testing_spammers)
testing_spammers_feature_matrix = build_feature_matrix(testing_spammers)
appendToUsers(testing_spammers)
testing_legit = import_user_data(testleg, testlegTW)
calculate_features(testing_legit)
testing_legit_feature_matrix = build_feature_matrix(testing_legit)
appendToUsers(testing_legit)
testing_labels = [0] * len(testing_spammers_feature_matrix) + [1] * len(testing_legit_feature_matrix)
with open(dirOut+'/testing_labels.dat', 'wb') as outfile:
    pickle.dump(testing_labels, outfile)

testing_features = np.concatenate((testing_spammers_feature_matrix, testing_legit_feature_matrix), axis=0)
with open(dirOut+'/testing_features_matrix.dat', 'wb') as outfile:
    pickle.dump(testing_features, outfile)
