from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from DatabaseManager import DatabaseManager

dbManager = DatabaseManager()

class Login(Resource):
	def post(self):
		json_data = request.get_json(force=True)
		table_name = json_data['table_name']
        fields = json_data['fields']
        values = json_data['values']
		dbManager.fetch(table_name, fields, values)
		