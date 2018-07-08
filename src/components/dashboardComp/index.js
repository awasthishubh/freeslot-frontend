import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateDashboardData, updateSelected} from '../../actions/dashboard_action'
import {BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './inside/home'
import Members from './inside/members'
import MembersReq from './inside/membersReq'
import GetMem from './inside/getMem'

import FixedComp from './fixedComp'

function Loader(props){
    if(!props.loggedIn)
    return(
        <div style={{position: 'fixed', top:0, bottom:0,left:0, right:0, zIndex:1000, background: 'rgba(0,0,0, 0.7)' }}>
        <div class="preloader-wrapper big active" style={{height:200, width:200, position: 'absolute', top:'50%', left:'50%', margin: -100}}>
            <div class="spinner-layer spinner-green-only">
            <div class="circle-clipper  left">
                <div class="circle"></div>
            </div><div class="gap-patch">
                <div class="circle"></div>
            </div><div class="circle-clipper right">
                <div class="circle"></div>
            </div>
            </div>
        </div>
       </div>
    )
    return <div/>
}

export class dashboard extends Component{
    constructor(props){
        super(props)
        this.sideNav=React.createRef();
    }
    componentDidMount(){
        console.log('Mounted Dashboard')
        var elems = document.querySelectorAll('.sidenav');
        window.sideInstance = M.Sidenav.init(elems[0]);
        this.props.updateDashboardData()
        console.log('home',Home)
    }
    render(){
        return(
        <div>
            <BrowserRouter>
            <Switch>
                {/* <Route path='/dashboard/'>
                <FixedComp>
                </FixedComp>
                </Route> */}

                <Route path='/dashboard/home'>
                <FixedComp>
                        <Home members={this.props.dashMembers} requests={this.props.dashRequests} details={this.props.dashDetails}/>
                </FixedComp>
                </Route>

                <Route path='/dashboard/members'>
                <FixedComp>
                    <Members members={this.props.dashMembers} del={this.props.del}/>
                </FixedComp>
                </Route>

                <Route path='/dashboard/requests'>
                <FixedComp>
                    <MembersReq requests={this.props.dashRequests} del={this.props.del} verify={this.props.verify}/>
                </FixedComp>
                </Route>

                <Route path='/dashboard/find'>
                <FixedComp>
                    <GetMem members={this.props.dashMembers} del={this.props.del} />
                </FixedComp>
                </Route>
            </Switch>
            </BrowserRouter>
            <Loader loggedIn={this.props.isLoggedIn}/>

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