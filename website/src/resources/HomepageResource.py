from flask import Flask
from flask_restful import Api
from homepage.HomepageController import HomepageController

app = Flask(__name__)
api = Api(app)

api.add_resource(HomepageController, '/homepage')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)