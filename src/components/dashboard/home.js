import React, {Component} from 'react'

function Details(props){
    return(
        <div className=" col s12 m6" style={{height:'100%'}}>
            <div className="card hoverable darken-1" style={{height:'100%'}}>
                <div className="card-content black-text" style={{height:'88%'}}>
                    <span className="card-title">{props.title}</span>
                    <div  className="valign-wrapper" style={{ height: '100%'}} >
                        <div style={{fontSize:20, textAlign:'center',width:'100%'}}>
                        <img className="circle responsive-img" src={props.img} style={{height:'20vh'}}/>
                            <h5>{props.name}</h5>
                            <p>{props.tag}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

function ShowP(props){
    return(
        <div className="col s12 m4" style={{height:'100%'}}>
            <div className="card hoverable darken-1" style={{height:'100%'}}>
                <div className="card-content black-text" style={{height:'88%'}}>
                    <span className="card-title">{props.head}</span>
                    <div  className="valign-wrapper" style={{ height: '100%'}} >
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
            <div style={{height:'100%'}} >
            <div className="row dashRow" style={{height:'55%'}}>
                <Details img="https://www.macupdate.com/images/icons256/57631.png" name="Association Of Computer Machinery" tag="Technology Maters!"/>
                <Details title="Maintainer" img="https://www.macupdate.com/images/icons256/57631.png" name="Shubham Awasthi"/>
            </div>
            <div className="row dashRow" style={{height:'35%'}}>
                <ShowP head="Total Members" stat="10" size={50}/>
                <ShowP head="Pending requests" stat="5" size={50}/>
                <ShowP head="Last work alloted" stat="2 months ago" size={20}/>
            </div>
            </div>
        )
    }
}