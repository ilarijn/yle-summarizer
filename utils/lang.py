
from nltk.corpus import stopwords
from nltk.stem.snowball import SnowballStemmer
from nltk.tokenize import word_tokenize, sent_tokenize
from collections import Counter
from functools import reduce
import codecs
import operator

# nltk imports for Heroku in nltk.txt
# nltk.download("punkt")
# nltk.download("corpus")


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

    sentences = sent_tokenize(text)

    print(sentences)

    words_sentences = [word_tokenize(s.lower())
                       for s in sentences]

    stemmed_tokens = [[stemmer.stem(word) for word in sentence if word not in stop_words]
                      for sentence in words_sentences]

    # print(stemmed_tokens)

    return stemmed_tokens


def summarize(text, length):

    processed_text = preprocess(text)

    # Token occurrences
    c = Counter()
    for sent in processed_text:
        c += Counter(sent)

    # print(c)

    # Total number of tokens
    N = float(sum(c.values()))

    probs = {w: cnt / N for w, cnt in c.items()}

    print(c)

    sentences = sent_tokenize(text)

    # print(sentences)
    # print(probs)

    summary = []

    while len(sentences) > 0 and wordcount(summary) < length:

        max_prob, max_sent = 0.0, None

        for i, sent in enumerate(sentences):

            prob = reduce(lambda x, y: x + y,
                          [probs[w] for w in processed_text[i]])

            # print(processed_text[i])
            # print(sent)

            max_word = max(probs.items(), key=operator.itemgetter(1))[0]
            stemmed_sent = [stemmer.stem(w) for w in word_tokenize(sent)]

            if max_prob < prob and max_word in stemmed_sent:
                max_prob, max_sent = prob, sent
                # print(max_word)
                # print(sent)

        print(max_word)
        print(max_sent)
        summary.append(max_sent)
        sentences.remove(max_sent)
        stemmed_max = [stemmer.stem(w.lower()) for w in word_tokenize(
            max_sent) if w.lower() not in stop_words]

        for w in stemmed_max:
            probs[w] = probs[w] ** 2

    # c = Counter(sentences_words)
    # print(c)
    # frequencies = {word: sentences_words.count(
    #    word) for word in sentences_words}
    # sorted_frequencies = dict(sorted(
    #     frequencies.items(), key=lambda item: item[1], reverse=True))
    return ' '.join(summary)


prepro = "Lue ensin teksti kokonaan ja tutustu tekstin sanastoon. Tämän jälkeen voit käydä tekstin läpi lyhyissä jaksoissa ja vastata monivalintatehtäviin. Lukutekstin."

with codecs.open('test.txt', encoding='utf-8') as file:
    data = file.read().replace('\n', '')
    summary = str(summarize(data, 100))
    f = open('res.txt', 'w')
    f.write(summary)
    f.close()

# counted = summarize(prepro, 100)
# print(counted)
