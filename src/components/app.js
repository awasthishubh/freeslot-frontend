import React, { Component } from 'react';
// import Model from './model'
// import Submit from './submit_card'
// import Org_reg from './org_reg'
// import Org_login from './org_login'
import Dashboard from './dashboardComp'
import { BrowserRouter , Route} from 'react-router-dom'
function Asd(props){
  console.log(props)
  return(
    <div className="red">
    {props.children}as
    </div>
  )
}
export default class App extends Component {
  componentDidMount(){
  }
  render() {
    return (
      // <Model/>
      // <Submit />
      // <Org_reg/>
      // <Org_login/>
      // <Dashboard/>
      // <BrowserRouter>
      //           <div>
      //               <Route path="/dashboard" component={Dashboard} />
      //               <Route path="/login" component={Org_login} />
      //               {/* <Route path="/dashboard/home" component={this.Home} /> */}
      //               {/* <Route path="/dashboard/home" component={this.Home} /> */}
      //           </div>

      //   </BrowserRouter>
      <Dashboard/>
    );
  }
}
