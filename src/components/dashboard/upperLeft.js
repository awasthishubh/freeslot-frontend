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
        <nav id="upperLeftDash" className="teal row" style={navStyle} >
            <div className="col s1 hide-on-med-and-up">
                <a style={{cursor:'pointer'}} onClick={()=>window.sideInstance.open()}><i style={{fontSize:30}} class="material-icons">menu</i></a>
            </div>
            <div className="col s11 m12" style={{fontSize:35, textAlign:'center'}}>
            <i class="material-icons prefix" style={{fontSize:25, display:'inline-block', paddingRight:20}} >dashboard</i>
                Freeslots
            </div>
        </nav>
        )
    }
}