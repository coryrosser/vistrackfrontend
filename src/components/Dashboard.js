import React from 'react'
import {connect} from 'react-redux'
import UserChart from './UserChart'
import DashTable from './DashTable'
import InspectPanel from './InspectPanel'
import {Row, Col, Card} from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
    background: #ebf3f7;
    .quick-view-row {
        margin-top: 2vh;
        margin-bottom: 2.4vh;
        overflow-x: hidden;
        height: 30vh;
    }
    .title-row {
        width: 100%;
        margin-left: 0;
        background: #02c39a;
        height: 5vh;
        color: #f7f7f7;
    }
    .filler-row {
        width: 100%;
        margin-left: 0;
        text-align: center;
        background: #02c39a;
        height: 100%;
        align-items: center;
    }
    .inspect-alt {
        margin-left: auto; 
        margin-right: auto;
        color: #f7f7f7;
    }
    .title-text {
        margin-left: auto;
        margin-right: auto;
        font-size: 2rem;
    }
    .control-panel {
        margin-top: 3vh;
        border: #ddd solid 1px;
        width: 100%;
        height: 50vh;

    }
    .control-panel-row {
        height: 55vh;
    }
    .card {
        text-align:center;
        height: 25vh;
        margin-bottom: 2vh;
        border: #ddd solid 1px;
    }
`

class Dashboard extends React.Component {

    state={
        inspected: '',
    }
    renderQuickView = (datasets) => {
        console.log(datasets)
        return datasets.map(entry => {
            let names = entry.dataset_series.map((series) => {
                return series.name
            })
            let points = entry.dataset_series.map((series) => {
                return series.data
            })
            return (
                <Col xs={5}>
                    <Card 
                    className='card' >
                        <Card.Body>
                            <UserChart 
                            quick='true'
                            type={entry.chart_type}
                            title={entry.title ? entry.title : "Untitled-Tracker"}
                            categories={names}
                            data={points}
                            /> 
                        </Card.Body>
                        <Card.Text>
                            {entry.title}
                        </Card.Text>
                    </Card>
                </Col>
        )})}


    render()
    {return (
        <Styles>
            <Row className='title-row' style={{ marginLeft: 0, marginRight: 0 }}>
                <div className='title-text'>Recent Trackers</div>
            </Row>
            <Row 
            style={{ marginLeft: 0, marginRight: 0 }}
            className='quick-view-row justify-content-center'>
                

            {this.props.datasets ?

            this.renderQuickView(this.props.datasets)
            
            :   
                <p>Loading</p>}

            </Row>
            <Row 
            style={{ marginLeft: 0, marginRight: 0 }}
            className='title-row'>
                <div className='title-text'>Control Center</div>
            </Row>
            <Row 
            style={{ marginLeft: 0, marginRight: 0 }}
            className='control-panel-row'>
                <Col />
                    <Col xs={5}>
                        <div className='control-panel'>
                            <DashTable />
                        </div>
                    </Col>
                    <Col xs={5}>
                        <div className='control-panel'>
                            {this.props.inspectedDataset ? 
                            <InspectPanel />
                                :
                            <Row className='filler-row'>
                                <h3 className='inspect-alt'> Click an item on the left to inspect it!</h3>
                            </Row>
                            }
                        </div>
                    </Col>
                <Col />
            </Row>
        </Styles>
    )}
}
const mapStateToProps = (state) => {
    return {
        datasets: state.dataReducer.datasets,
        users: state.userReducer.users,
        inspectedDataset: state.dataReducer.inspectedDataset
    }
}

export default connect(mapStateToProps, null)(Dashboard)