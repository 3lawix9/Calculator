import './App.css';
import React, { useReducer } from 'react';
import Button from './Button';
import Operation from './Operation';



export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}

function reducer (state , {type , payload }) {
  switch (type) {
   case ACTIONS.ADD_DIGIT:
    
    if(state.overwrite){
      return {
        ...state,
        currOperand: payload.digit,
        overwrite: false
      }
    }
    if(payload.digit === "0" && state.currOperand === "0") {
      return state;
    }
    if(payload.digit === "." && state.currOperand.includes(".")) {
      return state;
    }
      return {
        ...state
        ,currOperand: `${state.currOperand || ""}${payload.digit}`
      }
      
    case ACTIONS.CHOOSE_OPERATION:
      if(state.currOperand == null && state.PrevOperand == null){
        return state;
      }
      if ( state.currOperand == null){
        return {
          ...state,
          operation: payload.operation
        }
      }
      if ( state.PrevOperand == null){
       return {
        ...state,
        operation: payload.operation,
        PrevOperand : state.currOperand,
        currOperand: null
       }
      }
      return {
        ...state,
        operation: payload.operation,
        PrevOperand : evaluate(state),
        currOperand: null
      }

    case ACTIONS.EVALUATE:
      if(state.currOperand == null && state.PrevOperand == null){
        return state;
      }
      if(state.currOperand && state.PrevOperand) {
        return {
          PrevOperand : null,
          currOperand: evaluate(state),
          overwrite: true
        }
      }

    case ACTIONS.DELETE_DIGIT:

      if(state.currOperand == null && state.PrevOperand == null){
        return state;
      }
      if (state.currentOperand == null) return {}
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null }
      }

      if (state.overwrite){
        return {};
      }
      if (!state.overwrite){
        return {...state , currOperand: state.currOperand.slice(0,-1)}
      }




      
    case ACTIONS.CLEAR:
      return {};
    
  }
  
}
function evaluate({currOperand, PrevOperand, operation}){
  let curr = parseFloat(currOperand)
  let prev = parseFloat(PrevOperand)

  if(isNaN(curr) || isNaN(prev)) return ""
  
  let competation = ""

  switch(operation){
    case "+":
      competation = prev + curr
      break
    case "-":
      competation = prev - curr
      break

    case "*":
      competation = prev * curr
      break

    case "÷":
      competation = prev / curr
      break

  }
  
  return competation.toString()
    
  
}
// Format number like : 1234  to 1,234 

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return

  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}


function App() {
 
  const [{currOperand , PrevOperand , operation}, dispatch] = useReducer(reducer,{})
  
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="prev">{formatOperand(PrevOperand) } {operation}</div>
          <div className="curr"> {formatOperand(currOperand)}
          </div>  
      </div>
      <button className="span-two" onClick={()=> dispatch({type:ACTIONS.CLEAR})}>AC</button>
            <button onClick={()=> dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
            <Operation operation="÷" dispatch={dispatch}/>
            <Button digit={"1"} dispatch={dispatch}/>
            <Button digit={"2"} dispatch={dispatch}/>
            <Button digit={"3"} dispatch={dispatch}/>
            <Operation operation='*' dispatch={dispatch}/> 
            <Button digit={"4"} dispatch={dispatch}/>
            <Button digit={"5"} dispatch={dispatch}/>
            <Button digit={"6"} dispatch={dispatch}/>
            <Operation operation='+' dispatch={dispatch}/>
            <Button digit={"7"} dispatch={dispatch}/>
            <Button digit={"8"} dispatch={dispatch}/>
            <Button digit={"9"} dispatch={dispatch}/>
           <Operation operation='-' dispatch={dispatch}/>
            <Button digit={"."} dispatch={dispatch}/>
            <Button digit={"0"} dispatch={dispatch}/>
            <button className="span-two" onClick={()=> dispatch({type:ACTIONS.EVALUATE})} >=</button>

    </div>
    
    
  );
}

export default App;
