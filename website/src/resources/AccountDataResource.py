# Account Data Resource

from flask import Flask
from flask_restful import Resource, Api
#from flask_restful import Api
#import AccountController

app = Flask(__name__)
api = Api(app)

class Account(Resource):
    def get(self):
        return {
            'account': ['Marcus','1/1/1950',12345]
        }

#api.add_resource(AccountController, '/')
api.add_resource(Account, '/')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)