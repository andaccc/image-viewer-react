import React from "react";
import { ImageActions } from "./imageReducer"

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
  //setImageState: React.Dispatch<React.SetStateAction<IViewerImageState>>
  dispatch: React.Dispatch<ImageActions>

}

