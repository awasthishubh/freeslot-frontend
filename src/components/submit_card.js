import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import { updateData, updateOrg } from '../actions'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import Chart from './chart'

const Options=props=>{
    console.log(props)
    if(props.list)
        return (
            <select defaultValue="0" onChange={(e)=>props.update(e.target.value, 'UPDATE_ORG')} >
                <option value="0" disabled >Choose an Organisation</option>
                {props.list.map(function(d){
                    return (<option key={d.usid} value={d.usid}>
                        {d.usid} ({d.name})
                        </option>
                    )
                })}
            </select>
        )
    else 
        return(
            <select defaultValue="0" onChange={(e)=>console.log(e.target.value)} >
                <option value="0" disabled >Loading</option>
            </select>
        )
}

var updateOrgranisation=(e)=>{
    axios.get('http://localhost:5000/organisations')
      .then(function (response) {
        e.updateOrg(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error.response);
      });
}

class Submit_card extends Component {
    constructor(props){
        super(props)
        this.state={valName:false,valReg:false,valEmail:false,valPhno:false,valOrg:false,valImage:false
        }
        this.submit=this.submit.bind(this)
        this.mem=this.mem.bind(this)
        this.validateReg=this.validateReg.bind(this)
        this.validateFile=this.validateFile.bind(this)
        this.validateEmail=this.validateEmail.bind(this)
        this.validatePhno=this.validatePhno.bind(this)
        this.onChange=this.onChange.bind(this)
        this.modalDom = React.createRef();
        this.modalFooter = React.createRef();
    }validateEmail

    componentDidMount() {
        $('select').formSelect();
        $('.modal').modal();
        console.log(this.props.updateOrg)
        this.props.updateOrg()
    }

    componentDidUpdate(){
        $('select').formSelect();
    }
    mem(){
        if(this.modalDom.current)
            this.modalDom.current.classList.remove('modal-fixed-footer')
        if(this.state.subMem){
            this.modalDom.current.classList.add('modal-fixed-footer')
        console.log(this.state.subMem.data)
        return (<div>
            <h5>Registered Successfully!</h5><hr/>
            <Chart data={this.state.subMem.data} />
            </div>
        )
        }
        else if(this.state.subErr){
            if(this.state.subErr.status==400)
                return(
                <div><h4>Image file not recognised</h4>Try reuploading your timetable after cropping out the required area</div>
                )
            if(this.state.subErr.status==409)
                return(
                <div><h4>You are already a part of selected organisation</h4>Contact your organisation's maintainer if you need to re-register</div>
                )
        }
        else if(this.state.subMiss){
            return(
                <div><h4>Incomplete form</h4>You missed <b>{this.state.subMiss}</b> fild</div>
                )
        }
        else return null
    }
    
    onChange(e,id,x){
        e.target.classList.remove('invalid')
        e.target.classList.remove('valid')
        this.props.updateData(e.target.value, id)
        if(x)
            if(e.target.value){
                e.target.classList.add('valid')
            } else{
                e.target.classList.add('invalid')
            }
    }
    validateReg(e){
        
        e.target.classList.remove('invalid')
        e.target.classList.remove('valid')

        if(!e.target.value) return  
        if(/^[0-9]{2}[A-Z]{3}[0-9]{4}$/.test(e.target.value)){
            e.target.classList.add('valid')
            this.setState({valReg:true})    
        }
        else{
            e.target.classList.add('invalid')
            this.setState({valReg:false})    
        }
    }
    validateEmail(e){
        e.target.value=e.target.value.toLowerCase()
        e.target.classList.remove('invalid')
        e.target.classList.remove('valid')
        if(!e.target.value) return  
        var reg=/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(reg.test(e.target.value)){
            e.target.classList.add('valid')
            this.setState({valEmail:true})    
        }
        else{
            e.target.classList.add('invalid')
            console.log(e.target.classList)
            this.setState({valEmail:false})    
        }
    }
    
    validateFile(e){
        document.querySelector(".file-path").classList.remove('invalid')
        document.querySelector(".file-path").classList.remove('valid')
        this.props.updateData(e.target.files[0], 'UPDATE_TT')
        
        if(e.target.files[0] && e.target.files[0].type==="image/png"){
            document.querySelector(".file-path").classList.add('valid')
            this.setState({valImage:true})    
        }
        else{
            document.querySelector(".file-path").classList.add('invalid')
            this.setState({valImage:false})    
        }
    }
    validatePhno(e){
        e.target.classList.remove('invalid')
        e.target.classList.remove('valid')
        if(e.target.value.length===10){
            e.target.classList.add('valid')
            this.setState({valPhno:true})    
        } else{
            e.target.classList.add('invalid')
            this.setState({valPhno:true})    
        }
    }

    async submit(){
        this.setState({'subErr':null})
        this.setState({'subMem':null})
        this.setState({'subMiss':null})
        console.log(this.props.MemDetails.timeTable )
        if(!this.props.MemDetails.name) this.setState({'subMiss':'Name'})
        else if(!this.state.valReg) this.setState({'subMiss':'Registration Number'})
        else if(!this.state.valEmail) this.setState({'subMiss':'Email'})
        else if(!this.state.valPhno) this.setState({'subMiss':'Phno Number'})
        else if(!this.props.MemDetails.org) this.setState({'subMiss':'Organisation'})
        else if(!this.state.valImage) this.setState({'subMiss':'Image File'})
        else
        {   
            var form= new FormData
            for (var key in this.props.MemDetails) {
                form.append(key,this.props.MemDetails[key])
            }
            console.log(form)
            try{     
                var response=await axios.post('http://localhost:5000/members', form)
                console.log(response.data.status);
                this.setState({'subMem':response.data})
            } 
            catch(error){
                this.setState({'subErr':error.response})
                // console.log(error.response.status);
            }
        }
        M.Modal.getInstance(this.modalDom.current).open();
    }
    
    render(){
        console.log(11212,this.props)
        return(
            <div className="card" id="frm">
                <div className="card-content">
                    <div className="row">
                            <div className="input-field col s12">
                                <input id='mem_name' type="text" value={this.props.MemDetails.name}  onChange={(e)=>this.onChange(e,'UPDATE_NAME',1)} />
                                <label htmlFor='mem_name'>Name</label>
                                <span className="helper-text" data-error="Name is required"></span>
                            </div>

                            <div className="input-field col s12">
                                <input className="" id='mem_reg' type="text" value={this.props.MemDetails.reg}  onChange={(e)=>{e.target.value=e.target.value.toUpperCase();this.onChange(e,'UPDATE_REG')}} onBlur={this.validateReg} />
                                <label htmlFor='mem_reg'>Registration Number</label>
                                <span className="helper-text" data-error="Enter a valid registration number"></span>
                            </div>
                            
                            <div className="input-field col s12">
                                <input id='mem_email' type="email" className="" value={this.props.MemDetails.email}  onChange={(e)=>this.onChange(e,'UPDATE_EMAIL')} onBlur={this.validateEmail} />
                                <label htmlFor='mem_email'>Email</label>
                                <span className="helper-text" data-error="Enter a valid email address"></span>
                            </div>

                            <div className="input-field col s12">
                                <input id='mem_phno' type="number" value={this.props.MemDetails.phno}  onChange={(e)=>this.onChange(e,'UPDATE_PHNO')} onBlur={this.validatePhno}/>
                                <label htmlFor='mem_phno'>Phone Number</label>
                                <span className="helper-text" data-error="Enter a valid 10 digint Phone Number"></span>
                            </div>
                            <div className="input-field col s12">
                                    <Options list={this.props.orgAll} update={this.props.updateData} />
                                <label>Organisation</label>
                            </div>

                            <div className="file-field input-field col s12">
                                <div className="btn">
                                    <span>File</span>
                                    <input id="fle" type="file" onChange={this.validateFile} />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path" type="text" />
                                <span className="helper-text" data-error="Select a PNG file only"></span>
                                </div>
                            </div>

                            <a className="waves-effect waves-light btn-large" onClick={this.submit}><i className="material-icons left">cloud</i>button</a>
                        

  <div ref={this.modalDom} className="modal">
    <div className="modal-content">
    
      {this.mem()}
    </div>
    <div className="modal-footer" ref={this.modalFooter}>
      <a href="#!" className="modal-close waves-effect waves-green btn-flat"><b>Close</b></a>
    </div>
  </div>
                    </div>
                </div>
            </div>
        )
        
    }
}

function mapStateToProps(state){
    return state
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({updateData, updateOrg}, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Submit_card)