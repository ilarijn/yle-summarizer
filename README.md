### yle-summarizer

![badge](https://github.com/ilarijn/yle-summarizer/actions/workflows/main.yaml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Flask backend serving automatically generated summaries of news articles from the Finnish feed of [Yle](https://yle.fi/uutiset/rss) to a React app running at http://yle-summarizer.herokuapp.com/

#### Summarization

For generating summaries, I have implemented [Nenkova & Vanderwende's SumBasic](https://www.cs.bgu.ac.il/~elhadad/nlp09/sumbasic.pdf). I took inspiration from the implementation of [Hardik Vala](https://github.com/hardik-vala/sum-basic), modifying it to select only sentences containing the most probably word as per the original description of the algorithm in addition to reordering sentences according to their original order of occurrence.
