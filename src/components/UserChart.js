import React from 'react';
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import Chart from "react-apexcharts";

// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts'

class SampleChart extends React.Component {
  makeColors = (arr) => {
    if (arr.length > 1) {
      return arr
    }
  }
  render() {
    return (
      <Container>
        {this.props.inspect ? 
        <Chart
        options={{
          chart: {
            id: this.props.inspectedDataset.title
          },
          xaxis: {
            categories: this.props.inspectedDataset.dataset_series.map(entry => entry.name)
          },
          noData: {
            text: 'Loading'
          }
        }}
        series={[{
          data: this.props.inspectedDataset.dataset_series.map(entry => entry.data)
        }]}
        type={this.props.inspectedDataset.chart_type}
        height={this.props.inspect ? '322' : 
                this.props.quick   ? '200' : '90%'}
        />
        :

        <Chart
        options={{
          theme: {
            mode: this.props.mode,
            palette: this.props.palette,
          },
          plotOptions: {
            bar: {
              distributed: true
            },
          },
          chart: {
            id: this.props.title
          },
          stroke: {
            curve: 'straight',
          },
          xaxis: {
            categories: this.props.categories
          },
          labels: this.props.type === 'pie' ? this.props.categories : [],
          noData: {
            text: 'Loading'
          },
          
        }}
        series={[{
          data: this.props.data
        }]}
        type={this.props.type}
        height={this.props.inspect ? '322' : 
                this.props.quick   ? '200' : '90%'}
        />
        }
      </Container>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    inspectedDataset: state.dataReducer.inspectedDataset
  }
}

export default connect(mapStateToProps, null)(SampleChart);