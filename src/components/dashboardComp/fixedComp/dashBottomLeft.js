import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import M from 'materialize-css'
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
    logout(){
        Cookies.set('token',null)
        window.location.hash=""
        window.location.reload()
    }
    close(){
        M.Sidenav.init(document.getElementById('bottomLeftDash')).close()
    }
     
    render(){
        var mems
        return(
        <nav id="bottomLeftDash" className="sideNav grey darken-4" style={navStyle}>
            
        <div className="row" >
            <div className="" style={{marginTop:40}}>
            <Link id="dashHome" to="/dashboard/home" className="nItem" onClick={this.close}>
                <i className="material-icons" style={{display: 'inline-block'}}>home</i>
                <span className="sideName">Home</span>
            </Link>
            <Link to="/dashboard/members" id="dashMems" className="nItem" onClick={this.close} >
                <i className="material-icons" style={{display: 'inline-block'}}>people</i>
                <span className="sideName">Members</span>
                <span className="badge">{(mems=this.props.members)?mems.length:0}</span>
            </Link>
            <Link to="/dashboard/requests" id="dashReqs" className="nItem" onClick={this.close} >
                <i className="material-icons" style={{display: 'inline-block'}}>person_add</i>
                <span className="sideName">Member Requests</span>
                <span className="new badge">{(mems=this.props.requests)?mems.length:0}</span>
            </Link>
            <Link to="/dashboard/find" id="dashGetMem" className="nItem" onClick={this.close} >
                <i className="material-icons" style={{display: 'inline-block'}}>contact_phone</i>
                <span className="sideName">Get a member</span>
            </Link>
            
        </div>

        <div style={{marginTop:40,position: 'absolute', bottom:0, width:'100%'}}>
            <Link to="/dashboard/settings" className="nItem" id="dashSettings" onClick={this.close}>
                <i className="material-icons" style={{display: 'inline-block'}}>settings</i>
                <span className="sideName">Settings</span>
            </Link>
            <a style={{cursor:'pointer'}} id="dashLogout" className="nItem" onClick={this.logout} >
                <i className="material-icons" style={{display: 'inline-block'}}>all_out</i>
                <span className="sideName">Logout</span>
            </a>
        </div>
        </div>
        </nav>
        )
    }
}