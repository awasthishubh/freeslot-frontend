import React from 'react'
import M from 'materialize-css'
import $ from 'jquery'

export default class extends React.Component{
    constructor(props){
        super(props)
        this.timePickerFrom=React.createRef()
        this.timePickerTill=React.createRef()
        this.dayPicker=React.createRef()
        this.memPicker=React.createRef()
        this.submit=this.submit.bind(this)
        this.state={err:null}
    }
    componentDidMount(){
        var option={
            defaultTime: '00:00',
            twelveHour: false,
            onSelect: function(e,f){
                $($(this.$modalEl[0]).find('.timepicker-close')[1]).trigger('click')
            }
        }
        M.Timepicker.init(this.timePickerTill.current, option)
        M.Timepicker.init(this.timePickerFrom.current, option)
        var elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }
    async submit(){
        this.setState({err:null})
        if(this.dayPicker.current.value==="default") return this.setState({err:'Choose a day first'})
        if(!this.timePickerFrom.current.value && !this.timePickerTill.current.value) return this.setState({err:'Choose a day first'})

        var memberType
        var start=parseInt(this.timePickerFrom.current.value.slice(0,2),10)
        var end=parseInt(this.timePickerTill.current.value.slice(0,2),10)
        var point=parseInt(this.dayPicker.current.value,10);
        if(this.props.memberView) memberType=parseInt(this.memPicker.current.value,10)

        if(isNaN(start) || isNaN(end) || start>=end) return this.setState({err:'Select a proper time interval'})
        
        this.props.onSubmit(start, end, point,memberType)

        this.setState({status:null})
        this.setState({show:true})
    }

    render(){
        return(
            <div className="card s12">
                <div className="card-content row">
                    <span className="card-title" >{this.props.title}</span>
                    <div className="">
                        <div className="col m6 s12">
                        <div className={`col ${this.props.memberView?'s6':'s12'}`} style={{padding:0}}>
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
                            {(()=>{if(this.props.memberView) return(
                            <div className="col m6 s6" style={{padding:0}}>
                            <div style={{fontSize:17,textAlign:'center', margin:'10px 0px'}}>Member Type</div>
                            <div className="input-field container">
                                <select defaultValue="default" className="validate valid" ref={this.memPicker}>
                                    <option value="0">Any</option>
                                    <option value="1">First Year</option>
                                    <option value="2">Second Year</option>
                                    <option value="3">Third Year</option>
                                    <option value="4">Fourth Year</option>
                                </select>
                            </div>
                            </div>)})()}
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
                        <center><button style={{marginTop:10}} className={`waves-effect waves-light btn ${this.props.disableBtn?'btn-disabled':''}`} onClick={this.submit}><i className="material-icons left">send</i>Submit</button></center>
                        </div>
                        <div className="err red-text">{this.state.err}</div>
                        <div className="err grey-text">{this.props.status}</div>
                    </div>
                </div>
            </div>
        )
    }
}