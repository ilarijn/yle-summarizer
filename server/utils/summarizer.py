from libvoikko import Voikko

#Voikko.setLibrarySearchPath("/Voikko")

lemmatizer = Voikko(u"fi")

def lemmatize(word):
    lemmatized = lemmatizer.analyze(word)[0]
    return lemmatized['BASEFORM']
