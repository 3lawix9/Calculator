import React from 'react'
import {ACTIONS} from './App'

function Button({digit,dispatch}) {
  return (
    <button onClick={()=> dispatch({type : ACTIONS.ADD_DIGIT, payload: {digit}})}>{digit}</button>
  )
}

export default Button