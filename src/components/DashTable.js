import React from 'react'
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import styled from 'styled-components'
import DataTable from 'react'

const Styles = styled.div`
    thead {
        background: rgb(2, 195, 154, 0.5);
        color: #333;
    }
`

class DashTable extends React.Component {

    makeTableRows = (data) => {
        return data.map((entry) => {
            return (
                <tr onClick={()=> {
                    this.props.moveToInspect(entry)
                }}>
                    <td>{entry.title}</td>
                    <td>{entry.dataset_series.length}</td>
                    
                    <td>{
                    entry.user ? entry.user.email : 'No Email Associated'}</td>
                </tr>
            )
        })
    }
    render() {
        return (
            <Styles>
            <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Data Points</th>
                    <th>Group</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.props.datasets ?
                    this.makeTableRows(this.props.datasets)
                    :
                    <tr>Loading Data...</tr>}
                </tbody>
                </Table>
            </Styles>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        datasets: state.dataReducer.datasets,
        users: state.userReducer.users,
        inspectedDataset: state.dataReducer.inspectedDataset
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        moveToInspect: (dataset) => dispatch({type: 'INSPECT', dataset: dataset})
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(DashTable)