import React, {Component} from 'react'

var navStyle={
    height:'64px', position: 'fixed', width: '300px', top:'0px', left:'0px'
}

export default class extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
        <nav className="teal " style={navStyle} ></nav>
        )
    }
}