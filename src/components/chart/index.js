import Chart from './chart'
import React from 'react'
import {Component} from 'react'

function DayT(props){
    var day=['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return(
    props.slots.map(function(slot){
        return(
            <tr className="row" key={props.slots.indexOf(slot)}>
                <td className="col m2 s3">{day[props.slots.indexOf(slot)]}</td>
                <td className="col m5 s9"><div className="col s12"><Chart afternoon={false} slots={slot}/></div></td>
                <td className="col m5 s9 offset-s3"><div className="col s12"><Chart afternoon={true} slots={slot}/></div></td>
            </tr>
        )
    })
    )
}

export default class extends Component {
    render() {
        return (
        <div>
            <div style={{textAlign: 'center', marginBottom: '50px'}}>
                <div style={{fontSize:'40px'}} >{this.props.data.name}</div>
                <div style={{fontSize:'15px'}}>{this.props.data.reg}</div>
                <div style={{fontSize:'15px'}}>{this.props.data.email}</div>
                <div style={{fontSize:'15px'}}>{this.props.data.phno}</div>
            </div>
            <div style={{textAlign: 'center', marginBottom: '30px'}}>
                <div style={{fontSize:'20px'}} >Free Timming Clock</div>
                <div style={{height:'15px', width: '30px', backgroundColor: '#00e676', display:'inline-block'}} ></div>
                <div style={{display:'inline-block', margin:'0px 40px 0px 10px'}} >Free</div>
                <div style={{height:'15px', width: '30px', backgroundColor: '#ff1744', display:'inline-block'}} ></div>
                <div style={{display:'inline-block', marginLeft:'10px'}} >Busy</div>
                <div></div>
            </div>
          <table className="row striped highlight centered">
            <thead >
              <tr className="row">
                  <th className="col m2 s3">Day</th>
                  <th className="col m5 s9">Morning</th>
                  <th className="col m5 s9 offset-s3">Afternoon</th>
              </tr>
            </thead>
    
            <tbody>
                <DayT slots={this.props.data.slots}/>
            </tbody>
          </table>
          </div>
        )
    }
}