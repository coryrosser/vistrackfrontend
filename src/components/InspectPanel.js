import React from 'react'
import {connect} from 'react-redux'
import UserChart from './UserChart'
import styled from 'styled-components'
import { Button, Row, Col, ListGroup, Table, Form, InputGroup} from 'react-bootstrap'

const Styles = styled.div`
    .btn-row {
        max-height: 22vh;
        overflow: hidden;
        max-width: 100%;
        margin-left: 0;
        background: rgb(2, 195, 154, 0.5);
    }
    .btn-col {
        margin-left: 0;
        max-height: 15vh;
        padding: 0;
    }
    .item {
        height: 33%;
        background: linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.0) 100%);
        &:hover {
            background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.0) 100%);
            cursor: pointer;
            transition: 0.5s;
        }
    }
    .btn-list {
        margin-left: 0;
        height: 16vh;
    }
    .panel-row {
        width: 100%;
        margin-left: 0;
        height: 5vh;
        color: #333;
        background: rgb(2, 195, 154, 0.5);
        animation-name: fade;
        animation-duration: 1s;
    }
    .note-row {
        width: 100%;
        height: 24.8vh;
        margin-left: 0;
        background: #f7f7f7;
        overflow-y: scroll;
    }
    .table-row {
        width: 100%;
        height: 29.8vh;
        margin-left: 0;
        background: #f7f7f7;
        overflow-y: scroll;
    }
    @keyframes fade {
        from {background-color: rgb(2, 195, 154, 0.0);}
        to {background-color: rgb(2, 195, 154, 0.5);}
    }
    .form-row {
        margin-left: 0;
        height: 5vh;
        background: #f7f7f7;
        width:99%
    }
    .note-form{
        margin-top: 0;
    }
    .sub-btn {
        height: 3.8vh;
    }
    .note {
        width: 100%;
        height: 3vh;
        align-items: center;
        justify-content: center;
        text-align: center;
    }
`

class InspectPanel extends React.Component {
    state={
        view: 0,
        subject: '',
        content: '',
        notes: [],
        dataset: {},
    }
    componentDidMount() {
        if (this.props.inspectedDataset) {
            this.setState({notes: [...this.props.inspectedDataset.notes]
            })
        }
    }

    handleInput = (value, type) => {
        type === 1 ?
        this.setState({subject: value}) :
        this.setState({content: value})
    }

    createNote(subject, content) {
        let dataId = this.props.inspectedDataset.id
        let userId = this.props.current_user.id
        let note = {
            subject: subject,
            content: content,
            user_id: userId,
            dataset_id: dataId
        }
        fetch('http://localhost:3000/notes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(note)
        })
        .then(res => res.json())
        .then(newNote => {
            console.log(newNote)
            this.setState({
                subject: '',
                content: '',
                notes: [...this.state.notes, newNote]
            })
        })
    }

    renderNotes = (notes) => {
        return (
            notes.map(note => {
                return (
                    <Row className='note'>
                        
                        <Col>
                            <h6>{note.subject}</h6>
                        </Col>
                        <Col>
                            <h6>{note.content}</h6>
                        </Col>
                    </Row>
                )
            })
        )
    }
    makeTableRows = (data) => {
        return data.map(entry => {
            return (
                <tr>
                    <td>
                        {entry.name}
                    </td>
                    <td>
                        {entry.data}
                    </td>
                </tr>
            )
        })
    }
    changeView = (num) => {
        this.setState({view: num})
    }

    set = this.props.inspectedDataset
    names = this.set.dataset_series.map((series) => {
        return series.name
    })
    points = this.set.dataset_series.map((series) => {
        return series.data
    })
    render() {
        return (
            <Styles>
                {
                this.state.view === 0 ?
                <UserChart 
                palette={this.set.palette}
                mode={this.set.mode}
                curve={this.set.curve}
                width={this.set.width}
                inspect='true'
                chartType={this.set.chart_type}
                title={this.set.title ? this.set.title : "Untitled-Tracker"}
                categories={this.names}
                data={this.points}
            /> 
                : this.state.view === 1 ?
                <div>
                <Row className='panel-row'>
                <h3 className='mr-auto ml-auto'>Table</h3>
                </Row>
                <Row className='table-row'>
                <Table bordered hover>
                    <thead>
                        <th>
                            Category
                        </th>
                        <th>
                            Value
                        </th>
                    </thead>
                    <tbody>
                        {
                            this.makeTableRows(this.set.dataset_series)
                        }
                    </tbody>
                </Table>
                </Row>
                </div>
                :
                <div>
                <Row className='panel-row'>
                    <h3 className='mr-auto ml-auto'>Notes</h3>
                </Row>
                <Row className='note-row'>
                    {this.renderNotes(this.state.notes.filter((note) => {
                        return note.dataset_id === this.props.inspectedDataset.id
                    }))}
                </Row>
                <Row className='form-row'>
                    <Form 
                    onSubmit={(e) => {
                        e.preventDefault()
                        this.createNote(this.state.subject, this.state.content)
                    }}
                    className='note-form'>
                        <Form.Group>
                        <InputGroup>
                            <InputGroup.Prepend>
                            <InputGroup.Text>Note:</InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control 
                            value={this.state.subject}
                            onChange={(e) => this.handleInput(e.target.value, 1)}
                            className='w-30' id="note-Subject" placeholder="Subject" />
                            <Form.Control
                            value={this.state.content}
                            onChange={(e) => this.handleInput(e.target.value, 2)} 
                            className='w-65' id="note-Content" placeholder="Add your note" />
                        <Button 
                        className='sub-btn'
                        size='sm' type='submit'>Add Note</Button>
                        </InputGroup>
                        
                        </Form.Group>
                    </Form>
                </Row>
                </div>
                }
                
                <Row className='btn-row'>
                    <Col 
                    className='btn-col'
                    xs={4}>
                        <ListGroup 
                        className='btn-list'
                        variant='flush'>
                            <ListGroup.Item 
                            onClick={() => {
                                this.changeView(2)
                            }}
                            className='item'>
                                Notes
                            </ListGroup.Item>
                            <ListGroup.Item 
                            onClick={() => {
                                this.changeView(0)
                            }}
                            className='item'>
                                Chart View
                            </ListGroup.Item>
                            <ListGroup.Item  
                            onClick={() => {
                                this.changeView(1)
                            }}
                            className='item'>
                                Table View
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Styles>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // datasets: state.dataReducer.datasets,
        users: state.userReducer.users,
        inspectedDataset: state.dataReducer.inspectedDataset,
        current_user: state.userReducer.current_user
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moveToInspect: (dataset) => dispatch({type: 'INSPECT', dataset: dataset}),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(InspectPanel)