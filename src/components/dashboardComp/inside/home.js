import React, {Component} from 'react'
var styleT={
    padding: '10px 0px',
    textAlign: 'center'
}
function Details(props){
    return(
        <div className=" col s12" style={{height:'100%'}}>
            <div className="card hoverable darken-1" style={{height:'100%'}}>
                <div className="card-content row black-text" style={{height:'88%'}}>
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
        
        <div className="col s12 m4" style={{height:'100%'}}>
            <div className="card hoverable darken-1" style={{height:'100%'}}>
                <div className="card-content black-text" style={{height:'88%'}}>
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
        document.getElementById('dashHome').classList.add('active')
        if(this.props.members){
            var firstYr=0, secondYr=0, thirdYr=0, fourthYr=0, total=0;
            this.props.members.map(function(mem){
                switch (mem.reg.slice(0,2)){
                    case '18':
                        firstYr+=1
                        break
                    case '17':
                        secondYr+=1
                        break
                    case '16':
                        thirdYr+=1
                        break
                    case '15':
                        fourthYr+=1
                        break
                    default:
                        break
                }
                total+=1
                return null
            })
            this.setState({firstYr,secondYr,thirdYr,fourthYr, total})
        }
    }
    componentDidUpdate(){
        if(this.props.members && this.firstUpdate){
            this.componentDidMount()
            this.firstUpdate=false
        }
    }
    componentWillUnmount(){
        document.getElementById('dashHome').classList.remove('active')
    }
    
    render(){
    // console.log(this.props)
        if(this.props.members)
        return(
            <div style={{height:'100%'}} >
            <div className="row dashRow" style={{height:'55%'}}>
                <Details img={this.props.details.dp} name={this.props.details.name} tag={this.props.details.descr}/>
                {/* <Details title="Maintainer" img={this.props.details.maintainer_photo} name={this.props.details.maintainer_name}/> */}
                
            </div>
            <div className="row dashRow" style={{height:'35%'}}>
                {/* <ShowP head="Members" stat={this.props.members?this.props.members.length:null} size={50}/> */}
                <div className="col s12 m8" style={{height:'100%'}}>
                    <div className="card hoverable darken-1" style={{height:'100%'}}>
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
                                        <span style={styleT} className="col s12 m3">{this.state.firstYr}</span>
                                        <span style={styleT} className="col s12 m3">{this.state.secondYr}</span>
                                        <span style={styleT} className="col s12 m3">{this.state.thirdYr}</span>
                                        <span style={styleT} className="col s12 m3">{this.state.fourthYr}</span>
                                    </div>
                                    {/* <div className> */}
                                        <span style={styleT} className="col s12 m2"><b>{this.state.total}</b></span>
                                    {/* </div> */}
                                </span >
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <ShowP head="Requests Pending" stat={this.props.requests?this.props.requests.length:null} size={50}/>
            </div>
            </div>
        )
        return(
            <div/>
        )
    }
}