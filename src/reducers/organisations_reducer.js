export function all(state=null, action){
    console.log(action)
    switch(action.type){
        case 'UPDATE_ORG_ALL':
            return action.data
    }
    return state
}

export function details(state=null, action){
    console.log(action)
    switch(action.type){
        case 'UPDATE_ORG_DETAILS':
            return action.data
    }
    return state
}

export function members(state=null, action){
    console.log(action)
    switch(action.type){
        case 'UPDATE_ORG_MEMBERS':
            return action.data
    }
    return state
}

export function token(state=null, action){
    console.log(action)
    switch(action.type){
        case 'UPDATE_ORG_TOKEN':
            return action.data
    }
    return state
}