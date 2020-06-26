import React from 'react'
import {Row, Col, ListGroup, Card} from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
    background: #ebf3f7;
    .quick-view-row {
        margin-top: 2vh;
        margin-bottom: 2.4vh;
    }
    .title-row {
        width: 100%;
        margin-left: 0;
        background: #02c39a;
        height: 5vh;
        color: #f7f7f7;
    }
    .title-text {
        margin-left: auto;
        margin-right: auto;
        font-size: 2rem;
    }
    .control-panel {
        margin-top: 3vh;
        border: black solid 1px;
        width: 100%;
        height: 50vh;

    }
    .control-panel-row {
        height: 63.7vh;
    }
`

const Dashboard = props => {
    return (
        <Styles>
            <Row className='title-row'>
                <div className='title-text'>Recent Trackers</div>
            </Row>
            <Row className='quick-view-row justify-content-center'>
                <Col/>
                <Col>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
                </Card>
                </Col>
                <Col>
                <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                </Card.Body>
                </Card>
                </Col>
                <Col/>
            </Row>
            <Row className='title-row'>
                <div className='title-text'>Control Center</div>
            </Row>
            <Row className='control-panel-row'>
                <Col />
                    <Col xs={5}>
                        <div className='control-panel'>
                            Control Panel Here
                        </div>
                    </Col>
                    <Col xs={5}>
                        <div className='control-panel'>
                            Inspect Panel Here
                        </div>
                    </Col>
                <Col />
            </Row>
        </Styles>
    )
}

export default Dashboard