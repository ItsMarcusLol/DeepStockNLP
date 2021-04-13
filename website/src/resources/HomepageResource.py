from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from homepage.HomepageManager import HomepageManager

app = Flask(__name__)
api = Api(app)

homepageManager = HomepageManager()

class Homepage(Resource):
    def get(self):
        symbol = request.args.get('symbol')
        return homepageManager.get_headlines(symbol)

class HomepageCurrent(Resource):
    def get(self):
        return homepageManager.get_current()

class HomepageMessages(Resource):
    def get(self):
        return homepageManager.get_messages()

api.add_resource(Homepage, '/homepage/headlines')
api.add_resource(HomepageCurrent, '/homepage/current')
api.add_resource(HomepageMessages, '/homepage/messages')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)