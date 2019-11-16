import React from 'react'
import {Component} from 'react'
import TimeTable from './timetable'

export default class extends Component {
    render() {
        return (
        <div style={{orderTop: '1px solid #bdbdbd', paddingTop: 10}}>
            <div style={{textAlign: 'center', marginBottom: '15px'}}>
                <div style={{fontSize:'30px'}} >{this.props.data.name}</div>
                {this.props.data.count?<div style={{fontSize:'15px'}}>{'#'+this.props.data.count}</div>:<div/>}
                <div style={{fontSize:'15px'}}>{this.props.data.reg}</div>
                <div style={{fontSize:'15px'}}>{this.props.data.email}</div>
                <div style={{fontSize:'15px'}}>{this.props.data.phno}</div>
                <div style={{fontSize:'15px'}}>{this.props.data.rmno}</div>
            </div>
            
                <TimeTable slots={this.props.data.slots}/>
          </div>
        )
    }
}