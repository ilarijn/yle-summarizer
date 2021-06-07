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
  const [expanded, setExpanded] = useState(false)

  const summarize = async () => {
    const textContent = parseHtml(news.content)
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
          onClick={async () => {
            summarize()
            setExpanded(!expanded)
          }}
        >
          <Row>
            <Col xs={12} className="text-left">
              <Card.Title className="news-title">
                {expanded ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-caret-down-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                  </svg>
                )}{" "}
                {news.title}
              </Card.Title>
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
                            dangerouslySetInnerHTML={{ __html: news.content }}
                          />
                        )
                    else if (showSummary) return <Spinner animation="border" />
                    else
                      return (
                        <div
                          className="full-text"
                          dangerouslySetInnerHTML={{ __html: news.content }}
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
