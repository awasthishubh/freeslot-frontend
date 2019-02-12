import React from 'react'

import Chart from 'chart.js'
import {Component} from 'react'

export default class extends Component {
    constructor(props){
        super(props);
        this.chartDom = React.createRef();
        this.time=this.time.bind(this)
    }
    time(){
        if(this.props.afternoon){
            return "Afternoon"
        }
        else return "Morning"
    }
    componentDidUpdate(){
        // console.log(this.chartDom.current.getContext('2d'))
        var slots=this.props.slots
        
        var colors=['#00e676','#ff1744']
        var data=[], colrs=[], labels=[]
        var start=0, end=12
        if(this.props.afternoon){start=12; end=24}
        for(var i=start; i<end; i++){
            data.push(1)
            var k=i+1
            if(i<10) i='0'+i
            if(k<10) k='0'+k
            labels.push(i+':00 - '+k+ ':00')
            if(slots.indexOf(i-8)<0){
                colrs.push(colors[0])
            }
            else{
                colrs.push(colors[1])
            }
        }
        
        // console.log(data, colrs)
        
        
        var ctx = this.chartDom.current.getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Votes',
                    data: data,
                    backgroundColor: colrs,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
                }
            }
        });
    }

    componentDidMount(){
        // console.log(this.chartDom.current.getContext('2d'))
        var slots=this.props.slots
        
        var colors=['#00e676','#ff1744']
        var data=[], colrs=[], labels=[]
        var start=0, end=12
        if(this.props.afternoon){start=12; end=24}
        for(var i=start; i<end; i++){
            data.push(1)
            var k=i+1
            if(i<10) i='0'+i
            if(k<10) k='0'+k
            labels.push(i+':00 - '+k+ ':00')
            if(slots.indexOf(i-8)<0){
                colrs.push(colors[0])
            }
            else{
                colrs.push(colors[1])
            }
        }
        var ctx = this.chartDom.current.getContext('2d');
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Votes',
                    data: data,
                    backgroundColor: colrs,
                    borderWidth: 1
                }]
            },
            options: {
                legend: {
                    display: false
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