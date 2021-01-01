from flask_restful import Resource
from flask import jsonify, request
from account.AccountManager import AccountManager

accountManager = AccountManager()

class Login(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        username = json_data['username']
        password = json_data['password']
        return jsonify(success=accountManager.login(username, password))

class Account(Resource):
    def get(self):
        json_data = request.get_json(force=True)
        id = json_data['id']
        id_type = json_data['type']
        if (id_type=='name'):
            return jsonify(accountManager.getAccountName(id))
        elif (id_type=='id'):
            return jsonify(accountManager.getAccountId(id))
        else:
            return jsonify(success=False)
    
    def post(self):
        json_data = request.get_json(force=True)
        username = json_data['username']
        password = json_data['password']
        return jsonify(accountManager.createAccount(username, password))