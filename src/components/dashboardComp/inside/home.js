import React, {Component} from 'react'

function Details(props){
    return(
        <div className=" col s12 m6" style={{height:'100%'}}>
            <div className="card hoverable darken-1" style={{height:'100%'}}>
                <div className="card-content black-text" style={{height:'88%'}}>
                    <span className="card-title">{props.title}</span>
                    <div  className="valign-wrapper" style={{ height: '100%'}} >
                        <div style={{fontSize:20, textAlign:'center',width:'100%'}}>
                        <img alt="Logo" className="responsive-img" src={props.img} style={{height:'20vh'}}/>
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
    componentDidMount(){
        document.getElementById('dashHome').classList.add('active')
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
                <Details title="Maintainer" img={this.props.details.maintainer_photo} name={this.props.details.maintainer_name}/>
            </div>
            <div className="row dashRow" style={{height:'35%'}}>
                <ShowP head="Total Members" stat={this.props.members?this.props.members.length:null} size={50}/>
                <ShowP head="Pending requests" stat={this.props.requests?this.props.requests.length:null} size={50}/>
                <ShowP head="Last work alloted" stat="2 months ago" size={20}/>
            </div>
            </div>
        )
        return(
            <div/>
        )
    }
}