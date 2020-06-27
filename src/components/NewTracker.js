import React from 'react'
import {Row, Col, Form, ListGroup, Image, Button, ButtonGroup} from 'react-bootstrap'
import {} from 'recharts'
import styled from 'styled-components'
import UserChart from './UserChart'

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
        overflow-y: scroll;
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
        Xaxis: '',
        seriesVal1: '',
        seriesName1: '',
        seriesVal2: '',
        seriesName2: '',
        seriesVal3: '',
        seriesName3: '',
        seriesVal4: '',
        seriesName4: '',
        seriesVal5: '',
        seriesName5: '',
        seriesVal6: '',
        seriesName6: '',
    }
    Tracker = [
        {
            name: this.state.seriesName1,
            [this.state.Xaxis]: this.state.seriesVal1

        },
        {
            name: this.state.seriesName2,
            [this.state.Xaxis]: this.state.seriesVal2

        },
        {
            name: this.state.seriesName3,
            [this.state.Xaxis]: this.state.seriesVal3

        },
        {
            name: this.state.seriesName4,
            [this.state.Xaxis]: this.state.seriesVal4

        },
        {
            name: this.state.seriesName5,
            [this.state.Xaxis]: this.state.seriesVal5

        },
        {
            name: this.state.seriesName6,
            [this.state.Xaxis]: this.state.seriesVal6

        }
    ]

    submitTrackerForm = (e, obj) => {
        console.log(e.target)
        debugger
    }
    handleFileUpload = (file) => {
        this.setState({file: file})
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
                    <Form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        this.submitTrackerForm(e, this.state)}}
                    className='tracker-form'>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tracker Title</Form.Label>
                        <Form.Control
                        placeholder="Enter Title" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>X-Axis Title</Form.Label>
                        <Form.Control
                            value={this.state.Xaxis}
                            onChange={(e) => this.setState({Xaxis: e.target.value})}
                        placeholder="Enter Title" />
                        </Form.Group>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formBasicEmail">
                        <Form.Label>X-Axis Labels</Form.Label>
                        <Form.Control
                            value={this.state.seriesName1}
                            onChange={(e) => this.setState({seriesName1: e.target.value})}
                        placeholder="Enter Label" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicEmail">
                        <Form.Label>X-Axis Data Values</Form.Label>
                        <Form.Control
                            value={this.state.seriesVal1}
                            onChange={(e) => this.setState({seriesVal1: e.target.value})}
                        placeholder="Enter Data" />
                        </Form.Group>

                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Control
                            value={this.state.seriesName2}
                            onChange={(e) => this.setState({seriesName2: e.target.value})}
                            placeholder="Enter Label" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Control
                            value={this.state.seriesVal2}
                            onChange={(e) => this.setState({seriesVal2: e.target.value})}
                            placeholder="Enter Data" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>

                            <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Control
                            value={this.state.seriesName3}
                            onChange={(e) => this.setState({seriesName3: e.target.value})}
                            placeholder="Enter Label" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Control
                            value={this.state.seriesVal3}
                            onChange={(e) => this.setState({seriesVal3: e.target.value})}
                            placeholder="Enter Data" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Control
                            value={this.state.seriesName4}
                            onChange={(e) => this.setState({seriesName4: e.target.value})}
                            placeholder="Enter Label" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Control
                            value={this.state.seriesVal4}
                            onChange={(e) => this.setState({seriesVal4: e.target.value})}
                            placeholder="Enter Data" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Control
                            value={this.state.seriesName5}
                            onChange={(e) => this.setState({seriesName5: e.target.value})}
                            placeholder="Enter Label" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Control
                            value={this.state.seriesVal5}
                            onChange={(e) => this.setState({seriesVal5: e.target.value})}
                            placeholder="Enter Data" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Control
                            value={this.state.seriesName6}
                            onChange={(e) => this.setState({seriesName6: e.target.value})}
                            placeholder="Enter Label" />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formBasicEmail">
                            <Form.Control
                            value={this.state.seriesVal6}
                            onChange={(e) => this.setState({seriesVal6: e.target.value})}
                            placeholder="Enter Data" />
                            </Form.Group>
                        </Form.Row>
                        {/* <Button 
                        size='sm'
                        onClick={(e) => this.addSeriesInput(e)} >
                        Add Field
                        </Button> */}
                        <Row>
                        <Button 
                        type='submit'
                        className='ml-auto mr-auto mt-4'>
                            Create Tracker
                        </Button>
                        </Row>
                        </Form>
                        <Form className='tracker-form mt-5'>
                            <Form.Group>
                                <Form.Control
                                className='btn btn-sm btn-primary'
                                type='file'
                                onChange={e => {
                                    e.preventDefault()
                                    this.handleFileUpload(e)
                                }}
                                />
                            </Form.Group>
                        </Form>

                </Col>
                <Col 
                xs={9}
                className='content-col'>
                    <Row className='preview-row'>
                        <UserChart file={this.state.file} />
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