import {Component} from 'react'
import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {updateData, isAvailableUpdate} from '../actions/index.js'
import axios from 'axios'

var typingTimer

class Org_reg extends Component {
    constructor(props){
        super(props)
        this.orgChange=this.orgChange.bind(this)
        this.send=this.send.bind(this)
        this.checkPass=this.checkPass.bind(this)
        this.passValidiate=this.passValidiate.bind(this)
        this.isEmpty=this.isEmpty.bind(this)
    }
    async orgChange(e){
        document.querySelector("#org_id").classList.remove('valid')
        document.querySelector("#org_id").classList.remove('invalid')
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
            isAvailableUpdate(isAvailable)

            if(isAvailable){
                document.querySelector("#org_id").classList.add('valid')
            } else{
                document.querySelector("#org_id").classList.add('invalid')
            }
            console.log(isAvailable)
        }, 2000)
        
        
    }
    send(){
        // console.log(111, this.props.OrgReg)
        var url= 'http://localhost:5000/oauth/'
        var params=`?usid=${this.props.OrgReg.usid}&passwd=${this.props.OrgReg.passwd}&name=${this.props.OrgReg.name}&mail_id=${this.props.OrgReg.mainEmail}@vitstudent.ac.in&descr=${this.props.OrgReg.descr}`
        open(url+params,null,'height=480,width=640')
        console.log(111, params)
    }
    passValidiate(e){
        document.querySelector("#org_pass").classList.remove('invalid')
        document.querySelector("#org_pass").classList.remove('valid')
        this.props.updateData(e.target.value, 'UPDATE_ORG_PASSWD')
        console.log(e.target.value.length)
        if(e.target.value.length<4) 
            document.querySelector("#org_pass").classList.add('invalid')
        else
            document.querySelector("#org_pass").classList.add('valid')
        document.querySelector("#org_pass_c").classList.remove('invalid')
        document.querySelector("#org_pass_c").classList.remove('valid')
    }
    checkPass(e){
        this.props.updateData(e.target.value, 'UPDATE_ORG_CPASSWD')
        document.querySelector("#org_pass_c").classList.remove('invalid')
        document.querySelector("#org_pass_c").classList.remove('valid')
        if(e.target.value==this.props.OrgReg.passwd)
        document.querySelector("#org_pass_c").classList.add('valid')
        else
        document.querySelector("#org_pass_c").classList.add('invalid')
    }
    isEmpty(e){
        e.target.classList.remove('invalid')
        e.target.classList.remove('valid')
        if(e.target.value==''){
            e.target.classList.add('invalid')
        }
    }

    render(){
        console.log(this.props)
        return(
            <div className="card" id="">
                <div className="card-content row">    
                <form>
                    <div className="input-field col s12">
                        <input id='org_name' type="text" value={this.props.OrgReg.name}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_NAME'); this.isEmpty(e)}} />
                        <label htmlFor='org_name' >Name Of Organisation</label>
                        <span className="helper-text" data-error="Name is required"></span>
                    </div>
                    <div className="input-field col s12">
                        <input className="validate" required="" aria-required="true" id='org_descr' type="text" value={this.props.OrgReg.descr}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_DESCR')}} />
                        <label htmlFor='org_descr'>Tag line</label>
                    </div>
                    <div>
                        <div className="input-field col s12">
                            <input className="validate" id='org_id' type="text" value={this.props.OrgReg.usid} onChange={this.orgChange} />
                            <label htmlFor='org_id'>Unique Id for Ogranisation</label>
                            <span className="helper-text" data-error="That username is taken. Try another" data-success="Available">{function(e){if(e.props.usidIsAvailable=='loading') return 'Checking...'}(this)}
                            </span>
                        </div>
                    </div>

                    <div className="input-field col s12">
                        <input id='org_pass' type="password" value={this.props.OrgReg.passwd}  onChange={this.passValidiate} />
                        <label htmlFor='org_pass'>Password</label>
                        <span className="helper-text" data-error="Password must have atleast 4 characters"></span>
                    </div>
                    <div className="input-field col s12">
                        <input id='org_pass_c' type="password" value={this.props.OrgReg.cPasswd}  onChange={this.checkPass} />
                        <label htmlFor='org_pass_c'>Confirm Password</label>
                        <span className="helper-text" data-error="Passwords do not match" data-success="Password matched"></span>
                    </div>
                    <fieldset>
                        <legend>Maintainer Details</legend>
                        <div className="input-field col s12">
                            <input id='org_main_name' type="text" value={this.props.OrgReg.mainName}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_MAIN-NAME')}} />
                            <label htmlFor='org_main_name'>Name</label>
                        </div>
                        <div>
                            <div className="input-field col s7" style={{paddingRight:"0px"}}>
                                <input id='org_main_email' type="text" value={this.props.OrgReg.mainEmail}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_MAIN-EMAIL'); this.isEmpty(e)}} />
                                <label htmlFor='org_main_email'>Email</label>
                                <span className="helper-text" data-error="Maintainer ID is required"></span>
                            </div>
                            <div className="input-field col s5" style={{paddingLeft:"0px"}}>
                                <input disabled value="@vitstudent.ac.in" type="text" />
                            </div>
                        </div>
                    </fieldset>
                    <center><input type="submit" className="waves-effect waves-light btn" /></center>
                    </form>
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