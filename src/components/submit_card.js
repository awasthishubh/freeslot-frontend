import React from 'react'
import {Component} from 'react'
import InputText from './InputText'
import $ from 'jquery'


const IsAvailable= props =>{
    if(props.available==true)
        return ("Yes")
    if(props.available==null)
        return ("...")
    return ('No')
}

class Submit_card extends Component {
    constructor(props){
        super(props);
        this.state={
            usid: null,
            isAvailable: false
        }
        this.onInputChange=this.onInputChange.bind(this)
        this.checkid=this.checkid.bind(this)
    }
    render(){
        return(
            <div className="card" id="">
                <div className="card-content">
                    <div className="row">
                        <div className="col s6">
                            <InputText name="First name" id='fname' />
                        </div>
                        <div className="col s6">
                            <InputText name="Last name" id='lname' />
                        </div>
                        <div className="col s6">
                            <InputText name="Email" id='email' />
                        </div>
                        <div className="col s6">
                            <InputText name="Organisation" id='org' />
                        </div>
                        <div className="col s6">
                            <input onChange={this.onInputChange} />
                        </div>
                        <IsAvailable available={this.state.isAvailable}/>
                    </div>
                </div>
            </div>
        )
    }



    onInputChange(event){
        console.log(this.state.usid)
        this.setState({usid:event.target.value})
        this.checkid(event.target.value)
    }

    checkid(txt){
        var update=(v)=>{
            this.setState({isAvailable:v})
        }
        var state=this.state
        $.ajax({
            url:'http://acm-reachout.herokuapp.com',
            beforeSend: function() {
                update(null);
            }
        }).done(function(data) {
            for (var i = 0; i < data.length; i++) {
                if(data[i].email==txt){
                    update(true);
                    break;
                }
                update(false);
            }
        })

    }


}



export default Submit_card
