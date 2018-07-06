import React, {Component} from 'react'

var navStyle={
    position: 'fixed',
    width: '300px',
    height: 'auto',
    bottom: 0,
    top:'64px',
    left: '0px'
}

export default class extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        var mems
        return(
        <nav id="slide-out" id="bottomLeftDash" className="sidenav sideNav grey darken-4" style={navStyle}>
            
        <div className="row" >
            <div className="" style={{marginTop:40}}>
            <a href="#!" className="nItem active">
                <i className="material-icons" style={{display: 'inline-block'}}>home</i>
                <span className="sideName">Home</span>
            </a>
            <a href="#!" className="nItem">
                <i className="material-icons" style={{display: 'inline-block'}}>people</i>
                <span className="sideName">Members</span>
                <span className="badge">{(mems=this.props.mems)?mems.verified.length:0}</span>
            </a>
            <a href="#!" className="nItem">
                <i className="material-icons" style={{display: 'inline-block'}}>person_add</i>
                <span className="sideName">Member Requests</span>
                <span className="new badge">{(mems=this.props.mems)?mems.unverified.length:0}</span>
            </a>
            <a href="#!" className="nItem">
                <i className="material-icons" style={{display: 'inline-block'}}>person_pin</i>
                <span className="sideName">Find a member</span>
            </a>
            <a href="#!" className="nItem">
                <i className="material-icons" style={{display: 'inline-block'}}>contact_phone</i>
                <span className="sideName">Get a member</span>
            </a>
            
        </div>

        <div style={{marginTop:40,position: 'absolute', bottom:0, width:'100%'}}>
            <a href="#!" className="nItem">
                <i className="material-icons" style={{display: 'inline-block'}}>settings</i>
                <span className="sideName">Settings</span>
            </a>
            <a href="#!" className="nItem">
                <i className="material-icons" style={{display: 'inline-block'}}>all_out</i>
                <span className="sideName">Logout</span>
            </a>
        </div>
        </div>
        </nav>
        )
    }
}