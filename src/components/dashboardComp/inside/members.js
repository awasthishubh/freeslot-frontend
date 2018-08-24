import React, {Component} from 'react'
import Collapsi from './collapsi'
import SortFilter from './filter-sort'
import axios from 'axios'
import serverBaseURL from '../../../serverBaseURL.js';
import Cookies from 'js-cookie'

export default class extends Component{
    constructor(props){
        super(props)
        this.collapsible=React.createRef()
        this.members=this.members.bind(this)
        this.viewMem=this.viewMem.bind(this)
        this.downloadcsv=this.downloadcsv.bind(this)
        this.state={download:'Download CSV'}
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
        this.props.updateData(true,'UPDATE_ORG_LOGGED')
        if(!this.props.members) this.props.updateMem()
        document.getElementById('dashMems').classList.add('active')
    }
    componentDidUpdate(){
        if(!this.props.members) this.props.updateMem()
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
            console.log(url)
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', this.props.members[0].org+'_members.csv');
            document.body.appendChild(link);
            link.click();
            this.setState({download:'Download CSV'})
        } catch(e){
            alert('Logout n login again')
        }

    }

    
    render(){
        // console.log('Memver Comp',this.props)
        if(this.props.members!==null)
        return (
            <div className="row">
                <div className="card s12">
                    <div className="card-content row">
                        <span className="card-title">Registered Members</span>
                        <div className="blue-text" style={{cursor:'pointer', textAlign:'right'}} onClick={this.downloadcsv}>{this.state.download}</div>
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