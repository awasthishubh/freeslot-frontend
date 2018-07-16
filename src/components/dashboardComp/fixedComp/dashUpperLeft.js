import React, {Component} from 'react'
import M from 'materialize-css'
var navStyle={
    height:64, position: 'fixed', width: 300, top:0, left:0, zIndex:900
}

export default class extends Component{
    componentDidMount
    render(){
        return(
        <nav id="upperLeftDash" className="teal row" style={navStyle} >
            <div className="col s1 hide-on-med-and-up">
                <a style={{cursor:'pointer'}} onClick={()=>M.Sidenav.init(document.getElementById('bottomLeftDash')).open()}><i style={{fontSize:30}} className="material-icons">menu</i></a>
            </div>
            <div className="col s11 m12" style={{fontSize:35, textAlign:'center'}}>
            <i className="material-icons prefix" style={{fontSize:25, display:'inline-block', paddingRight:20}} >dashboard</i>
                Freeslots
            </div>
        </nav>
        )
    }
}