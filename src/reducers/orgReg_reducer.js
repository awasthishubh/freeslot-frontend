import axios from 'axios'

export default function(state, action){
    if(!state){
        var defaultState= {
            name: '',
            usid: '',
            passwd: '',
            cPasswd: '',
            mainName: '',
            mainEmail: ''
        }
        return defaultState
    }
    var newState= {
        name: state.name,
        usid: state.usid,
        passwd: state.passwd,
        cPasswd: state.cPasswd,
        mainName: state.mainName,
        mainEmail: state.mainEmail
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
    }
    return newState
}

export function usidIsAvailable(state, action){
    if(!state){
        return null
    }
    if(action.type=="UPDATE_ORG_USID"){
        axios.get('http://localhost:5000/organisations').then(function(data){
            confirm.log(data.response)
        })
    }
    return state
}