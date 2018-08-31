import React from 'react'

import Chart from 'chart.js'
import {Component} from 'react'

export default class extends Component {
    constructor(props){
        super(props);
        this.chartDom = React.createRef();
    }

    componentDidMount(){
        var ctx = this.chartDom.current.getContext('2d');
        window.zx=new Chart(ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Choose a day',
                    data: [],
                    backgroundColor: 'transparent',
                    borderColor: "#2196f3",
                }]
            },
            options: {
                responsive: true,
        
                tooltips: {
                    mode: 'index',
                    intersect: false,
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true,
                        },
                        scaleLabel: {
                          display: true,
                          labelString: 'Number of members busy',
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                          display: true,
                          labelString: 'Time',
                        }
                    }]
                },
                legend: {
                    display: true
                }
            }
        });
    }

    componentDidUpdate(){
        if(this.props.data.stat){
            var displayData=this.props.data
            var colors=['#00e676','#ff1744']
            var data=[], colrs=[], labels=[]
            for(var i=8; i<20; i++){
                data.push(displayData.stat[i])
                if(i<10) i='0'+i
                labels.push(i+':00')
                colrs.push(colors[1])
            }
            data= {
                labels: labels,
                datasets: [{
                    label: displayData.day,
                    data: data,
                    backgroundColor: 'transparent',
                    borderColor: "#2196f3",
                }]
            }
            window.zx.data=data;
            window.zx.update()
        }
    }

    render(){
        console.log(this.props)
        return(
                    // <div className="col s6   ">
                        <canvas ref={this.chartDom} ></canvas>
                        // <center>{this.time()}</center>
                // </div>
                
        )
    }
}