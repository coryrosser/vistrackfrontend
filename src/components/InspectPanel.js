import React from 'react'
import {connect} from 'react-redux'
import UserChart from './UserChart'
import styled from 'styled-components'
import { Button, Row, Col, ListGroup} from 'react-bootstrap'

const Styles = styled.div`
    .btn-row {
        max-height: 20vh;
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
        background: linear-gradient(90deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.0) 100%);
        &:hover {
            background: linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.0) 100%);
            cursor: pointer;
            transition: 0.5s;
        }
    }
    .btn-list {
        margin-left: 0;
    }
`

class InspectPanel extends React.Component {
    state={
        view: 0,
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
                {this.state.view === 0 ?
                <UserChart 
                    inspect='true'
                    type={this.set.chart_type}
                    title={this.set.title ? this.set.title : "Untitled-Tracker"}
                    categories={this.names}
                    data={this.points}
                /> 
                :
                <h1>data Table</h1>
                }
                
                <Row className='btn-row'>
                    <Col 
                    className='btn-col'
                    xs={4}>
                        <ListGroup 
                        className='btn-list'
                        variant='flush'>
                            <ListGroup.Item className='item'>
                                Notes
                            </ListGroup.Item>
                            <ListGroup.Item className='item'>
                                Edit Tracker
                            </ListGroup.Item>
                            <ListGroup.Item className='item'>
                                View in Table
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
        inspectedDataset: state.dataReducer.inspectedDataset
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moveToInspect: (dataset) => dispatch({type: 'INSPECT', dataset: dataset})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(InspectPanel)