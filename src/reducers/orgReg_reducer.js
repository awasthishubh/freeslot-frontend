export default function(state, action){
    if(!state){
        var defaultState= {
            name: '',
            usid: '',
            passwd: '',
            cPasswd: '',
            mainName: '',
            mainEmail: '',
            descr: '',
            dp: ''
        }
        return defaultState
    }
    var newState= {
        name: state.name,
        usid: state.usid,
        passwd: state.passwd,
        cPasswd: state.cPasswd,
        mainName: state.mainName,
        mainEmail: state.mainEmail,
        descr:state.descr,
        dp:state.dp
    }
    
    switch(action.type){
        case 'UPDATE_ORG_NAME':
            newState.name=action.data
            return newState
        
        case 'UPDATE_ORG_USID':
            newState.usid=action.data
            return newState

        case 'UPDATE_ORG_PASSWD':
            newState.passwd=action.data
            return newState

        case 'UPDATE_ORG_CPASSWD':
            newState.cPasswd=action.data
            return newState

        case 'UPDATE_ORG_MAIN-NAME':
            newState.mainName=action.data
            return newState

        case 'UPDATE_ORG_MAIN-EMAIL':
            newState.mainEmail=action.data
            return newState
        
        case 'UPDATE_ORG_DESCR':
            newState.descr=action.data
            return newState
        case 'UPDATE_ORG_DP':
            newState.dp=action.data
            return newState
        default:
            return newState
    }
}

export function usidIsAvailable(state, action){
    if(!state){
        return null
    }
    // // console.log('orgRed,isav', action)
    if(action.type==="isAvailable"){
        alert('zx')
        return action.data
    }
    return state
}


export function validation(state, action){
    if(!state){
        var defaultState= {
            name: '',
            usid: '',
            passwd: '',
            cPasswd: '',
            mainName: '',
            mainEmail: '',
            descr: ''
        }
        return defaultState
    }
    var newState= {
        name: state.name,
        usid: state.usid,
        passwd: state.passwd,
        cPasswd: state.cPasswd,
        mainName: state.mainName,
        mainEmail: state.mainEmail,
        descr:state.descr
    }
    
    switch(action.type){
        case 'VALIDIATE_ORG_NAME':
            newState.name=action.data
            return newState
        
        case 'VALIDIATE_ORG_USID':
            newState.usid=action.data
            return newState

        case 'VALIDIATE_ORG_PASSWD':
            newState.passwd=action.data
            return newState

        case 'VALIDIATE_ORG_CPASSWD':
            newState.cPasswd=action.data
            return newState

        case 'VALIDIATE_ORG_MAIN-NAME':
            newState.mainName=action.data
            return newState

        case 'VALIDIATE_ORG_MAIN-EMAIL':
            newState.mainEmail=action.data
            return newState
        
        case 'VALIDIATE_ORG_DESCR':
            newState.descr=action.data
            return newState
        default:
            return newState
    }
}