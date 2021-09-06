import React, {useState} from "react"

const testProps = {
  text: 'test',
  bool: false
};

//const TestContext = React.createContext(testProps);
const TestContext = React.createContext([{}, () => {}]);

const TestContextProvider = (props: any) => {
  const [state, setState] = useState(testProps)
  return (
    <TestContext.Provider value = {[state, setState]}>
      {props}
    </TestContext.Provider>
  )
}

export { TestContext, TestContextProvider}