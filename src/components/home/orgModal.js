import React, {Component} from 'react'
import OrgLogin from './org_login'
import OrgSignUp from './org_reg'

export default class extends Component{
    constructor(props){
        super(props)
        this.state={showSignUp:false}
        this.changeForm=this.changeForm.bind(this)
        this.modal=this.modal.bind(this)
    }
    changeForm(e){
        this.setState({showSignUp:e})
    }
    modal(){
        if(this.state.showSignUp){
            return <OrgSignUp  change={this.changeForm}/>
        }
        return <OrgLogin change={this.changeForm}/>
    }
    render(){
        return(
        <div id="orgReg" className="modal" style={{top:'5%!important', maxHeight:'85%'}}>
            <div className="modal-content">
            {this.modal()}
            </div>
        </div> 
        )
        
    }
}