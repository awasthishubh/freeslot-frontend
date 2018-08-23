import React, {Component} from 'react'
import Collapsi from './collapsi'
import SortFilter from './filter-sort'

export default class extends Component{
    constructor(props){
        super(props)
        this.collapsible=React.createRef()
        this.members=this.members.bind(this)
        this.viewMem=this.viewMem.bind(this)
    }
    viewMem(reg){
        this.props.updateData(reg,'UPDATE_MODAL_SELECTED')
        this.props.selected.instance.open()
    }

    members(){
        if(this.props.requests && this.props.requests.length>0){
            return(
                <Collapsi view={this.viewMem} data={this.props.requests} verify={this.props.verify} del={this.props.del}/>
            )
        }
        else{
            return <div style={{fontSize:20, padding: 20}}>No request found</div>             
        }
    }

    componentDidMount(){
        document.getElementById('dashReqs').classList.add('active')
        if(!this.props.requests) this.props.updateReq()
    }
    componentDidUpdate(){
        if(!this.props.requests) this.props.updateReq()
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
                                    <SortFilter data={this.props.requests} type="REQUESTS" all={true}/>
                                    {this.members()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        else return <div/>
    }
}