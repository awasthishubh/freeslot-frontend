import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateDashboardData, updateSelected} from '../../actions/dashboard_action'
import {BrowserRouter } from 'react-router-dom'
import Home from './inside/home'
import Members from './inside/members'
import MembersReq from './inside/membersReq'
import GetMem from './inside/getMem'

// Home(){
    //     return <Home members={this.props.dashMembers} requests={this.props.dashRequests} details={this.props.dashDetails}/>
    // }

    // Members(){
    //     return <Members members={this.props.dashMembers} del={this.props.del}/>
    // }

    // MembersReq(){
    //     return <MembersReq requests={this.props.dashRequests} del={this.props.del} verify={this.props.verify}/>
    // }
    // GetMem(){
    //     return <GetMem members={this.props.dashMembers} del={this.props.del} />
    // }
import FixedComp from './fixedComp'

export class dashboard extends Component{
    constructor(props){
        super(props)
        this.sideNav=React.createRef();
    }
    componentDidMount(){
        // M.Sidenav.init(this.sideNav.current)
        var elems = document.querySelectorAll('.sidenav');
        window.sideInstance = M.Sidenav.init(elems[0]);
        this.props.updateDashboardData('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2lkIjoiYWNtIn0.QVu651zEd4hLJf6Bc6NHoVn7Y4Vrj3kNj5XGBJMY6Xo')
        // instances.open();
        console.log('home',Home)
    }
    render(){
        return(
        <div>
            <FixedComp>
            {/* <Home members={this.props.dashMembers} requests={this.props.dashRequests} details={this.props.dashDetails}/> */}
            <Members members={this.props.dashMembers} del={this.props.del}/>
            </FixedComp>
</div>


        )
    }
}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({updateDashboardData, updateSelected}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)