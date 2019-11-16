export function all(state=null, action){
    switch(action.type){
        case 'UPDATE_ORG_ALL':
            return action.data
        default:
            return state
    }
}

export function details(state=null, action){
    switch(action.type){
        case 'UPDATE_ORG_DETAILS':
            return action.data
        default:
            return state
    }
}

export function members(state=null, action){
    switch(action.type){
        case 'UPDATE_ORG_MEMBERS':
            return action.data
        case 'UPDATE_ORG_MEMBERS_DEL':
            var newState=[...state]
            newState.splice(newState.findIndex(e=>e.reg===action.reg),1)
            return newState
        default:
            return state
    }
}

export function requests(state=null, action){
    
    switch(action.type){
        case 'UPDATE_ORG_REQUESTS':
            return action.data
        case 'UPDATE_ORG_REQUESTS_DEL':
            var newState=[]
            if(action.count){
                newState=state.filter((e)=>!(e.reg===action.reg && e.count===action.count))
            }
            else{
                newState=state.filter((e)=>e.reg!==action.reg)
            }
            return newState
        default:
            return state
    }
}


export function isLoggedIn(state=true, action){
    switch(action.type){
        case 'UPDATE_ORG_LOGGED':
            return action.data
        default:
            return state
    }
}

export function dashModal(state={selected:null, instance:null}, action){
    var newState= {...state}
    switch(action.type){
        case 'UPDATE_MODAL_INSTANCE':
            newState.instance=action.data
            return newState
        case 'UPDATE_MODAL_SELECTED':
            newState.selected=action.data
            return newState
        default:
            return state
    }
}

export function timeStat(state=null, action){
    switch(action.type){
        case 'UPDATE_TIMESTAT':
            return action.data
        default:
            return state
    }
}