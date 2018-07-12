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
        if(this.props.members && this.props.members.length>0){
            return <Collapsi data={this.props.members} del={this.props.del} />
        }
        else{
            return <div style={{fontSize:20, padding: 20}}>No member found under your organisation</div>             
        }
    }

    componentDidMount(){
        console.log(this.collapsible)
        M.Collapsible.init(this.collapsible.current);
        document.getElementById('dashMems').classList.add('active')
    }
    componentWillUnmount(){
        document.getElementById('dashMems').classList.remove('active')
    }

    
    render(){
        console.log(22222,this.props)
        if(this.props.members!==null)
        return (
            <div className="row">
                <div className="card s12">
                    <div className="card-content row">
                        <span className="card-title">Registered Members</span>
                        <div className="container" style={{marginTop:40}}>
                            <Sort_filter data={this.props.members} type="MEMBERS"/>
                            {this.members()}
                        </div>
                    </div>
                </div>
            </div>
        )
        else return <div/>
    }
}