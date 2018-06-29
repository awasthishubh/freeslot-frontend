import {Component} from 'react'
import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import {updateData} from '../actions/index.js'

class Org_reg extends Component {
    render(){
        console.log(this.props)
        return(
            <div className="card" id="">
                <div className="card-content row">    
                    <div className="input-field col s12">
                        <input id='org_name' type="text" value={this.props.OrgReg.name}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_NAME')}} />
                        <label htmlFor='org_name'>Name Of Organisation</label>
                    </div>

                    <div className="input-field col s12">
                        <input id='org_id' type="text" value={this.props.OrgReg.usid}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_USID')}} />
                        <label htmlFor='org_id'>Unique Id for Ogranisation</label>
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
                                <input id='org_main_email' type="text" value={this.props.OrgReg.mainEmain}  onChange={(e)=>{this.props.updateData(e.target.value, 'UPDATE_ORG_MAIN-EMAIL')}} />
                                <label htmlFor='org_main_email'>Email</label>
                            </div>
                            <div className="col s3">
                                @vitstudent.ac.in
                            </div>
                        </div>
                    </fieldset>
                    <center><a className="waves-effect waves-light btn">Verify and Register</a></center>
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({updateData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Org_reg)