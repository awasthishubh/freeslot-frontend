import React from 'react'
import {Component} from 'react'
import TimeTable from './timetable'

export default class extends Component {
    render() {
        return (
        <div style={{orderTop: '1px solid #bdbdbd', paddingTop: 10}}>
            <div style={{textAlign: 'center', marginBottom: '15px'}}>
                <div style={{fontSize:'30px'}} >{this.props.data.name}</div>
                <div style={{fontSize:'15px'}}>{this.props.data.reg}</div>
                <div style={{fontSize:'15px'}}>{this.props.data.email}</div>
                <div style={{fontSize:'15px'}}>{this.props.data.phno}</div>
            </div>
            <div style={{width:'100%',overflowY:'auto', margin:'10px 0px'}}>
            <legend><b  >TimeTable</b></legend>
            <div style={{textAlign: 'center', marginBottom: 15}}>
                <div style={{height:'15px', width: '30px', backgroundColor: 'rgb(177, 198, 253)', display:'inline-block'}} ></div>
                <div style={{display:'inline-block', margin:'0px 40px 0px 10px'}} >Free</div>
                <div style={{height:'15px', width: '30px', backgroundColor: '#1e88e5', display:'inline-block'}} ></div>
                <div style={{display:'inline-block', marginLeft:'10px'}} >Busy</div>
                <div></div>
            </div>
                <TimeTable slots={this.props.data.slots}/>
          </div>
        </div>
        )
    }
}