from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from forum.ForumManager import ForumManager

app = Flask(__name__)
api = Api(app)

forumManager = ForumManager()

class Conversation(Resource):
    def get(self):
        json_data = request.get_json(force=True)
        conversation_id = json_data['conversation_id']
        return forumManager.getConversation(conversation_id)

api.add_resource(Conversation, '/forum')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)