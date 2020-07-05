import React from 'react'
import Papa from 'papaparse'
import {Row, Col, Form, Button, Dropdown, Modal} from 'react-bootstrap'
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
        color: #f7f7f7;
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
    .remove-btn {
        height: 3vh;
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
        color: '#fff',
        show: false,
        file: [],
        keys: [],
    }

    handleChangeComplete = (e) => {
        console.log(e)
        this.setState({
            colors: [...this.state.colors, e.hex]
        }, 
        console.log(this.state.colors))
    }
    handleFileUpload = (e) => {
        console.log('hit')
        Papa.parse(e.target.files[0], {
        dynamicTyping: true, 
        header: true,
        complete: (results) => {
            console.log('parsing')
            console.log(results)
            let keys = Object.keys(results.data[0])
            this.setState({
                keys: keys,
                file: results.data,
                show: true,
            })
            // let firstFive = results.data.slice(0,5)
            // firstFive.map((entry) => {
            // let obj = {
            //     name: entry.SchoolName,
            //     math: entry.MathematicsMean,
            //     reading: entry.CriticalReadingMean
            // }
            // this.setState({data: [...this.state.data, obj]})
            // })
        }
        })
    }

    handleClose = () => {
        this.setState({show: !this.state.show})
    }

    pickUserKeys = (keys) => {
        return (
            <Modal
            size='lg'
            className='text-align-center justify-content-center'
            show={this.state.show}
            onHide={() => this.handleClose()}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title
            className='text-align-center justify-content-center'>Please Select From The Following</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Row
            className='text-align-center justify-content-center'><p>VisTrack found the following keys in your File.</p></Row>
            
            <Form
            className='ml-auto mr-auto'>
                    <Row
            className='text-align-center justify-content-center'><Form.Label>Title</Form.Label></Row>
                    <Row
            className='text-align-center justify-content-center'><Form.Text>Please Select Your Tracker Title</Form.Text></Row>
                    <Form.Group>
                    <div className='align-items-center'>
                    {keys.map((key) => {
                        return (
                            <Form.Check 
                            onChange={(e) => {
                                this.setState({
                                    title: e.target.id
                                })
                            }}
                            multiple='false'
                            id={key}
                            type='radio'
                            label={key}/>
                        )
                    })}
                    </div>
                    </Form.Group>
                    <Row
            className='text-align-center justify-content-center'><Form.Label>Categories</Form.Label></Row>
                    <Row
            className='text-align-center justify-content-center'><Form.Text>This is labels that will appear on the X-Axis</Form.Text></Row>
                    <Form.Group>
                    {keys.map((key) => {
                        return (
                            <Form.Check
                            onChange={(e) => {
                                this.categoriesFromFile(e.target.id)
                            }}
                            multiple='false'
                            id={key}
                            type='radio'
                            label={key}/>
                        )
                    })}
                    </Form.Group>
                    <Row
            className='text-align-center justify-content-center'><Form.Label>Tracked Data</Form.Label></Row>
                    <Row
            className='text-align-center justify-content-center'><Form.Text>This is the data you wish to track</Form.Text></Row>
                    <Form.Group>
                    {keys.map((key) => {
                        return (
                            <Form.Check
                            onChange={(e) => {
                                this.setState({Xaxis: e.target.id,
                                show:false})
                                this.chartFromFile(e.target.id)
                            }}
                            multiple='false'
                            id={key}
                            type='radio'
                            label={key}/>
                        )
                    })}
                    </Form.Group>

            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={() => this.handleClose()}>
                Close
            </Button>
            <Button variant="primary">Understood</Button>
            </Modal.Footer>
    </Modal>
        )
    }

    chartFromFile = (value) => {
        let data = this.state.file.slice(0,5).map(entry => {
            return entry[value]
        })
        this.setState({data: [...data]})
    }
    categoriesFromFile = (value) => {
        let cats = this.state.file.slice(0,5).map(entry => {
            return entry[value]
        })
        this.setState({categories: [...cats]})
    }

    handleInput = (target, index) => {
        let cats = [...this.state.categories]
        let data = [...this.state.data]
        if( target.name === "name") {
            cats[index] = target.value
            this.setState({categories: cats})
        } else {
            data[index] = target.value
            this.setState({data: data})
        }
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
            data: [...this.state.data],
            user_id: this.props.current_user.id
            
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

    changeChartType = (type) =>{
        console.log(type)
        this.setState({type: type})
    }



    renderFormUI = () => {
        return this.state.categories.map((el, i) => {
            return (
            <Form.Row>
            <Form.Group as={Col}>
                <Form.Control
                    name='name'
                    value={el || ''}
                    onChange={(e) => {
                        this.handleInput(e.target, i)
                    }}
                    placeholder="Label" />
            </Form.Group>
            <Form.Group as={Col}>
                <Form.Control
                    name='value'
                    value={this.state.data[i]}
                    onChange={(e) => {
                        this.handleInput(e.target, i)
                    }}
                    placeholder="Data" />
                </Form.Group>
                <Button
                className='remove-btn'
                variant='danger'
                size='sm'
                onClick={()=>{this.removeEl(i)}}>X</Button>
            </Form.Row>
            
            )
        })
    }

    removeEl = (i) => {
        let cats = [...this.state.categories]
        let data = [...this.state.data]
        cats.splice(i,1)
        data.splice(i,1)
        this.setState({
            categories: cats,
            data: data
        })
    }

    addClick(){
        this.setState({categories: [...this.state.categories, '']})
    }

    render() {
        return (
            <Styles>
                {
                    this.state.keys ?
                this.pickUserKeys(this.state.keys) :
                ''}
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
                        </Form.Group>
                        <Form.Group as={Col} controlId="formBasicEmail">
                        <Form.Label>X-Axis Data Values</Form.Label>
                        </Form.Group>
                        </Form.Row>
                        {this.renderFormUI()}
                        <Button 
                        size='sm'
                        onClick={(e) => {
                            this.addClick()
                        }} >
                        Add Data Point
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
                                <Form.Row 
                                className='justify-content-center'><Form.Label>Upload From File</Form.Label></Form.Row>
                                
                                <Form.File
                                className='file-up'
                                >
                                    <Form.File.Input
                                    
                                onChange={e => {
                                    this.handleFileUpload(e)
                                    e.preventDefault()
                                    
                                }}/>
                                </Form.File>
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
                        this.changeChartType(type)
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
const mapStateToProps = (state) => {
    return {
        current_user: state.userReducer.current_user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewTracker))