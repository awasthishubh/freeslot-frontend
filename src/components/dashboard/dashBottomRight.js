import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateDashboardData, del, verify} from '../../actions/dashboard_action'


import Home from './home'
import Members from './members'
import MembersReq from './membersReq'
import GetMem from './getMem'

var navStyle={
    position: 'absolute',top:64,left:300,right:0, bottom:0, zIndex:-100,padding:20, overflowY:'scroll', zIndex:100
}

export class dash extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        console.log('zxzxzxzx',this.props.dashMembers)
        return(
        <div id="bottomRightDash" className="grey lighten-2" style={navStyle}>
            {/* <Home org members={this.props.dashMembers} details={this.props.dashDetails}/> */}
            {/* <Members members={this.props.dashMembers} del={this.props.del}/> */}
            {/* <MembersReq requests={this.props.dashRequests} del={this.props.del} verify={this.props.verify}/> */}
            <GetMem members={this.props.dashMembers} del={this.props.del} />
        </div>
        )
    }
}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({updateDashboardData, del, verify}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(dash)