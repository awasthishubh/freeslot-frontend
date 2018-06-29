import React from 'react'
import {Component} from 'react'
import {connect} from 'react-redux'
import { updateData, updateOrg } from '../actions/memDetails'
import { bindActionCreators } from 'redux'
import axios from 'axios'
const IsAvailable= props =>{
    if(props.available==true)
        return ("Yes")
    if(props.available==null)
        return ("...")
    return ('No')
}

const Options=props=>{
    // console.log(props)
    if(props.list)
        return (
            <select defaultValue="0" onChange={(e)=>props.update(e.target.value, 'UPDATE_ORG')} >
                <option value="0" disabled >Choose an Organisa  tns</option>
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
        this.submit=this.submit.bind(this)
    }

    componentDidMount() {
        $('select').formSelect();
        $('.modal').modal();
        updateOrgranisation(this.props)
    }

    componentDidUpdate(){
        $('select').formSelect();
    }

    submit(){
        var form= new FormData
        for (var key in this.props.MemDetails) {
            form.append(key,this.props.MemDetails[key])
        }
        console.log(form)
    
        axios.post('http://localhost:5000/members', form)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(111, error.response);
        M.Modal.getInstance(document.querySelectorAll('#memErr')[0]).open();;
    });
    }

    render(){
        // console.log(this.props)
        return(
            <div className="card" id="">
                <div className="card-content">
                    <div className="row">
                            <div className="input-field col s12">
                                <input id='mem_name' type="text" value={this.props.MemDetails.name}  onChange={(e)=>this.props.updateData(e.target.value, 'UPDATE_NAME')} />
                                <label htmlFor='mem_name'>Name</label>
                            </div>

                            <div className="input-field col s12">
                                <input id='mem_reg' type="text" value={this.props.MemDetails.reg}  onChange={(e)=>this.props.updateData(e.target.value, 'UPDATE_REG')} />
                                <label htmlFor='mem_reg'>Registration Number</label>
                            </div>
                            
                            <div className="input-field col s12">
                                <input id='mem_email' type="text" value={this.props.MemDetails.email}  onChange={(e)=>this.props.updateData(e.target.value, 'UPDATE_EMAIL')} />
                                <label htmlFor='mem_email'>Email</label>
                            </div>

                            <div className="input-field col s12">
                                <input id='mem_phno' type="text" value={this.props.MemDetails.phno}  onChange={(e)=>this.props.updateData(e.target.value, 'UPDATE_PHNO')} />
                                <label htmlFor='mem_phno'>Phone Number</label>
                            </div>
                            <div className="input-field col s12">
                                    <Options list={this.props.Organisations} update={this.props.updateData} />
                                <label>Materialize Select</label>
                            </div>

                            <div className="file-field input-field col s12">
                                <div className="btn">
                                    <span>File</span>
                                    <input type="file" onChange={(e)=>this.props.updateData(e.target.files[0], 'UPDATE_TT')} />
                                </div>
                                <div className="file-path-wrapper">
                                    <input className="file-path validate" type="text" />
                                </div>
                            </div>

                            <a className="waves-effect waves-light btn-large" onClick={this.submit}><i className="material-icons left">cloud</i>button</a>
                        <IsAvailable available={null}/>
                        

  <div id="memErr" className="modal">
    <div className="modal-content">
      <h4>Modal Header</h4>
      <p>A bunch of text</p>
    </div>
    <div className="modal-footer">
      <a href="#!" className="modal-close waves-effect waves-green btn-flat">Agree</a>
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