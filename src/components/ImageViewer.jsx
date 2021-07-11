import React from "react";


import './../style.css';

import { grayScaleFilter } from './../utils/imageFilter'
import { attachDrag } from './../utils/dragHandler'


//https://www.smashingmagazine.com/2018/01/drag-drop-file-uploader-vanilla-js/
//https://medium.com/@650egor/simple-drag-and-drop-file-upload-in-react-2cb409d88929

// image drag drop use native api instead !!!!
// https://www.electronjs.org/docs/tutorial/native-file-drag-drop

/**
 * TODO: image use react state
 */

const defaultProps = {
  borderRadius: "borderRadius",
  bgcolor: '#424242',
  borderColor: 'grey.500',
  m: 5,
  p: 5,
  border: 1,
  display: "flex",
  justifyContent: "center"
};

// pixel
const WIDTH_LIMIT = 500; 
const HEIGHT_LIMIT = 500;

export default class ImageViewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0,
      images: []
    }

    this.handleDropImage = this.handleDropImage.bind(this)
    this.handleZoom = this.handleZoom.bind(this)
    this.triggerValueAnalyzer = this.triggerValueAnalyzer.bind(this)

    this.viewRef = React.createRef()
    this.analyzerRef = React.createRef()
    this.histRef = React.createRef()
  }
  
  handleDropImage = (e) => {
    const that = this
    let reader = new FileReader()
    console.log(e.dataTransfer)

    let files = e.dataTransfer.files;

    Array.from(files).forEach( (file) => {
      if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
        // for image only
        reader.readAsDataURL(e.dataTransfer.files[0])
        reader.onloadend = () => {
          let img = document.createElement('img')
          img.src = reader.result

          this.viewRef.current.appendChild(img)

          img.onload = function() {
            if (img.classList.contains("img-initted")) return;
            
            // limit image size
            if (img.width > WIDTH_LIMIT) {
              img.height *= WIDTH_LIMIT / img.width
              img.width = WIDTH_LIMIT;
            }
            else if (img.height > HEIGHT_LIMIT) {
              img.width *= HEIGHT_LIMIT / img.height 
              img.height = HEIGHT_LIMIT;
            }

            var tmpCanvas = document.createElement("canvas")
            tmpCanvas.width = img.naturalWidth
            tmpCanvas.height = img.naturalHeight
            var ctx = tmpCanvas.getContext("2d")
            ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
            var imgData = ctx.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height)

            // store image details in state
            // https://stackoverflow.com/questions/53648661/how-to-share-state-between-child-component-siblings-in-reactjs
            let item = {
              id: that.state.imgIndex,
              data: imgData
            }

            that.setState({
              images: [...that.state.images, item]
            })

            img.classList.add(that.state.imgIndex)
            img.classList.add("img-initted")
            that.state.imgIndex++
          };

          
          img.classList.add("img-zoomable");

          // zoom single image
          img.addEventListener('wheel', (evt) => {
            evt.preventDefault();
            var scale = evt.deltaY * -0.001 + 1;
            img.height = Math.round(img.height * scale);
            img.width = Math.round(img.width * scale);
          })

          attachDrag(img);
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

    if (img.classList.contains("img-greyscale")) {
      img.classList.remove("img-greyscale")
    }

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

  /**
   * zoom resize
   *  - need to add scale limit
   * @param {*} e 
   */
  handleZoom = (e) => {
    e.preventDefault();
    var scale = e.deltaY * -0.001 + 1;

    var items = document.getElementsByClassName("img-zoomable");
    for (var i = 0; i < items.length; i++) {

      // if no round up, when value < 10, it cant scale up
      items[i].height = Math.round(items[i].height * scale);
      items[i].width = Math.round(items[i].width * scale);
      
      //console.log(items[i].width)
    }
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


    return (
      <div ref={this.viewRef} style={viewStyle} id="viewer_main">
        <p style={textStyle}>Drop image here</p>
        <canvas ref={this.analyzerRef} id="analyzer_canvas">
        </canvas>
        <canvas ref={this.histRef} id="hist_canvas">
        </canvas>
      </div>
    );
  }
}
