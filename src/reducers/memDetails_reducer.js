var defaultState= {
    name: '',
    reg: '',
    email: '',
    org: '',
    phno: '',
    rmno:'',
    timeTable: {}
}

export default function(state=defaultState, action){

    var newState= {
        name: state.name,
        reg: state.reg,
        email: state.email,
        org: state.org,
        phno: state.phno,
        rmno: state.rmno,
        timeTable: state.timeTable
    }
    
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

        default:
            return newState
    }
}