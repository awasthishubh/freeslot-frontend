import React, {Component} from 'react'

export default class extends Component{
    enableInput(e){
        e.preventDefault()
        var parent=$(e.target).parents('.parentInput')[0]
        var parnt2=$(parent).children('.input-field')[0]
        var target=$(parnt2).children()[0]
        $(target).prop('disabled', false)
        $(target).focus()
    }
    deFocus(e){
        $(e.target).prop('disabled', true)
    }
    render(){
        return(
            <div className="card">
                <div className="card-content">
                    <div className="card-title">Edit Orgatisation Details</div>
                    <div className="container row">
                        
                        <div className="parentInput">
                            <div className="col inputSideTitle s3">Name:</div>
                            <div  className="input-field col s8">
                                <input disabled type="text" value="Hi" style={{color:'#37474f'}} onBlur={this.deFocus}/>
                            </div>
                            <div className="col s1" style={{padding:0}}>
                            <a href="#" onClick={this.enableInput}><i className="black-text material-icons prefix"  >edit</i></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}