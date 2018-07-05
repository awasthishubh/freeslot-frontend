import React, {Component} from 'react'
import { relative, isAbsolute } from 'path';
import UpperLeft from './dashboard/upperLeft'
import UpperRight from './dashboard/upperRight'
import BottomLeft from './dashboard/bottomLeft'
import BottomRight from './dashboard/bottomRight'

export default class extends Component{
    constructor(props){
        super(props)
        this.sideNav=React.createRef();
    }
    componentDidMount(){
        M.Sidenav.init(this.sideNav.current)
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