export function updateData(data, type){
    return {
        type, data
    }
}


export function updateOrg(data){
    return {
        type: 'UPDATE_NAME_ORG',
        data
    }
}