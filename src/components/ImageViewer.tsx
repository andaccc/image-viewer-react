import React, {useEffect, useState, useRef, useContext} from "react";

import './../style.css';

import { grayScaleFilter } from '../utils/imageFilter'

import ViewerImage from './viewerImage'

import { ContextMenu } from './contextMenu'
import { ImageContext } from './imageContext'
import { useImageReducer } from './imageReducer'

//https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
//https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929


const ImageViewer = () => {
  const {imageState, dispatch} = useContext(ImageContext)

  const viewRef = useRef<HTMLDivElement>(null)
  const analyzerRef = useRef<HTMLCanvasElement>(null)
  const histRef = useRef<HTMLCanvasElement>(null)

  const imageReducer = useImageReducer()

  useEffect(() => {
    // need this for drop file to work
    
    document.ondragover = (evt) => {
      evt.stopPropagation() 
      evt.preventDefault() 
    }

    // attach drag drop
    viewRef.current!.addEventListener('drop', onDrop)

    return () => {
      viewRef.current!?.removeEventListener('drop', onDrop);
    };

  }, []) // run only once
  
  const onDrop = (evt: any) => {
    evt.preventDefault() 
    handleDropImage(evt)
  }

  const handleDropImage = (evt : any) => {
    let reader = new FileReader()
    let files = evt.dataTransfer.files;
  
    Array.from(files).forEach( (file : any) => {
      if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
        // for image only
        reader.readAsDataURL(evt.dataTransfer.files[0])
        reader.onloadend = () => {
          // append react component
          /*
            https://stackoverflow.com/questions/57867881/how-to-append-react-element-div-dynamically/57868176
            https://stackoverflow.com/questions/37605222/can-i-append-my-component-to-a-divs-existing-content-in-reactjs
            https://stackoverflow.com/questions/28802179/how-to-create-a-react-modalwhich-is-append-to-body-with-transitions
          */

          // update image context
          // must use preState inside useEffect
          // TODO: try useReducer

          //dispatch({ type: 'ADD', payload: reader.result})
          imageReducer.addImage(reader.result)
        }
      }
    })
  }

  const viewStyle = {
    marginTop: 0,
    display: 'flex',
    height: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
  }

  const textStyle = {
    fontSize: '30px',
    color: '#7B7B7B'
  }

  useEffect(() => {
    console.log(imageState)

  }, [imageState])
  

  return (
    <div ref={viewRef} style={viewStyle as React.CSSProperties} id="viewer_main">
      <p style={textStyle}>Drop image here</p>
      <p style={{fontSize: '15px', color: '#7B7B7B'}}>Right click image for image option</p>
      {imageState.images.map((image) => {
        return (
          <ViewerImage parentRef={viewRef} image={image} key={image.index} />
        )})
      }

      <canvas ref={analyzerRef} id="analyzer_canvas">
      </canvas>
      
      <canvas ref={histRef} id="hist_canvas">
      </canvas>

      <ContextMenu />
    </div>
  )
}

export default ImageViewer