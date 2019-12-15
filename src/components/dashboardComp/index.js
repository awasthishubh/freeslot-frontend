import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {updateDashboardData, del, verify,updateReq,updateMem,updateOrg,timeStat} from '../../actions/dashboard_action'
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './inside/home'
import Members from './inside/members'
import MembersReq from './inside/membersReq'
import GetMem from './inside/getMem'
import TimeStart from './inside/timeStat'
import TimeTable from '../timeTable'
import {updateData} from '../../actions'
import Settings from './inside/settings'
import M from 'materialize-css'
import Cookies from 'js-cookie'
import FixedComp from './fixedComp'
import PlanDesk from './inside/planDesk'
import { Redirect } from 'react-router'
class Modal extends Component{
    // constructor(props){
    //     super(props)
    //     this.modalRef=React.createRef();
    // }
    // componentDidMount(){
    //     var instance = M.Modal.init(this.Modal.current);
    //     this.props.updateData(instance,'UPDATE_MODAL_INSTANCE',{
    //         onCloseStart:()=>{

    //         }
    //     })
    // }
    componentDidUpdate(){
        this.props.modalRef.current.getElementsByClassName('modal-content')[0].scrollTop=0
    }

    render(){
        return(
            <div id="dashModalMem" ref={this.props.modalRef} className="modal modal-fixed-footer">
                <div className="modal-content">
                    {(()=>{
                        if(this.props.member){
                            return <TimeTable data={this.props.member} />
                        }
                        else return <h5>Member Not Found</h5>
                    })()}
                </div>
                <div className="modal-footer" ref={this.modalFooter}>
                <button style={{cursor:'pointer'}} className="modal-close waves-effect waves-green btn-flat"><b>Close</b></button>
                </div>
            </div>

        )
    }
    
}

function Loader(props){
    if(!props.loggedIn)
    return(
        <div className="loader" style={{position: 'fixed', top:70, bottom:0,left:305, right:0, zIndex:105, background: '#e0e0e0', padding:20 }}>
        <div className="preloader-wrapper big active" style={{height:200, width:200, position: 'absolute', top:'50%', left:'50%', margin: -100}}>
            <div className="spinner-layer spinner-green-only" >
            <div className="circle-clipper left" >
                <div className="circle" style={{border: '7px dashed rgb(0, 68, 169)'}}></div>
            </div><div className="gap-patch" >
                <div className="circle"></div>
            </div><div className="circle-clipper right">
                <div className="circle" style={{border: '10px dashed rgb(0, 68, 169)'}}></div>
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
        this.Modal=React.createRef();
    }
    componentDidUpdate(){
        if(this.props.isLoggedIn===false){
            Cookies.set('token','')
            window.location.href='/'
        }
    }
    componentDidMount(){
        document.title = "Dashboard | FreeSlot"
        var elems = document.querySelectorAll('.sidenav');
        window.sideInstance = M.Sidenav.init(elems[0]);
        var instance = M.Modal.init(this.Modal.current);
        this.props.updateData(instance,'UPDATE_MODAL_INSTANCE')
    }

    render(){
        if(!Cookies.get('token'))  return <Redirect to='/'/>;
        return(
        <div>
            <Router>
            <Switch>
                <Route exact path='/dashboard/'>
                    <FixedComp>
                    <Home 
                        updateData={this.props.updateData} 
                        updateOrg={this.props.updateOrg}
                        org={this.props.dashDetails}
                        loggedIn={this.props.isLoggedIn}/>
                    </FixedComp>
                </Route>

                <Route path='/dashboard/home'>
                <FixedComp>
                        <Home
                            updateData={this.props.updateData} 
                            updateOrg={this.props.updateOrg}
                            org={this.props.dashDetails}
                            loggedIn={this.props.isLoggedIn}/>
                </FixedComp>
                </Route>

                <Route path='/dashboard/members'>
                <FixedComp>
                    <Members 
                        updateMem={this.props.updateMem}
                        updateData={this.props.updateData} 
                        members={this.props.dashMembers} 
                        loggedIn={this.props.isLoggedIn}
                    />
                </FixedComp>
                </Route>

                <Route path='/dashboard/requests'>
                <FixedComp>
                    <MembersReq 
                        updateReq={this.props.updateReq}
                        updateData={this.props.updateData} 
                        membersReq={this.props.dashRequests} 
                        loggedIn={this.props.isLoggedIn}/>
                </FixedComp>
                </Route>

                <Route path='/dashboard/find'>
                <FixedComp>
                    <GetMem  
                        updateData={this.props.updateData}
                    />
                </FixedComp>
                </Route>

                <Route path='/dashboard/settings'>
                <FixedComp>
                    <Settings 
                        updateData={this.props.updateData} 
                        updateOrg={this.props.updateOrg}
                        org={this.props.dashDetails}
                        loggedIn={this.props.isLoggedIn}/>
                        {/* selected={this.props.dashModal}  */}
                </FixedComp>
                </Route>

                <Route path='/dashboard/plan'>
                <FixedComp>
                    <PlanDesk  
                        selected={this.props.dashModal} 
                        updateData={this.props.updateData}
                    />
                </FixedComp>
                </Route>

                <Route path='/dashboard/statistics'>
                <FixedComp>
                    <TimeStart
                        updateData={this.props.updateData}
                        update={this.props.timeStat}
                        timeStat={this.props.dashtimeStat}
                        loggedIn={this.props.isLoggedIn}/>
                </FixedComp>
                </Route>
            </Switch>
            </Router>
            <Loader loggedIn={this.props.isLoggedIn}/>
            <Modal modalRef={this.Modal} member={this.props.dashModal.selected}/>
        </div> 
              


        )
    }
}

function mapStateToProps(state){
    return state
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({timeStat,updateReq,updateMem,updateOrg,updateData,updateDashboardData, del, verify}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(dashboard)