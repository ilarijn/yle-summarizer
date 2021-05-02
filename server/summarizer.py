import libvoikko

lemmatizer = libvoikko.Voikko(u"fi")


def lemmatize(word):
    lemmatized = lemmatizer.analyze(word)[0]
    return lemmatized['BASEFORM']
