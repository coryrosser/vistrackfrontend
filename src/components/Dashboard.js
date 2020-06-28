import React from 'react'
import {connect} from 'react-redux'
import UserChart from './UserChart'
import DashTable from './DashTable'
import {Row, Col, ListGroup, Card} from 'react-bootstrap'
import styled from 'styled-components'

const Styles = styled.div`
    background: #ebf3f7;
    .quick-view-row {
        margin-top: 2vh;
        margin-bottom: 2.4vh;
        height: 21.7vh;
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

class Dashboard extends React.Component {
    state ={
        datasets: [],
    }
    componentDidMount () {
        console.log(this.props)
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
                <Col>
                    <Card>
                        <Card.Body>
                            <UserChart 
                            type={entry.chart_type}
                            title={entry.title}
                            categories={names}
                            data={points}
                            /> 
                        </Card.Body>
                    </Card>
                </Col>
            )
        })
    }

    render()
    {return (
        <Styles>
            <Row className='title-row'>
                <div className='title-text'>Recent Trackers</div>
            </Row>
            <Row className='quick-view-row justify-content-center'>
                

            {this.props.datasets ?

            this.renderQuickView(this.props.datasets)
            
            :   
                <p>Loading</p>}

            </Row>
            <Row className='title-row'>
                <div className='title-text'>Control Center</div>
            </Row>
            <Row className='control-panel-row'>
                <Col />
                    <Col xs={5}>
                        <div className='control-panel'>
                            <DashTable />
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
    )}
}
const mapStateToProps = (state) => {
    return {
        datasets: state.dataReducer.datasets,
        users: state.userReducer.users
    }
}

export default connect(mapStateToProps, null)(Dashboard)