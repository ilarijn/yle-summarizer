from flask_cors import CORS, cross_origin
from flask import Flask, send_from_directory, request
from services.lang import summarize


app = Flask(__name__, static_folder='client/build', static_url_path='')
cors = CORS(app)


@app.route('/api/summarize', methods=["POST"])
@cross_origin()
def handle():
    request_json = request.get_json()
    text = request_json.get('data')
    summary = summarize(text, 80)
    return summary


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run(host='0.0.0.0')
