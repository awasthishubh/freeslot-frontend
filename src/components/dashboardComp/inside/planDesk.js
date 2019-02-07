import React from 'react'
import ChooseDayTime from './addons/chooseDayTime'
import axios from 'axios'
import serverBaseURL from '../../../serverBaseURL'
import Cookies from 'js-cookie'

export default class extends React.Component{
    constructor(props){
        super(props)
    }
    async send(start,end,day, memType){
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
            else{
                // this.props.updateData(false,'UPDATE_ORG_LOGGED')
                throw e
            }
        }
        this.setState({status:null})
        this.setState({show:true})
    }
    render(){
        return(
        <ChooseDayTime
            title='Plan Desk Duties'
            onSubmit={this.send.bind(this)}
            memberView
        />
        )
    }
}