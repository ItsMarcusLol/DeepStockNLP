from flask import Flask
from flask_restful import Api
from forum.ForumController import conversation

app = Flask(__name__)
api = Api(app)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)