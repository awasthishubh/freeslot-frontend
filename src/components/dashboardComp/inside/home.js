import React, {Component} from 'react'
var styleT={
    padding: '10px 0px',
    textAlign: 'center'
}
function Details(props){
    return(
        <div className=" col s12" style={{height:'100%',padding:0   }}>
            <div className="card hoverable darken-1" style={{height:'100%',margin:0}}>
                <div className="card-content row black-text" style={{height:'88%',margin:0}}>
                    <span className="card-title">{props.title}</span>
                        <div className="col m6 s12" style={{fontSize:20, textAlign:'center', height:'100%'}}>
                            <div className="valign-wrapper" style={{height: '100%', width:'100%'}} >
                                <span className=""  style={{width:'100%'}}>
                                    <img alt="Logo" className="responsive-img" src={props.img} style={{height:'30vh'}}/>
                                </span>
                            </div>
                        </div>
                        {/* <div className="col m6 s12" style={{fontSize:20, textAlign:'center',height: '70%'}}>
                            <div className="valign-wrapper" style={{height: '100%'}} >
                                <img alt="Logo" className="responsive-img" src={props.img} style={{height:'100%'}}/>
                            </div>
                        </div> */}
                        <div className="col m6 s12" style={{fontSize:20, textAlign:'center', height:'100%'}}>
                            <div className="valign-wrapper" style={{height: '100%', width:'100%'}} >
                                <span className=""  style={{width:'100%'}}>
                                    <h5 style={{width:'100%'}}>{props.name}</h5><br/>
                                    <p style={{width:'100%'}}>{props.tag}</p>
                                </span>
                            </div>
                        </div>
                    {/* </div> */}
                </div>
            </div>
        </div>
    )
}

function ShowP(props){
    return(
        
        <div className="col s12 m4 cardDash" style={{height:'100%', padding:0, ...props.style}}>
            <div className="card hoverable darken-1" style={{height:'100%',margin:0}}>
                <div className="card-content black-text" style={{height:'88%', margin:0}}>
                    <span className="card-title"  style={{height:'25%'}}>{props.head}</span>
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
        this.state={firstYr:null,secondYr:null,thirdYr:null,fourthYr:null}
        this.firstUpdate=true
    }
    componentDidMount(){
        this.props.updateData(true,'UPDATE_ORG_LOGGED')
        if(!this.props.org) this.props.updateOrg()
        document.getElementById('dashHome').classList.add('active')
    }
    componentDidUpdate(){
        if(!this.props.org && this.props.loggedIn) this.props.updateOrg()
    }
    componentWillUnmount(){
        document.getElementById('dashHome').classList.remove('active')
    }
    
    render(){
    // console.log(this.props)
        if(this.props.org && this.props.org.stat)
        return(
            <div style={{height:'100%'}} >
            <div className="row dashRow" style={{height:'55%',margin:'0px 0px 20px 0px'}}>
                <Details img={this.props.org.details.dp} name={this.props.org.details.name} tag={this.props.org.details.descr}/>
                
            </div>
            <div className="row dashRow" style={{height:'45%', margin:0}}>
                {/* <ShowP head="Members" stat={this.props.members?this.props.members.length:null} size={50}/> */}
                <div className="col s12 m8" style={{height:'100%', padding:0}}>
                    <div className="card hoverable darken-1" style={{height:'100%', margin:0}}>
                        <div className="card-content black-text" style={{height:'88%'}}>
                            <span className="card-title">Members Stats</span>
                            <div  className="row" style={{ height: '100%', marginTop:'4vh'}} >
                                <span className="col s6 m12">
                                <span className="col s12">
                                    <span className="col s12 m10">
                                        <span style={styleT} className="col s12 m3"><nobr><b>First Yr</b></nobr></span>
                                        <span style={styleT} className="col s12 m3"><nobr><b>Second Yr</b></nobr></span>
                                        <span style={styleT} className="col s12 m3"><nobr><b>Third Yr</b></nobr></span>
                                        <span style={styleT} className="col s12 m3"><nobr><b>Fourth Yr</b></nobr></span>
                                    </span>
                                    <span style={styleT} className="col s12 m2"><nobr><b>Total</b></nobr></span>
                                </span >
                                </span>

                                <span className="col s6 m12">
                                <span className="col s12">
                                    <div className="col s12 m10">
                                        <span style={styleT} className="col s12 m3">{this.props.org.stat.firstYr}</span>
                                        <span style={styleT} className="col s12 m3">{this.props.org.stat.secondYr}</span>
                                        <span style={styleT} className="col s12 m3">{this.props.org.stat.thirdYr}</span>
                                        <span style={styleT} className="col s12 m3">{this.props.org.stat.fourthYr}</span>
                                    </div>
                                    {/* <div className> */}
                                        <span style={styleT} className="col s12 m2"><b>{this.props.org.stat.members}</b></span>
                                    {/* </div> */}
                                </span >
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <ShowP style={{paddingLeft:20}} head="Requests Pending" stat={this.props.org.stat.requests} size={50}/>
            </div>
            </div>
        )
        return(
            <div/>
        )
    }
}