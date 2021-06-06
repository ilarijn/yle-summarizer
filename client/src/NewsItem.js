import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { postText } from "./axios/feeds"
import { stripHtml } from "./utils/summarizer"
import { useState } from "react"

const NewsItem = ({ news, index }) => {
  const [summary, setSummary] = useState(null)

  const textContent = stripHtml(news.content)

  const summarize = async (text) => {
    console.log("summarizing")
    const response = await postText(text)
    console.log(response)
    setSummary(response.data)
  }

  return (
    <Accordion className="mb-2" key={index}>
      <Card>
        <Accordion.Toggle
          as={Button}
          variant="text"
          eventKey="0"
          onClick={() => summarize(textContent)}
        >
          <Row>
            <Col xs={12} className="text-left">
              <Card.Title>{news.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {news.pubDate}
              </Card.Subtitle>
            </Col>
          </Row>
          <Accordion.Collapse eventKey="0">
            <Row>
              <Col xs={12} className="text-left">
                <Card.Text className="pt-2">
                  {summary ? (
                    <Spinner animation="border" />
                  ) : (
                    <p className="fullText">{summary}</p>
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
