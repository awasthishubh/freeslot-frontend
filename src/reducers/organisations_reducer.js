export default function(state=null, action){
    console.log(action)
    switch(action.type){
        case 'UPDATE_NAME_ORG':
            return action.data
    }
    return state
}