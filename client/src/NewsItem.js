import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"

const NewsItem = (news, index) => {
  return (
    <Accordion className="mb-2" key={index}>
      <Card>
        <Accordion.Toggle as={Button} variant="text" eventKey="0">
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
                  <p
                    className="fullText"
                    dangerouslySetInnerHTML={{ __html: news.content }}
                  ></p>
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
