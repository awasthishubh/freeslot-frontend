import React from 'react'

export default function(props){
    return(
        <table className="highlight centered striped">
        <thead>
          <tr>
              <th>Time</th>
              <th>Name</th>
              <th>RegNo</th>
              <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
            <MemberTR members={props.members}/>
        </tbody>
        </table>

    )
}

function MemberTR(props){
    var TRs=[]
    props.members.forEach((element,i) => {
        TRs.push(<tr key={element?element.reg:i}>
            <td>{`${element.forSlot}:00-${element.forSlot+1}:00`}</td>
            <td>{element.name}</td>
            <td>{element.reg}</td>
            <td><a style={{cursor:'pointer'}}>View more...</a></td>
        </tr>)
    });
    return TRs
}