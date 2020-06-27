import React from 'react';
import Papa from 'papaparse'
import { Container } from 'react-bootstrap'
import Chart from "react-apexcharts";

// import {
//   LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts'

class SampleChart extends React.Component {
  state = {
    options: {
      chart: {
        id: "basic-bar"
      },
    chartChoice: 'bar',
    show: false
    }
}
  componentDidUpdate() {
  }
  handleFileUpload = (e) => {
      Papa.parse(e.target.files[0], {
        dynamicTyping: true, 
        header: true,
        complete: (results) => {
          console.log('parsing')
          console.log(results)
          let firstFive = results.data.slice(0,5)
          firstFive.map((entry) => {
            let obj = {
              name: entry.SchoolName,
              math: entry.MathematicsMean,
              reading: entry.CriticalReadingMean
            }
            this.setState({data: [...this.state.data, obj]})
          })
        }
      })
    }
  render() {
    return (
      <Container>
        
          <Chart
          options={{
            chart: {
              id: this.props.title
            },
            xaxis: {
              categories: this.props.categories
            },
            noData: {
              text: 'Loading'
            }
          }}
          series={[{
            name: this.props.name,
            data: this.props.data
          }]}
          type={this.props.type}
          height='90%'
          width='90%'
          />
      </Container>
    )
  }
}

export default SampleChart;