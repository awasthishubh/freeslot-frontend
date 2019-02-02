import axios from 'axios'
import Cookies from 'js-cookie'
import serverBaseURL from '../serverBaseURL.js';

window.Cookies=Cookies
var token=Cookies.get('token')

export function updateDashboardData(){
    return async function(dispatch){
            dispatch({type:'UPDATE_ORG_DETAILS', data:null})
            dispatch({type:'UPDATE_ORG_MEMBERS', data:null})
            dispatch({type:'UPDATE_ORG_REQUESTS', data:null})
            dispatch({type:'UPDATE_TIMESTAT', data:null})
    }
}

export function del(reg,data,type){
    return async function(dispatch){
        // dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        await axios({
            url:`${serverBaseURL}/auth/members?reg=${reg}`,
            headers: { 'Authorization': 'Bearer '+token},
            method: 'DELETE',
        })
        var newData=[]
        for(var i=0; i<data.length; i++){
            if(data[i].reg!==reg)
            newData.push(data[i])
        }
        if(type==='M'){
            dispatch({type:'UPDATE_ORG_MEMBERS', data:newData})
        } else dispatch({type:'UPDATE_ORG_REQUESTS', data:newData})
        // console.log(type,data)


    }
}

export function verify(reg,data){
    return async function(dispatch){
        // console.log(data)
        await axios({
            url:`${serverBaseURL}/auth/requests?reg=${reg}`,
            headers: { 'Authorization': 'Bearer '+token},
            method: 'PUT',
        })
        var newData=[]
        for(var i=0; i<data.length; i++){
            if(data[i].reg!==reg)
            newData.push(data[i])
        }
        dispatch({type:'UPDATE_ORG_REQUESTS', data:newData})
    }
}

export function modifyData(X,data,action){
    return ({
        type: 'UPDATE_ORG_'+action, data
    })
}

export function updateReq(){
    return async function(dispatch){
        dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        try{
            dispatch({type:'UPDATE_ORG_LOGGED', data:null})
            var req=await axios({
                url:`${serverBaseURL}/auth/requests`,
                headers: { 'Authorization': 'Bearer '+token},
                method: 'GET',
            })
            // console.log(req.data.data)
            dispatch({type:'UPDATE_ORG_REQUESTS', data:req.data.data})
            dispatch({type:'UPDATE_ORG_LOGGED', data:true})
        } catch(e){
            // console.log(e)
            dispatch({type:'UPDATE_ORG_LOGGED', data:false})
        }
        
    }
}

export function updateMem(noLoading){
    return async function(dispatch){
        // console.log('sdzx')
        if(!noLoading) dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        try{
            var req=await axios({
                url:`${serverBaseURL}/auth/members`,
                headers: { 'Authorization': 'Bearer '+token},
                method: 'GET',
            })
            // console.log(req.data.data)
            dispatch({type:'UPDATE_ORG_MEMBERS', data:req.data.data})
            dispatch({type:'UPDATE_ORG_LOGGED', data:true})
        } catch(e){
            console.log(e)
            dispatch({type:'UPDATE_ORG_LOGGED', data:false})
        }
        
    }
}

export function updateOrg(){
    return async function(dispatch){
        dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        try{
            var org=await axios({
                url:`${serverBaseURL}/auth/org`,
                headers: { 'Authorization': 'Bearer '+token},
                method: 'GET',
            })
            var stat=await axios({
                url:`${serverBaseURL}/auth/members/stats`,
                headers: { 'Authorization': 'Bearer '+token},
                method: 'GET',
            })
            dispatch({type:'UPDATE_ORG_DETAILS', data:{details: org.data.details, stat: stat.data}})
            dispatch({type:'UPDATE_ORG_LOGGED', data:true})
        } catch(e){
            console.log(e)
            dispatch({type:'UPDATE_ORG_LOGGED', data:false})
        }
        
    }
}

export function timeStat(){
    return async function(dispatch){
        dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        try{
            var stat=await axios({
                url:`${serverBaseURL}/auth/members/timestat`,
                headers: { 'Authorization': 'Bearer '+token},
                method: 'GET',
            })
            dispatch({type:'UPDATE_TIMESTAT', data:stat.data})
            dispatch({type:'UPDATE_ORG_LOGGED', data:true})
        } catch(e){
            console.log(e)
            dispatch({type:'UPDATE_ORG_LOGGED', data:false})
        }
        
    }
}


