import React, {useState, useEffect, useContext} from "react"
import { TestContext } from "./testContext";

const Child2 = () => {
  const [state, setState] = useContext(TestContext)
  useEffect(() => {

  })

  const onClick = () => {
    setState(state => ({
      ...state, bool: true
    })
    )
  }

  return (
    <button onClick={onClick}>flip bool</button>
  )  
}

export default Child2