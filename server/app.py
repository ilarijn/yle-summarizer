from flask import Flask, request
from flask_cors import CORS, cross_origin
from utils.summarizer import lemmatize

app = Flask(__name__, static_url_path='')
cors = CORS(app)

@app.route('/api', methods=['GET'])
@cross_origin()
def default():
    return "Try something like this:<br><br>POST http://localhost:5000/api<br>Content-Type: application/json<br><br>{<br>\"data\": \"saunassa\"<br>}"

@app.route('/api', methods=['POST'])
@cross_origin()
def handle_post():
        content = request.get_json()
        lemma = lemmatize(content['data'])
        print(lemma)
        return lemma

if __name__ == '__main__':
    app.run()
