import React, {Component} from 'react'
import Collapsi from './collapsi'
import SortFilter from './filter-sort'
import M from 'materialize-css'
import axios from 'axios'
import Cookies from 'js-cookie'
import serverBaseURL from '../../../serverBaseURL.js';
import ChooseDayTime from './addons/chooseDayTime';

function RenderCard(props){
    if(props.show)
    return(
        <div className="card s12">
            <div className="card-content row">
                <span className="card-title" >Available Members</span>
                <div className="container" style={{marginTop:40}}>
                    <SortFilter data={props.members} update={props.update} all={false}/>
                    <Collapsi data={props.members} view={props.view}/>
                </div>
            </div>
        </div>
    )
    else return <div></div> 
}

export default class extends Component{
    constructor(props){
        super(props)
        this.submit=this.submit.bind(this)
        this.state={show:null,err:null}
        this.viewMem=this.viewMem.bind(this)
        this.members=null
    }
    
    componentWillUnmount(){
        document.getElementById('dashGetMem').classList.remove('active')
    }
    componentDidMount(){
        this.props.updateData(true,'UPDATE_ORG_LOGGED')
        document.getElementById('dashGetMem').classList.add('active')
        
    }
    viewMem(reg){
        this.props.updateData(reg,'UPDATE_MODAL_SELECTED')
        this.props.selected.instance.open()
    }
    async submit(start, end, point){
            this.setState({status:'Finding...'})
            try{
                var data=await axios({
                    url:`${serverBaseURL}/auth/freemems?start=${start}&end=${end}&day=${point}`,
                    headers: { 'Authorization': 'Bearer '+Cookies.get('token')},
                    method: 'GET',
                })
                this.setState({members:data.data.members})
            }catch(e){
                if(e.request.status===404)
                    this.setState({members:[]})
                else{
                    this.props.updateData(false,'UPDATE_ORG_LOGGED')
                    throw e
                }
            }
            this.setState({status:null})
            this.setState({show:true})
    }
 
    render(){
        
        return(
            <div className="row">
                
                <ChooseDayTime
                    onSubmit={this.submit}
                    status={this.state.status}
                />
                <RenderCard 
                    show={this.state.show}
                    members={this.state.members}
                    view={this.viewMem}
                    update={(data)=>{this.setState({members:data})}}
                />
            </div>
        )
    }
}