import axios from 'axios'
export function updateData(data, type){
    return {
        type, data
    }
}

export function updateOrg(){
    var response= axios.get('http://localhost:5000/organisations')
    return {
        type: 'UPDATE_NAME_ORG',
        data: response
    }

}