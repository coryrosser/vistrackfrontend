import React from 'react'
import {Row, Col, Form, ListGroup, Image, Button} from 'react-bootstrap'
import {} from 'recharts'
import styled from 'styled-components'

const Styles = styled.div`
    background: #ebf3f7;
    overflow: hidden;
    .title-row {
        width: 100%;
        margin-left: 0;
        background: #02c39a;
        height: 5vh;
        color: #f7f7f7;
    }
    .tracker-form {
        max-width: 75%;
        margin-left:auto;
        margin-right:auto;
    }
    .title-text {
        margin-left: auto;
        margin-right: auto;
        font-size: 2rem;
    }
    .form-col {
        background: #02c39a;
        height: 95vh;
        text-align: center;
        color: white;
    }
    .content-col {
        background:black;
        margin-left:0;
    }
    .preview-row {
        background: #ebf3f7;
        height: 50vh;
        border-bottom: #02c39a solid 2px;
    }
    .options-row {
        background: #ebf3f7;
        height: 45vh;
    }
`


class NewTracker extends React.Component {
    state={
        seriesInputs: [],
        seriesId: 0,
    }

    addSeriesInput = (num) => {
        this.setState(
            {seriesInputs: [...this.state.seriesInputs, `series${this.state.seriesId}`], 
            seriesId: this.state.seriesId + 1})
        this.renderInputs(this.state.seriesInputs)
    }
    renderInputs = (arr) => {
        arr.forEach(entry =>{
            return (
                <Form.Group controlId="formBasicSeries">
                <Form.Control
                placeholder="Enter Data" />
                </Form.Group>
            )
        })
    }

    render() {
        return (
            <Styles>
            <Row className='title-row'>
                <div className='title-text'>Create Your New Tracker</div>
            </Row>
            <Row >
                <Col 
                xs={3}
                className='form-col'>
                    <Form className='tracker-form'>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tracker Title</Form.Label>
                        <Form.Control
                        placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>X-Axis Title</Form.Label>
                        <Form.Control
                        placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                        placeholder="Enter email" />
                        </Form.Group>
                        
                        {this.renderInputs(this.state.seriesInputs)}
                        <Button onClick={() => this.addSeriesInput()} />



                    </Form>
                </Col>
                <Col 
                xs={9}
                className='content-col'>
                    <Row className='preview-row'>
                        <div> Preview!</div>
                    </Row>
                    <Row className='options-row'>
                    <div>Options! </div>
                    </Row>
                </Col>
            </Row>
            </Styles>
        )
    }
}

export default NewTracker