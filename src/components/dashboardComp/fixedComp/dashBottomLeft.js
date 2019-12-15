import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import $ from 'jquery'

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
        Cookies.set('token','')
        localStorage.clear()
        window.location.href=""
        // window.location.reload()
    }
    close(){
        $('.sidenav-overlay').trigger( "click" )
    }
     
    render(){
        var mems
        return(
        <nav id="bottomLeftDash" className="sideNav grey darken-4" style={navStyle}>
            
        <div className="row" >
            <div className="" style={{marginTop:0}}>
            <Link id="dashHome" to="/dashboard/home" className="nItem" onClick={this.close}>
                <i className="material-icons" style={{display: 'inline-block'}}>home</i>
                <span className="sideName">Home</span>
            </Link>
            <Link to="/dashboard/members" id="dashMems" className="nItem" onClick={this.close} >
                <i className="material-icons" style={{display: 'inline-block'}}>people</i>
                <span className="sideName">Members</span>
                <span className="badge">{(mems===this.props.members)?mems.length:null}</span>
            </Link>
            <Link to="/dashboard/requests" id="dashReqs" className="nItem" onClick={this.close} >
                <i className="material-icons" style={{display: 'inline-block'}}>person_add</i>
                <span className="sideName">Member Requests</span>
                <span className="badge">{(mems===this.props.requests)?mems.length:null}</span>
            </Link>
            <Link to="/dashboard/find" id="dashGetMem" className="nItem" onClick={this.close} >
                <i className="material-icons" style={{display: 'inline-block'}}>contact_phone</i>
                <span className="sideName">Get a member</span>
            </Link>
            <Link to="/dashboard/plan" id="dashPlan" className="nItem" onClick={this.close} >
                <i className="material-icons" style={{display: 'inline-block'}}>timelapse</i>
                <span className="sideName">Plan Desk Duties</span>
            </Link>
            <Link to="/dashboard/statistics" id="dashStat" className="nItem" onClick={this.close} >
                <i className="material-icons" style={{display: 'inline-block'}}>access_time</i>
                <span className="sideName">Timing Statistics</span>
            </Link>
            
            
        </div>

        <div style={{marginTop:40,position: 'absolute', bottom:0, width:'100%'}}>
            <Link to="/dashboard/settings" className="nItem" id="dashSettings" onClick={this.close}>
                <i className="material-icons" style={{display: 'inline-block'}}>settings</i>
                <span className="sideName">Settings</span>
            </Link>
            <div style={{cursor:'pointer'}} id="dashLogout" className="nItem" onClick={this.logout} >
                <i className="material-icons" style={{display: 'inline-block'}}>all_out</i>
                <span className="sideName">Logout</span>
            </div>
        </div>
        </div>
        </nav>
        )
    }
}