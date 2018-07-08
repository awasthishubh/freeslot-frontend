import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateDashboardData, updateSelected} from '../../../actions/dashboard_action'

import UpperLeft from './dashUpperLeft'
import UpperRight from './dashUpperRight'
import BottomLeft from './dashBottomLeft'
import BottomRight from './dashBottomRight'

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
        var elems = document.querySelectorAll('.sidenav');
        window.sideInstance = M.Sidenav.init(elems[0]);
        this.props.updateDashboardData('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2lkIjoiYWNtIn0.QVu651zEd4hLJf6Bc6NHoVn7Y4Vrj3kNj5XGBJMY6Xo')
    }
    render(){
        console.log(this.props)
        return(
                <div>
                    <UpperLeft/>
                    <BottomLeft selected={this.props.dashSelected} select={this.props.updateSelected} members={this.props.dashMembers} requests={this.props.dashRequests}/>
                    <UpperRight/>
                    <BottomRight>
                            {this.props.children}
                    </BottomRight>
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