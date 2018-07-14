import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateDashboardData} from '../../../actions/dashboard_action'
import {updateData} from '../../../actions'
import UpperLeft from './dashUpperLeft'
import UpperRight from './dashUpperRight'
import BottomLeft from './dashBottomLeft'
import BottomRight from './dashBottomRight'
import M from 'materialize-css'

var style={
    position: 'absolute',top:64,left:300,right:0, bottom:0,padding:20, overflowY:'scroll', zIndex:104
}

export class dashboard extends Component{
    constructor(props){
        super(props)
        this.sideNav=React.createRef();
    }
    componentDidMount(){
        var elems = document.querySelectorAll('.sidenav');
        window.sideInstance = M.Sidenav.init(elems[0]);
    }
    render(){
        console.log('dash indx',this.props)
        return(<div>
                <div>
                    <UpperLeft/>
                    <BottomLeft selected={this.props.dashSelected} select={this.props.updateSelected} members={this.props.dashMembers} requests={this.props.dashRequests}/>
                    <UpperRight data={this.props.dashMembers} selected={this.props.dashModal} select={this.props.updateData}/>
                    <BottomRight/>
                    </div>
                    <div className="bottomRightDash" style={style}>{this.props.children}</div>
                    </div>

        )
    }
}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({updateDashboardData,updateData}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)