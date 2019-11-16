import React, {Component} from 'react'
import SortFilter from './addons/filter-sort'
import axios from 'axios'
import serverBaseURL from '../../../serverBaseURL.js';
import Cookies from 'js-cookie'

export default class extends Component{
    constructor(props){
        super(props)
        this.collapsible=React.createRef()
        this.downloadcsv=this.downloadcsv.bind(this)
        this.state={download:'Download CSV'}
    } 

    componentDidMount(){
        this.props.updateData(true,'UPDATE_ORG_LOGGED')
        if(!this.props.members){
            this.props.updateMem()
        }
        document.getElementById('dashMems').classList.add('active')
    }
    componentDidUpdate(){
        if(!this.props.members && this.props.loggedIn) this.props.updateMem()
    }
    componentWillUnmount(){
        document.getElementById('dashMems').classList.remove('active')
    }
    async downloadcsv(){

        this.setState({download:'Downloading'})
        var token=Cookies.get('token')
        try{
            await axios({
                url:`${serverBaseURL}/auth/members`,
                headers: { 'Authorization': 'Bearer '+token},
                method: 'get',
            })
            var response=await axios({
                url: `${serverBaseURL}/auth/members/download`,
                method: 'GET',
                headers: { 'Authorization': 'Bearer '+token},
                responseType: 'blob', // important
            })
            
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', this.props.members[0].org+'_members.csv');
            document.body.appendChild(link);
            link.click();
            this.setState({download:'Download CSV'})
        } catch(e){
            if(e.request.status===401){
                this.props.updateData(false,'UPDATE_ORG_LOGGED')
                throw e
            }
            else{
                window.location.reload()
            }
        }

    }

    
    render(){
        if(this.props.members!==null)
        return (
            <div className="row">
                <div className="card s12">
                    <div className="card-content row">
                        <span className="card-title">Registered Members</span>
                        <div className="blue-text" style={{cursor:'pointer', textAlign:'right'}} onClick={this.downloadcsv}>{this.state.download}</div>
                        
                            <SortFilter
                                members={this.props.members} 
                                viewMem={this.props.viewMem}
                                verified
                            />
                            
                    </div>
                </div>
            </div>
        )
        else return <div/>
    }
}