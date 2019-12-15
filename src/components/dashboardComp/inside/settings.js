import React, {Component} from 'react'
import $ from 'jquery'
import axios from 'axios'
import serverBaseURL from '../../../serverBaseURL';

export default class extends Component{
    constructor(props){
        super(props)
        this.state={org:null}
        this.deFocus=this.deFocus.bind(this)
        this.changed=this.changed.bind(this)
        this.okay=true
        this.cpassChange=this.cpassChange.bind(this)
        this.submit=this.submit.bind(this)
    }
    componentDidUpdate(){
        if(!this.props.org && this.props.loggedIn) this.props.updateOrg()
        if(this.props.org && this.okay){
            this.componentDidMount()
            this.okay=false
        }
    }
    componentDidMount(){
        this.props.updateData(true,'UPDATE_ORG_LOGGED')
        if(!this.props.org) this.props.updateOrg()
        document.getElementById('dashSettings').classList.add('active')
        if(this.props.org){
            var org = Object.assign({}, this.props.org.details);
            org.passwd=''
            org.newCpasswd=''
            org.newPasswd=''
            this.setState({org})
        }
    }
    componentWillUnmount(){
        document.getElementById('dashSettings').classList.remove('active')
    }

    enableInput(e){
        e.preventDefault()
        var parent=$(e.target).parents('.parentInput')[0]
        var parnt2=$(parent).children('.input-field')[0]
        var target=$(parnt2).children()[0]
        $(target).prop('disabled', false)
        $(target).focus()
    }
    deFocus(e){
        $(e.target).prop('disabled', true)
        if(e.target.value!==this.props.org[e.target.id]){
            e.target.classList.add('valid')
        }
        else e.target.classList.remove('valid')
    }
    changed(e){
        e.target.classList.remove('invalid')
        e.target.classList.remove('valid')
        var org=this.state.org
        org[e.target.id]=e.target.value
        this.setState({org})
    }
    passChange(e){
        e.target.classList.remove('invalid')
        e.target.classList.remove('valid')
        if(e.target.value.length){
            if(e.target.value.length<4){
                e.target.classList.add('invalid')
            }
            else e.target.classList.add('valid')
        }
    }
    cpassChange(e){
        if(e.target.value.length){
            if(this.state.org.newPasswd===this.state.org.newCpasswd)
                return e.target.classList.add('valid')
            return e.target.classList.add('invalid')
        }
    }
    async submit(e){
        e.preventDefault()
        this.setState({err:null, status:null, msg:null})
        var form=new FormData()
        if(this.state.org.passwd.length>=4){
            form.append('name',this.state.org.name)
            form.append('descr',this.state.org.descr)
            form.append('gravatar',this.state.org.gravatar)
            form.append('passwd',this.state.org.passwd)
            if(this.state.org.newPasswd){
                if(this.state.org.newPasswd.length>=4 && this.state.org.newPasswd===this.state.org.newCpasswd)
                    form.append('newPasswd',this.state.org.newPasswd)
                else return this.setState({err:'Enter a valid new password'})
            }
            form.append('usid',this.state.org.usid)
            this.setState({status:'Saving...'})
            try{
                await axios.patch(serverBaseURL+'/auth',form)
                this.setState({status:null})
                this.setState({msg:'Saved.'})
                this.state.org.passwd=this.state.org.newCpasswd=this.state.org.newPasswd=''
                this.setState({org:this.state.org})
                this.props.org.details= Object.assign({},this.state.org)
                this.props.org.details.passwd=this.props.org.details.newCpasswd=this.props.org.details.newPasswd=undefined
                // this.props.org.details={
                //     name:this.state.org.name,
                //     descr: this.state.org.descr,
                //     dp: this.state.org.dp,
                //     usid: this.state.org.descr,
                //     descr: this.state.org.descr,
                //     descr: this.state.org.descr,
                // }
                this.props.updateData(null,'UPDATE_ORG_DETAILS')
                
            } catch(e){
                if(e.response.status===401){
                    this.setState({err:'Wrong password entered'})
                    this.setState({msg:null})
                    this.setState({status:null})
                }
                else alert('server error')
            }
            return
        }
        return this.setState({err:'Enter your valid password'})


    }

    render(){
        if(this.state.org)
            return(
                <div className="card">
                    <div className="card-content">
                        <div className="card-title">Edit Organization Details</div>
                        <div className="container row" style={{marginTop: 40}}>
                        <form onSubmit={this.submit}>
                            <div className="parentInput">
                                <div className="col inputSideTitle s12">Name of Organization:</div>
                                <div  className="input-field col s10 offset-s1">
                                    <input id="name" className="" disabled type="text" value={this.state.org.name} onChange={this.changed} style={{color:'#37474f'}} onBlur={this.deFocus}/>
                                </div>
                                <div className="col s1" style={{padding:0}}>
                                <button style={{cursor:'pointer'}} onClick={this.enableInput}><i className="black-text material-icons prefix"  >edit</i></button>
                                </div>
                            </div>

                            <div className="parentInput">
                                <div className="col inputSideTitle s12">Tag line:</div>
                                <div  className="input-field col s10 offset-s1">
                                    <input id="descr" className="" disabled type="text" value={this.state.org.descr} onChange={this.changed} style={{color:'#37474f'}} onBlur={this.deFocus}/>
                                </div>
                                <div className="col s1" style={{padding:0}}>
                                <button style={{cursor:'pointer'}} onClick={this.enableInput}><i className="black-text material-icons prefix"  >edit</i></button>
                                </div>
                            </div>

                            <div className="parentInput">
                                <div className="col inputSideTitle s12">Gravatar Email ID:</div>
                                <div  className="input-field col s10 offset-s1">
                                    <input id="gravatar" className="" disabled type="text" value={this.state.org.gravatar} onChange={this.changed} style={{color:'#37474f'}} onBlur={this.deFocus}/>
                                </div>
                                <div className="col s1" style={{padding:0}}>
                                <button style={{cursor:'pointer'}} onClick={this.enableInput}><i className="black-text material-icons prefix"  >edit</i></button>
                                </div>
                            </div>

                            <fieldset style={{marginBottom:20}}>
                                <legend>Change password</legend>
                                <div  className="input-field col s10 offset-s1">
                                    <input id="newPasswd" className="" type="password" value={this.state.org.newPasswd} onChange={this.changed} onBlur={this.passChange} style={{color:'#37474f'}}/>
                                    <label htmlFor="newPasswd">New Password</label>
                                    <span className="helper-text" data-error="Password must have atleast 4 char"></span>
                                </div>
                                <div  className="input-field col s10 offset-s1">
                                    <input id="newCpasswd" className="" type="password" value={this.state.org.newCpasswd} onChange={this.changed} onBlur={this.cpassChange} style={{color:'#37474f'}}/>
                                    <label htmlFor="newCpasswd">Confirm new Password</label>
                                    <span className="helper-text" data-error="Passwords do not match"></span>
                                </div>
                            </fieldset>

                            <div className="parentInput">
                                <div className="col inputSideTitle s12">Confirm current password</div>
                                <div  className="input-field col s10 offset-s1">
                                    <input placeholder="Enter your current password" id="passwd" className="" type="password" onChange={this.changed} value={this.state.org.passwd} style={{color:'#37474f'}}/>
                                </div>
                            </div>
                            <div className="col s12 red-text">{this.state.err}</div>
                            <div className="col s12 green-text">{this.state.msg}</div>
                            <div className="col s12 grey-text">{this.state.status}</div>
                            <div className="input-field col s12" style={{textAlign:'center'}}>
                                <input value="save" className="waves-effect waves-light btn" type="submit"/>
                            </div>
                            </form>
                            
                        </div>
                    </div>
                </div>
            )
        return <span/>
    }
}