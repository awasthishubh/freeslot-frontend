import React from 'react'
import {Component} from 'react'
import InputText from './inputText'
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

function renderOrg(data){
    return data.map(function(d){
        return (
            <option key={d.usid} value="0">
                {d.name}
                <div className='defocused'>
                    @{d.usid}
                </div>
            </option>
        )
    })
}

const Options=props=>{
    console.log(props)
    if(props.list)
        return (
            <select defaultValue="0" onChange={(e)=>console.log(e.target.value)} >
                <option value="0" disabled >Choose an Organisatns</option>
                {renderOrg(props.list)}
            </select>
        )
    else 
        return(
            <select defaultValue="0" onChange={(e)=>console.log(e.target.value)} >
                <option value="0" disabled >Loading</option>
            </select>
        )
}

// var updateOrgranisation=(e)=>{
//     var form= new FormData
//     for (var key in e.MemDetails) {
//         form.append(key,e.MemDetails[key])
//     }
//     console.log(form)

    // axios.post('http://localhost:5000/organisations', form)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
// }

var updateOrgranisation=(e)=>{
    axios.get('http://localhost:5000/organisations')
      .then(function (response) {
        e.updateOrg(response.data);
        console(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
}

class Submit_card extends Component {
    
    componentDidMount() {
        $('select').formSelect();
        updateOrgranisation(this.props)
    }

    componentDidUpdate(){
        $('select').formSelect();
    }

    
    render(){
        console.log(this.props.Organisations)
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
                                    <Options list={this.props.Organisations} />
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

                            
                        <IsAvailable available={null}/>
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