export function all(state=null, action){
    console.log(action)
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
        default:
            return state
    }
}

export function requests(state=null, action){
    switch(action.type){
        case 'UPDATE_ORG_REQUESTS':
            return action.data
        default:
            return state
    }
}


export function isLoggedIn(state=null, action){
    switch(action.type){
        case 'UPDATE_ORG_LOGGED':
            return action.data
        default:
            return state
    }
}

export function dashModal(state={selected:null, instance:null}, action){
    var newState= {
        selected:state.selected, 
        instance:state.instance
    }
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
