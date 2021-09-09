import React, {useState, useEffect, useContext} from "react"
import { TestContext } from "./testContext";

const Child2 = () => {
  const [state, setState] = useContext(TestContext)
  
  useEffect(() => {

  }, [state])

  const onClick = () => {
    let flipState = !state.bool

    setState(state => ({
      ...state, bool: flipState
    }))
    
  }

  return (
    <button onClick={onClick}>flip bool</button>
  )  
}

export default Child2