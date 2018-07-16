import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app.js';
import rootReducer from './reducers/index.js'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
const store = createStore(rootReducer, applyMiddleware(thunk))
const Root= () => {
    return(
        <div> Hi!
        <Provider store={store}>
            <App />
        </Provider>
        </div>
    )
}

ReactDOM.render(<Root />, document.querySelector('.container'))
