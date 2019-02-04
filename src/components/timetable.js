import React from 'react'



function TD(props){
    var style=props.slots[props.day].indexOf(props.slot)>-1?busyTD:freeTD
    return(
        <td style={style}></td>
    )
}

function TR(props){
    var days=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    return(
        <tr>
            
            {(()=>{
                var tds=[<td key="day" style={titleTD}>{days[props.day]}</td>]
                for(var i=0; i<12;i++){
                    if(i==5){continue;}
                    tds.push(<TD key={i} slot={i} day={props.day} slots={props.slots}/>)
                }
                return tds
            })()}
        </tr>
    )
}

export default function(props){
    console.log(props.slots)
    var slotTime=['08:00-08:50','09:00-09:50',
        '10:00-10:50','11:00-11:50','12:00-12:50','13',
        '14:00-14:50','15:00-15:50','16:00-16:50',
        '17:00-17:50','18:00-18:50','19:00-19:50'
    ]
    return(
        <div style={{width:'100%',overflowY:'auto', margin:'10px 0px'}}>
        {/* <fieldset> */}
            <legend><b  >TimeTable</b></legend>
            <div style={{textAlign: 'center', marginBottom: 15}}>
                <div style={{height:'15px', width: '30px', backgroundColor: 'rgb(177, 198, 253)', display:'inline-block'}} ></div>
                <div style={{display:'inline-block', margin:'0px 40px 0px 10px'}} >Free</div>
                <div style={{height:'15px', width: '30px', backgroundColor: '#1e88e5', display:'inline-block'}} ></div>
                <div style={{display:'inline-block', marginLeft:'10px'}} >Busy</div>
                <div></div>
            </div>
        <table style={{border:'2px solid black'}}>
            <tbody>
                <tr>
                    {(()=>{
                        var tdslot=[<td style={titleTD}>Day</td>]
                        for(var i=0; i<12;i++){
                            if(i==5){
                                tdslot.push(<td style={titleTD} rowspan='8'>Lunch</td>);
                                continue;
                            }
                            tdslot.push(<td style={titleTD}>{slotTime[i]}</td>)
                        }
                        return tdslot
                    })()}
                </tr>

            {/* </thead>
            <tbody> */}
        {(()=>{
                var trs=[]
                for(var i=0; i<7;i++){
                    trs.push(<TR key={i} day={i} slots={props.slots}/>)
                }
                return trs
            })()}
            </tbody>
        </table>
        {/* </fieldset> */}
        </div>
    )
}



var busyTD={
    border: '1px solid #585858',
    backgroundColor: '#1e88e5',
    borderStyle: 'dotted'
  }
  
var freeTD={
    border: '1px solid #585858',
    backgroundColor: 'rgb(177, 198, 253)',
    borderStyle: 'dotted',
    zIndex: 10
  }
var titleTD={
    border: '2px solid black',
    backgroundColor: 'rgb(0, 78, 195)',
    color:'white',
    textAlign: 'center',
    fontWeight: '900',
    fontSize: 12
  }