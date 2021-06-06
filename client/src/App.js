import "./App.css"
import { useState, useEffect } from "react"
import { getFeed } from "./axios/feeds"
import NewsItem from "./NewsItem"

const App = () => {
  const [newsItems, setNewsItems] = useState([])

  useEffect(() => {
    async function fetchFeed() {
      const response = await getFeed()
      setNewsItems(response.items)
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
