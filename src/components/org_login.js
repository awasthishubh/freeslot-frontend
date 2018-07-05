import React from 'react'
import {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateData} from '../actions/index.js'
import axios from 'axios'

class orgLogin extends Component{
    constructor(props){
        super(props)
        this.isFilled=this.isFilled.bind(this)
        this.send=this.send.bind(this)
        this.state={login_usid:false, login_pass:false}

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
    async send(){

        if(this.state.login_usid && this.state.login_pass){
            var form = new FormData();
            form.append('usid','ieee')
            form.append('passwd','random')
            var request=await axios.post('http://localhost:5000/auth',form)
            console.log(request.data)
            this.props.updateData(request.data.info,'UPDATE_ORG_DETAILS')
            this.props.updateData(request.data.access_token,'UPDATE_ORG_TOKEN')
        }
    }
    render(){
        console.log(this.props)
        return(
            <div className="card" id="">
                <div className="card-content row">    
                <form>
                        <div className="input-field col s12">
                            <input id='login_usid' className="" onChange={this.isFilled} type="text" />
                            <label htmlFor='login_usid' >Organisation ID</label>
                            <span className="helper-text" data-error="Organisation id is required"></span>
                        </div>
                        <div className="input-field col s12">
                            <input id='login_pass' type="text" onChange={this.isFilled}  />
                            <label htmlFor='login_pass' >Password</label>
                            <span className="helper-text" data-error="Password in required"></span>
                        </div>
                    <center><a className="waves-effect waves-light btn" onClick={this.send}>Login</a></center>

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
    return bindActionCreators({updateData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(orgLogin)