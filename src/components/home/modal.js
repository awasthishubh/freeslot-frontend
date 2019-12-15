import React from 'react'

export default function Modal(props){
    var footerFixed=props.footerFixed?'modal-fixed-footer':''
    var {style,title,children,footer}=props


    return(
    <div id="memReg" className={`modal ${footerFixed||'autoHeight'}`} style={{top:'5%!important', maxHeight:footerFixed?'90%':'fit-content'}}>
        <div className="modal-content">
            <h4>{title}</h4>
            
            <div className="card-content row">
                {children}
            </div>
        </div>

        <div style={{display:footerFixed?'flex':'none',justifyContent: 'space-around'}} className="modal-footer">
            {(()=>{
                var footerItems=[];
                footer.forEach((element,i) => {
                    footerItems.push(
                        <button key={i} onClick={element.onClick} 
                        className={`${element.disableBtn?'btn-disabled':''} waves-effect waves-green btn themeBlue`}
                        >
                        {element.disableBtn?element.disabledTitle:element.title}</button>
                    )
                });

                return(footerItems)
            })()}
        </div>
        <div style={style} ref={props.modalDom} className={`${footerFixed?'fixed-subModal':''} modal ${footerFixed||'autoHeight'}`}>
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