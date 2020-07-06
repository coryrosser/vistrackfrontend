import React from 'react';
import { connect } from 'react-redux'
import { Container } from 'react-bootstrap'
import Chart from "react-apexcharts";

// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts'

class SampleChart extends React.Component {

  decideOnChart=(type) => {
    console.log(type)
    if(type === 'bar') {
      return (
        <Chart
        options={{
          dataLabels: {
            enabled: true
          },
          labels: [...this.props.categories],
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
            text: 'Add Data Points to Get Started!'
          },
          
        }}
        series={[{
          data: this.props.data
        }]}
        type='bar'
        height={this.props.inspect ? '322' : 
                this.props.quick   ? '200' : '90%'}
        />
      )
    } else if (type === 'line') {
      return (
        <Chart
        options={{
          dataLabels: {
            enabled: true
          },
          labels: [...this.props.categories],
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
            text: 'Add Data Points to Get Started!'
          },
          
        }}
        series={[{
          data: this.props.data
        }]}
        type='line'
        height={this.props.inspect ? '322' : 
                this.props.quick   ? '200' : '90%'}
        />
      )
    } else if (type === 'area') {
      return (
        <Chart
        options={{
          dataLabels: {
            enabled: true
          },
          labels: [...this.props.categories],
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
            text: 'Add Data Points to Get Started!'
          },
          
        }}
        series={[{
          data: this.props.data
        }]}
        type='area'
        height={this.props.inspect ? '322' : 
                this.props.quick   ? '200' : '90%'}
        />
      )
    } else if (type === 'radar') {
      return (
        <Chart
        options={{
          dataLabels: {
            enabled: true
          },
          labels: [...this.props.categories],
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
            text: 'Add Data Points to Get Started!'
          },
          
        }}
        series={[{
          data: this.props.data
        }]}
        type='radar'
        height={this.props.inspect ? '322' : 
                this.props.quick   ? '200' : '90%'}
        />
      )
    } else if (type ==='candlestick') {
      return (
        <Chart
        options={{
          dataLabels: {
            enabled: true
          },
          labels: [...this.props.categories],
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
            text: 'Add Data Points to Get Started!'
          },
          
        }}
        series={[{
          data: this.props.data
        }]}
        type='candlestick'
        height={this.props.inspect ? '322' : 
                this.props.quick   ? '200' : '90%'}
        />
      )
    } else if (type ==='donut') {
      return (
        <Chart
        options={{
          dataLabels: {
            enabled: true
          },
          chartOptions: {labels: [...this.props.categories]},
          series: [...this.props.data],
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
          noData: {
            text: 'Add Data Points to Get Started!'
          },
          labels: this.props.categories,
        }}
        
        
        
        series={this.props.data}
        type='donut'
        height={this.props.inspect ? '322' : 
                this.props.quick   ? '200' : '90%'}
        />
      )
    } else if (type === 'pie') {
      return (
        <Chart
        options={{
          dataLabels: {
            enabled: true
          },
          chartOptions: {labels: [...this.props.categories]},
          series: [...this.props.data],
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
          noData: {
            text: 'Add Data Points to Get Started!'
          },
          labels: this.props.categories,
        }}
        
        
        
        series={this.props.data}
        type='pie'
        height={this.props.inspect ? '322' : 
                this.props.quick   ? '200' : '90%'}
        />
      )
    }
  }

  render() {
    return (
      <Container>
        {this.props.inspect ? 
        <Chart
        options={{
          theme: {
            mode: this.props.inspectedDataset.mode,
            palette: this.props.inspectedDataset.palette,
          },
          plotOptions: {
            bar: {
              distributed: true
            },
          },
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
                this.props.quick   ? '225' : '90%'}
        />
        :
        this.decideOnChart(this.props.type)
        
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