import React, {useEffect, useState, useReducer} from "react"

import {IViewerImageState, IViewerImageContext} from "./imageInterface";

import { imageReducer, ImageActions } from "./imageReducer"

/**
 * for context menu broadcast signal
 */
 const initialState : IViewerImageState = {
  images: [],
  count:0
};

//const contextType = [{} as IViewerImageState, (() => {}) as React.Dispatch<React.SetStateAction<IViewerImageState>> ]
const contextType = {} as IViewerImageContext
const ImageContext = React.createContext(contextType);

const ImageContextProvider = (props: any) => {
  //const [state, setState] = useState(initialState) 

  const [state, dispatch] = useReducer(imageReducer, initialState);

  const providerValue = {imageState : state, dispatch : dispatch}

  return (
    <ImageContext.Provider value={ providerValue }>
      {props.children}
    </ImageContext.Provider>
  )
}

export { ImageContext, ImageContextProvider}