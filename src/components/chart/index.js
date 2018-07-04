import Chart from './chart'
import React from 'react'
import {Component} from 'react'

export default class extends Component {
    render() {
        return (
          <table className="row striped highlight">
            <thead >
              <tr className="row">
                  <th className="col s2">Day</th>
                  <th className="col s5">Morning</th>
                  <th className="col s5">Afternoon</th>
              </tr>
            </thead>
    
            <tbody>
                <tr className="row">
                    <td className="col m2 s3">Monday</td>
                    <td className="col m5 s9"><div className="col s12"><Chart afternoon={false} slots={this.props.data.freeSlots[0]}/></div></td>
                    <td className="col m5 s9 offset-s3"><div className="col s12"><Chart afternoon={true} slots={this.props.data.freeSlots[0]}/></div></td>
                </tr>
            </tbody>
          </table>
        )
    }
}