import React, {Component} from 'react'
import M from 'materialize-css'
var navStyle={
    height:64, position: 'fixed', width: 300, top:0, left:0, zIndex:900, backgroundColor: '#0044A9'
}

export default class extends Component{
    render(){
        return(
        <nav id="upperLeftDash" className="row" style={navStyle} >
            <div className="col s1 hide-on-med-and-up">
                <div style={{cursor:'pointer'}} onClick={()=>M.Sidenav.init(document.getElementById('bottomLeftDash')).open()}><i style={{fontSize:30}} className="material-icons">menu</i></div>
            </div>
            <div className="col s11 m12" style={{fontSize:35, textAlign:'center', cursor:'pointer'}}>
            <i className="material-icons prefix" style={{verticalAlign: 'inherit', fontSize:30, display:'inline-block', paddingRight:20}} >
            dashboard</i>
                {/* <img src="./ico.png" width="100px"/> */}
                <div style={{display:'inline-block'}}>Freeslot</div>
            </div>
        </nav>
        )
    }
}