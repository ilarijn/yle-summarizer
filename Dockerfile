FROM python:3.6.12-alpine

RUN apk add build-base
RUN apk add --update npm

COPY ./requirements.txt /
RUN pip3 install -r /requirements.txt
RUN python -m nltk.downloader punkt
RUN python -m nltk.downloader stopwords

COPY . /app
WORKDIR /app

RUN npm run-script build

EXPOSE 80

ENTRYPOINT ["./gunicorn.sh"]