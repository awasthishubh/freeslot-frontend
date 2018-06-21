import React from 'react'
import ReactDOM from 'react-dom'
import Submit_card from './components/submit_card.js'
import M from 'materialize-css'

const App= () => {
    return(
        <div> Hi!
        <Submit_card />
        </div>
    )
}

ReactDOM.render(<App />, document.querySelector('.container'))
