import React from 'react'

import Chart from 'chart.js'
import {Component} from 'react'

export default class extends Component {
    constructor(props){
        super(props);
        this.chartDom = React.createRef();
    }

    componentDidMount(){
        var responsive=true
        if(document.documentElement.clientWidth<600) responsive=false;
        var ctx = this.chartDom.current.getContext('2d');
        this.zx=new Chart(ctx, {
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
                responsive: responsive,
                // maintainAspectRatio: false,
        
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
            this.zx.data=data;
            this.zx.update()
        }
    }

    render(){
        // console.log(this.props)
        return(
                    // <div className="col s6   ">
                        <canvas width="700px" ref={this.chartDom} ></canvas>
                        // <center>{this.time()}</center>
                // </div>
                
        )
    }
}