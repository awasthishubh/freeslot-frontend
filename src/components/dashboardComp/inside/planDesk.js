import React from 'react'
import ChooseDayTime from './addons/chooseDayTime'
import axios from 'axios'
import serverBaseURL from '../../../serverBaseURL'
import Cookies from 'js-cookie'
import MemTable from  './addons/membersTable'

function MemCard(props){
    console.log(props)
    if(props.members){
        console.log(props.members)
        return(
        <div className="card">
                <div className="card-content row">
                    <div className="card-title">{props.title}</div>
                    <MemTable viewMem={props.viewMem} members={props.members}/>
                </div>
        </div>
        )
    } else return <div/>
}

export default class extends React.Component{
    constructor(props){
        super(props)
        console.log(props)
        this.state={members:false}
    }
    componentDidMount(){
        document.getElementById('dashPlan').classList.add('active')
    }
    componentWillUnmount(){
        document.getElementById('dashPlan').classList.remove('active')
    }
    viewMem(reg){
        console.log(this.props)
        this.props.updateData(reg,'UPDATE_MODAL_SELECTED')
        this.props.selected.instance.open()
    }
    async send(start,end,day, memType){
        this.setState({disableBtn:true})
        console.log(start,end,day,memType)
        this.setState({status:'Planning...'})
        try{
            var data=await axios({
                url:`${serverBaseURL}/auth/members/getplan?start=${start}&end=${end}&day=${day}&mem=${memType}`,
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
    }
    render(){
        console.log(this.state.disableBtn)
        return(
            <div>
                <ChooseDayTime
                    title='Plan Desk Duties'
                    onSubmit={this.send.bind(this)}
                    status={this.state.status}
                    memberView
                    disableBtn={this.state.disableBtn}
                />
                <MemCard viewMem={this.viewMem.bind(this)} title='Available Members' members={this.state.members}/>
            </div>
        )
    }
}