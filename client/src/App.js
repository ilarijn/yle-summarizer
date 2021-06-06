import { useState, useEffect } from "react"
import "./App.css"
import { getFeed } from "./axios/feeds"
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

  return (
    <div>
      <h1>Ylen uutiset</h1>
      <br />
      {newsItems.map((item, index) => (
        <NewsItem news={item} index={index} />
      ))}
    </div>
  )
}

export default App
