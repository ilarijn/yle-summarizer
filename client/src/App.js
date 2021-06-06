import { useState, useEffect } from "react"
import "./App.css"
import { getFeed, getStem, postText, summarize } from "./axios/feeds"
import { stripHtml } from "./utils/summarizer"
import NewsItem from "./NewsItem"

const App = () => {
  const [newsItems, setnewsItems] = useState([])

  useEffect(() => {
    async function fetchFeed() {
      const response = await getFeed()
      const result = response.items.map((item) => ({
        ...item,
        show: false,
        summarize: false,
        summary: ""
      }))
      setnewsItems(result)
    }
    fetchFeed()
  }, [])

  const showFullText = (id) => {
    const modifiednewsItems = newsItems.map((item) =>
      item.guid === id && item.show === false
        ? { ...item, show: true }
        : { ...item, show: false, summarize: false }
    )
    setnewsItems(modifiednewsItems)
  }

  const stemTest = async (word) => {
    const stemmed = await getStem(word)
    console.log(stemmed.data)
  }

  const handleSummarize = async (text) => {
    console.log("summarizing")
    const processed = stripHtml(text)
    const summary = await summarize(processed)
    console.log(summary)
  }

  const postTextFromFeed = async (id) => {
    const targetText = newsItems.find((item) => item.guid === id)
    const text = stripHtml(targetText.content)
    const res = await postText(text)
    console.log(res)
  }
  return (
    <div>
      <h1>Ylen uutiset</h1>
      <br />
      {newsItems.map((item, index) => (
        <NewsItem news={item} index={index} summarize={handleSummarize} />
      ))}
    </div>
  )
}

export default App
