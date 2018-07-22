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
        if(this.props.members && this.props.members.length>0){
            return <Collapsi view={this.viewMem} data={this.props.members} del={this.props.del} />
        }
        else{
            return <div style={{fontSize:20, padding: 20}}>No member found under your organisation</div>             
        }
    }

    componentDidMount(){
        document.getElementById('dashMems').classList.add('active')
    }
    componentWillUnmount(){
        document.getElementById('dashMems').classList.remove('active')
    }

    
    render(){
        // console.log('Memver Comp',this.props)
        if(this.props.members!==null)
        return (
            <div className="row">
                <div className="card s12">
                    <div className="card-content row">
                        <span className="card-title">Registered Members</span>
                        <div className="container" style={{marginTop:40}}>
                            <SortFilter data={this.props.members} type="MEMBERS" all={true}/>
                            {this.members()}
                        </div>
                    </div>
                </div>
            </div>
        )
        else return <div/>
    }
}