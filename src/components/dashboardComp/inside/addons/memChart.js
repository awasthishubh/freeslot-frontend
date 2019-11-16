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
            type: 'pie',
            data: {
                datasets: [{
                    data: [1,2],
                    backgroundColor: ['#ff0000','#00ff00']
                }],
        
                labels: ['label','asd']
            },
            options: {
                responsive: false,
                legend: {
                    display: true,
                    labels: {
                        fontColor: '#ffffff'
                    },
                    position: 'left'
                }
            }
        });
    }

    componentDidUpdate(){
        // if(this.props.data.stat){
        //     var displayData=this.props.data
        //     var colors=['#00e676','#ff1744']
        //     var data=[], colrs=[], labels=[]
        //     for(var i=8; i<20; i++){
        //         data.push(displayData.stat[i])
        //         if(i<10) i='0'+i
        //         labels.push(i+':00')
        //         colrs.push(colors[1])
        //     }
        //     data= {
        //         labels: labels,
        //         datasets: [{
        //             label: displayData.day,
        //             data: data,
        //             backgroundColor: 'transparent',
        //             borderColor: "#2196f3",
        //         }]
        //     }
        //     window.zx.data=data;
        //     window.zx.update()
        // }
    }

    render(){
        return(
                    <div className="col s12" style={{height:'100%', position:'absolute'}}>
                        <canvas ref={this.chartDom} className={{height:'100%', width:'auto'}}></canvas>
                        {/* // <center>{this.time()}</center> */}
                     </div>
                
        )
    }
}