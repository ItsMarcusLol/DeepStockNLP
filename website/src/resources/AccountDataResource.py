# Account Data Resource

from flask import Flask
from flask_restful import Api
from account.AccountController import Login, Account

app = Flask(__name__)
api = Api(app)

api.add_resource(Login, '/login')
api.add_resource(Account, '/account')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)