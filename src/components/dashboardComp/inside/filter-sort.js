import React from 'react'
import {Component} from 'react'
import { bindActionCreators } from 'redux'
import {connect} from  'react-redux'
import {modifyData} from '../../../actions/dashboard_action'
import M from 'materialize-css'


function sortOrder(prop) {  
    return function(a, b) {  
        if (a[prop] > b[prop]) {  
            return 1;  
        } else if (a[prop] < b[prop]) {  
            return -1;  
        }  
        return 0;  
    }  
}

class filterSort extends Component{
    constructor(props){
        super(props)
        this.filter=this.filter.bind(this)
        this.sort=this.sort.bind(this)
        this.sortRef=React.createRef()
        this.filterRef=React.createRef()
        this.noFilter=React.createRef()
    }
    componentDidMount(){
        if(this.props.data){
            this.props.data.map(function(elem){
                if(elem.visible!==null)
                elem.visible=true
                return null
            })
            this.props.data.sort(sortOrder('name'))  
            this.props.modifyData(null, this.props.data, this.props.type)
        }
        M.FormSelect.init(this.sortRef.current)
        M.FormSelect.init(this.filterRef.current)

        // this.nameSort.current.checked=true
        // this.noFilter.current.checked=true
    }
    filter(e){
        var X=e.target.value
        var data=this.props.data
        if(data){    
            data.map(function(elem){
                if(elem.visible!==null)
                {    
                    if(!X || elem.reg.slice(0,2)===X) elem.visible=true
                    else elem.visible=false
                }
                return null
            })
            this.props.modifyData(X, data, this.props.type)
        }
    }
    sort(e){
        var X=e.target.value
        var data=this.props.data
        if(data && data[0][X]){
            
            data.sort(sortOrder(X))  
            this.props.modifyData(X, data, this.props.type)
        }
    }
    render(){
        return(
            <div className="row">
                <div class="input-field col s12 m6">
                    <select defaultValue="name" onChange={this.sort} ref={this.sortRef}>
                        <option value="name">Name</option>
                        <option value="reg">Registration number</option>
                        <option value="2">Last work alloted</option>
                    </select>
                    <label>Sort</label>
                </div>

                <div class="input-field col s12 m6">
                    <select defaultValue="" onChange={this.filter} ref={this.filterRef}>
                        <option value="">None</option>
                        <option value="18">1st Year</option>
                        <option value="17">2nd Year</option>
                        <option value="16">3rd Year</option>
                        <option value="15">4th Year</option>
                    </select>
                    <label>Filter</label>
                </div>
            </div>
            // <div className="card s12" style={{marginBottom:60}}>
            //     <div className="card-content row">
            //     <div className="col s6 l12">
            //         <span className="card-title">Sort</span>
            //         <div className="row">
            //             <label className="col s12 l4">
            //                 <input ref={this.nameSort} class="with-gap" name="sort" type="radio" onChange={()=>this.sort('name')}/>
            //                 <span>Name</span>
            //             </label>
            //             <label className="col s12 l4">
            //                 <input class="with-gap" name="sort" type="radio"  onChange={()=>this.sort('reg')}/>
            //                 <span>Reg No</span>
            //             </label>
            //             <label className="col s12 l4">
            //                 <input class="with-gap" name="sort" type="radio"  />
            //                 <span>Last Work Alloted</span>
            //             </label>
            //         </div>
            //     </div>
            //     <div className="col s6 l12">
            //         <span className="card-title">Filter</span>
            //         <div className="row">
            //             <label className="col s12 l2 offset-l1" >
            //                 <input ref={this.noFilter} class="with-gap" name="filter" type="radio" onChange={()=>this.filter()}  />
            //                 <span>None</span>
            //             </label>
            //             <label className="col s12 l2">
            //                 <input class="with-gap" name="filter" type="radio" onChange={()=>this.filter('18')} />
            //                 <span>1st Year</span>
            //             </label>
            //             <label className="col s12 l2">
            //                 <input class="with-gap" name="filter" type="radio" onChange={()=>this.filter('17')}  />
            //                 <span>2nd Year</span>
            //             </label>
            //             <label className="col s12 l2">
            //                 <input class="with-gap" name="filter" type="radio" onChange={()=>this.filter('16')}  />
            //                 <span>3rd Year</span>
            //             </label>
            //             <label className="col s12 l2">
            //                 <input class="with-gap" name="filter" type="radio" onChange={()=>this.filter('15')}  />
            //                 <span>4th Year</span>
            //             </label>
                        
            //     </div>
            //         </div>
            //     </div>
            // </div>
        )
    }
}

function actiontoprops(dispatch) {
    return bindActionCreators({modifyData}, dispatch)
}

export default connect(null, actiontoprops)(filterSort)