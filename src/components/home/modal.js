import React from 'react'

export default function Modal(props){
    var footerFixed=props.footerFixed?'modal-fixed-footer':''
    var {style,title,err,children,footer}=props


    return(
    <div id="memReg" className={`modal ${footerFixed}`} style={style}>
        <div className="modal-content">
            <h4>{title}</h4>
            
            <div className="card-content row">
                {children}
                <div className="grey-text">{err}</div>
            </div>
        </div>

        <div style={{display:footerFixed?'flex':'none',justifyContent: 'space-around'}} className="modal-footer">
            {(()=>{
                var footerItems=[];
                footer.forEach((element,i) => {
                    footerItems.push(
                        <a key={i} onClick={element.onClick} 
                        className="waves-effect waves-green btn themeBlue">
                        {element.title}</a>
                    )
                });

                return(footerItems)
            })()}
        </div>
        <div style={style} ref={props.modalDom} className={`fixed-subModal modal ${footerFixed}`}>
            <div className="modal-content">
                {props.subModalContent}
            </div>
            <div className="modal-footer">
                <a href="#!" onClick={props.subModalAction} className="waves-effect waves-green btn-flat"><b>Close</b></a>
            </div>
        </div>
    </div>
    )
}