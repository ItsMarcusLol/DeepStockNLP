"""
#######################################################################################################
# Name: TwitterUser class
# Purpose: This code will train AI based on the features generated from GenerateFeatures.py.
#     Input:
#           You need to provide the input feature files like:
#           training_labels.dat, training_features_matrix.dat, testing_labels.dat, testing_features_matrix.dat
#     Output:
#           You will see some evaluation result of AI models and AI model saved in the output directory
#
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
import matplotlib.pyplot as plt


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
####################################################################
#
# Importing files, creating training & testing features and labels
#
####################################################################
predictUsers = []
def appendToUsers(predictThis):
    for i in predictThis:
        predictUsers.append(i.user_id)

####################################################################
#
# Configuring plot appearance and labels
#
####################################################################
def plot_confusion_matrix(cm, title='Confusion matrix', cmap=plt.cm.BuPu):
    plt.imshow(cm, interpolation='nearest', cmap=cmap)
    plt.title(title)
    plt.colorbar()
    tick_marks = np.arange(2)
    plt.xticks(tick_marks, ["Spammer", "Non-Spammer"], rotation=45)
    plt.yticks(tick_marks, ["Spammer", "Non-Spammer"])
    plt.tight_layout()
    plt.ylabel('True label')
    plt.xlabel('Predicted label')

####################################################################
#
# Building, testing and evaluating various Machine Learning models.
#
####################################################################
def select_classifier(algo, label, AImodel, AIResult):
    model = algo
    model.fit(training_features, training_labels)
    expected = testing_labels
    predicted = model.predict(testing_features)
    fh = open(AIResult, "w")
    count = 0
    for predict in predicted:
        count+=1
        if(predict == 0):
            print(predictUsers[count - 1] + " is a spammer (that is label 0)" + ", and expected " + str(expected[count-1]))
        else:
            print(predictUsers[count - 1] + " is not a spammer (that is label 1)"+ ", and expected " + str(expected[count-1]))

    print("----------------------------------------------------")
    print("|               Classification Report              |")
    print("----------------------------------------------------")
    print(metrics.classification_report(expected, predicted))
    print("")

    print("----------------------------------------------------")
    print("|                  Confusion Matrix                |")
    print("----------------------------------------------------")
    print(metrics.confusion_matrix(expected, predicted))
    print("")

    cm_list = metrics.confusion_matrix(expected, predicted).tolist()
    list_total = float(sum(sum(x) for x in cm_list))

    print("----------------------------------------------------")
    print("|           False Positives and Negatives          |")
    print("----------------------------------------------------")
    print ("False Positive: ", cm_list[1][0] / list_total)
    print("")
    print ("False Negative: ", cm_list[0][1] / list_total)
    print("")


    fh.write("----------------------------------------------------")
    fh.write("\n")
    fh.write("|               Classification Report              |")
    fh.write("\n")
    fh.write("----------------------------------------------------")
    fh.write("\n")
    fh.write(metrics.classification_report(expected, predicted))
    fh.write("\n")
    fh.write("")
    fh.write("\n")

    fh.write("----------------------------------------------------")
    fh.write("\n")
    fh.write("|                  Confusion Matrix                |")
    fh.write("\n")
    fh.write("----------------------------------------------------")
    fh.write("\n")
    fh.write(str(metrics.confusion_matrix(expected, predicted)))
    fh.write("\n")
    fh.write("")
    fh.write("\n")

    fh.write("----------------------------------------------------")
    fh.write("\n")
    fh.write("|           False Positives and Negatives          |")
    fh.write("\n")
    fh.write("----------------------------------------------------")
    fh.write("\n")
    fh.write ("False Positive: " +  str(cm_list[1][0] / list_total))
    fh.write("\n")
    fh.write("")
    fh.write("\n")
    fh.write ("False Negative: " + str(cm_list[0][1] / list_total))
    fh.write("\n")
    fh.write("")
    fh.write("\n")

    fh.close()
    # now saving model
    pickle.dump(model, open(AImodel, 'wb'))

    plt.figure()
    plot_confusion_matrix(metrics.confusion_matrix(expected, predicted), label)
    plt.show()

#------------------------arguments------------------------------#
#Shows one example to user                                      #
#---------------------------------------------------------------#
def printExample():
    print("\nHere is one example you can run this program: ")
    print("python "+sys.argv[0] + " --TrainL ../data/Features/training_labels.dat --TrainF ../data/Features/training_features_matrix.dat --TestL ../data/Features/testing_labels.dat --TestF ../data/Features/testing_features_matrix.dat --out ../result/AI_result")

#------------------------arguments------------------------------#
#Shows help to the users                                        #
#---------------------------------------------------------------#
parser = argparse.ArgumentParser()

parser._optionals.title = "Arguments"
parser.add_argument('--TrainL', dest='trainLabel',
        default = '',    # default empty!
        help = 'path for training labels')
parser.add_argument('--TrainF', dest='trainFeature',
        default = '',    # default empty!
        help = 'path for training features')
parser.add_argument('--TestL', dest='testLabel',
        default = '',    # default empty!
        help = 'path for testing labels')
parser.add_argument('--TestF', dest='testFeature',
        default = '',    # default empty!
        help = 'path for testing features')

parser.add_argument('--out', dest='output_path',
        default = '',    # default empty!
        help = 'Output directory path to save your AI model and results')


if len(sys.argv) < 5:
    parser.print_help(sys.stderr)
    printExample()
    sys.exit(1)

options = parser.parse_args()
trainLabel = options.trainLabel
trainFeature = options.trainFeature
testLabel = options.testLabel
testFeature = options.testFeature

dirOut = options.output_path

try:
    os.system("mkdir "+dirOut)
except:
    print("the output directory has been created")


# now we are going to load the features
print("loading features ... ")
training_labels = pickle.load(open(trainLabel, "rb"))
training_features = pickle.load(open(trainFeature, "rb"))
testing_labels = pickle.load(open(testLabel, "rb"))
testing_features = pickle.load(open(testFeature, "rb"))
# this is just alternative for python2 pickle, not useful here
#u = pickle._Unpickler(open("training_features_matrix.dat", "rb"))
#u.encoding = 'latin1'
#training_features = u.load()

# this part is still hard coded, not a good idea but to save time, we just leave it as it is
testing_legit = import_user_data("../data/Testing_data/legitimate_users1.txt", "../data/Testing_data/legitimate_users_tweets.txt")
testing_spammers = import_user_data("../data/Testing_data/spammers1.txt", "../data/Testing_data/spammers_tweets.txt")

print(testing_legit)
appendToUsers(testing_legit)
appendToUsers(testing_spammers)

print("Done, now explore machine learning models ...")
# Naive Bias
select_classifier(GaussianNB(), "Naive Bias Classifier", dirOut+"/NB.model", dirOut+"/NB.performance")

# SVM
select_classifier(svm.SVC(), "SVM Classifier",dirOut+"/SVM.model", dirOut+"/SVM.performance")

# ADA Boost
select_classifier(AdaBoostClassifier(DecisionTreeClassifier(max_depth=1), algorithm="SAMME", n_estimators=90), "ADA Boost Classifier", dirOut+"/Ada.model", dirOut+"/Ada.performance")

# Random Forest
select_classifier(RandomForestClassifier(n_estimators=150), "Random Forest Classifier", dirOut+"/RF.model", dirOut+"/RF.performance")
