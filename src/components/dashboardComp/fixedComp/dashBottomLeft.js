import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'

var navStyle={
    position: 'fixed',
    width: '300px',
    height: 'auto',
    bottom: 0,
    top:'64px',
    left: '0px',
    zIndex: 10
}

export default class extends Component{
    constructor(props){
        super(props)
        this.clicked= this.clicked.bind(this)
    }

    componentDidUpdate(){
        if(document.getElementById(this.props.selected)){
            document.getElementById(this.props.selected).classList.add('active')
        }
    }

    clicked(e){
        console.log('selected', document.getElementById(this.props.selected))
        if(document.getElementById(this.props.selected)){
            document.getElementById(this.props.selected).classList.remove('active')
        }
        // e.preventDefault()
        console.log(e.target.parentNode)
        if(e.target.id) this.props.select(e.target.id)
        else this.props.select(e.target.parentNode.id)
    }
    
    render(){
        console.log('bottomLeft',this.props)
        var mems
        return(
        <nav id="slide-out" id="bottomLeftDash" className="sidenav sideNav grey darken-4" style={navStyle}>
            
        <div className="row" >
            <div className="" style={{marginTop:40}}>
            <Link id="dashHome" to="/dashboard/home" className="nItem" onClick={this.clicked}>
                <i className="material-icons" style={{display: 'inline-block'}}>home</i>
                <span className="sideName">Home</span>
            </Link>
            <Link to="/dashboard/members" id="dashMems" className="nItem" onClick={this.clicked}>
                <i className="material-icons" style={{display: 'inline-block'}}>people</i>
                <span className="sideName">Members</span>
                <span className="badge">{(mems=this.props.members)?mems.length:0}</span>
            </Link>
            <Link to="/dashboard/requests" id="dashReqs" className="nItem" onClick={this.clicked}>
                <i className="material-icons" style={{display: 'inline-block'}}>person_add</i>
                <span className="sideName">Member Requests</span>
                <span className="new badge">{(mems=this.props.requests)?mems.length:0}</span>
            </Link>
            {/* <Link to="/dashboard/find" href="#!" className="nItem" onClick={this.clicked}>
                <i className="material-icons" style={{display: 'inline-block'}}>person_pin</i>
                <span className="sideName">Find a member</span>
            </Link> */}
            <Link to="/dashboard/find" id="dashGetMem" href="#!" className="nItem" onClick={this.clicked}>
                <i className="material-icons" style={{display: 'inline-block'}}>contact_phone</i>
                <span className="sideName">Get a member</span>
            </Link>
            
        </div>

        <div id="dashHome" style={{marginTop:40,position: 'absolute', bottom:0, width:'100%'}}>
            <Link to="/dashboard/find" href="#!" className="nItem" onClick={this.clicked}>
                <i className="material-icons" style={{display: 'inline-block'}}>settings</i>
                <span className="sideName">Settings</span>
            </Link>
            <Link to="/dashboard/find" id="dashHome" href="#!" className="nItem" onClick={this.clicked}>
                <i className="material-icons" style={{display: 'inline-block'}}>all_out</i>
                <span className="sideName">Logout</span>
            </Link>
        </div>
        </div>
        </nav>
        )
    }
}