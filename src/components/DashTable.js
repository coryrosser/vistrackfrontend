import React from 'react'
import {Table} from 'react-bootstrap'
import {connect} from 'react-redux'
import styled from 'styled-components'

const Styles = styled.div`
    height: 100%;
    overflow-y: scroll;
    thead {
        background: rgb(2, 195, 154, 0.5);
        color: #333;
    }
    .table-title {
        size: 1.25rem;
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
                    entry ? entry.notes.length : 'No Email Associated'}</td>
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
                    <th className='table-title'>Title</th>
                    <th className='table-title'>Data Points</th>
                    <th className='table-title'>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    this.props.datasets ?
                    this.makeTableRows(this.props.datasets.reverse())
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