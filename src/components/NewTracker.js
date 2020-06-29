import React from 'react'
import {Row, Col, Form, Button, Dropdown} from 'react-bootstrap'
import styled from 'styled-components'
import UserChart from './UserChart'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

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
    .option-col {
        border: black solid 1px;
        margin-left: auto;
        margin-right:auto;
    }
`


class NewTracker extends React.Component {
    state={
        seriesInputs: [],
        categories: [],
        data: [],
        type: 'bar',
        title: '',
        name: '',
        value: '',
        Xaxis: '',
        colors: [],
        color: '#fff'
    }

    handleChangeComplete = (e) => {
        console.log(e)
        this.setState({
            colors: [...this.state.colors, e.hex]
        }, 
        console.log(this.state.colors))
    }


    handleInput = (name, value) => {
        this.setState({
            categories: [...this.state.categories, name],
            data: [...this.state.data, value],
            name: '',
            value: '',
        })
    }
    handleTitle = (title) => {
        this.setState({title: title})
    }

    submitTrackerForm = () => {
        let obj = {
            dataset: 
            {
                title: this.state.title,
            chart_type: this.state.type
            },
            name: [...this.state.categories],
            data: [...this.state.data]
            
        }
        fetch('http://localhost:3000/datasets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(dataset => {
            console.log(dataset)
            this.props.addDataset(dataset)
            this.props.history.push('/dashboard')
        })
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
                        this.submitTrackerForm()}}
                    className='tracker-form'>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>Tracker Title</Form.Label>
                        <Form.Control
                        value={this.state.title}
                        onChange={(e) => {
                            console.log(e.target.value)
                            this.handleTitle(e.target.value)
                        }}
                        placeholder="Enter Title" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label>X-Axis Title</Form.Label>
                        <Form.Control
                            name={this.state.Xaxis}
                            value={this.state.Xaxis}
                            onChange={(e) => this.setState({Xaxis: e.target.value})}
                        placeholder="Enter Title" />
                        </Form.Group>
                        <Form.Row>
                        <Form.Group as={Col} controlId="formBasicEmail">
                        <Form.Label>X-Axis Labels</Form.Label>
                        <Form.Control
                            name='name'
                            value={this.state.name}
                            onChange={(e) => {
                                this.setState({name: e.target.value})
                            }}
                        placeholder="Enter Label" />
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicEmail">
                        <Form.Label>X-Axis Data Values</Form.Label>
                        <Form.Control
                            name='value'
                            value={this.state.value}
                            onChange={(e) => {
                                this.setState({value: e.target.value})
                            }}
                        placeholder="Enter Data" />
                        </Form.Group>
                        </Form.Row>
                        <Button 
                        size='sm'
                        onClick={(e) => {
                            this.handleInput(this.state.name, this.state.value)
                        }} >
                        Preview Change
                        </Button>
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
                                {/* <Form.Control
                                className='btn btn-sm btn-primary'
                                type='file'
                                onChange={e => {
                                    e.preventDefault()
                                    this.handleFileUpload(e)
                                }}
                                /> */}
                            </Form.Group>
                        </Form>

                </Col>
                <Col 
                xs={9}
                className='content-col'>
                    <Row className='preview-row'>
                        <UserChart 
                        
                        type={this.state.type}
                        title={this.state.title}
                        categories={this.state.categories}
                        data={this.state.data}
                        file={this.state.file} />
                    </Row>
                    <Row className='options-row'>
                    <Col xs={1}/>
                    <Col className='option-col' xs={4}>
                    
                    <Row>
                    <Dropdown 
                    onSelect={(type) => {
                        console.log(type)
                        this.setState({type: type})
                    }}>
                    <Dropdown.Toggle 
                    variant="primary" 
                    id="dropdown-basic">
                        Select a Visualization type
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item 
                        eventKey='bar'>Bar</Dropdown.Item>
                        <Dropdown.Item eventKey='line'>Line</Dropdown.Item>
                        <Dropdown.Item eventKey='pie'>Pie</Dropdown.Item>
                    </Dropdown.Menu>
                    </Dropdown>
                    </Row>
                    {/*<Row>
                    <SketchPicker
                    color={ this.state.color }
                    onChangeComplete={(e)=> this.handleChangeComplete(e) }
                    /> 
                    </Row>*/}
                    </Col>
                    <Col className='option-col' xs={4}>

                    </Col>
                    <Col xs={1}/>

                    </Row>
                </Col>
            </Row>
            </Styles>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        addDataset: (dataset) => dispatch({type: 'ADD_DATASET', dataset: dataset})
    }
    }

export default withRouter(connect(null, mapDispatchToProps)(NewTracker))