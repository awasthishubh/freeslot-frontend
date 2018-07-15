import React, {Component} from 'react'
import M from 'materialize-css'

var navStyle={
    height:64, position: 'fixed', top:0, left:300, right:0, zIndex:105
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
                data[mem.reg]=null
            })
            var elems = document.querySelectorAll('.autocomplete');
            var instances = M.Autocomplete.init(elems, {data,
                onAutocomplete: this.find
            });
        }
    }

    find(e){
        console.log(e)
        this.props.select(e,'UPDATE_MODAL_SELECTED')
        console.log(this.props.selected.instance.open())
    }
    
    render(){
        console.log('Search Bar', this.props)
        return(
        <div id="upperRightDash" style={navStyle}>
        <nav className="white" style={{ color:'#424242'}}>
            <div className="nav-wrapper row">
                <div className="col m6 offset-m3 s9">
                    <form onSubmit={(e)=>{e.preventDefault();this.find(document.getElementById('autocomplete-input').value)}}>
                        <div className="input-field" style={{ margin: 0}}>
                        <i style={{marginTop: '-6px'}} className="material-icons prefix">search</i>
                        <input type="text" id="autocomplete-input" autoComplete="off" class="autocomplete" placeholder="Search by registration number"/>
                        </div>
                    </form>
                </div>
                <div className="col s3">
                    <ul className="right" >
                        <li><a onClick={this.props.update}><i className="material-icons prefix" style={{fontSize:40, color:'#424242'}}>refresh</i></a></li>
                    </ul>
                </div>
            </div>
        </nav>
        </div>

        )
    }
}