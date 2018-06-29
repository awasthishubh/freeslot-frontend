import React from 'react'
import ReactDOM from 'react-dom'
import Submit_card from './components/submit_card.js';
import rootReducer from './reducers/index.js'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import Org_reg from './components/org_reg.js'
// import { providers } from 'redux'
// store = createStore(rootReducer{})
const store = createStore(rootReducer, {})
const App= () => {
    return(
        <div> Hi!
        <Provider store={store}>
        <Submit_card />
        {/* <Org_reg /> */}
        </Provider>
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('.container'))
