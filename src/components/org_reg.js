import {Component} from 'react'
import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {updateData, isAvailableUpdate} from '../actions/index.js'
import axios from 'axios'

function IsAvailable(props){
    console.log(props)
    if(props.available===true){
        return <div>Yo</div>
    }
    if(props.available===false){
        return <div>No</div>
    }
    if(props.available==='loading'){
        return <div>...</div>
    }
    return <div></div>
}

var typingTimer

class Org_reg extends Component {
    constructor(props){
        super(props)
        this.orgChange=this.orgChange.bind(this)
        this.send=this.send.bind(this)
    }
    async orgChange(e){
        var value=e.target.value.toLowerCase()
        var isAvailableUpdate=this.props.isAvailableUpdate
        this.props.updateData(value, 'UPDATE_ORG_USID')
        if(value=='') return isAvailableUpdate(null)
        isAvailableUpdate('loading')
        clearTimeout(typingTimer);
        typingTimer = setTimeout(async function(){
            var data= await axios.get('http://localhost:5000/organisations')
            console.log(data)
            var isAvailable=true;
            data.data.map(function(data){
                if(data.usid===value){
                    console.log(data.usid)
                    isAvailable = false
                }
            })
            console.log(isAvailable)
            isAvailableUpdate(isAvailable)
        }, 2000)
        
        
    }
    send(){
        // console.log(111, this.props.OrgReg)
        var url= 'http://localhost:5000/oauth/'
        var params=`?usid=${this.props.OrgReg.usid}&passwd=${this.props.OrgReg.passwd}&name=${this.props.OrgReg.name}&mail_id=${this.props.OrgReg.mainEmail}@vitstudent.ac.in&descr=${this.props.OrgReg.descr}`
        open(url+params,null,'height=480,width=640')
        console.log(111, params)
    }
    render(){
        console.log(this.props)
        return(
            <div className="card" id="">
                <div className="card-content row">    
                    <div className="input-field col s12">
                        <input id='org_name' type="text" value={this.props.OrgReg.name}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_NAME')}} />
                        <label htmlFor='org_name'>Name Of Organisation</label>
                    </div>

                    <div>
                        <div className="input-field col s10">
                            <input className="validate" id='org_id' type="text" value={this.props.OrgReg.usid} onChange={this.orgChange} />
                            <label htmlFor='org_id'>Unique Id for Ogranisation</label>
                        </div>
                        <div className="col s2">
                            <IsAvailable available={this.props.usidIsAvailable} />
                        </div>
                    </div>

                    <div className="input-field col s12">
                        <input id='org_descr' type="text" value={this.props.OrgReg.descr}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_DESCR')}} />
                        <label htmlFor='org_descr'>Tag line</label>
                    </div>

                    <div className="input-field col s12">
                        <input id='org_pass' type="password" value={this.props.OrgReg.pass}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_PASSWD')}} />
                        <label htmlFor='org_pass'>Password</label>
                    </div>
                    <div className="input-field col s12">
                        <input id='org_pass_c' type="password" value={this.props.OrgReg.cpass}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_CPASSWD')}} />
                        <label htmlFor='org_pass_c'>Confirm Password</label>
                    </div>
                    <fieldset>
                        <legend>Maintainer Details</legend>
                        <div className="input-field col s12">
                            <input id='org_main_name' type="text" value={this.props.OrgReg.mainName}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_MAIN-NAME')}} />
                            <label htmlFor='org_main_name'>Name</label>
                        </div>
                        <div>
                            <div className="input-field col s9">
                                <input id='org_main_email' type="text" value={this.props.OrgReg.mainEmail}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_MAIN-EMAIL')}} />
                                <label htmlFor='org_main_email'>Email</label>
                            </div>
                            <div className="col s3">
                                @vitstudent.ac.in
                            </div>
                        </div>
                    </fieldset>
                    <center><a className="waves-effect waves-light btn" onClick={this.send}>Verify and Register</a></center>
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({updateData, isAvailableUpdate}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Org_reg)