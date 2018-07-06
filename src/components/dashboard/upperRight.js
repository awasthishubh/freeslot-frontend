import React, {Component} from 'react'

var navStyle={
    height:'64px', position: 'fixed', top:'0px', left:'300px', right:'0px', zIndex:'-1'
}

export default class extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
        <div id="upperRightDash" style={navStyle}>
        <nav className="white" style={{ color:'#424242'}}>
            <div class="nav-wrapper row">
                <div className="col m4"><ul class="left hide">
                    <li><a><span><i class="material-icons prefix" style={{display: 'inline-block',fontSize:40, color:'#424242'}}>notifications_none</i>sd</span></a></li>
                </ul></div>
                <div className="col m4">
                    <form>
                        <div class="input-field"style={{ margin: 0}}>
                        <i style={{marginTop: '-6px'}} class="material-icons prefix">search</i>
                        <input placeholder="Search for a member" id="first_name" type="text" class="validate"/>
                        </div>
                    </form>
                </div>
                <div className="col m4">
                    <ul class="right hide" >
                    <li><img className="circle responsive-img" src="https://www.macupdate.com/images/icons256/57631.png" style={{margin:10,height:44}}/></li>
                        <li><a><i class="material-icons prefix" style={{fontSize:40, color:'#424242'}}>settings</i></a></li>
                    </ul>
                </div>
            </div>
        </nav>
        </div>

        )
    }
}