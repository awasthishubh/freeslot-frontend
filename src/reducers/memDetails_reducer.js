var defaultState= {
    name: '',
    reg: '',
    email: '',
    org: '',
    phno: '',
    rmno:'',
    timeTable: {},
    slots:[[],[],[],[],[],[],[]]
}

export default function(state=defaultState, action){
    var newState= {...state}
    switch(action.type){
        case 'UPDATE_NAME':
            newState.name=action.data
            return newState
        
        case 'UPDATE_REG':
            newState.reg=action.data
            return newState

        case 'UPDATE_EMAIL':
            newState.email=action.data
            return newState

        case 'UPDATE_PHNO':
            newState.phno=action.data
            return newState

        case 'UPDATE_ORG':
            newState.org=action.data
            return newState

        case 'UPDATE_TT':
            newState.timeTable=action.data
            return newState

        case 'UPDATE_RMNO':
            newState.rmno=action.data
            return newState

        case 'UPDATE_SLOTS':
            newState.slots=action.data
            return newState

        case 'RESET_MEM_DETAILS':
            return defaultState
        
        case 'UPDATE_MEM_ALL':
            return action.data

        default:
            return newState
    }
}