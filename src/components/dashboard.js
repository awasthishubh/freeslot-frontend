import React, {Component} from 'react'
import { relative, isAbsolute } from 'path';
import UpperLeft from './dashboard/dashUpperLeft'
import UpperRight from './dashboard/dashUpperRight'
import BottomLeft from './dashboard/dashBottomLeft'
import BottomRight from './dashboard/dashBottomRight'

export default class extends Component{
    constructor(props){
        super(props)
        this.sideNav=React.createRef();
    }
    componentDidMount(){
        // M.Sidenav.init(this.sideNav.current)
        var elems = document.querySelectorAll('.sidenav');
        window.sideInstance = M.Sidenav.init(elems[0]);
        // instances.open();
    }
    render(){
        return(
            <div>
           <UpperLeft/>
           <BottomLeft/>
           <UpperRight/>
           <BottomRight/>
            </div>
        )
    }
}