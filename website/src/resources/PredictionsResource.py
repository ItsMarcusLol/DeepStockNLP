from flask import Flask, jsonify, request
from flask_restful import Api, Resource
from predictions.PredictionsManager import PredictionsManager

app = Flask(__name__)
api = Api(app)

predictions_manager = PredictionsManager()

class Predictions(Resource):
    def post(self):
        json_data = request.get_json(force=True)
        ticker = json_data['ticker']
        date = json_data['date']
        prediction = json_data['prediction']
        con = json_data['confidence']
        acc = json_data['accuracy']
        return predictions_manager.post_predictions(ticker,date,prediction,con,acc)
    
    def delete(self):
        json_data = request.get_json(force=True)
        ticker = json_data['ticker']
        return predictions_manager.delete_predictions(ticker)

    def get(self):
        symbol = request.args.get('symbol')
        return predictions_manager.get_predictions(symbol)


api.add_resource(Predictions, '/predictions')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80, debug=True)