import React from "react";
import ReactDOM from 'react-dom';

import './../style.css';

import { grayScaleFilter } from './../utils/imageFilter'

import ViewerImageProps from './../interfaces/imageInterface'
import ViewerImage from './viewerImage'
import ContextMenu from './contextMenu'

//https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
//https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929

// image drag drop use native api instead !!!!
// https://www.electronjs.org/docs/tutorial/native-file-drag-drop

/*
interface ViewerImageProps {
  images: Image[];
}
*/

export default class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      count: 0
    }

    this.handleDropImage = this.handleDropImage.bind(this)
    this.triggerValueAnalyzer = this.triggerValueAnalyzer.bind(this)

    this.viewRef = React.createRef()
    this.analyzerRef = React.createRef()
    this.histRef = React.createRef()
  }
  
  handleDropImage = (e) => {
    const that = this
    let reader = new FileReader()

    let files = e.dataTransfer.files;

    Array.from(files).forEach( (file) => {
      if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
        // for image only
        reader.readAsDataURL(e.dataTransfer.files[0])
        reader.onloadend = () => {
          // append react component
          /*
            https://stackoverflow.com/questions/57867881/how-to-append-react-element-div-dynamically/57868176
            https://stackoverflow.com/questions/37605222/can-i-append-my-component-to-a-divs-existing-content-in-reactjs
            https://stackoverflow.com/questions/28802179/how-to-create-a-react-modalwhich-is-append-to-body-with-transitions
          */
     
          //const ImageItem = <ViewerImage imageRawData={reader.result} key={this.state.count} />

          // move to interface folder
          let image = {
            imageData: reader.result,
            index: ++this.state.count,
            isGreyScale: false
          }

          this.setState({
            images: [...this.state.images, image],
            count: ++this.state.count
          })
        }
      }
    });
  }

  /**
   * Trigger the value analyzer  
   *  1. Histogram
   *  2. Simplify value image
   * @param {*} imgId target image id
   */
  triggerValueAnalyzer = (imgId) => {
    var img = document.getElementById(imgId)

    var tmp = img.cloneNode(true)
    
    // how to convert to rgba?
    var ctx = this.analyzerRef.current.getContext('2d'); 

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

  componentDidMount() {
    const that = this

    document.ondragover = function(e) {
      // need this for drop file to work
      e.stopPropagation()
      e.preventDefault() 
    };

    // attach drag drop
    this.viewRef.current.addEventListener('drop', (events) => {
      events.preventDefault() 
      
      this.handleDropImage(events)

    })
  }

  render() {
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

    // does this rerender all images everytime?
    const ViewerImages = this.state.images.map((image, i) => {
      return (
        <ViewerImage parentRef={this.viewRef} props={image} key={i} />
      )
    })

    return (
      <div ref={this.viewRef} style={viewStyle} id="viewer_main">
        <p style={textStyle}>Drop image here</p>
        
        {ViewerImages}

        <canvas ref={this.analyzerRef} id="analyzer_canvas">
        </canvas>
        
        <canvas ref={this.histRef} id="hist_canvas">
        </canvas>

        <ContextMenu />
      </div>
    );
  }
}
