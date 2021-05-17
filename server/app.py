from flask_cors import CORS, cross_origin
from flask import Flask, render_template, send_from_directory, request, jsonify, make_response
from nltk.tokenize import sent_tokenize
from utils.langtools import stem, tokenize_sentences, tokenize_words, count_frequencies
import os

app = Flask(__name__, static_folder='../client/build', static_url_path='')
cors = CORS(app)


@app.route('/api', methods=["GET"])
@cross_origin()
def Welcome():
    return "Welcome to the API!!!"

@app.route('/api/stem', methods=["POST"])
@cross_origin()
def handle():
    request_json = request.get_json()
    print(request_json)
    data = request_json.get('data')
    stemmedWord = stem(data)
    print(stemmedWord)
    return stemmedWord

@app.route('/api/post_text', methods=["POST"])
@cross_origin()
def handle_post_text():
    request_json = request.get_json()
    text = request_json.get('data')
    word_tokenized = tokenize_words(text)
    stemmed_words = [stem(word) for word in word_tokenized]
    frequencies = count_frequencies(stemmed_words)
    print(frequencies)
    return ""


@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')


if __name__ == '__main__':
    app.run()
