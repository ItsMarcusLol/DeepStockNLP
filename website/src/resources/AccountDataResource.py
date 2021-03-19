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
        return jsonify(success=accountManager.login(username, password))

class Account(Resource):
    # TODO make sure to not return password in tuple
    def get(self):
        json_data = request.get_json(force=True)
        id = json_data['id']
        id_type = json_data['type']
        if (id_type=='name'):
            return jsonify(accountManager.get_account_name(id))
        elif (id_type=='id'):
            return jsonify(accountManager.get_account_id(id))
        else:
            return jsonify(success=False)
    
    # TODO add error handling to check to see if json is right. Return proper error code
    def post(self):
        json_data = request.get_json(force=True)
        username = json_data['username']
        password = json_data['password']
        return jsonify(accountManager.create_account(username, password))

api.add_resource(Login, '/login')
api.add_resource(Account, '/account')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)