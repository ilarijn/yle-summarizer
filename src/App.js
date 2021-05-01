import { useState, useEffect } from 'react'
import './App.css'
import { getFeed } from './axios/feeds'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {

  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchFeed() {
      const response = await getFeed()
      const result = response.items.map(item => ({ ...item, show: false }))
      setData(result)
    }
    fetchFeed()
  }, [])

  const showFull = (id) => {
    const modifiedData = data.map(item => (
      item.guid === id && item.show === false ? { ...item, show: true } : { ...item, show: false }
    ))
    setData(modifiedData)
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Ylen pääutiset
        </p>
      </header>
      <div className="App-body">
        {data && data.map(item => item.show ?
          (<div className="feedItemShow" key={item.guid}>
            <Button variant="primary" size="sm" className="mr-2" onClick={() => showFull(item.guid)}>
              Piilota</Button>
            <Button variant="success" size="sm" className="mr-2">
              Tiivistä</Button>
            <br />
            <br />
            <i>{item.pubDate}</i>
            <br />
            {item.title}
            <p className="fullText" dangerouslySetInnerHTML={{ __html: item.content }}></p>
          </div>)
          :
          (<p className="feedItem" key={item.guid}><Button variant="primary" size="sm" className="mr-2" onClick={() => showFull(item.guid)}>
            Näytä</Button>{item.title}</p>)
        )}
      </div>
    </div >
  )
}

export default App
