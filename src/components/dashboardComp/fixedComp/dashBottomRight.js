import React, {Component} from 'react'

var navStyle={
    position: 'absolute',top:64,left:300,right:0, bottom:0,padding:20, overflowY:'auto', zIndex:100
}

export default class dash extends Component{
    render(){
        return(
            <div id="bottomRightDash" className="bottomRightDash grey lighten-2" style={navStyle}>
                {this.props.children}
            </div>
        )
    }
}