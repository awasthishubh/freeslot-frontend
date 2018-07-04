import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app.js';
import rootReducer from './reducers/index.js'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Org_reg from './components/org_reg.js'
import M from 'materialize-css'
// import { providers } from 'redux'
// store = createStore(rootReducer{})
const store = createStore(rootReducer, {})
const Root= () => {
    return(
        <div> Hi!
        <Provider store={store}>
        {/* <Submit_card /> */}
        <App />
        </Provider>
        </div>
    )
}

ReactDOM.render(<Root />, document.querySelector('.container'))
