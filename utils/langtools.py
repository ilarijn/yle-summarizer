from nltk.stem.snowball import SnowballStemmer
from nltk.tokenize import word_tokenize, sent_tokenize

#nltk imports for Heroku in nltk.txt
#nltk.download('punkt')

stemmer = SnowballStemmer("finnish")


def stem(word):
    stemmed = stemmer.stem(word)
    return stemmed


def tokenize_sentences(text):
    tokenized = sent_tokenize(text)
    return tokenized


def tokenize_words(text):
    tokenized = word_tokenize(text)
    return tokenized


def count_frequencies(words):
    frequencies = {word: words.count(word) for word in words}
    sorted_frequencies = dict(sorted(
        frequencies.items(), key=lambda item: item[1], reverse=True))
    return sorted_frequencies
