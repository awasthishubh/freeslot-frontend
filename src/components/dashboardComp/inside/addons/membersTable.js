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
            <MemberTR viewMem={props.viewMem} members={props.members}/>
        </tbody>
        </table>

    )
}

function MemberTR(props){
    var TRs=[]
    props.members.forEach((element,i) => {
        if(element&&element.reg)
        TRs.push(<tr key={element.reg}>
            <td>{`${element.forSlot}:00-${element.forSlot+1}:00`}</td>
            <td>{element.name}</td>
            <td>{element.reg}</td>
            {/* eslint-disable-next-line */}
            <td><a onClick={()=>props.viewMem(element)} style={{cursor:'pointer'}}>View more...</a></td>
        </tr>)
        else TRs.push(<tr key={i}>
            <td>{`${element.forSlot}:00-${element.forSlot+1}:00`}</td>
            <td colSpan={3}>No one's available</td>
        </tr>)
    });
    return TRs
}