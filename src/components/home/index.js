import React, {Component} from 'react'
import M from 'materialize-css'
import RegModal from './regModal'
import OrgModal from './orgModal'
var backStyle={
    position: 'absolute',
    top: 0,
    bottom:0,
    left:0,
    right:0,
    overflowY:'auto',
}
export default class extends Component{
    componentDidMount(){
        // console.log(document.getElementsByClassName('tabs'))
        document.title = "FreeSlots | Home"
        M.Tabs.init(document.getElementsByClassName('tabs'))
        M.Modal.init(document.querySelectorAll('.modal'))
    }
    render(){
        return(
            <div style={backStyle} className="homeBack">

            <div style={{position: 'absolute',top: '20vh', width: '100%', textAlign:'center', color:'white'}}>
                <h3 className="titleHome">FreeSlots</h3>
                <div className="despHome" style={{fontSize:20}} >A simple to use application to manage your team.</div>
            </div>

            <div className="row" style={{fontSize:20, position: 'absolute',top: '60%', width: '100%', textAlign:'center'}}>
                <div style={{fontSize:20, color:'white'}}>Continue as</div>

                <a href="#memReg" className="hvr-grow waves-effect waves-ligh hoverable modal-trigger homebtn col offset-l3 offset-s1 offset-m2 m3 l2 s4 btn-large">
                    <i className="hide-on-small-only material-icons left">person</i>Member
                </a>
                <a  href="#orgReg" className="hvr-grow waves-effect waves-ligh hoverable modal-trigger homebtn col  offset-l2  offset-s1  offset-m2 m3 l2 s5 btn-large" style={{overflow:'hidden'}} >
                    <i className="hide-on-small-only material-icons right">people</i>Organisation
                </a>
            </div>
            <RegModal/>
            <OrgModal/>
                
            </div>
        )
    }
}