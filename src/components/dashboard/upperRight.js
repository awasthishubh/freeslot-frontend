import React, {Component} from 'react'

var navStyle={
    height:'64px', position: 'fixed', top:'0px', left:'300px', right:'0px', zIndex:'-1'
}

export default class extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
        <div style={navStyle}>
        <nav className="white" style={{ color:'#424242'}}>
            
        </nav>
        </div>

        )
    }
}