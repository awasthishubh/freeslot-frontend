import React, {Component} from 'react'

var navStyle={
    position: 'absolute',top:64,left:300,right:0, bottom:0, zIndex:-100,padding:20
}

function OrgDetails(props){
    return(
        <div class=" col s12 m6" style={{height:'100%'}}>
            <div class="card hoverable darken-1" style={{height:'100%'}}>
                <div class="card-content black-text" style={{height:'88%'}}>
                    {/* <span class="card-title">Organisation Details</span> */}
                    <div  class="valign-wrapper" style={{ height: '100%'}} >
                        <p style={{fontSize:20, textAlign:'center',width:'100%'}}>
                        <img className="circle responsive-img" src="https://www.macupdate.com/images/icons256/57631.png" style={{height:'20vh'}}/>
                            <h5>Association Of Computer Machinery</h5>
                            <p>Technology Matters</p>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

function MaintainerDetails(props){
    return(
        <div class="col s12 m6" style={{height:'100%'}}>
            <div class="card hoverable darken-1" style={{height:'100%'}}>
                <div class="card-content black-text" style={{height:'88%'}}>
                    <span class="card-title">Maintainer Details</span>
                    <div  class="valign-wrapper" style={{ height: '100%'}} >
                        <p style={{fontSize:props.size, textAlign:'center',width:'100%'}}>
                            sd
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
function ShowP(props){
    return(
        <div class="col s12 m4" style={{height:'100%'}}>
            <div class="card hoverable darken-1" style={{height:'100%'}}>
                <div class="card-content black-text" style={{height:'88%'}}>
                    <span class="card-title">{props.head}</span>
                    <div  class="valign-wrapper" style={{ height: '100%'}} >
                        <p style={{fontSize:props.size, textAlign:'center',width:'100%'}}>{props.stat}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default class extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
        <div id="bottomRightDash" className="grey lighten-2" style={navStyle}>
            <div class="row dashRow" style={{height:'55%'}}>
                <OrgDetails/>
                <MaintainerDetails/>
            </div>
            <div class="row dashRow" style={{height:'35%'}}>
                <ShowP head="Total Members" stat="10" size={50}/>
                <ShowP head="Pending requests" stat="5" size={50}/>
                <ShowP head="Last work alloted" stat="2 months ago" size={20}/>
            </div>
        </div>
        )
    }
}