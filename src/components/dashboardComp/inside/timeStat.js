import React from 'react'
import TimeChart from './addons/timeChart'
import M from 'materialize-css'

export default class extends React.Component{
    constructor(props){
        super(props);
        this.state={day:null};
        this.dayChange=this.dayChange.bind(this)
    }

    componentDidMount(){
        document.getElementById('dashStat').classList.add('active')
        M.FormSelect.init(document.querySelectorAll('select'))
        this.props.updateData(true,'UPDATE_ORG_LOGGED')
        if(!this.props.timeStat){
            this.props.update()
        }
    }
    componentDidUpdate(){
        if(!this.props.timeStat && this.props.loggedIn) this.props.update()
    }
    componentWillUnmount(){
        document.getElementById('dashStat').classList.remove('active')
    }
    dayChange(e){
        this.setState({day:e.target.value-1})
    }
    render(){
        // console.log('pr',this.props)
        // console.log(this.props.timeStat)
        var days=['Monday','Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
        return(
            <div className="card">
                <div className="card-content row">
                    <div className="card-title">Timing Statistics</div>
                    <div className="input-field col s10 l4 m6 offset-s1 offset-l4 offset-m3">
                        <select id="day" defaultValue={0} onChange={this.dayChange}>
                        <option value={0}  disabled>Choose a Day</option>
                        {(()=>{
                            return days.map(function(day){
                                var i=days.indexOf(day)+1
                                return <option key={i} value={i}>{day}</option>
                            })
                        })()}
                        </select>
                    </div>
                    <div className="container row" style={{marginTop: 40, overflow:'auto'}}>
                        {this.props.timeStat?<TimeChart data={{
                            stat:this.props.timeStat[this.state.day],
                            day:days[this.state.day]
                        }}></TimeChart> : <div/>}
                    </div>
                </div>
            </div>
                        
        )
    }
}