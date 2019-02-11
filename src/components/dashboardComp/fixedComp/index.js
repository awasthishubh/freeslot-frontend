import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateDashboardData, updateMem} from '../../../actions/dashboard_action'
import {updateData} from '../../../actions'
import UpperLeft from './dashUpperLeft'
import UpperRight from './dashUpperRight'
import BottomLeft from './dashBottomLeft'
import BottomRight from './dashBottomRight'

// var style={
//     position: 'fixed',top:64,left:300,right:0, bottom:0,padding:20, overflowY:'scroll',overflowX:'scroll', zIndex:104
// }
var style={
    position: 'absolute',top:64,left:300,right:0, bottom:0,padding:20, overflowY:'auto', zIndex:104
}
export class dashboard extends Component{
    
    render(){
        // console.log('dash indx',this.props)
        return(<div>
                <div>
                    <UpperLeft/>
                    <BottomLeft selected={this.props.dashSelected} select={this.props.updateSelected} members={this.props.dashMembers} requests={this.props.dashRequests}/>
                    <UpperRight updateMem={this.props.updateMem} update={this.props.updateDashboardData} data={this.props.dashMembers} selected={this.props.dashModal} select={this.props.updateData}/>
                    <BottomRight/>
                    </div>
                    <div className="bottomRightDash" style={style}>
                        <div className="innerDash" style={{height:"calc(100vh - 124px)", overflow:'visible'}} >{this.props.children}</div>
                    </div>
                    </div>

        )
    }
}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({updateDashboardData,updateData, updateMem}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)