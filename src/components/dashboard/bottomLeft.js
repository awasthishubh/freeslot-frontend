import React, {Component} from 'react'

var navStyle={
    position: 'fixed',
    width: '300px',
    height: '100%',
    top:'64px',
    left: '0px'
}

export default class extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
        <nav class="sideNav grey darken-4" style={navStyle}>
        <div className="row" style={{padding:10}}>
            <div class="img" >
                <img class="circle col s12 responsive-img" style={{padding:25}} src="https://blog.codinghorror.com/content/images/2016/01/discourse-default-avatar-a.png" alt="" />
            </div>
            <div style={{fontSize:25, textAlign:'center', lineHeight:1.5, marginTop:20}}>
                <b>Association Of Computer Machinery</b>
            </div>
            <div class="grey-text" style={{fontSize:20, textAlign:'center', lineHeight:1.5, marginTop:20}}>
                acm
            </div>
            <div style={{fontSize:20, textAlign:'center', lineHeight:1.5, marginTop:20}}>
                Technology Matters Matters Matters!
            </div>
            <div style={{fontSize:20, textAlign:'center', lineHeight:1.5, marginTop:20}}>
            </div>
        </div>
        </nav>
        )
    }
}