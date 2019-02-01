import axios from 'axios'
import serverBaseURL from '../serverBaseURL.js';
export function updateData(data, type){
    // console.log(type, data)
    return {
        type, data
    }
}

window.axios=axios
window.serverBaseURL=serverBaseURL
export  function updateOrg(){
    return async function(dispatch){
        var response= await axios.get(serverBaseURL+'/organisations')
        dispatch({
            type: 'UPDATE_ORG_ALL',
            data: response.data
        })
    }
    
}

export function isAvailableUpdate(data){
    return{
        type: 'isAvailable',
        data
    }
}