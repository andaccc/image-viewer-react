import React, {useEffect, useState, Dispatch} from "react"

import {IStateProps, IContextProps} from "./testInterface";

/**
 * React Hook Context + Typescript implementation 
 * https://stackoverflow.com/questions/54577865/react-createcontext-issue-in-typescript/54667477
 */

const testProps : IStateProps = {
  text: 'test',
  bool: false
};

const initialContext = {
  state: testProps,
  setState: (state: IStateProps) => {},
};

// [{}, () => {}]
const TestContext = React.createContext([{} as IStateProps, (state: IStateProps) => {} ]);

const TestContextProvider = (props: any) => {
  const [state, setState] = useState(testProps) 
  
  useEffect(() => {
    //setState(testProps)
  }, [])  

  return (
    <TestContext.Provider value = { [state, setState] }>
      {props.children}
    </TestContext.Provider>
  )
}

export { TestContext, TestContextProvider}

