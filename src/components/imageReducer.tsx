/**
 * https://alligator.io/react/usereducer/
 */

import React, {useContext} from 'react'

import {IViewerImageState, IViewerImageContext} from "./imageInterface";
import { ImageContext } from './imageContext'

export type ImageActions = any

// test dispatch wrapper 
export const useImageReducer = () => {
  const {imageState, dispatch} = useContext(ImageContext)

  const addImage = (imageData: any) => {
    dispatch({ type: 'ADD', payload: imageData });
  }

  return { addImage }
}


export const imageReducer = (imageState: IViewerImageState, action: ImageActions): IViewerImageState => {
  switch (action.type) {
    case "ADD": {
      let newContext = {
        images: [...imageState.images, {
          imageData: action.payload,
          index: imageState.count,
          isGreyScale: false
        }],
        count: imageState.count + 1
      }

      return newContext
    }

    case "GREY_FILTER": {
      const id = action.payload

      if (id === -1 || id === undefined) return imageState
      let newContext = {
        images: [
          ...imageState.images.slice(0, id),
          Object.assign({}, imageState.images[id], 
            {isGreyScale: !imageState.images[id].isGreyScale}
            ),
          ...imageState.images.slice(id + 1)
        ],
        count: imageState.count + 1
      }
      return newContext
    }

    case "DELETE":
      return {} as IViewerImageState
  }
}