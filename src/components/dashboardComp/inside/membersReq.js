import React, {Component} from 'react'
import Collapsi from './collapsi'
import SortFilter from './filter-sort'

export default class extends Component{
    constructor(props){
        super(props)
        this.collapsible=React.createRef()
    }

    members(){
        console.log(this.props)
        if(this.props.requests && this.props.requests.length>0){
            return(
                <Collapsi view={this.viewMem} data={this.props.requests} 
                verify={this.props.verify} 
                del={this.props.del}/>
            )
        }
        else{
            return <div style={{fontSize:20, padding: 20}}>No request found</div>             
        }
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
        // console.log('requests Comp',this.props)
        if(this.props.requests!==null)
            return (
                <div className="row">
                    <div className="card s12">
                        <div className="card-content row">
                            <span className="card-title">Members Requests</span>
                            <div className="container" style={{marginTop:40}}>
                            <SortFilter
                                members={this.props.membersReq} 
                                viewMem={this.props.viewMem}
                                verified={false}
                            />
                                    
                            </div>
                        </div>
                    </div>
                </div>
            )
        else return <div/>
    }
}