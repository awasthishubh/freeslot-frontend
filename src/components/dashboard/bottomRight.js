import React, {Component} from 'react'

var navStyle={
    position: 'fixed',top:'64px',left:'300px',right:'0px', minHeight:'100%', zIndex:'-100'
}

export default class extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
        <div className="grey lighten-2" style={navStyle}></div>
        )
    }
}