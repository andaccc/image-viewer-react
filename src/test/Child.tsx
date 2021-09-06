import React, {useState, useEffect, useContext} from "react"
import { TestContext } from "./testContext";

const Child = () => {
  const testProps = useContext(testContext);

  useEffect(() => {
  }, [testProps.bool])

  return (
    <p>Child: {testProps.bool? 'true' : 'false'}</p>
  )  
}

export default Child