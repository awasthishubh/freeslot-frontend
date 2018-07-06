import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateDashboardData, del} from '../actions/dashboard_action'

import UpperLeft from './dashboard/dashUpperLeft'
import UpperRight from './dashboard/dashUpperRight'
import BottomLeft from './dashboard/dashBottomLeft'
import BottomRight from './dashboard/dashBottomRight'

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
        // M.Sidenav.init(this.sideNav.current)
        var elems = document.querySelectorAll('.sidenav');
        window.sideInstance = M.Sidenav.init(elems[0]);
        this.props.updateDashboardData('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2lkIjoiYWNtIn0.QVu651zEd4hLJf6Bc6NHoVn7Y4Vrj3kNj5XGBJMY6Xo')
        // instances.open();
    }
    render(){
        console.log(this.props)
        return(
            <div>
           <UpperLeft/>
           <BottomLeft mems={this.props.dashMembers}/>
           <UpperRight/>
           <BottomRight/>
           <Loader loggedIn={this.props.isLoggedIn} del={this.props.del}/>
           </div>


        )
    }
}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({updateDashboardData, del}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)