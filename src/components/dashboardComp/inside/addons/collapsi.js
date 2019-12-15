import React, {Component} from 'react'
import M from 'materialize-css'
import {del, verify} from '../../../../actions/dashboard_action'
import {updateData} from '../../../../actions'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

class collapsi extends Component{
    constructor(props){
        super(props)
        this.collapsible=React.createRef()
    }
    componentDidMount(){
        M.Collapsible.init(this.collapsible.current);
    }
    componentDidUpdate(){
        M.Collapsible.init(this.collapsible.current);
    }
    viewMem(reg){
        this.props.updateData(reg,'UPDATE_MODAL_SELECTED')
        this.props.dashModal.instance.open()
    }

    render(){
        var{props}=this
        this.props.members.sort((a,b)=>{
            if(a[this.props.sort].toLowerCase()>b[this.props.sort].toLowerCase())
                return 1
            if(a[this.props.sort].toLowerCase()<b[this.props.sort].toLowerCase())
                return -1
            else {
                if(a.count>b.count) return 1
                if(a.count<b.count) return -1
                else return 0
            }
        })
        var membersCollapsi=[]
        this.props.members.forEach((mem)=>  {
            if(this.props.filterReg.test(mem.reg))
            membersCollapsi.push(
                <li key={mem.reg+mem.count}>
                    <div className="collapsible-header left-align">
                        <div className="col s12 m6">
                            <i className="material-icons">keyboard_arrow_right</i>
                            {mem.name+(mem.count>1?' #'+mem.count:'')}
                        </div>
                        <div className="col s6 right-align hide-on-small-only">{mem.reg}</div>
                    </div>
                    <div className="collapsible-body memCollapsi"><span>
                        <ul className="row">
                            <li className="col s5 m6"><b>Name: </b>{mem.name}</li>
                            <li className="col s7 m6"><b>Reg No: </b>{mem.reg}</li>
                        </ul>
                        <ul className="row">
                            <li className="col s5 m6"><b>Rm No: </b>{mem.rmno}</li>
                            <li className="col s7 m6"><b>Phno: </b>
                                <a target="_blank" rel="noopener noreferrer" href={`https://api.whatsapp.com/send?phone=91${mem.phno}`}>
                                    {mem.phno}
                                </a>
                            </li>
                        </ul>
                        <ul className="row">
                            <li className="col s12"><b>Email: </b>
                                <a href={`mailto:${mem.email}`}>
                                    {mem.email}
                                </a>
                            </li>
                        </ul>
                        
                    </span>
                    <div className="card-action">
                        {(()=>{
                                // eslint-disable-next-line
                                return <a style={{cursor:'pointer'}} onClick={()=>this.viewMem(mem)}>View more</a>
                        })()}

                        {(()=>{
                            if(!props.verified)
                                // eslint-disable-next-line
                            return <a style={{cursor:'pointer'}} onClick={()=>props.verify(mem.reg, mem.count)}>Accept</a>
                        })()}
    
                        {(()=>{
                                // eslint-disable-next-line
                            return <a style={{cursor:'pointer'}} onClick={()=>{if(window.confirm('Are you sure?')) props.del(mem.reg, (props.verified?'M':'R'), mem.count)}}>Remove</a>
                        })() }
                    </div>
                    </div>
                </li>
            )
        })
        if(membersCollapsi.length>0)
        return(
            <ul className="collapsible popout" ref={this.collapsible}>
                {membersCollapsi}
                </ul>
        )
        else return <div style={{textAlign: 'center', fontSize: 20, paddingBottom: 30}}>Nothing found.</div>
    }
}

function mapStateToProps(state){
    return {dashModal:state.dashModal}
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({updateData,del, verify}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(collapsi)
