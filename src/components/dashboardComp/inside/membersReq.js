import React, {Component} from 'react'
import Collapsi from './collapsi'
import Sort_filter from './filter-sort'

export default class extends Component{
    constructor(props){
        super(props)
        this.collapsible=React.createRef()
        this.members=this.members.bind(this)
    }

    members(){
        var del=this.props.del
        var verify=this.props.verify
        if(this.props.requests && this.props.requests.length>0){
            console.log(this.props.requests,this.props.requests!==[])
            return(
                <Collapsi data={this.props.requests} verify={this.props.verify} del={this.props.del}/>
            )
        }
        else{
            return <div style={{fontSize:20, padding: 20}}>No request found</div>             
        }
    }

    componentDidMount(){
        document.getElementById('dashReqs').classList.add('active')
    }
    componentWillUnmount(){
        document.getElementById('dashReqs').classList.remove('active')
    }
    
    render(){
        console.log('requests Comp',this.props.requests)
        if(this.props.requests!==null)
            return (
                <div className="row">
                    <div className="card s12">
                        <div className="card-content row">
                            <span className="card-title">Members Requests</span>
                            <div className="container" style={{marginTop:40}}>
                                    <Sort_filter data={this.props.requests} type="REQUESTS"/>
                                    {this.members()}
                            </div>
                        </div>
                    </div>
                </div>
            )
        else return <div/>
    }
}