from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from forum.ForumManager import ForumManager, MessageManager

app = Flask(__name__)
api = Api(app)

forumManager = ForumManager()
messageManager = MessageManager()

class Conversation(Resource):
    def get(self):
        json_data = request.get_json(force=True)
        conversation_id = json_data['conversation_id']
        return forumManager.getConversation(conversation_id)
    
    # TODO start a message thread
    def post(self):
        json_data = request.get_json(force=True)
        user_id = json_data['user_id']
        message = json_data['message']
        return forumManager.create_conversation(user_id, message)

class Message(Resource):
    def get(self):
        json_data = request.get_json(force=True)
        conversation_id = json_data['conversation_id']
        user_id = json_data['user_id']
        count = json_data['count']
        return messageManager.getMessage(conversation_id, user_id, count)

    # Adds message to a thread
    def post(self):
        json_data = request.get_json(force=True)
        conversation_id = json_data['conversation_id']
        user_id = json_data['user_id']
        message = json_data['message']
        return messageManager.create_messsage(conversation_id, user_id, message)

api.add_resource(Conversation, '/forum')
api.add_resource(Message, '/forum/message')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)