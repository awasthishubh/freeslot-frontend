import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import { updateData} from '../../actions'
import { bindActionCreators } from 'redux'
import axios from 'axios'
import Chart from '../chart'
import M from 'materialize-css'
import serverBaseURL from '../../serverBaseURL';
import TimeTable from '../timetable'
import Modal from './modal'

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    return false
}

class Submit_card extends Component {
    constructor(props){
        super(props)
        this.state={
            valReg:false,
            valEmail:false,valPhno:false,
            valOrg:false,valImage:false,err:null,
        }
        this.onChange=this.onChange.bind(this)
        this.modalDom = React.createRef();
    }

    componentDidMount() {
        M.Modal.init(document.querySelectorAll('#memReg')[0])
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
        try{
            var memDetails=JSON.parse(window.atob(getQueryVariable('data')))
            if(memDetails){
                this.setState({modal:'confirm'})
                this.props.updateData({
                    name: memDetails.name,
                    reg: memDetails.reg,
                    email: memDetails.email,
                    phno: memDetails.phno,
                    rmno:memDetails.hostel,
                    org:'',
                    slots:memDetails.slots,
                    timeTable: {}
                }, 'UPDATE_MEM_ALL')
                console.log(this.props.MemDetails)
                this.setState({slots:memDetails.slots})
                this.setState({valReg:true})
                this.setState({valEmail:true})
                this.setState({valPhno:true})
            }
        } catch(e){}
    }

    componentDidUpdate(){
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }
    mem(){
        if(this.state.subErr){
            if(this.state.subErr.status===400)
                return(
                <div>
                    <h4>Image file not recognised</h4>
                    Constraints for uploaded screnshot:
                    <ul className="browser-default" style={{listStyleType: 'disc'}}>
                        <li> Image must be png file</li>
                        <li> Image must be horizontally complete, i.e. must show all 13 slots in a day for all the included days</li>
                        <li> Image can be cropped vertically to include only those rows where there is a filled slot.</li>
                        <li> Every individual cell included in the image should be present completely. The cropping should not overlap text inside the slot boxes</li>
                    </ul>
                </div>
                )
            if(this.state.subErr.status===409)
                return(
                <div><h4>You are already a part of selected organisation</h4>Contact your organisation's maintainer if you need to re-register</div>
                )
            if(this.state.subErr.status===404)
            return(
                <div><h4>Invalid Organisation ID</h4>Contact your organisation for unique id</div>
            )
        }
        if(this.state.subMiss){
            return(
                <div><h4>Incomplete form</h4>You missed <b>{this.state.subMiss}</b> field</div>
            )
        }
        return null
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
        var reg=/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(reg.test(e.target.value)){
            e.target.classList.add('valid')
            this.setState({valEmail:true})
        }
        else{
            e.target.classList.add('invalid')
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
            this.setState({valPhno:false})    
        }
    }

    async submit(e){
        this.setState({err:'Sending...'})
        e.preventDefault()
        this.setState({'subErr':null})
        this.setState({'subMem':null})
        this.setState({'modal':'SUBMIT'})
        this.setState({'subMiss':null})
        if(!this.props.MemDetails.name) this.setState({'subMiss':'Name'})
        else if(!this.state.valReg) this.setState({'subMiss':'Registration Number'})
        else if(!this.state.valEmail) this.setState({'subMiss':'Email'})
        else if(!this.state.valPhno) this.setState({'subMiss':'Phno Number'})
        else if(!this.props.MemDetails.org) this.setState({'subMiss':'Organisation'})
        else if(!this.props.MemDetails.rmno) this.setState({'subMiss':'Room Number'})
        else
        {
            var form= new FormData()
            for (var key in this.props.MemDetails) {
                form.append(key,this.props.MemDetails[key])
            }
            try{
                var response=await axios.post(serverBaseURL+'/members', form)
                this.setState({'subMem':response.data})
                this.setState({'modal':'RESPONSE'})
                this.props.updateData('', 'RESET_MEM_DETAILS')
                this.setState({err:null})
                return
            } 
            catch(error){
                this.setState({'subErr':error.response})
            }
        }
        M.Modal.init(this.modalDom.current)
        M.Modal.getInstance(this.modalDom.current).open();
        this.setState({err:null})
    }
    
    close(){
        M.Modal.getInstance(this.modalDom.current).close()
    }
    
    submitAnother(){
        this.setState({'modal':'SUBMIT'})
        this.props.updateData('', 'RESET_MEM_DETAILS')
    }
    async confirmed(e){
        this.setState({err:'Sending...'})
        e.preventDefault()
        this.setState({'subErr':null})
        this.setState({'subMem':null})
        // this.setState({'modal':'RESPONSE'})
        this.setState({'subMiss':null})
        if(!this.props.MemDetails.name) this.setState({'subMiss':'Name'})
        else if(!this.state.valReg) this.setState({'subMiss':'Registration Number'})
        else if(!this.state.valEmail) this.setState({'subMiss':'Email'})
        else if(!this.state.valPhno) this.setState({'subMiss':'Phno Number'})
        else if(!this.props.MemDetails.org) this.setState({'subMiss':'Organisation'})
        else if(!this.props.MemDetails.rmno) this.setState({'subMiss':'Room Number'})
        else
        {
            var form= new FormData()
            for (var key in this.props.MemDetails) {
                form.append(key,this.props.MemDetails[key])
            }
            try{
                var response=await axios.post(serverBaseURL+'/member', this.props.MemDetails)
                this.setState({'subMem':response.data})
                this.setState({'modal':'RESPONSE'})
                this.props.updateData('', 'RESET_MEM_DETAILS')
                this.setState({err:null})
                return
            }
            catch(error){
                this.setState({'subErr':error.response})
            }
        }
        M.Modal.init(this.modalDom.current)
        M.Modal.getInstance(this.modalDom.current).open();
        this.setState({err:null})
    }
    
    render(){
        if(!this.state.modal || this.state.modal=='SUBMIT')
        return(
            <Modal 
                footerFixed={false}
                style={{top:'5%!important', maxHeight:'85%'}} 
                title='Enter Your Details' 
                err={this.state.err}
                footer={[]}
                subModalContent={this.mem.bind(this)()}
                subModalAction={this.close.bind(this)}
                modalDom={this.modalDom}
            >
                <form id="regfrm"  onSubmit={this.submit.bind(this)}>
                    {InputForm.bind(this)()}
                    <File id="fle" label="TimeTable" 
                        errorText='Select a PNG file only'
                        onChange={this.validateFile.bind(this)}
                    />
                </form>
            </Modal>
        )
        else if(this.state.modal=='RESPONSE')
            return(
                <Modal 
                    footerFixed={true}
                    style={{top:'5%', maxHeight:'90%'}}
                    title='Registered Successfully!' 
                    err={''}
                    subModalContent={this.mem.bind(this)()}
                    subModalAction={this.close.bind(this)}
                    modalDom={this.modalDom}
                    footer={[
                        {title:'Submit Another', onClick:()=>{this.setState({'modal':'SUBMIT'})}},
                        {title:'Close', onClick:()=>{()=>M.Modal.getInstance(document.getElementById('memReg')).close()}}
                    ]}
                >
                    <Chart data={this.state.subMem.data} />
                </Modal>
            )
        else return (
            <Modal 
                footerFixed={true}
                style={{top:'5%', maxHeight:'90%'}} 
                title='Confirm Your Details' 
                err={this.state.err}
                subModalContent={this.mem.bind(this)()}
                subModalAction={this.close.bind(this)}
                modalDom={this.modalDom}
                footer={[
                    {title:'Submit Another', onClick:this.submitAnother.bind(this)},
                    {title:'Confirm', onClick:this.confirmed.bind(this)}
                ]}
            >
                <form id="regfrm"  onSubmit={this.submit.bind(this)}>
                    {InputForm.bind(this)()}
                </form>
                <TimeTable slots={this.state.slots} />
            </Modal>
        )
    }
}

function mapStateToProps(state){
    return state
}
function mapDispatchToProps(dispatch){
    return bindActionCreators({updateData}, dispatch)
}
export default connect(mapStateToProps,mapDispatchToProps)(Submit_card)

function Input(props){
    return(
        <div className="input-field col m6 s12">
            <input id={props.id}
                type="text" 
                onBlur={props.onBlur}
                value={props.value}  
                onChange={props.onChange} />
            <label htmlFor={props.id}>{props.label}</label>
            <span className="helper-text" data-error={props.errorText}></span>
        </div>
    )
}

function InputForm(){
    return(
        <div>
        <Input id='mem_name' label='Name' 
            value={this.props.MemDetails.name} 
            onChange={(e)=>this.onChange(e,'UPDATE_NAME',1)}
            errorText="Name is required"
        />
        <Input id='mem_org' label='Organisation ID' 
            value={this.props.MemDetails.org}
            onChange={(e)=>this.onChange(e,'UPDATE_ORG',1)}
            errorText="Organisation ID is required"
        />
        <Input id='mem_reg' label='Registration Number' 
            value={this.props.MemDetails.reg}  
            onChange={(e)=>{e.target.value=e.target.value.toUpperCase();this.onChange(e,'UPDATE_REG')}}
            onBlur={this.validateReg.bind(this)}
            errorText="Enter a valid registration number"
        />
        <Input id='mem_email' label='Email' 
            value={this.props.MemDetails.email}  
            onChange={(e)=>this.onChange(e,'UPDATE_EMAIL')} 
            onBlur={this.validateEmail.bind(this)}
            errorText="Enter a valid email address"
        />
        <Input id='mem_phno' label='Phone Number' 
            value={this.props.MemDetails.phno}  
            onChange={(e)=>this.onChange(e,'UPDATE_PHNO')} 
            onBlur={this.validatePhno.bind(this)}
            errorText="Enter a valid 10 digint Phone Number"
        />
        <Input id='mem_rmno' label='Block-RoomNumber' 
            value={this.props.MemDetails.rmno}  
            onChange={(e)=>this.onChange(e,'UPDATE_RMNO',1)}
            errorText="Enter Room Number"
        />
        </div>
    )
}

function File(props){
    return(
        <div>
            <div className="file-field input-field col s12">
                <div className="btn">
                    <span>{props.label}</span>
                    <input id={props.id} type="file" onChange={props.onChange} />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path" type="text" />
                <span className="helper-text" data-error={props.errorText}></span>
                </div>
            </div>

            <div className="col s12" style={{textAlign:'center', marginTop:7}}>
                <button className="btn waves-effect waves-light" type="submit" name="action">Submit
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </div>
    )
}