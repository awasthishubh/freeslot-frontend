import axios from 'axios'
export function updateData(data, type){
    return {
        type, data
    }
}

export  function updateOrg(){
    return async function(dispatch){
        var response= await axios.get('http://localhost:5000/organisations')
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