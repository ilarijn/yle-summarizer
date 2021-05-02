const { Language } = require('@nlpjs/language')
const { NormalizerFi, StemmerFi, TokenizerFi } = require('@nlpjs/lang-fi')

const normalizer = new NormalizerFi()
const tokenizer = new TokenizerFi()
const stemmer = new StemmerFi()

export const normalizeFinnish = (text) => {
    return normalizer.normalize(text)
}

export const stemFinnish = (tokenArray) => {
    return stemmer.stem(tokenArray)
}

export const stemWord = (word) => {
    return stemmer.stemWord(word)
}

export const tokenizeFinnish = (text) => {
    return tokenizer.tokenize(text)
}

export const guessLanguage = (text) => {
    const language = new Language()
    const allowList = ['en', 'fi']
    const guess = language.guess(text, allowList)
    return JSON.stringify(guess[0].language)
}

export const splitSentences = (text) => {
    return text.match(/[^\.!\?]+[\.!\?]+/g)
}

export const stripHtml = (html) => {
    var divElement = document.createElement("div");
    divElement.innerHTML = html;
    return divElement.textContent || divElement.innerText || "";
}