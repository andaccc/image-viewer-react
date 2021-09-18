import React, {useEffect, useState, useRef, useContext} from "react";

import './../style.css';

import { grayScaleFilter } from '../utils/imageFilter'

import ViewerImage from './viewerImage'
import ContextMenu from './contextMenu'

import { ImageContext } from './imageContext'

//https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
//https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929


const ImageViewer = () => {
  const {imageState, dispatch} = useContext(ImageContext)

  const viewRef = useRef<HTMLDivElement>(null)
  const analyzerRef = useRef<HTMLCanvasElement>(null)
  const histRef = useRef<HTMLCanvasElement>(null)

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

          dispatch({ type: 'ADD', payload: reader.result})

        }
      }
    })
  }

  /**
   * Trigger the value analyzer  
   *  1. Histogram
   *  2. Simplify value image
   * @param {*} imgId target image id
   */
  const triggerValueAnalyzer = (imgId : string) => {
    var img = document.getElementById(imgId)
    if (img == null) return

    var tmp = img.cloneNode(true) as HTMLImageElement
    
    // how to convert to rgba?
    var ctx = analyzerRef.current!.getContext('2d'); 
    if (ctx == null) return

    // TODO: resize canvas
    // - fixed size css?
    // but how to handle different ratio
    ctx.canvas.width  = tmp.width;
    ctx.canvas.height = tmp.height;

    ctx.drawImage(tmp, 0, 0);

    var imgData = ctx.getImageData(0, 0, tmp.width, tmp.height).data;

    var grayData = grayScaleFilter(imgData)
    
    // TODO: draw hist
    // https://www.d3-graph-gallery.com/graph/histogram_basic.html
    var hist = [] 
    grayData.forEach( (data) => {
      let val = Math.floor(data / 255)
      hist.push(val)
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
    //console.log(imageState)

  }, [imageState])
  

  return (
    <div ref={viewRef} style={viewStyle as React.CSSProperties} id="viewer_main">
      <p style={textStyle}>Drop image here</p>
      
      {imageState.images.map((image, i) => {
        return (
          <ViewerImage parentRef={viewRef} image={image} key={i} />
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