import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app.js';
import rootReducer from './reducers/index.js'
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as serviceWorker from './serviceWorker';
require("./static/materialize.css")
require("./static/define.css")
const store = createStore(rootReducer, applyMiddleware(thunk))
const Root= () => {
    return(
        <div>
        <Provider store={store}>
            <App />
        </Provider>
        </div>
    )
}

ReactDOM.render(<Root />, document.querySelector('.container'))
serviceWorker.register(); 