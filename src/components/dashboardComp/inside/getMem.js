import React, {Component} from 'react'
import SortFilter from './addons/filter-sort'
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
                    <SortFilter 
                        members={props.members} 
                        viewMem={props.viewMem}
                        verified
                    />
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
        this.members=null
    }
    
    componentWillUnmount(){
        document.getElementById('dashGetMem').classList.remove('active')
    }
    componentDidMount(){
        this.props.updateData(true,'UPDATE_ORG_LOGGED')
        document.getElementById('dashGetMem').classList.add('active')
        
    }
    async submit(start, end, point){
            this.setState({disableBtn:true})
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
                if(e.request.status===401){
                    this.props.updateData(false,'UPDATE_ORG_LOGGED')
                    throw e
                }
                else{
                    window.location.reload()
                }
            }
            this.setState({disableBtn:false})
            this.setState({status:null})
            this.setState({show:true})
    }
 
    render(){
        
        return(
            <div className="row">
                
                <ChooseDayTime
                    title='Get a Member'
                    onSubmit={this.submit}
                    status={this.state.status}
                    disableBtn={this.state.disableBtn}
                />
                <RenderCard 
                    viewMem={this.props.viewMem}
                    members={this.state.members}
                    show={this.state.show}
                />
            </div>
        )
    }
}