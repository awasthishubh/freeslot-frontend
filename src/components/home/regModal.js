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
import { relative } from 'path';

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
                this.setState({modal:'CONFIRMATION'})
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

    async parseImg(e){
        e.preventDefault()
        this.setState({'subErr':null})
        this.setState({'subMem':null})
        this.setState({'subMiss':null})
        if(!this.state.valImage) this.setState({'subMiss':'Image File'})
        else
        {   this.setState({disableBtn:true})
            var form= new FormData()
            form.append('timeTable',this.props.MemDetails['timeTable'])
            try{
                var response=await axios.post(serverBaseURL+'/parseimg', form)
                console.log(response.data.slots)
                this.props.updateData(response.data.slots,'UPDATE_SLOTS')
                // this.setState({'subMem':response.data})
                this.setState({'modal':'CONFIRMATION'})
                this.setState({err:null})
                console.log(this.props.MemDetails.slots)
                this.setState({disableBtn:false})
                return
            } 
            catch(error){
                this.setState({'subErr':error.response})
            }
        }
        M.Modal.init(this.modalDom.current)
        M.Modal.getInstance(this.modalDom.current).open();
    }
    
    close(){
        M.Modal.getInstance(this.modalDom.current).close()
    }
    
    submitAnother(){
        this.setState({'modal':'SUBMIT'})
        this.props.updateData('', 'RESET_MEM_DETAILS')
    }
    async confirmed(e){
        this.setState({disableBtn:true})
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
            try{
                var response=await axios.post(serverBaseURL+'/member', this.props.MemDetails)
                this.setState({'subMem':response.data})
                this.setState({'modal':'RESPONSE'})
                this.props.updateData('', 'RESET_MEM_DETAILS')
                this.setState({err:null})
                this.setState({disableBtn:false})
                return
            }
            catch(error){
                this.setState({'subErr':error.response})
                this.setState({disableBtn:false})
            }
        }
        M.Modal.init(this.modalDom.current)
        M.Modal.getInstance(this.modalDom.current).open();
    }
    
    render(){
        if(this.state.modal=='RESPONSE')
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
        else {
            var confirmScreen=this.state.modal=='CONFIRMATION'
            return(
                <Modal 
                    footerFixed={confirmScreen?true:false}
                    style={{top:'5%', maxHeight:'90%'}} 
                    title={confirmScreen?'Confirm Your Details':'Enter Your Details'}
                    subModalContent={this.mem.bind(this)()}
                    subModalAction={this.close.bind(this)}
                    modalDom={this.modalDom}
                    footer={confirmScreen?[
                        {title:'Submit Another', onClick:this.submitAnother.bind(this)},
                        {title:'Confirm', disabledTitle:'Sending...',
                        disableBtn:this.state.disableBtn|| this.state.disableBtn, onClick:this.confirmed.bind(this)}
                    ]:[]}
                >
                    <form id="regfrm"  onSubmit={this.parseImg.bind(this)}>
                        {InputForm.bind(this)()}
                        {!confirmScreen?<File id="fle" label="TimeTable" 
                            disableBtn={this.state.disableBtn}
                            onChange={this.validateFile.bind(this)}
                        />:<TimeTable slots={this.props.MemDetails.slots} />}
                    </form>
                </Modal>
            )
        }
        // else 
        // else return (
        //     <Modal 
        //         footerFixed={true}
        //         style={{top:'5%', maxHeight:'90%'}} 
        //         title='Confirm Your Details' 
        //         err={this.state.err}
        //         subModalContent={this.mem.bind(this)()}
        //         subModalAction={this.close.bind(this)}
        //         modalDom={this.modalDom}
        //         footer={[
        //             {title:'Submit Another', onClick:this.submitAnother.bind(this)},
        //             {title:'Confirm', onClick:this.confirmed.bind(this)}
        //         ]}
        //     >
        //         <form id="regfrm"  onSubmit={this.confirmed.bind(this)}>
        //             {InputForm.bind(this)()}
        //         </form>
        //         <TimeTable slots={this.props.MemDetails.slots} />
        //     </Modal>
        // )
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
        <div className="row">
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
        <input type="submit" style={{position:'absolute', left: -9999}}/>
        </div>
    )
}

function File(props){
    return(
        <fieldset>
            <legend><b>TimeTable</b></legend>
            <div className="row" style={{position:'relative'}}>
                <div className="file-field input-field col s12 m6">
                    <div className="btn">
                        <span>Upload</span>
                        <input id={props.id} type="file" onChange={props.onChange} />
                    </div>
                    <div className="file-path-wrapper">
                        <input className="file-path" type="text" />
                    <span className="helper-text" data-error='Select a PNG file only'></span>
                    </div>
                </div>
                <span className="hide-on-small-only col s1" 
                    style={{textAlign:"center",fontSize:20,padding:10}} >OR</span>
                <div className="col s12 hide-on-med-and-up" style={{textAlign:"center"}}>OR</div>
                <div className="input-field  col m5 s12" style={{textAlign:"center",fontSize:20,padding:10}}>
                    <a href="#">Get it from vtop.</a>
                </div>
            </div>

            <div className="col s12" style={{textAlign:'center', marginTop:7}}>
                <button className={`${props.disableBtn?'btn-disabled':''} btn waves-effect waves-light`} type="submit" name="action">
                    {props.disableBtn?'Parsing...':'Parse Timetable'}
                    {props.disableBtn?'':<i className="material-icons right">send</i>}
                </button>
            </div>

            </fieldset>
    )
}