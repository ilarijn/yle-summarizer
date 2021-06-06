from flask_cors import CORS, cross_origin
from flask import Flask, render_template, send_from_directory, request, jsonify, make_response
from nltk.tokenize import sent_tokenize
from utils.lang import summarize
import os

app = Flask(__name__, static_folder='client/build', static_url_path='')
cors = CORS(app)


@app.route('/api', methods=["GET"])
@cross_origin()
def Welcome():
    return "Welcome to the API!!!"


@app.route('/api/summarize', methods=["POST"])
@cross_origin()
def handle():
    request_json = request.get_json()
    text = request_json.get('data')
    print(text)
    summary = summarize(text, 50)
    print(summary)
    return summary


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
