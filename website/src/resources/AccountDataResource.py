# Account Data Resource
from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from account.AccountManager import AccountManager

app = Flask(__name__)
api = Api(app)

accountManager = AccountManager()

class Login(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        username = json_data['username']
        password = json_data['password']
        return accountManager.login(username, password)

class Account(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        username = json_data['username']
        password = json_data['password']
        return accountManager.create_account(username, password)

api.add_resource(Login, '/login')
api.add_resource(Account, '/account')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)