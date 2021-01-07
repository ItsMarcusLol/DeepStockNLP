from flask_restful import Resource
from flask import jsonify, request
from forum.ForumManager import ForumManager

forumManager = ForumManager()

class Conversation(Resource):
    def get(self):
        json_data = request.get_json(force=True)
        conversation_id = json_data['conversation_id']
        return forumManager.getConversation(conversation_id)