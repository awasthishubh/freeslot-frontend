import React, {Component} from 'react'
import {Link} from 'react-router-dom'

var navStyle={
    position: 'fixed',
    width: '300px',
    height: 'auto',
    bottom: 0,
    top:'64px',
    left: '0px',
    zIndex: 103
}

export default class extends Component{
    constructor(props){
        super(props)
    }
     
    render(){
        console.log('bottomLeft',this.props)
        var mems
        return(
        <nav id="slide-out" id="bottomLeftDash" className="sidenav sideNav grey darken-4" style={navStyle}>
            
        <div className="row" >
            <div className="" style={{marginTop:40}}>
            <Link id="dashHome" to="/dashboard/home" className="nItem" >
                <i className="material-icons" style={{display: 'inline-block'}}>home</i>
                <span className="sideName">Home</span>
            </Link>
            <Link to="/dashboard/members" id="dashMems" className="nItem" >
                <i className="material-icons" style={{display: 'inline-block'}}>people</i>
                <span className="sideName">Members</span>
                <span className="badge">{(mems=this.props.members)?mems.length:0}</span>
            </Link>
            <Link to="/dashboard/requests" id="dashReqs" className="nItem" >
                <i className="material-icons" style={{display: 'inline-block'}}>person_add</i>
                <span className="sideName">Member Requests</span>
                <span className="new badge">{(mems=this.props.requests)?mems.length:0}</span>
            </Link>
            {/* <Link to="/dashboard/find" href="#!" className="nItem" >
                <i className="material-icons" style={{display: 'inline-block'}}>person_pin</i>
                <span className="sideName">Find a member</span>
            </Link> */}
            <Link to="/dashboard/find" id="dashGetMem" href="#!" className="nItem" >
                <i className="material-icons" style={{display: 'inline-block'}}>contact_phone</i>
                <span className="sideName">Get a member</span>
            </Link>
            
        </div>

        <div id="dashHome" style={{marginTop:40,position: 'absolute', bottom:0, width:'100%'}}>
            <Link to="/dashboard/find" href="#!" className="nItem" >
                <i className="material-icons" style={{display: 'inline-block'}}>settings</i>
                <span className="sideName">Settings</span>
            </Link>
            <Link to="/dashboard/find" id="dashHome" href="#!" className="nItem" >
                <i className="material-icons" style={{display: 'inline-block'}}>all_out</i>
                <span className="sideName">Logout</span>
            </Link>
        </div>
        </div>
        </nav>
        )
    }
}