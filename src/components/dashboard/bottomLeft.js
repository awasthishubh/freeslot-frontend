import React, {Component} from 'react'

var navStyle={
    position: 'fixed',
    width: '300px',
    height: '100%',
    top:'64px',
    left: '0px'
}

export default class extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
        <nav class="sideNav grey darken-4" style={navStyle}>
        </nav>
        )
    }
}