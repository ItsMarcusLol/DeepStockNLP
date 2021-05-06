from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from forum.ForumManager import ChatManager

app = Flask(__name__)
api = Api(app)

chatManager = ChatManager()

class Chat(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        username = json_data['username']
        text = json_data['text']
        return chatManager.saveChat(username, text)

    def get(self): 
        return chatManager.getChat()
    
    def delete(self):
        return chatManager.clear()

api.add_resource(Chat, '/forum')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)