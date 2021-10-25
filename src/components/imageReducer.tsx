/**
 * https://alligator.io/react/usereducer/
 */

import React, {useContext} from 'react'
import { v4 as uuidv4 } from 'uuid';

import {IViewerImageState, IViewerImageContext} from "./imageInterface";
import { ImageContext } from './imageContext'
import { forEachTrailingCommentRange } from 'typescript';

export type ImageActions = any

// test dispatch wrapper 
export const useImageReducer = () => {
  const {imageState, dispatch} = useContext(ImageContext)

  const addImage = (imageData: any) => {
    dispatch({ type: 'ADD', payload: imageData });
  }

  const deleteImage = (imageId: number) => {
    dispatch({ type: 'DELETE', payload: imageId });
  }

  const greyFilter = (imageId: number) => {
    // https://stackoverflow.com/questions/37662708/react-updating-state-when-state-is-an-array-of-objects
    // find the image by id 
    // and flip the grey scale flag
    dispatch({ type: 'GREY_FILTER', payload: imageId})
  }

  const ValueAnalyzer = (imageId: number) => {
    dispatch({ type: 'VALUE_ANALYZER', payload: imageId})
  }

  return { addImage, deleteImage, greyFilter, ValueAnalyzer}
}

const getUniquekey = () => {
  let key = uuidv4()
  return key
}

export const imageReducer = (imageState: IViewerImageState, action: ImageActions): IViewerImageState => {
  switch (action.type) {
    case "ADD": {
      let newContext = {
        images: [...imageState.images, {
          imageData: action.payload,
          index: getUniquekey(),
          isGreyScale: false,
          isAnalyzer: false
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
        count: imageState.count
      }
      return newContext
    }

    case "VALUE_ANALYZER": {
      const id = action.payload

      if (id === -1 || id === undefined) return imageState
      let newImages = imageState.images
      newImages.forEach( (image, idx) => {
        if (idx === id) {
          image.isAnalyzer = true
        }
        else {
          image.isAnalyzer = false
        }
      });

      let newContext = {
        images: newImages,
        count: imageState.count
      /*
      let newContext = {
        images: [
          ...imageState.images.slice(0, id),
          Object.assign({}, imageState.images[id], 
            {isAnalyzer: !imageState.images[id].isAnalyzer}
            ),
          ...imageState.images.slice(id + 1)
        ],
        count: imageState.count
        */
      }
      return newContext
    }

    case "DELETE": {
      /**
       * BUG:
       * when delete first image
       * the last image get deleted instead
       * but state refer correctly
       * react component cached?
       */

      const id = action.payload
      if (id === -1 || id === undefined) return imageState

      let newContext = {
        images: [
          ...imageState.images.slice(0, id),
          ...imageState.images.slice(id + 1)
        ],
        count: imageState.count - 1
      }

      return newContext
    }
  }
}