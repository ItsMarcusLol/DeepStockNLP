
"""
#######################################################################################################
# Name: TwitterUser class
# Purpose: This class will be used to store property of a twitter user.
# Developed by: Dr. Renzhi Cao
# Developed on: 12/22/2020
# Modified by:
# Change log:
# Reference: https://github.com/ayush0824/Classifier-Approach-Towards-Twitter-Spam-Detection
#######################################################################################################
"""
class TwitterUser:

    def __init__(self, idd = 0, created = "0000-00-00", collected="0000-00-00", followings = 0,
                 followers = 0, tweets_num = 0, length_name = 0, length_description = None):
        self._user_id = idd
        self._created_at = created
        self._collected_at = collected
        self._numb_followings = followings
        self._numb_followers = followers
        self._numb_tweets = tweets_num
        self._name_length = length_name
        self._description_length = length_description
        self._tweets = []

        self._tfidf = []
        self._ratio_follower_following = 0.0
        self._count_http = 0
        self._count_at = 0

    @property
    def user_id(self):
        return self._user_id

    @user_id.setter
    def user_id(self, value):
        self._user_id = value

    @property
    def created_at(self):
        return self._created_at

    @created_at.setter
    def created_at(self, value):
        self._created_at = value

    @property
    def collected_at(self):
        return self._collected_at

    @collected_at.setter
    def collected_at(self, value):
        self._collected_at = value

    @property
    def numb_followings(self):
        return self._numb_followings

    @numb_followings.setter
    def numb_followings(self, value):
        self._numb_followings = value

    @property
    def numb_followers(self):
        return self._numb_followers

    @numb_followers.setter
    def numb_followers(self, value):
        self._numb_followers = value

    @property
    def numb_tweets(self):
        return self._numb_tweets

    @numb_tweets.setter
    def numb_tweets(self, value):
        self._numb_tweets = value

    @property
    def name_length(self):
        return self._name_length

    @name_length.setter
    def name_length(self, value):
        self._name_length = value

    @property
    def description_length(self):
        return self._description_length

    @description_length.setter
    def description_length(self, value):
        self._description_length = value

    @property
    def tweets(self):
        return self._tweets

    @tweets.setter
    def tweets(self, value):
        self._tweets = value

    @property
    def ratio_follower_following(self):
        return self._ratio_follower_following

    @ratio_follower_following.setter
    def ratio_follower_following(self, value):
        self._ratio_follower_following = value

    @property
    def count_http(self):
        return self._count_http

    @count_http.setter
    def count_http(self, value):
        self._count_http = value

    @property
    def count_at(self):
        return self._count_at

    @count_at.setter
    def count_at(self, value):
        self._count_at = value

    @property
    def tfidf(self):
        return self._tfidf

    @tfidf.setter
    def tfidf(self, value):
        self._tfidf = value

    def __str__(self):
        return str(self._user_id)+", number of followings: "+str(self._numb_followings)+", number of followers: "+str(self._numb_followers) + ", total number of tweets: " + str(self._numb_tweets) + ", count_http: " + str(self._count_http) + ", count_at: " + str(self._count_at) + ", ratio follower following: " + str(self._ratio_follower_following) + ", tfidf value: " + str(self.tfidf)
