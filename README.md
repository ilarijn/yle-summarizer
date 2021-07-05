## yle-summarizer

![badge](https://github.com/ilarijn/yle-summarizer/actions/workflows/main.yaml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Flask backend serving automatically generated summaries of news articles from the Finnish language feed of [Yle](https://yle.fi/uutiset/rss) to a React app running at http://yle-summarizer.herokuapp.com/

#### Running locally with Docker
```
docker run -p 80:80 ilarijn/yle-summarizer
```
Navigate to `http://localhost:80` and you are ready to go.

### Summarization

For generating summaries, I have implemented [Nenkova & Vanderwende's SumBasic](https://www.cs.bgu.ac.il/~elhadad/nlp09/sumbasic.pdf). I took inspiration from [the implementation of Hardik Vala](https://github.com/hardik-vala/sum-basic), but modified the base logic to only select sentences containing the current most probable word as per the original description of the algorithm. In addition, sentences are reordered in the final summary according to their original order of occurrence.
