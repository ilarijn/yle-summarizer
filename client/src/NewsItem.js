import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Spinner from "react-bootstrap/Spinner"
import { postText } from "./axios/feeds"
import { parseHtml } from "./utils/parsing"
import { useState } from "react"

const NewsItem = ({ news }) => {
  const [summary, setSummary] = useState(null)
  const [showSummary, setShowSummary] = useState(true)
  const [fullText, setFullText] = useState(news.content)

  const summarize = async () => {
    const textContent = parseHtml(news.content)
    console.log(textContent)
    if (textContent === "") {
      console.log("was an empty string")
      setSummary("Katso koko teksti.")
    }
    if (!summary) {
      const response = await postText(textContent)
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
          onClick={async () => summarize()}
        >
          <Row>
            <Col xs={12} className="text-left">
              <Card.Title className="news-title">{news.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted news-title">
                {news.pubDate} <br />
              </Card.Subtitle>
            </Col>
          </Row>
          <Accordion.Collapse eventKey="0">
            <Row>
              <Col xs={12} className="text-left">
                <Button
                  variant="dark"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowSummary(!showSummary)
                  }}
                >
                  {showSummary ? "Näytä koko teksti" : "Näytä tiivistelmä"}
                </Button>
                <Card.Text className="pt-2">
                  {(() => {
                    if (summary)
                      if (showSummary)
                        return <div className="full-text">{summary}</div>
                      else
                        return (
                          <div
                            className="full-text"
                            dangerouslySetInnerHTML={{ __html: fullText }}
                          />
                        )
                    else if (showSummary) return <Spinner animation="border" />
                    else
                      return (
                        <div
                          className="full-text"
                          dangerouslySetInnerHTML={{ __html: fullText }}
                        />
                      )
                  })()}
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
