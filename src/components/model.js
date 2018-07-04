import React from 'react'
import {Component} from 'react'
import Chart from './chart'


var data={
    "_id": "5b3c9581a78cf81da8a216ac",
    "email": "shubham0522@gmail.com",
    "freeSlots": [
        [
            2,
            3,
            6,
            7,
            8,
            9
        ],
        [
            2,
            3,
            6,
            7,
            8,
            9
        ],
        [
            2,
            3,
            6,
            7,
            8,
            9
        ],
        [
            0,
            1,
            3,
            6,
            7,
            8,
            9
        ],
        [
            6,
            7,
            8,
            9
        ],
        [],
        []
    ],
    "name": "Shubham",
    "org": "acm",
    "phno": "9415790443",
    "reg": "13434DSDSD3S434",
    "verified": false
  }

export default class extends Component{
    componentDidMount(){
        $('.modal').modal();
    }
    render(){
        return(
            <div>
            {/* <Chart data={data} /> */}

  <a className="waves-effect waves-light btn modal-trigger" href="#modal1">Modal</a>

  <div id="modal1" className="modal modal-fixed-footer">
    <div className="modal-content">
      <Chart data={data} />
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
  </div>
        )
    }
}