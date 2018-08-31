import React from 'react'
import TimeChart from './addons/timeChart'
import M from 'materialize-css'

export default class extends React.Component{

    componentDidMount(){
        M.FormSelect.init(document.querySelectorAll('select'))
    }
    render(){
        var days=['Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        this.props.update()
        return(
            <div className="card">
                <div className="card-content row">
                    <div className="card-title">Edit Organization Details</div>
                    <div className="input-field col s10 l4 m6 offset-s1 offset-l4 offset-m3">
                        <select defaultValue="0">
                        <option value="0" disabled>Choose a Day</option>
                        {(()=>{
                            return days.map(function(day){
                                var i=days.indexOf(day)
                                return <option key={i} value={i}>{day}</option>
                            })
                        })()}
                        </select>
                    </div>
                        <div className="container row" style={{marginTop: 40}}>
                            <TimeChart/>
                    </div>
                </div>
            </div>
                        
        )
    }
}