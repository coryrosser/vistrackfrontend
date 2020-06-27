import React from 'react';
import Papa from 'papaparse'
import { Container } from 'react-bootstrap'

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts'

class SampleChart extends React.Component {
  state = {
    data: [],
    series: {},
    type: 'bar',
    categories: [],

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
        <input type='file' name='file' onChange={(e)=> this.handleFileUpload(e)}/>
        {this.state.data.length > 1 ? 
          <LineChart
            width={500}
            height={300}
            data={this.state.data}
            margin={{
              top: 5, right: 3, left: 2, bottom: 5,
            }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="math" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="reading" stroke="#82ca9d" />
            </LineChart>
          :
          <h1>No Data To Display...</h1>
      
      }
      </Container>
    )
  }
}

export default SampleChart;