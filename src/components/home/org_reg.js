import {Component} from 'react'
import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {updateData, isAvailableUpdate} from '../../actions/index.js'
import axios from 'axios'
import serverBaseURL from '../../serverBaseURL';
import Cookies from 'js-cookie'
var typingTimer

class Org_reg extends Component {
    constructor(props){
        super(props)
        this.orgChange=this.orgChange.bind(this)
        this.send=this.send.bind(this)
        this.checkPass=this.checkPass.bind(this)
        this.passValidiate=this.passValidiate.bind(this)
        this.vailidate=this.vailidate.bind(this)
        this.state={stat:null}
    }
    componentDidMount(){
        function receiveMessage(event){
            if(event.data.token){
                Cookies.set('token', event.data.token, { expires: 7 });
                window.location.href = "/dashboard";
                window.location.reload();
            }
        }
        window.addEventListener("message", receiveMessage, false);
    }
    async orgChange(e){
        document.querySelector("#org_id").classList.remove('valid')
        document.querySelector("#org_id").classList.remove('invalid')
        var value=e.target.value.toLowerCase()
        this.props.updateData(value, 'UPDATE_ORG_USID')
        if(value==='') return this.props.updateData(null, 'VALIDIATE_ORG_USID');
        this.props.updateData("loading", 'VALIDIATE_ORG_USID');
        clearTimeout(typingTimer);
        var updateData=this.props.updateData
        typingTimer = setTimeout(async function(){
            var available=null
            try{
                available= (await axios.get(serverBaseURL+'/organisations/avbl?usid='+value)).data.available
            } catch(e){
                if(e.response.data.available===false) available=false
            }
            if(available){
                updateData(true, 'VALIDIATE_ORG_USID');
                document.querySelector("#org_id").classList.add('valid')
            } else{
                updateData(false, 'VALIDIATE_ORG_USID');
                document.querySelector("#org_id").classList.add('invalid')
            }
        }, 2000)
    }
    async send(e){
        localStorage.clear()
        e.preventDefault()
        var vailidation=this.props.validation
        if(vailidation.usid && vailidation.passwd && vailidation.name && vailidation.cPasswd && vailidation.usid!=="loading")
        {
            var form = new FormData();
            form.append('usid',this.props.OrgReg.usid)
            form.append('passwd',this.props.OrgReg.passwd)
            form.append('name',this.props.OrgReg.name)
            form.append('descr',this.props.OrgReg.descr)
            form.append('dp',this.props.OrgReg.dp)
            this.setState({stat:'Sending...'})
            var data= await axios.post(serverBaseURL+'/organisations',form)
            Cookies.set('token', data.data.token, { expires: 7 });
            window.location.href = "/dashboard";

            // var dp=this.props.OrgReg.dp
            // if(!dp) dp='https://www.hackworks.com/img/account/default-team-avatar.png'
            // var url= serverBaseURL+'/oauth/'
            // var params=`?usid=${this.props.OrgReg.usid}&passwd=${this.props.OrgReg.passwd}&name=${this.props.OrgReg.name}&mail_id=${this.props.OrgReg.mainEmail}@vitstudent.ac.in&descr=${this.props.OrgReg.descr}&dp=${dp}&redirect=${window.location.protocol+'//'+window.location.host+'/close.htm'}`
            // window.open(url+params,null,'height=480,width=640')
            // this.setState({stat:null})
            // console.log(111, params)
        }
    }
    passValidiate(e){
        document.querySelector("#org_pass").classList.remove('invalid')
        document.querySelector("#org_pass").classList.remove('valid')
        this.props.updateData(e.target.value, 'UPDATE_ORG_PASSWD')
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
        {    if(e.target.value===this.props.OrgReg.passwd){
                document.querySelector("#org_pass_c").classList.add('valid')
                this.props.updateData(true, 'VALIDIATE_ORG_CPASSWD');
            }
            else{
                document.querySelector("#org_pass_c").classList.add('invalid')
                this.props.updateData(false, 'VALIDIATE_ORG_CPASSWD');
            }
        }
    }
    vailidate(e, id){
        this.props.updateData(e.target.value, 'UPDATE_'+id);
        e.target.classList.remove('invalid')
        e.target.classList.remove('valid')
        if(!e.target.value){
            this.props.updateData(false, 'VALIDIATE_'+id);
            e.target.classList.add('invalid')
        }
        else{
            e.target.classList.add('valid')
            this.props.updateData(true, 'VALIDIATE_'+id);
        }
    }

    render(){
        return(
            <div className="row">   
                <h5><center>Enter Details Of Ogranisation</center></h5> 
                <form onSubmit={this.send}>
                        <div className="input-field col s12 m6">
                            <input id='org_name' type="text" value={this.props.OrgReg.name}  onChange={(e)=>{this.vailidate(e,'ORG_NAME')}} />
                            <label htmlFor='org_name' >Name Of Organisation</label>
                            <span className="helper-text" data-error="Name is required"></span>
                        </div>
                        
                        <div>
                            <div className="input-field col s12 m6">
                                <input  autoComplete="off" className="" id='org_id' type="text" value={this.props.OrgReg.usid} onChange={this.orgChange} />
                                <label htmlFor='org_id'>Unique Id for Ogranisation</label>
                                <span className="helper-text" data-error="That username is taken. Try another" data-success="Available">{function(e){if(e.props.validation.usid==="loading") return 'Checking...'}(this)}
                                </span>
                            </div>
                        </div>
                        <fieldset>
                            <legend>Optional Details</legend>
                            <div className="input-field col s12 m6">
                                <input className="validate" required="" aria-required="true" id='org_dp' type="text" value={this.props.OrgReg.dp}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_DP')}} />
                                <label htmlFor='org_dp'>Gravatar Email ID</label>
                            </div>
                            <div className="input-field col s12 m6">
                                <input className="validate" required="" aria-required="true" id='org_descr' type="text" value={this.props.OrgReg.descr}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_DESCR')}} />
                                <label htmlFor='org_descr'>Tag line</label>
                            </div>
                        </fieldset>
                        
                        <div className="input-field col s12 m6">
                            <input id='org_pass' type="password" value={this.props.OrgReg.passwd}  onChange={this.passValidiate} />
                            <label htmlFor='org_pass'>Password</label>
                            <span className="helper-text" data-error="Password must have atleast 4 characters"></span>
                        </div>
                        <div className="input-field col s12 m6">
                            <input id='org_pass_c' type="password" value={this.props.OrgReg.cPasswd}  onChange={this.checkPass} />
                            <label htmlFor='org_pass_c'>Confirm Password</label>
                            <span className="helper-text" data-error="Passwords do not match" data-success="Password matched"></span>
                        </div>
                        {/* <fieldset>
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
                                    <input style={{fontSize:14}} disabled value="@vitstudent.ac.in" type="text" />
                                </div>
                            </div>
                        </fieldset> */}
                    <center><input type='submit' value="Verify and Register" className="waves-effect waves-light btn"/></center>
                    {this.state.stat}
                    </form>
                    <div className="col s12" style={{marginTop:10,textAlign:'right', color:'grey'}}>
                        {/* eslint-disable-next-line */}
                        <a style={{cursor:'pointer'}} onClick={(e)=>this.props.change(false)}>Already registered?</a>
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