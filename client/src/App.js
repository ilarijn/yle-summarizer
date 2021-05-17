import { useState, useEffect } from 'react'
import './App.css'
import { getFeed, getStem, postText } from './axios/feeds'
import { guessLanguage, stripHtml, tokenizeFinnish, splitSentences, stemFinnish, stemWord, normalizeFinnish } from './utils/summarizer'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {

  const [feedItems, setfeedItems] = useState([])

  useEffect(() => {
    async function fetchFeed() {
      const response = await getFeed()
      const result = response.items.map(item => ({ ...item, show: false, summarize: false, summary: "" }))
      setfeedItems(result)
    }
    fetchFeed()
  }, [])

  const showFullText = (id) => {
    const modifiedfeedItems = feedItems.map(item => (
      item.guid === id && item.show === false ? { ...item, show: true } : { ...item, show: false, summarize: false }
    ))
    setfeedItems(modifiedfeedItems)
  }

  const summarize = (id) => {
    const target = feedItems.find(item => item.guid === id)
    const summary = stripHtml(target.content)
    const modifiedfeedItems = feedItems.map(item => (
      item.guid === id && item.show === true ?
        { ...item, show: true, summarize: true, summary: summary }
        :
        { ...item, show: false, summarize: false }
    ))

    let sentences = splitSentences(summary)
    let tokenizedSentences = []
    sentences.forEach(sentence => tokenizedSentences.push(tokenizeFinnish(sentence)))

    tokenizedSentences.forEach(sentence => {
      sentence.forEach(word => {
        console.log(stemFinnish(word))
      })
    })

    setfeedItems(modifiedfeedItems)
  }

  const stemTest = async (word) => {
    const stemmed = await getStem(word)
    console.log(stemmed.data)
  }

  const postTextFromFeed = async (id) => {
    const target = feedItems.find(item => item.guid === id)
    const text = stripHtml(target.content)
    const res = await postText(text)
    console.log(res)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Ylen pääutiset
        </p>
      </header>
      <div className="App-body">
        {feedItems && feedItems.map(item => item.show ?
          (<div className="feedItemShow" key={item.guid}>
            <Button variant="primary" size="sm" className="mr-2" onClick={() => showFullText(item.guid)}>
              Piilota</Button>
            <Button variant="success" size="sm" className="mr-2" onClick={async () => await postTextFromFeed(item.guid)}>
              Tiivistä</Button>
            <br />
            <br />
            <i>{item.pubDate}</i>
            <br />
            {item.title}
            {item.summarize && <p className="fullText" dangerouslySetInnerHTML={{ __html: item.summary }}></p>}
            {!item.summarize && <p className="fullText" dangerouslySetInnerHTML={{ __html: item.content }}></p>}
          </div>)
          :
          (<p className="feedItem" key={item.guid}><Button variant="primary" size="sm" className="mr-2" onClick={() => showFullText(item.guid)}>
            Näytä</Button>{item.title}</p>)
        )}
      </div>
    </div >
  )
}

export default App
