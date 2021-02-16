from flask_restful import Resource
from flask import jsonify, request
from homepage.HomepageManager import HomepageManager

homepageManager = HomepageManager()

class HomepageController(Resource):
    def get(self):
        return homepageManager.get_homepage()