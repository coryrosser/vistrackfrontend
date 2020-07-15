import React from 'react'
import Papa from 'papaparse'
import {Row, Col, Form, Button, Modal, ListGroup
    ,Card,Accordion} from 'react-bootstrap'
import {FaSave} from 'react-icons/fa'
import styled from 'styled-components'
import UserChart from './UserChart'
import Load from './Load'
import {connect} from 'react-redux'
import { withRouter } from 'react-router-dom'

const Styles = styled.div`
    background: #ebf3f7;
    overflow: hidden;
    .loader {
        margin-top: 200px;
        
    }
    .opt-col {
        height: 26vh;
        border-right: rgb(2, 195, 154, 0.2) solid 1px;
        margin-left: auto;
        margin-right: auto;
    }
    .line-opt-row {
        align-items:center;
        justify-content: center;
    }
    .check-cats {
        text-align: center;
        justify-content: center;
        align-items:center;
        margin-right: auto;
        margin-left: auto;
    }
    .line-opt-item {
        font-size: 1rem;
        margin-top: 1vh;
    }
    }
    .line-opt-item1 {
        font-size: 1rem;
        margin-top: 1vh;
        margin-right: 25.6vw;
    }
    .range-slider {
        background: red;
    }
    .file-up1 {
        cursor: pointer;
        width: 6vw;
        background:rgb(42, 157, 244);
        border: rgb(42, 157, 244, 0.5) solid 1px;
    }
    .file-input {
        background:rgb(42, 157, 244);
        border: rgb(42, 157, 244, 0.5) solid 1px;
    }
    .file-up {
        cursor: pointer;
        border-radius: 10px;
        
        background:rgb(42, 157, 244);
        border: rgb(42, 157, 244, 0.5) solid 1px;
        color: #f7f7f7;
        width: 33%;
        position: absolute;
        bottom: 100px;
        right: 3.5vw;
    }
    .sub-btn {
        position: absolute;
        width: 10vw;
        font-size: 1rem;
        bottom: 15px;
        right: 5vw;
    }
    .list-accordion {
        color: #444;
        border: none !important;
        margin: 0 !important;
        padding: 0 !important;
        font-size: 1.25rem;
        &:hover {
            background: rgb(0,0,0,0.2);
            transition: 0.3s;
        }
    }
    .accordion-item {
        background: #ebf3f7;
        height: 4vh;
        cursor:pointer;
        font-size: 1rem;
        &:hover {
            background: rgb(2, 195, 154, 0.2);
            transition: 0.3s;
        }
    }
    .accordion-header {
        background: #ebf3f7;
        cursor: pointer;
        width: 100%;
        border: none;
    }
    .accordion-card {
        color: #444;
        border: none;
        background:#ebf3f7 ;
    }
    .option-row-drop {
        justify-content: center;
    }
    .option-item {
        background: #ebf3f7;
        border: none;
        border-bottom: #02c39a solid 1px;
        color: #444;
    }
    .item-light {
        background: #ebf3f7;
        border: none;
        font-size: 1.25rem;
        border-bottom: #02c39a solid 1px;
        color: #444;
        cursor: pointer;
        &:hover {
            background: #444;
            color: #ebf3f7;
            transition: .5s;
        }
    }
    .item-dark {
        background: #444;
        color: #ebf3f7;
        border: none;
        font-size: 1.25rem;
        border-bottom: #02c39a solid 1px;
        cursor: pointer;
        &:hover {
            background: #ebf3f7;
            color: #444;
            transition: .5s;
        }
    }
    .color-text {
        font-size: 1.25rem;
    }
    .title-row {
        width: 100%;
        margin-left: 0;
        background: #02c39a;
        height: 5vh;
        text-align:center;
        align-items:center;
        justify-content:center;
        color: #444;
    }
    .tracker-form {
        max-width: 75%;
        height: 100%;
        margin-left:auto;
        margin-right:auto;
    }
    .title-text {
        margin-left: 25%;
        font-size: 2rem;
    }
    .form-col {
        background: #02c39a;
        height: 95vh;
        text-align: center;
        color: #444;
    }
    button {
        background: rgb(42, 157, 244);
        
        border: rgb(0,0,0,0.1) solid 1px;

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
        margin-top: 5px;
        background: #ee3e38;
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
        text-align: center;
        align-items: center;
        justify-content: center;
    }
    .color-row {
        height: 50%;
        align-items: center;
        justify-content: center;
    }
    .color-title {
        justify-content: center;
        color: #444;
        font-size: 1.25rem;
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

    .bottom-form {
        margin-bottom: 10%;
    }
    .check-row {
        background: red;
    }
    .form-check{
        text-align: center;
        margin-left: 50vh;
    }
    .inputfile {
        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;
    }
    .inputfile + label {
        padding: 4px;
        cursor: pointer;
        position: absolute;
        width: 10vw;
        bottom: 10vh;
        left: 6.4vw;
        font-size: 1.2rem;
        color: #f7f7f7;
        border-radius: 5px;
        border: rgb(0,0,0,0.1) solid 1px;
        background: rgb(42, 157, 244);
    }
    
    .inputfile:focus + label,
    .inputfile + label:hover {
        
    }
`


class NewTracker extends React.Component {
    state={
        seriesInputs: [],
        categories: [],
        data: [],
        chartType: 'bar',
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
        curve: 'straight',
        palette: 'palette1',
        showChart: true,
        width: 5,
    }

    handleWidthChange = (value) => {
        this.setState({width: value})
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
    setCurve = (string) => {
        this.setState({curve: string})
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
            className='text-align-center justify-content-center align-items-center'><Form.Text>Please Select Your Tracker Title</Form.Text></Row>
                    <Form.Group>
                    <div className='check-row'>
                    {keys.map((key) => {
                        return (
                            <Form.Check 
                            name='check-title mx-auto'
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
            chart_type: this.state.chartType,
            mode: this.state.mode,
            palette: this.state.palette,
            curve: this.state.curve,
            width:this.state.width
            },
            name: [...this.state.categories],
            data: [...this.state.data],
            user_id: this.props.current_user.id
            
        }
        fetch('https://vistrackbackend.herokuapp.com/datasets', {
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
            chartType: value,
            showChart: false
        },
        () => {
            setTimeout(() => {
                this.setState({showChart: true})
            }, 1000)
        }
        )
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
                <div className='title-text'> {this.state.title ?
                                            <>Title:  {this.state.title}</> :
                'New Tracker'}</div>
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
                        <Form.Label className='color-title'>Tracker Title</Form.Label>
                        <Form.Control
                        name
                        value={this.state.title}
                        onChange={(e) => {
                            this.handleTitle(e.target.value)
                        }}
                        placeholder="Enter Title" />
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                        <Form.Label className='color-title'>X-Axis Title</Form.Label>
                        <Form.Control
                            name={this.state.Xaxis}
                            value={this.state.Xaxis}
                            onChange={(e) => this.setState({Xaxis: e.target.value})}
                        placeholder="Enter Title" />
                        </Form.Group>
                        <Button 
                        className='mb-3'
                        onClick={(e) => {
                            this.addClick()
                        }} >
                        Add Data Point
                        </Button>
                        
                        {this.renderFormUI()}

                        <Row className='bottom-form'>
                        <Form.Group className='file-form-group'>
                                <Form.Row 
                                className='justify-content-center'><Form.Label></Form.Label></Form.Row>
                                <input type="file" 
                                onChange={(e) => {
                                    this.handleFileUpload(e)
                                    e.preventDefault()

                                }}
                                name="file" id="file" class="inputfile" />
                                <label for="file">Choose a file</label>
                                {/* <Form.File
                                className='file-up'
                                custom
                                >
                                <Form.File.Input
                                className='file-input'
                                custom
                                label='File Upload'
                                onChange={e => {
                                    this.handleFileUpload(e)
                                    e.preventDefault()
                                    
                                }}/>
                                <Form.File.Label 
                                custom
                                className='file-up1'
                                data-browse="File Upload"></Form.File.Label>
                                </Form.File> */}
                            </Form.Group>
                        <Button 
                        type='submit'
                        className='ml-auto mr-auto mt-4 sub-btn'>
                            <FaSave className='icon'/> Save Tracker
                        </Button>
                        </Row>
                        </Form>

                </Col>
                <Col 
                xs={9}
                className='content-col'>
                    <Row className='preview-row'>
                        {this.state.showChart ? 
                        <UserChart 
                        width={this.state.width}
                        curve={this.state.curve}
                        mode={this.state.mode}
                        palette={this.state.palette}
                        chartType={this.state.chartType}
                        title={this.state.title}
                        categories={this.state.categories}
                        data={this.state.data}
                        file={this.state.file} /> : 

                        <Load className='loader'/> }
                    </Row>
                    <Row className='options-row'>
                    <Col className='option-col' xs={6}>
                    <Row className='color-title'><div className='color-text'>Color Palette</div></Row>
                    
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
                        <Row className='color-title'><div className='color-text'>Options</div></Row>
                        <Row className='option-row'>
                        <ListGroup
                        className='palette-list'
                        flush>
                            <ListGroup.Item
                            onClick={() => {
                                this.chartModeSwitch()
                            }}
                            className={this.state.mode === 'light' ?
                                                    'item-light' :
                                                    'item-dark'}>
                            {this.state.mode === 'light' ?
                            <p>Activate Dark-Mode</p> :
                            <p>Activate Light-Mode</p>}
                            </ListGroup.Item>
                            <ListGroup.Item
                            className='option-item'>
                                <Accordion 
                                className='list-accordion'
                                defaultActiveKey="">
                                    <Card className='accordion-card'>
                                    <Accordion.Toggle 
                                    className='accordion-header'
                                    as={Card.Header} eventKey="0">
                                        Select Chart Type
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body 
                                        onClick={(e) => {this.handleChartTypeChange('bar')}}
                                        className='accordion-item'>Bar</Card.Body>
                                    </Accordion.Collapse>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body 
                                        onClick={(e) => {this.handleChartTypeChange('line')}}
                                        className='accordion-item'>Line</Card.Body>
                                    </Accordion.Collapse>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body 
                                        onClick={(e) => {this.handleChartTypeChange('area')}}
                                        className='accordion-item'>Area</Card.Body>
                                    </Accordion.Collapse>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body 
                                        onClick={(e) => {this.handleChartTypeChange('radar')}}
                                        className='accordion-item'>Radar</Card.Body>
                                    </Accordion.Collapse>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body 
                                        onClick={(e) => {this.handleChartTypeChange('pie')}}
                                        className='accordion-item'>Pie</Card.Body>
                                    </Accordion.Collapse>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body 
                                        onClick={(e) => {this.handleChartTypeChange('donut')}}
                                        className='accordion-item'>Donut</Card.Body>
                                    </Accordion.Collapse>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body 
                                        onClick={(e) => {this.handleChartTypeChange('radialBar')}}
                                        className='accordion-item'>Radial Bar</Card.Body>
                                    </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            
                            </ListGroup.Item>
                        </ListGroup>
                            {
                        this.state.chartType === 'line'  ?
                        <>
                        <Col className='opt-col' xs={6}>
                        <Row className='color-title'><h4>Line Graph Curve</h4></Row>
                        
                            {['straight', 'smooth', 'stepline'].map((entry) =>{
                                return(
                                    <Row className='line-opt-row ml-auto mr-auto'>
                                    <Form.Check
                                    className='line-opt-item1'
                                    type='radio'
                                    name='line-type'
                                    onChange={() => {this.setCurve(entry)}}
                                    label={entry.charAt(0).toUpperCase() + entry.slice(1)}/>
                                    </Row>
                                )
                            })}
                        
                    </Col>
                    <Col className='opt-col' xs={6}>
                        <Row className='color-title'><h4>Line Width</h4></Row>
                        <Row className='line-opt-row'>
                        <Form>
                        <Form.Group controlId="formBasicRange">
                        <Form.Label className='line-opt-item'>Change your line width</Form.Label>
                        <Form.Control 
                        className='range-slider'
                        defaultValue={4}
                        onChange={(e) => this.handleWidthChange(e.target.value)}
                        type="range" />
                        </Form.Group>
                        </Form>
                        </Row>
                    </Col>
                    </> : 
                    <></>}
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