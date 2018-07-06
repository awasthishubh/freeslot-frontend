import React from 'react'

export default function(props){
    return props.data.map(function(mem){
        return(
            <li key={mem.reg}>
                <div className="collapsible-header left-align">
                    <div className="col s6"><i className="material-icons">keyboard_arrow_right</i>{mem.name}</div>
                    <div className="col s6 right-align"><div className="hide-on-small-only">{mem.reg}</div></div>
                </div>
                <div className="collapsible-body memCollapsi"><span>
                    <ul className="row">
                        <li className="col s6"><b>Name: </b>{mem.name}</li>
                        <li className="col s6"><b>Reg No: </b>{mem.reg}</li>
                    </ul>
                    <ul className="row">
                        <li className="col s6"><b>Email: </b>{mem.email}</li>
                        <li className="col s6"><b>Phno: </b>{mem.phno}</li>
                    </ul>
                    
                </span>
                <div class="card-action">
                    {(()=>{
                        if(props.verify)
                            return <a href="#" onClick={()=>props.verify(mem.reg)}>Accept</a>
                    })()}

                    {(()=>{
                        if(props.del)
                        return <a href="#" onClick={()=>{if(confirm('Are you sure?')) props.del(mem.reg)}}>Remove</a>
                    })() }

                    {/* {()=>{
                        if(props.verify)
                            return <a href="#" onClick={()=>props.verify(mem.reg)}>Accept</a>
                    }} */}
                    
                </div>
                </div>
            </li>
        )
    })
}