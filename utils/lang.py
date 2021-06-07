from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer
from nltk.tokenize import word_tokenize, sent_tokenize
from functools import reduce
import operator

stemmer = SnowballStemmer("finnish")

stop_words = stopwords.words("finnish")


def wordcount(text):

    if type(text) is list:
        n = 0
        for sentence in text:
            n += len(sentence.split())
        return n

    return len(text.split())


def preprocess(text):

    stop_words.append(".")
    stop_words.append(",")
    stop_words.append("–")
    stop_words.append("/")
    stop_words.append(":")

    sentences = sent_tokenize(text)

    words_sentences = [word_tokenize(s.lower())
                       for s in sentences]

    stemmed_tokens = [[stemmer.stem(word) for word in sentence if word not in stop_words]
                      for sentence in words_sentences]

    return stemmed_tokens


def summarize(text, length):

    processed_text = preprocess(text)

    frequencies = {}

    # Token frequencies
    for sentence in processed_text:
        for word in sentence:
            if word not in frequencies:
                frequencies[word] = 1.0
            else:
                frequencies[word] += 1.0

    # Total number of tokens
    N = float(sum(frequencies.values()))

    probabilities = {word: freq / N for word,
                     freq in sorted(frequencies.items(), key=lambda item: item[1], reverse=True)}

    sentences = sent_tokenize(text)

    summary = {}

    while len(sentences) > 0 and sum(wordcount(sent) for sent in summary.keys()) < length:

        max_prob, max_sentence = 0.0, None
        max_word = max(probabilities.items(), key=operator.itemgetter(1))[0]

        for i, sent in enumerate(sentences):

            prob = reduce(lambda x, y: x + y,
                          [probabilities[w] for w in processed_text[i]])

            stemmed_sentence = [stemmer.stem(w) for w in word_tokenize(sent)]

            # Highest scoring sentence must also contain current most probable word
            if max_prob < prob and max_word in stemmed_sentence:
                max_prob, max_sentence = prob, [sent, i]

        summary[max_sentence[0]] = max_sentence[1]
        sentences.remove(max_sentence[0])
        stemmed_max = [stemmer.stem(w.lower()) for w in word_tokenize(
            max_sentence[0]) if w.lower() not in stop_words]

        for w in stemmed_max:
            probabilities[w] = probabilities[w] ** 2

    # Reorder sentences according to original order of occurrence
    result = [sentence for sentence, index in sorted(
        summary.items(), key=lambda item: item[1])]

    return " ".join(result)
