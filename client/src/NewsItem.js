import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { postText } from "./axios/feeds"
import { stripHtml } from "./utils/parsing"
import { useState } from "react"

const NewsItem = ({ news }) => {
  const [summary, setSummary] = useState(null)

  const textContent = stripHtml(news.content)

  const summarize = async (text) => {
    console.log(text)
    if (!summary) {
      const response = await postText(text)
      setSummary(response.data)
    }
  }

  return (
    <Accordion className="mb-2 feed-item">
      <Card border="secondary" style={{ borderWidth: 1 }}>
        <Accordion.Toggle
          as={Button}
          variant="text"
          eventKey="0"
          onClick={async () => summarize(textContent)}
        >
          <Row>
            <Col xs={12} className="text-left">
              <Card.Title className="news-title">{news.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted news-title">
                {news.pubDate}
              </Card.Subtitle>
            </Col>
          </Row>
          <Accordion.Collapse eventKey="0">
            <Row>
              <Col xs={12} className="text-left">
                <Card.Text className="pt-2">
                  {summary ? (
                    <div className="full-text">{summary}</div>
                  ) : (
                    <Spinner animation="border" />
                  )}
                </Card.Text>
              </Col>
            </Row>
          </Accordion.Collapse>
        </Accordion.Toggle>
      </Card>
    </Accordion>
  )
}

export default NewsItem
