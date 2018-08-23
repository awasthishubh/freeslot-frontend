import React, {Component} from 'react'
import Collapsi from './collapsi'
import SortFilter from './filter-sort'
import M from 'materialize-css'
import $ from 'jquery'
import axios from 'axios'
import Cookies from 'js-cookie'
import serverBaseURL from '../../../serverBaseURL.js';

function RenderCard(props){
    if(props.show)
    return(
        <div className="card s12">
            <div className="card-content row">
                <span className="card-title" >Available Members</span>
                <div className="container" style={{marginTop:40}}>
                    <SortFilter data={props.members} type="MEMBERS" all={false}/>
                    <Collapsi data={props.members} view={props.view}/>
                </div>
            </div>
        </div>
    )
    else return <div></div> 
}

export default class extends Component{
    constructor(props){
        super(props)
        this.timePickerFrom=React.createRef()
        this.timePickerTill=React.createRef()
        this.dayPicker=React.createRef()
        this.submit=this.submit.bind(this)
        this.state={show:null}
        this.viewMem=this.viewMem.bind(this)
        this.state={err:null}
        this.members=null
    }
    
    componentWillUnmount(){
        document.getElementById('dashGetMem').classList.remove('active')
    }
    componentDidMount(){
        var option={
            defaultTime: '00:00',
            twelveHour: false,
            onSelect: function(e,f){
                $($(this.$modalEl[0]).find('.timepicker-close')[1]).trigger('click')
            }
        }
        document.getElementById('dashGetMem').classList.add('active')
        M.Timepicker.init(this.timePickerTill.current, option)
        M.Timepicker.init(this.timePickerFrom.current, option)
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }
    viewMem(reg){
        this.props.updateData(reg,'UPDATE_MODAL_SELECTED')
        this.props.selected.instance.open()
    }
    async submit(){
        this.setState({err:null})
        if(this.dayPicker.current.value!=="default" && this.timePickerFrom.current.value && this.timePickerTill.current.value){
            var start=parseInt(this.timePickerFrom.current.value.slice(0,2),10)
            var end=parseInt(this.timePickerTill.current.value.slice(0,2),10)
            var point=parseInt(this.dayPicker.current.value,10);
            if(start>end) return this.setState({err:'Select a proper time interval'})
            console.log(start, end, point)
            this.setState({status:'Finding...'})
            try{
                var data=await axios({
                    url:`${serverBaseURL}/auth/freemems?start=${start}&end=${end}&day=${point}`,
                    headers: { 'Authorization': 'Bearer '+Cookies.get('token')},
                    method: 'GET',
                })
                this.setState({members:data.data.members})
            }catch(e){
                if(e.request.status==404)
                    this.setState({members:[]})
                else this.setState({err:'Server error'})
            }
            
            this.setState({status:null})
            this.setState({show:true})
        }
        else{
            this.setState({err:'Select Day/Time'})
        }
    }
 
    render(){
        
        return(
            <div className="row">
                <div className="card s12">
                    <div className="card-content row">
                        <span className="card-title" >Get A Member</span>
                        <div className="">
                            <div className="col m6 s12">
                                <div style={{fontSize:17,textAlign:'center', margin:'10px 0px'}}>Choose a Day</div>
                                <div className="input-field container">
                                    <select defaultValue="default" className="validate valid" ref={this.dayPicker}>
                                        <option value="default" disabled >Days</option>
                                        <option value="0">Monday</option>
                                        <option value="1">Tuesday</option>
                                        <option value="2">Wednesday</option>
                                        <option value="3">Thursday</option>
                                        <option value="4">Friday</option>
                                        <option value="5">Saturday</option>
                                        <option value="6">Sunday</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col m6 s12">
                                <div style={{fontSize:17,textAlign:'center', margin:'10px 0px'}}>Choose a Time</div>
                                <div className="">
                                    <div className="input-field col s6">
                                        <input type="text" className="timepicker" ref={this.timePickerFrom} />
                                        <label htmlFor='mem_reg'>From</label>
                                    </div>
                                    <div className="input-field col s6">
                                        <input ref={this.timePickerTill} type="text" className="timepicker"/>
                                        <label htmlFor='mem_reg'>Till</label>
                                    </div>
                                </div>
                            </div>

                            <div>
                            <center><a style={{marginTop:10}} className="waves-effect waves-light btn" onClick={this.submit}><i className="material-icons left">send</i>Submit</a></center>
                            </div>
                            <div className="err red-text">{this.state.err}</div>
                            <div className="err grey-text">{this.state.status}</div>
                        </div>
                    </div>
                </div>

                <RenderCard 
                    show={this.state.show}
                    members={this.state.members}
                    view={this.viewMem}
                />
            </div>
        )
    }
}