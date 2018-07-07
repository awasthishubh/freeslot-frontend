export function all(state=null, action){
    console.log(action)
    switch(action.type){
        case 'UPDATE_ORG_ALL':
            return action.data
    }
    return state
}

export function details(state=null, action){
    switch(action.type){
        case 'UPDATE_ORG_DETAILS':
            return action.data
    }
    return state
}

export function members(state=null, action){
    switch(action.type){
        case 'UPDATE_ORG_MEMBERS':
            return action.data
    }
    return state
}

export function selected(state='home', action){
    switch(action.type){
        case 'UPDATE_SELECTED':
            return action.data
    }
    return state
}

export function requests(state=null, action){
    switch(action.type){
        case 'UPDATE_ORG_REQUESTS':
            return action.data
    }
    return state
}


export function isLoggedIn(state=null, action){
    switch(action.type){
        case 'UPDATE_ORG_LOGGED':
            return action.data
    }
    return state
}