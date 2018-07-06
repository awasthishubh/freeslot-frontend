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
        return(
        <nav id="slide-out" id="bottomLeftDash" class="sidenav sideNav grey darken-4" style={navStyle}>
            
        <div className="row" >
            <div class="" style={{marginTop:40}}>
            <a href="#!" class="nItem active">
                <i class="material-icons" style={{display: 'inline-block'}}>home</i>
                <span className="sideName">Home</span>
            </a>
            <a href="#!" class="nItem">
                <i class="material-icons" style={{display: 'inline-block'}}>people</i>
                <span className="sideName">Members</span>
            </a>
            <a href="#!" class="nItem">
                <i class="material-icons" style={{display: 'inline-block'}}>person_add</i>
                <span className="sideName">Member Requests</span>
                <span class="new badge">4</span>
            </a>
            <a href="#!" class="nItem">
                <i class="material-icons" style={{display: 'inline-block'}}>person_pin</i>
                <span className="sideName">Find a member</span>
            </a>
            <a href="#!" class="nItem">
                <i class="material-icons" style={{display: 'inline-block'}}>contact_phone</i>
                <span className="sideName">Get a member</span>
            </a>
            
        </div>

        <div style={{marginTop:40,position: 'absolute', bottom:0, width:'100%'}}>
            <a href="#!" class="nItem">
                <i class="material-icons" style={{display: 'inline-block'}}>settings</i>
                <span className="sideName">Settings</span>
            </a>
            <a href="#!" class="nItem">
                <i class="material-icons" style={{display: 'inline-block'}}>all_out</i>
                <span className="sideName">Logout</span>
            </a>
        </div>
            {/* <div class="img" >
                <img class="circle col s12 responsive-img" style={{padding:25}} src="https://blog.codinghorror.com/content/images/2016/01/discourse-default-avatar-a.png" alt="" />
            </div>
            <a><div style={{fontSize:25, textAlign:'center', lineHeight:1.5, margin:10}}>
                <b>Association Of Computer Machinery</b>
            </div></a>
            
            <div class="grey-text" style={{fontSize:20, textAlign:'center', lineHeight:1.5, margin:10}}>
                @acm
            </div>
            
            <div style={{fontSize:20, textAlign:'center', lineHeight:1.5, margin:10}}>
                Technology Matters Matters Matters!
            </div>
            <div style={{fontSize:20, textAlign:'center', lineHeight:1.5, margin:10}}>
            </div> */}
        </div>
        </nav>
        )
    }
}