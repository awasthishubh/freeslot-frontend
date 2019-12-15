import React, {Component} from 'react'
import M from 'materialize-css'
import RegModal from './regModal'
import OrgModal from './orgModal'
import Cookies from 'js-cookie'
var backStyle={
    position: 'absolute',
    top: 0,
    bottom:0,
    left:0,
    right:0,
    overflowY:'auto',
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return false
}

export default class extends Component{
    componentDidMount(){
        // console.log(document.getElementsByClassName('tabs'))
        document.title = "Home | FreeSlot"
        M.Tabs.init(document.getElementsByClassName('tabs'))
        M.Modal.init(document.querySelectorAll('.modal'))
        try{
            if(JSON.parse(window.atob(getQueryVariable('data'))).slots)
            M.Modal.getInstance(document.getElementById('memReg')).open()
        } catch(e){}
        
        
    }
    orgClick(){
        if(Cookies.get('token')) window.location.href='/dashboard'
        else M.Modal.getInstance(document.getElementById('orgReg')).open();
    }
    memClick(){
        M.Modal.getInstance(document.getElementById('memReg')).open();
    }

    render(){
        return(
            <div style={backStyle} className="homeBack">
            <div><img src="ico.png" alt="icon" style={{ position: 'absolute', top: 20, left: 20, width: 50}}/></div>
            <div style={{position: 'absolute',top: '29vh', width: '100%', textAlign:'center', color:'black'}}>
                <h1 className="titleHome" style={{fontWeight:900, marginBottom:0}}>FreeSlot</h1>
                <div className="despHome" style={{fontSize:15}} >A simple application to manage your team.</div>
            </div>

            <div className="row" style={{fontSize:20, position: 'absolute',top: '52vh', width: '100%', textAlign:'center'}}>
                <div style={{fontSize:20, color:'black',fontWeight:300}}>Continue as</div>

                <button onClick={this.memClick} className="hvr-grow waves-effect waves-ligh hoverable homebtn col offset-l3 offset-s1 offset-m2 m3 l2 s4 btn-large"
                     style={{overflow:'hidden', color:'#004ec3', fontWeight:700}}>
                    <i className="hide-on-small-only material-icons left">person</i>Member
                </button>
                <div className="col l2 s1 m2" style={{margin: '0 auto'}}></div>
                <button onClick={this.orgClick} className="hvr-grow waves-effect waves-ligh hoverable homebtn col m3 l2 s5 btn-large" 
                    style={{overflow:'hidden', color:'#004ec3',fontWeight:700}} >
                    Organisation
                    <i className="hide-on-small-only material-icons right">people</i>
                </button>
            </div>
            <RegModal/>
            <OrgModal/>
                
            </div>
        )
    }
}