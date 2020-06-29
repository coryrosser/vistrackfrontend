import React from 'react'
import {connect} from 'react-redux'
import UserChart from './UserChart'
import styled from 'styled-components'

const Styles = styled.div`

`

class InspectPanel extends React.Component {
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
                <UserChart 
                    inspect='true'
                    type={this.set.chart_type}
                    title={this.set.title ? this.set.title : "Untitled-Tracker"}
                    categories={this.names}
                    data={this.points}
                /> 
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