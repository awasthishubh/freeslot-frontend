import React from 'react'

import Chart from 'chart.js'
import {Component} from 'react'

export default class extends Component {
    constructor(props){
        super(props);
        this.chartDom = React.createRef();
    }

    componentDidMount(){
        var displayData={
            stat:{
            "8": 35,
            "9": 41,
            "10": 39,
            "11": 40,
            "12": 12,
            "13": 7,
            "14": 46,
            "15": 39,
            "16": 30,
            "17": 39,
            "18": 10,
            "19": 7,
            "20": 4
        }, day:'Monday'}    
        var colors=['#00e676','#ff1744']
        var data=[], colrs=[], labels=[]
        for(var i=8; i<20; i++){
            data.push(displayData.stat[i])
            if(i<10) i='0'+i
            labels.push(i+':00')
            colrs.push(colors[1])
        }
        var ctx = this.chartDom.current.getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: displayData.day,
                    data: data,
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
                            // beginAtZero:true,
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

    render(){
        return(
                    // <div className="col s6   ">
                        <canvas ref={this.chartDom} ></canvas>
                        // <center>{this.time()}</center>
                // </div>
                
        )
    }
}