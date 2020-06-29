import React from 'react';
import Chart from "react-apexcharts";
import { Container } from 'react-bootstrap';
import styled from 'styled-components'

const Styles = styled.div`
    overflow-y: scroll;
    max-height: 75vh;
    .chart {
        color: #111;
        
    }
    .contain {
        background: rgb(255,255,255, 0.6);
        border-radius: 20px;
        height: 55vh;
        text-align:center;
        margin-top: 3vh;
    }
`

class ExploreLineChart extends React.Component {
    state={
        data: [],
        title: '',
        categories: [],
        desc: '',
        show: 0,
    }
    componentDidMount() {
        fetch('https://www.quandl.com/api/v3/datasets/YALE/RBCI.json?api_key=2Po8fYyoSUauAftXx9SX')
        .then(res => res.json())
        .then(data => {
            debugger
            let points = data.dataset.data.slice(1,25).map((entry) => {
                return entry[2]
            })
            let name = data.dataset.data.slice(1,25).map((entry) => {
                return entry[0]
            })
            this.setState({
                categories: name,
                data: points,
                desc: data.dataset.description
            })
        })
    }

    render() {
        return (
            <Styles>
            <Container className="contain">
            <h1>U.S. Population</h1>
            <Chart className='chart'
            options={{
            // colors: [...this.props.colors],
            chart: {
                id: 'U.S. Population Over Time'
            },
            xaxis: {
                categories: this.state.categories
            },
            noData: {
                text: 'Loading'
            }
            }}
            series={[{
            data: this.state.data
            }]}
            type='line'
            height={this.state.inspect ? '350' : 
                    this.state.quick   ? '200' : '90%'}
            />
        </Container>
            <Container className="contain">
            <h1>U.S. Population</h1>
            <Chart className='chart'
            options={{
            // colors: [...this.props.colors],
            chart: {
                id: 'U.S. Population Over Time'
            },
            xaxis: {
                categories: this.state.categories.slice(0,5)
            },
            noData: {
                text: 'Loading'
            }
            }}
            series={[{
            data: this.state.data.slice(0,5)
            }]}
            type='radar'
            height={this.state.inspect ? '350' : 
                    this.state.quick   ? '200' : '90%'}
            />
        </Container>
            </Styles>
        )
    }
}

export default ExploreLineChart