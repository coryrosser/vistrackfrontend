import React from 'react'
import {connect} from 'react-redux'
import UserChart from './UserChart'
import Load from './Load'
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
        color: #444;
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
        color: #444;
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
    .control-panel1 {
        margin-top: 3vh;
        border: #ddd solid 1px;
        width: 100%;
        height: 50vh;
        background:linear-gradient(0deg, rgb(2, 195, 154, 0.5) 0%, rgba(255,255,255,0.0) 30%)
    }
    .control-panel-row {
        height: 55vh;
    }
    .card {
        text-align:center;
        height: 20vh;
        width: 70%;
        margin-bottom: 2vh;
        border: #ddd solid 1px;
    }
    .loader {
        margin-top: 12vh;
    }
`

class Dashboard extends React.Component {
    componentDidMount() {
            fetch('http://localhost:3000/datasets')
            .then(res => res.json())
            .then(data => {
                let filteredData = data.filter((entry) => {
                    return entry.user_id === this.props.current_user.id
            })
                this.props.fetchDatasets(filteredData)
            })
    }
    state={
        inspected: '',
        show: false,
    }
    renderInspected = () => {
        if(this.props.inspectedDataset){
            return <InspectPanel />
        } else {
            return <Row className='filler-row'>
            <div className='title-text'> Click an item on the left to inspect it!</div>
            </Row>
        }
    }
    renderQuickView = (datasets) => {
        console.log(datasets)
        let dataR = [...datasets].reverse()
        return dataR.map(entry => {

            let names = entry.dataset_series.map((series) => {
                return series.name
            })
            let points = entry.dataset_series.map((series) => {
                return series.data
            })
            return (
                <Col xs={4}>
                    <Card 
                    className='card' >
                        <Card.Body>
                            <UserChart 
                            curve={entry.curve}
                            width={entry.width}
                            mode={entry.mode}
                            palette={entry.palette}
                            quick={true}
                            chartType={entry.chart_type}
                            title={entry.title ? entry.title : "Untitled-Tracker"}
                            categories={names}
                            data={points}
                            /> 
                        </Card.Body>
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
            <Load className='loader'/>}

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
                        <div className='control-panel1'>
                            { this.renderInspected()
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
        current_user: state.userReducer.current_user,
        inspectedDataset: state.dataReducer.inspectedDataset
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchDatasets: (datasets) => dispatch({
            type: 'FETCH_DATASETS',
            datasets: datasets
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)