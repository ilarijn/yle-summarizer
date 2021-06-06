import { useState, useEffect } from "react"
import "./App.css"
import { getFeed, getStem, postText } from "./axios/feeds"
import {
  guessLanguage,
  stripHtml,
  tokenizeFinnish,
  splitSentences,
  stemFinnish,
  stemWord,
  normalizeFinnish
} from "./utils/summarizer"
import Button from "react-bootstrap/Button"
import "bootstrap/dist/css/bootstrap.min.css"
import NewsItem from "./NewsItem"

const App = () => {
  const [feedItems, setfeedItems] = useState([])

  useEffect(() => {
    async function fetchFeed() {
      const response = await getFeed()
      const result = response.items.map((item) => ({
        ...item,
        show: false,
        summarize: false,
        summary: ""
      }))
      setfeedItems(result)
    }
    fetchFeed()
  }, [])

  const showFullText = (id) => {
    const modifiedfeedItems = feedItems.map((item) =>
      item.guid === id && item.show === false
        ? { ...item, show: true }
        : { ...item, show: false, summarize: false }
    )
    setfeedItems(modifiedfeedItems)
  }

  const summarize = (id) => {
    const targetText = feedItems.find((item) => item.guid === id)
    const summary = stripHtml(targetText.content)
    const modifiedfeedItems = feedItems.map((item) =>
      item.guid === id && item.show === true
        ? { ...item, show: true, summarize: true, summary: summary }
        : { ...item, show: false, summarize: false }
    )
    setfeedItems(modifiedfeedItems)
  }

  const stemTest = async (word) => {
    const stemmed = await getStem(word)
    console.log(stemmed.data)
  }

  const postTextFromFeed = async (id) => {
    const targetText = feedItems.find((item) => item.guid === id)
    const text = stripHtml(targetText.content)
    const res = await postText(text)
    console.log(res)
  }
  return (
    <div>
      <h1>Ylen uutiset</h1>
      <br />
      {feedItems.map(NewsItem)}
    </div>
  )
}

export default App
