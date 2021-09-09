import React, {useState, useEffect, useContext} from "react"
import { TestContext } from "./testContext";

const Child = () => {
  const [state, setState] = useContext(TestContext)

  useEffect(() => {
    console.log(state.bool)
  }, [])

  return (  
    <p>Child: {state.bool? 'true' : 'false'}</p>
  )  
}

export default Child