from flask_restful import Resource

class Account(Resource):
    def get(self):
        return {
            'account': ['Marcus','1/1/1950',12345]
        }
