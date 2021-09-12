import React, { Dispatch, useReducer } from "react";

export interface IViewerImage {
  imageData: string | ArrayBuffer,
  index: number,
  isGreyScale: boolean
}

export interface IViewerImageState {
  images: Array<IViewerImage>,
  count: number
}

/**
 * Context structure:
 * - global state
 * - setState function
 */
export interface IViewerImageContext {
  imageState: IViewerImageState,
  //setState: React.Dispatch<React.SetStateAction<string>>
  setImageState: React.Dispatch<React.SetStateAction<IViewerImageState>>
}

