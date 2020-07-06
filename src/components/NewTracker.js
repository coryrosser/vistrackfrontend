import React from 'react'
import Papa from 'papaparse'
import {Row, Col, Form, Button, Dropdown, Modal, ListGroup} from 'react-bootstrap'
import styled from 'styled-components'
import {SwatchesPicker} from 'react-color'
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
        border: black solid 0px;
        margin-left: auto;
        margin-right:auto;
        height: 100%;
        overflow-y: scroll;
    }
    .color-row {
        height: 50%;
        align-items: center;
        justify-content: center;
    }
    .color-title {
        justify-content: center;
        color: #222;
        background:rgb(2, 195, 154, 0.3);
    }
    .palette-list {
        width: 100%;
    }
    .p-item {
        
        cursor: pointer;
        background: #ebf3f7;
        &:hover {
            background: rgb(2, 195, 154, 0.2);
            transition: 0.3s;
        }
    }
    }
    .color {
        border-radius: 50%;
        height: 20px;
        width: 20px;
        margin-left: 3vw;
        margin-top: .2vh;
        border: #f7f7f7 solid 1px;
    }
    .c-1{
        background: #008FFB;
    }
    .c-2 {
        background: #00e396
    }
    .c-3 {
        background: #f3b019
    }
    .c-4 {
        background: #ff4560
    }
    .c-5 {
        background: #775dd0
    }
    .c-6 {
        background: #3f51b5
    }
    .c-7 {
        background: #03a9f4
    }
    .c-8 {
        background: #4caf50
    }
    .c-9 {
        background: #f9ce1d
    }
    .c-10 {
        background: #ff9800
    }
    .c-11 {
        background: #33b2df
    }
    .c-12{
        background: #546e7a
    }
    .c-13{
        background: #d4526e
    }
    .c-14{
        background: #13d8aa
    }
    .c-15{
        background: #a5978b
    }
    .c-16{
        background: #4ecdc4
    }
    .c-17{
        background: #c7f464
    }
    .c-18{
        background: #81d4fa
    }
    .c-19{
        background: #546e7a
    }
    .c-20{
        background: #fd6a6a
    }
    .c-21{
        background: #2b908f
    }
    .c-22{
        background: #f9a3a4
    }
    .c-23{
        background: #90ee7e
    }
    .c-24{
        background: #fa4443
    }
    .c-25{
        background: #69d2e7
    }
    .c-26{
        background: #449dd1
    }
    .c-27{
        background: #f86624
    }
    .c-28{
        background: #ea3546
    }
    .c-29{
        background: #662e9b
    }
    .c-30{
        background: #c5d86d
    }
    .c-31{
        background: #d7263d
    }
    .c-32{
        background: #1b998b
    }
    .c-33{
        background: #2e294e
    }
    .c-34{
        background: #f46036
    }
    .c-35{
        background: #e2c044
    }
    .c-36{
        background: #662e9b
    }
    .c-37{
        background: #f86624
    }
    .c-38{
        background: #f9c80e
    }
    .c-39{
        background: #ea3546
    }
    .c-40{
        background: #43bccd
    }
    .c-41{
        background: #5c4742
    }
    .c-42{
        background: #a5978b
    }
    .c-43{
        background: #8d5b4c
    }
    .c-44{
        background: #5a2a27
    }
    .c-45{
        background: #c4bbaf
    }
    .c-46{
        background: #a300d6
    }
    .c-47{
        background: #7d02eb
    }
    .c-48{
        background: #5653fe
    }
    .c-49{
        background: #2983ff
    }
    .c-50{
        background: #00b1f2
    }
`


class NewTracker extends React.Component {
    state={
        seriesInputs: [],
        categories: ['test', 'test2','test3'],
        data: [12,32,24],
        type: 'donut',
        title: '',
        name: '',
        value: '',
        Xaxis: '',
        colors: [],
        color: '#fff',
        show: false,
        file: [],
        keys: [],
        mode: 'light',
        palette: 'palette1',
    }

    chartModeSwitch = () => {
        if (this.state.mode === 'light') {
            this.setState({
                mode: 'dark'
            })
        } else {
            this.setState({
                mode: 'light'
            })
        }
    }

    handleFileUpload = (e) => {
        Papa.parse(e.target.files[0], {
        dynamicTyping: true, 
        header: true,
        complete: (results) => {
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

    paletteChange = (choice) => {
        this.setState({
            palette: choice
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
                            name='check-title'
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
                            name='check-cats'
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
                            name='check-data'
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
            chart_type: this.state.type,
            mode: this.state.mode,
            palette: this.state.palette
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
            this.props.addDataset(dataset)
            this.props.history.push('/dashboard')
        })
    }

    handleChartTypeChange = (value) => {
        this.setState({
            type: value
        },
        () => console.log('setting ' + this.state.type))
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
                        name
                        value={this.state.title}
                        onChange={(e) => {
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
                        mode={this.state.mode}
                        palette={this.state.palette}
                        horizontal={true}
                        type={this.state.type}
                        title={this.state.title}
                        categories={this.state.categories}
                        data={this.state.data}
                        file={this.state.file} />
                    </Row>
                    <Row className='options-row'>
                    <Col className='option-col' xs={6}>
                    
                    <Row>

                    </Row>
                    <Row className='color-title'><h3>Color Picker</h3></Row>
                    
                    <Row 
                    className='color-row'>
                    <ListGroup className='palette-list'>
                        <ListGroup.Item 
                        onClick={() => {
                            this.paletteChange('palette1')
                        }}
                        className='p-item'><Row>
                            Palette 1 : 
                        
                        <div className='color c-1'></div> 
                            <div className='color c-2'></div> 
                            <div className='color c-3'></div> 
                            <div className='color c-4'></div> 
                            <div className='color c-5'></div> 
                        </Row>

                        </ListGroup.Item>
                        <ListGroup.Item 
                        onClick={() => {
                            this.paletteChange('palette2')
                        }}
                        className='p-item'><Row>Palette 2 : 
                            
                            <div className='color c-6'></div> 
                            <div className='color c-7'></div> 
                            <div className='color c-8'></div> 
                            <div className='color c-9'></div> 
                            <div className='color c-10'></div> 
                            </Row>

                        </ListGroup.Item>
                        <ListGroup.Item 
                        onClick={() => {
                            this.paletteChange('palette3')
                        }}
                        className='p-item'><Row>Palette 3 : 
                                <div className='color c-11'></div> 
                            <div className='color c-12'></div> 
                            <div className='color c-13'></div> 
                            <div className='color c-14'></div> 
                            <div className='color c-15'></div> </Row>
                            
                        </ListGroup.Item>
                        <ListGroup.Item 
                        onClick={() => {
                            this.paletteChange('palette4')
                        }}
                        className='p-item'><Row>Palette 4 : 
                        <div className='color c-16'></div> 
                            <div className='color c-17'></div> 
                            <div className='color c-18'></div> 
                            <div className='color c-19'></div> 
                            <div className='color c-20'></div> </Row>
                            
                        </ListGroup.Item>
                        <ListGroup.Item 
                        onClick={() => {
                            this.paletteChange('palette5')
                        }}
                        className='p-item'><Row>Palette 5 : 
                        <div className='color c-21'></div> 
                            <div className='color c-22'></div> 
                            <div className='color c-23'></div> 
                            <div className='color c-24'></div> 
                            <div className='color c-25'></div> </Row>
                            
                        </ListGroup.Item>
                        <ListGroup.Item 
                        onClick={() => {
                            this.paletteChange('palette6')
                        }}
                        className='p-item'><Row>Palette 6 : 
                        <div className='color c-26'></div> 
                            <div className='color c-27'></div> 
                            <div className='color c-28'></div> 
                            <div className='color c-29'></div> 
                            <div className='color c-30'></div></Row>
                            
                        </ListGroup.Item>
                        <ListGroup.Item 
                        onClick={() => {
                            this.paletteChange('palette7')
                        }}
                        className='p-item'><Row>Palette 7 : 
                        <div className='color c-31'></div> 
                            <div className='color c-32'></div> 
                            <div className='color c-33'></div> 
                            <div className='color c-34'></div> 
                            <div className='color c-35'></div> </Row>
                            
                        </ListGroup.Item>
                        <ListGroup.Item 
                        onClick={() => {
                            this.paletteChange('palette8')
                        }}
                        className='p-item'><Row>Palette 8 : 
                        <div className='color c-36'></div> 
                            <div className='color c-37'></div> 
                            <div className='color c-38'></div> 
                            <div className='color c-39'></div> 
                            <div className='color c-40'></div></Row>
                            
                        </ListGroup.Item>
                        <ListGroup.Item 
                        onClick={() => {
                            this.paletteChange('palette9')
                        }}
                        className='p-item'><Row>Palette 9 : 
                        <div className='color c-41'></div> 
                            <div className='color c-42'></div> 
                            <div className='color c-43'></div> 
                            <div className='color c-44'></div> 
                            <div className='color c-45'></div></Row>
                            
                        </ListGroup.Item>
                        <ListGroup.Item 
                        onClick={() => {
                            this.paletteChange('palette10')
                        }}
                        className='p-item'><Row>Palette 10 : 
                        <div className='color c-46'></div> 
                            <div className='color c-47'></div> 
                            <div className='color c-48'></div> 
                            <div className='color c-49'></div> 
                            <div className='color c-50'></div> </Row>
                            
                        </ListGroup.Item>
                    </ListGroup>
                    
                    </Row>
                    </Col>
                    <Col className='option-col' xs={6}>
                        <Row className='color-title'><h3>Options</h3></Row>
                        <Row>
                        <Form.Check 
                        type='switch'
                        id='mode-switch'
                        label='Chart Dark Mode'
                        onChange={() => {
                            this.chartModeSwitch()
                        }}/>
                        </Row>
                        <Row>
                            <input className='ml-3 mt-2'
                            onChange={() => {this.handleChartTypeChange('bar')}}
                            type='radio' name='type-radio'/>
                            <span className="ml-1">Bar</span>
                            <input className='ml-3 mt-2'
                            onChange={() => {this.handleChartTypeChange('line')}}
                            type='radio' name='type-radio'/>
                            <span className="ml-1">Line</span>
                            <input className='ml-3 mt-2'
                            onChange={() => {this.handleChartTypeChange('area')}}
                            type='radio' name='type-radio'/>
                            <span className="ml-1">Area</span>
                            <input className='ml-3 mt-2'
                            onChange={() => {this.handleChartTypeChange('radar')}}
                            type='radio' name='type-radio'/>
                            <span className="ml-1">Radar</span>
                            <input className='ml-3 mt-2'
                            onChange={() => {this.handleChartTypeChange('pie')}}
                            type='radio' name='type-radio'/>
                            <span className="ml-1">Pie</span>
                            <input className='ml-3 mt-2'
                            onChange={() => {this.handleChartTypeChange('donut')}}
                            type='radio' name='type-radio'/>
                            <span className="ml-1">Donut</span>
                        </Row>
                        
                    </Col>

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