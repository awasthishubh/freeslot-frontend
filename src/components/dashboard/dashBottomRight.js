import React, {Component} from 'react'
import Home from './home'
import Members from './members'
var navStyle={
    position: 'absolute',top:64,left:300,right:0, bottom:0, zIndex:-100,padding:20
}

export default class extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
        <div id="bottomRightDash" className="grey lighten-2" style={navStyle}>
            {/* <Home/> */}
            <Members/>

        </div>
        )
    }
}