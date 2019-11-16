import React, {Component} from 'react'
import SortFilter from './addons/filter-sort'

export default class extends Component{
    constructor(props){
        super(props)
        this.collapsible=React.createRef()
    }


    componentDidMount(){
        document.getElementById('dashReqs').classList.add('active')
        this.props.updateData(true,'UPDATE_ORG_LOGGED')
        if(!this.props.membersReq) this.props.updateReq()
    }
    componentDidUpdate(){
        if(!this.props.membersReq && this.props.loggedIn) this.props.updateReq()
    }
    componentWillUnmount(){
        document.getElementById('dashReqs').classList.remove('active')
    }
    
    render(){
        if(this.props.requests!==null)
            return (
                <div className="row">
                    <div className="card s12">
                        <div className="card-content row">
                            <span className="card-title">Members Requests</span>
                            <SortFilter
                                members={this.props.membersReq} 
                                viewMem={this.props.viewMem}
                                verified={false}
                            />
                                    
                        </div>
                    </div>
                </div>
            )
        else return <div/>
    }
}