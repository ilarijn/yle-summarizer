from flask import Flask
from flask_cors import CORS, cross_origin
from summarizer import lemmatize

app = Flask(__name__, static_url_path='')
cors = CORS(app)


@app.route('/api', methods=['GET'])
@cross_origin()
def Welcome():
    return "Welcome to the API!!!"


@app.route('/api', methods=['POST'])
@cross_origin()
def handle_request():
    print(request.data)


if __name__ == '__main__':
    app.run()
