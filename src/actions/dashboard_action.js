import axios from 'axios'
import Cookies from 'js-cookie'
import serverBaseURL from '../serverBaseURL.js';

window.Cookies=Cookies
var firstMemUpdate = true;
var firstOrgUpdate = true;

export function updateDashboardData(){
    return async function(dispatch){
            dispatch({type:'UPDATE_ORG_DETAILS', data:null})
            dispatch({type:'UPDATE_ORG_MEMBERS', data:null})
            dispatch({type:'UPDATE_ORG_REQUESTS', data:null})
            dispatch({type:'UPDATE_TIMESTAT', data:null})
    }
}

export function del(reg,type,count){
    return async function(dispatch){
        if(type==='M'){
            await axios({
                url:`${serverBaseURL}/auth/members?reg=${reg}`,
                headers: { 'Authorization': 'Bearer '+Cookies.get('token')},
                method: 'DELETE',
            })
            dispatch({type:'UPDATE_ORG_MEMBERS_DEL', reg})
        } else{
            await axios({
                url:`${serverBaseURL}/auth/requests?reg=${reg}&count=${count}`,
                headers: { 'Authorization': 'Bearer '+Cookies.get('token')},
                method: 'DELETE',
            })
            alert()
            dispatch({type:'UPDATE_ORG_REQUESTS_DEL', reg, count})
        }


    }
}

export function verify(reg,count){
    return async function(dispatch){
        await axios({
            url:`${serverBaseURL}/auth/requests?reg=${reg}&count=${count}`,
            headers: { 'Authorization': 'Bearer '+Cookies.get('token')},
            method: 'PUT',
        })
        dispatch({type:'UPDATE_ORG_REQUESTS_DEL', reg})
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
                headers: { 'Authorization': 'Bearer '+Cookies.get('token')},
                method: 'GET',
            })
            dispatch({type:'UPDATE_ORG_REQUESTS', data:req.data.data})
            dispatch({type:'UPDATE_ORG_LOGGED', data:true})
        } catch(e){
            if(e.request.status===401){
                dispatch({type:'UPDATE_ORG_LOGGED', data:false})
                throw e
            }
            else{
                alert('Something went wrong. Please refresh and try again.')
            }
        }
        
    }
}

export function updateMem(noLoading){
    return async function(dispatch){
        try {
            if (firstMemUpdate && localStorage.memData) {
                firstMemUpdate = false;
                dispatch({
                    type: 'UPDATE_ORG_MEMBERS', 
                    data: JSON.parse(atob(localStorage.memData))
                })
                dispatch({ type: 'UPDATE_ORG_LOGGED', data: true })
            }
            else{
                throw new Error()
            }

        } catch (error) {
            if(!noLoading) dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        }

        try{
            var req=await axios({
                url:`${serverBaseURL}/auth/members`,
                headers: { 'Authorization': 'Bearer '+Cookies.get('token')},
                method: 'GET',
            })

            localStorage.setItem('memData',btoa(JSON.stringify(req.data.data)))

            dispatch({type:'UPDATE_ORG_MEMBERS', data:req.data.data})
            dispatch({type:'UPDATE_ORG_LOGGED', data:true})
        } catch(e){
            if(e.request.status===401){
                dispatch({type:'UPDATE_ORG_LOGGED', data:false})
                throw e
            }
            else{
                // console.log('Something went wrong. Please refresh and try again.')
            }
        }
        
    }
}

export function updateOrg(){
    return async function(dispatch){
        try {
            if (firstOrgUpdate && localStorage.orgData && localStorage.statData) {
                firstOrgUpdate = false;
                dispatch({
                    type: 'UPDATE_ORG_DETAILS', data: {
                        details: JSON.parse(atob(localStorage.orgData)),
                        stat: JSON.parse(atob(localStorage.statData))
                    }
                })
                dispatch({ type: 'UPDATE_ORG_LOGGED', data: true })
                // return
            }
            else{
                throw new Error()
            }

        } catch (error) {
            dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        }
        try{
            
            var org=await axios({
                url:`${serverBaseURL}/auth/org`,
                headers: { 'Authorization': 'Bearer '+Cookies.get('token')},
                method: 'GET',
            })
            var stat=await axios({
                url:`${serverBaseURL}/auth/members/stats`,
                headers: { 'Authorization': 'Bearer '+Cookies.get('token')},
                method: 'GET',
            })
            localStorage.setItem('orgData',btoa(JSON.stringify(org.data.details)))
            localStorage.setItem('statData',btoa(JSON.stringify(stat.data)))
            dispatch({type:'UPDATE_ORG_DETAILS', data:{details: org.data.details, stat: stat.data}})
            dispatch({type:'UPDATE_ORG_LOGGED', data:true})
        } catch(e){
            // if(e.request.status===401){
            //     dispatch({type:'UPDATE_ORG_LOGGED', data:false})
            //     throw e
            // }
            // else{
            //     window.location.reload()
            // }
        }
        
    }
}

export function timeStat(){
    return async function(dispatch){
        dispatch({type:'UPDATE_ORG_LOGGED', data:null})
        try{
            var stat=await axios({
                url:`${serverBaseURL}/auth/members/timestat`,
                headers: { 'Authorization': 'Bearer '+Cookies.get('token')},
                method: 'GET',
            })
            dispatch({type:'UPDATE_TIMESTAT', data:stat.data})
            dispatch({type:'UPDATE_ORG_LOGGED', data:true})
        } catch(e){
            if(e.request.status===401){
                dispatch({type:'UPDATE_ORG_LOGGED', data:false})
                throw e
            }
            else{
                alert('Something went wrong. Please refresh and try again.')
            }
            dispatch({type:'UPDATE_ORG_LOGGED', data:false})
        }
        
    }
}


