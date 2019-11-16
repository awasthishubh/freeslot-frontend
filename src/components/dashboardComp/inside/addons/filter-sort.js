import React from 'react'
import {Component} from 'react'
import { bindActionCreators } from 'redux'
import {connect} from  'react-redux'
import {modifyData} from '../../../../actions/dashboard_action'
import M from 'materialize-css'
import Collapsi from './collapsi'

class filterSort extends Component{
    constructor(props){
        super(props)
        this.sortRef=React.createRef()
        this.filterRef=React.createRef()
        this.noFilter=React.createRef()
        this.state={filterRegex:/.*/,sort:'name',members:this.props.members}
    }
    componentDidMount(){
        M.FormSelect.init(this.sortRef.current)
        M.FormSelect.init(this.filterRef.current)
    }
    filter(e){
        var year=parseInt(e.target.value,10)
        var now=new Date()
        var regex=/.*/
        if(year===0) regex=/.*/
        else if(now.getMonth>=6) regex=new RegExp("^"+(now.getFullYear()-year+1).toString().slice(2,4)) 
        else regex=new RegExp("^"+(now.getFullYear()-year).toString().slice(2,4)) 
        this.setState({filterRegex:regex})
    }
    sort(e){
        var X=e.target.value
        this.setState({sort:X})
    }
    members(){
        if(this.props.members && this.props.members.length>0){
            return <Collapsi 
                sort={this.state.sort} 
                filterReg={this.state.filterRegex} 
                viewMem={this.props.viewMem} 
                members={this.props.members} 
                verified={this.props.verified}
                count={this.props.count}
            /> 
        }
        else{
            return <div style={{fontSize:20, padding: 20}}>Nothing found.</div>             
        }
    }
    render(){
        return(
            <div className="container" style={{marginTop:40}}>
            <div className="row">
                <div className="input-field col s12 m6">
                    <select defaultValue="name" onChange={this.sort.bind(this)} ref={this.sortRef}>
                        <option value="name">Name</option>
                        <option value="reg">Registration number</option>
                    </select>
                    <label>Sort</label>
                </div>

                <div className="input-field col s12 m6">
                    <select defaultValue="" onChange={this.filter.bind(this)} ref={this.filterRef}>
                        <option value="0">None</option>
                        <option value="1">1st Year</option>
                        <option value="2">2nd Year</option>
                        <option value="3">3rd Year</option>
                        <option value="4">4th Year</option>
                    </select>
                    <label>Filter</label>
                </div>
                </div>
            {this.members.bind(this)()}
        </div>
        )
    }
}

function actiontoprops(dispatch) {
    return bindActionCreators({modifyData}, dispatch)
}

export default connect(null, actiontoprops)(filterSort)