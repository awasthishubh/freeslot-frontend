import React from 'react'
import {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateData} from '../../actions/index.js'
import axios from 'axios'
import Cookies from 'js-cookie'
import serverBaseURL from '../../serverBaseURL';

class orgLogin extends Component{
    constructor(props){
        super(props)
        this.isFilled=this.isFilled.bind(this)
        this.send=this.send.bind(this)
        this.state={login_usid:false, login_pass:false, err: null}

    }
    isFilled(e){
        e.target.classList.remove('valid')
        e.target.classList.remove('invalid')
        var state=[]
        state[e.target.id]=e.target.value
        this.setState(state)
        if(e.target.value){
            e.target.classList.add('valid')
        } else{
            e.target.classList.add('invalid')
        }
    }
    async send(e){
        e.preventDefault()
        localStorage.clear()
        if(this.state.login_usid && this.state.login_pass){
            var form = new FormData();
            form.append('usid',this.state.login_usid)
            form.append('passwd',this.state.login_pass)
            try{
                this.setState({status:'Verifying...'})
                this.setState({'err':null})
                var request=await axios.post(serverBaseURL+'/auth',form)
                Cookies.set('token', request.data.access_token, { expires: 7 });
                window.location.href = "/dashboard";
                this.setState({status:null})
                // window.location.reload();
            } catch(e){
                this.setState({status:null})
                if(e.response)
                this.setState({'err':'Invalid id/password'})
                else 
                this.setState({'err':'Invalid id/password'})
            }
        } else this.setState({'err':'Enter id and password'})
    }
    render(){
        return(
                <div className="row"> 
                    <div className="col s12"><h5><center>Enter your login credentials</center></h5></div>   
                    <form onSubmit={this.send}>
                        <div className="input-field col s12">
                            <input id='login_usid' className="" onChange={(e)=>{e.target.value=e.target.value.toLowerCase();this.isFilled(e)}} type="text" />
                            <label htmlFor='login_usid' >Organisation ID</label>
                            <span className="helper-text" data-error="Organisation id is required"></span>
                        </div>
                        <div className="input-field col s12">
                            <input id='login_pass' type="password" onChange={this.isFilled}  />
                            <label htmlFor='login_pass' >Password</label>
                            <span className="helper-text" data-error="Password in required"></span>
                        </div>
                        <div className="red-text">{this.state.err}</div>
                        <div className="grey-text">{this.state.status}</div>
                        <center><input type="submit" className="white-text waves-effect waves-light btn" value="Login"/></center>

                    </form>
                    <div className="col s12" style={{marginTop:40,textAlign:'right', color:'grey'}}>
                    {/*eslint-disable-next-line */}
                        <a style={{cursor:'pointer'}} onClick={(e)=>this.props.change(true)}>Register your Organisation?</a>
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

export default connect(mapStateToProps, mapDispatchToProps)(orgLogin)