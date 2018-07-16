import {Component} from 'react'
import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {updateData, isAvailableUpdate} from '../actions/index.js'
import axios from 'axios'
import serverBaseURL from '../serverBaseURL';

var typingTimer

class Org_reg extends Component {
    constructor(props){
        super(props)
        this.orgChange=this.orgChange.bind(this)
        this.send=this.send.bind(this)
        this.checkPass=this.checkPass.bind(this)
        this.passValidiate=this.passValidiate.bind(this)
        this.vailidate=this.vailidate.bind(this)
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
        var updateData=this.props.updateData
        typingTimer = setTimeout(async function(){
        try{
            var data= await axios.get(serverBaseURL+'/organisations')
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
                updateData(true, 'VALIDIATE_ORG_USID');
                document.querySelector("#org_id").classList.add('valid')
            } else{
                updateData(false, 'VALIDIATE_ORG_USID');
                document.querySelector("#org_id").classList.add('invalid')
            }
            console.log(isAvailable)
        } catch(e){
            console.log(e)
            alert('Server Error')
        }
    }, 2000)
        
        
    }
    send(e){
        // console.log(111, this.props.OrgReg)
        e.preventDefault()
        var vailidation=this.props.validation
        console.log(this.vailidation)
        console.log(vailidation.usid && vailidation.passwd && vailidation.name && vailidation.mainEmail && vailidation.cPasswd)
        if(vailidation.usid && vailidation.passwd && vailidation.name && vailidation.mainEmail && vailidation.cPasswd )
        {
            var url= serverBaseURL+'/oauth/'
            var params=`?usid=${this.props.OrgReg.usid}&passwd=${this.props.OrgReg.passwd}&name=${this.props.OrgReg.name}&mail_id=${this.props.OrgReg.mainEmail}@vitstudent.ac.in&descr=${this.props.OrgReg.descr}`
            window.open(url+params,null,'height=480,width=640')
            console.log(111, params)
        }
    }
    passValidiate(e){
        document.querySelector("#org_pass").classList.remove('invalid')
        document.querySelector("#org_pass").classList.remove('valid')
        this.props.updateData(e.target.value, 'UPDATE_ORG_PASSWD')
        console.log(e.target.value.length)
        if(e.target.value.length<4){
            document.querySelector("#org_pass").classList.add('invalid')
            this.props.updateData(false, 'VALIDIATE_ORG_PASSWD');
        }
        else{
            document.querySelector("#org_pass").classList.add('valid')
            this.props.updateData(true, 'VALIDIATE_ORG_PASSWD');
        }
        document.querySelector("#org_pass_c").classList.remove('invalid')
        document.querySelector("#org_pass_c").classList.remove('valid')
    }
    checkPass(e){
        this.props.updateData(e.target.value, 'UPDATE_ORG_CPASSWD')
        document.querySelector("#org_pass_c").classList.remove('invalid')
        document.querySelector("#org_pass_c").classList.remove('valid')
        if(this.props.validation.passwd)
        {    if(e.target.value==this.props.OrgReg.passwd){
                document.querySelector("#org_pass_c").classList.add('valid')
                this.props.updateData(true, 'VALIDIATE_ORG_CPASSWD');
            }
            else{
                document.querySelector("#org_pass_c").classList.add('invalid')
                this.props.updateData(false, 'VALIDIATE_ORG_CPASSWD');
            }4
        }
    }
    vailidate(e, id){
        this.props.updateData(e.target.value, 'UPDATE_'+id);
        e.target.classList.remove('invalid')
        e.target.classList.remove('valid')
        if(e.target.value==''){
            this.props.updateData(false, 'VALIDIATE_'+id);
            e.target.classList.add('invalid')
        }
        else{
            e.target.classList.add('valid')
            this.props.updateData(true, 'VALIDIATE_'+id);
        }
    }

    render(){
        console.log(this.props)
        return(
            <div className="card" id="">
                <div className="card-content row">    
                <form>
                    <div className="input-field col s12">
                        <input id='org_name' type="text" value={this.props.OrgReg.name}  onChange={(e)=>{this.vailidate(e,'ORG_NAME')}} />
                        <label htmlFor='org_name' >Name Of Organisation</label>
                        <span className="helper-text" data-error="Name is required"></span>
                    </div>
                    <div className="input-field col s12">
                        <input className="validate" required="" aria-required="true" id='org_descr' type="text" value={this.props.OrgReg.descr}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_DESCR')}} />
                        <label htmlFor='org_descr'>Tag line</label>
                    </div>
                    <div>
                        <div className="input-field col s12">
                            <input className="" id='org_id' type="text" value={this.props.OrgReg.usid} onChange={this.orgChange} />
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
                                <input id='org_main_email' type="text" value={this.props.OrgReg.mainEmail}  onChange={(e)=>{this.vailidate(e,'ORG_MAIN-EMAIL')}} />
                                <label htmlFor='org_main_email'>Email</label>
                                <span className="helper-text" data-error="Maintainer ID is required"></span>
                            </div>
                            <div className="input-field col s5" style={{paddingLeft:"0px"}}>
                                <input disabled value="@vitstudent.ac.in" type="text" />
                            </div>
                        </div>
                    </fieldset>
                    <center><a className="waves-effect waves-light btn" onClick={this.send}>Verify and Register</a></center>
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