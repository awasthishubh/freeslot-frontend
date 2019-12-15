import React, {Component} from 'react'
import M from 'materialize-css'
import $ from 'jquery'
var navStyle={
    height:64, position: 'fixed', top:0, left:300, right:0, zIndex:106
}

export default class extends Component{
    constructor(props){
        super(props)
        this.find=this.find.bind(this)
    }
    componentDidUpdate(){
        if(this.props.data)
        {    var data={}
            this.props.data.map(function(mem){
                data[mem.reg+' ('+mem.name+')']=null
                return mem
            })
            var elems = document.querySelectorAll('.autocomplete');
            M.Autocomplete.init(elems, {data,
                onAutocomplete: this.find
            });
        }
    }

    find(e){
        e=e.split(' ')[0]
        var {data}=this.props
        window.asd=data
        var index=data.findIndex(el=>el.reg===e)
        this.props.select(data[index],'UPDATE_MODAL_SELECTED')
        this.props.selected.instance.open()
        $('#autocomplete-input')[0].value=''
    }
    
    render(){
        return(
        <div id="upperRightDash" style={navStyle}>
        <nav className="white" style={{ color:'#424242'}}>
            <div className="nav-wrapper row">
                <div className="col m6 offset-m3 s9">
                    <form onSubmit={(e)=>{e.preventDefault();this.find(document.getElementById('autocomplete-input').value)}}>
                        <div className="input-field" style={{ margin: 0}}>
                        <i style={{marginTop: '-6px'}} className="material-icons prefix">search</i>
                        <input onFocus={()=>{if(!this.props.data) this.props.updateMem(true)}} type="text" id="autocomplete-input" autoComplete="off" className="autocomplete" placeholder="Search by registration number"/>
                        </div>
                    </form>
                </div>
                <div className="col s3">
                    <ul className="right" >
                        <li><div style={{cursor:"pointer"}} onClick={this.props.update}><i className="material-icons prefix" style={{fontSize:40, color:'#424242'}}>refresh</i></div></li>
                    </ul>
                </div>
            </div>
        </nav>
        </div>

        )
    }
}