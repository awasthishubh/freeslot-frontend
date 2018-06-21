import React from 'react'

const InputText = (e) => {
    return (
        <div className="input-field col s12">
          <input id={e.id} type="text" className="validate" />
          <label htmlFor={e.id}>{e.name}</label>
        </div>
    )
}

export default InputText
