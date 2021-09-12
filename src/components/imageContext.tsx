import React, {useEffect, useState} from "react"

import {IViewerImageState, IViewerImageContext} from "./imageInterface";


/**
 * for context menu broadcast signal
 */
 const initProps : IViewerImageState = {
  images: [],
  count:0
};

//const contextType = [{} as IViewerImageState, (() => {}) as React.Dispatch<React.SetStateAction<IViewerImageState>> ]
const contextType = {} as IViewerImageContext
const ImageContext = React.createContext(contextType);

const ImageContextProvider = (props: any) => {
  const [state, setState] = useState(initProps) 
  
  useEffect(() => {
  }, [])  

  return (
    <ImageContext.Provider value={ {imageState : state, setImageState : setState} }>
      {props.children}
    </ImageContext.Provider>
  )
}

export { ImageContext, ImageContextProvider}