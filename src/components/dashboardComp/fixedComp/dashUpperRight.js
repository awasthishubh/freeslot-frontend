import React, {Component} from 'react'

var navStyle={
    height:64, position: 'fixed', top:0, left:300, right:0, zIndex:105
}

export default class extends Component{
    constructor(props){
        super(props)
    }
    
    render(){
        return(
        <div id="upperRightDash" style={navStyle}>
        <nav className="white" style={{ color:'#424242'}}>
            <div className="nav-wrapper row">
                <div className="col m4"><ul className="left hide">
                    <li><a><span><i className="material-icons prefix" style={{display: 'inline-block',fontSize:40, color:'#424242'}}>notifications_none</i>sd</span></a></li>
                </ul></div>
                <div className="col m4">
                    <form>
                    <div class="input-field col s12">
          <i class="material-icons prefix">textsms</i>
          <input type="text" id="autocomplete-input" class="autocomplete"/>
          <label for="autocomplete-input">Autocomplete</label>
        </div>
                    </form>
                </div>
                <div className="col m4">
                    <ul className="right hide" >
                    <li><img className="circle responsive-img" src="https://www.macupdate.com/images/icons256/57631.png" style={{margin:10,height:44}}/></li>
                        <li><a><i className="material-icons prefix" style={{fontSize:40, color:'#424242'}}>settings</i></a></li>
                    </ul>
                </div>
            </div>
        </nav>
        </div>

        )
    }
}