/**
 *  Image component 
 * - context menu
 * - all filters
 * 
 * using hooks
 * - readibility 
 * - Debug
 * - Module
 * - Encapsulated
 * 
 * TODO
 * - create image
 * - attach context menu
 * - image filters
 *   - so storing image data 
 * 
 * https://fettblog.eu/typescript-react/hooks/
 */
import React, {useState, useEffect, useRef} from "react";

import { grayScaleFilter } from '../utils/imageFilter'
import { attachDrag } from '../utils/dragHandler'
import { attachZoom } from '../utils/zoomHandler'

// image pixel limit
const WIDTH_LIMIT = 500; 
const HEIGHT_LIMIT = 500;

const ViewerImage = (imageRawData : any|HTMLImageElement['src']) => {
	const [rawData, setRawData] = useState(imageRawData)
	const [imgData, setImgData] = useState<ImageData>()
	const [imgEle, setImgEle] = useState<HTMLImageElement>()
	//const [imgDataUrl, setImgDataUrl] = useState<string>()

	const divRef = useRef<HTMLDivElement>(null)
	const imgRef = useRef<HTMLImageElement>(null)

	const onImageInit = async () => {
		//https://stackoverflow.com/questions/46399223/async-await-in-image-loading
		await onImageLoad()
	}
	
	useEffect(() => {
		// run once
		onImageInit()

	}, [rawData]) // or on target state change

	function onImageLoad() {
		return new Promise((resolve, reject) => {
			if (!rawData) reject()

			// need new Image() ?
			let img = new Image()
			img.src = rawData.imageRawData 
			
			img.onload = function() {
	
				// limit image size
				if (img.width > WIDTH_LIMIT) {
					img.height *= WIDTH_LIMIT / img.width
					img.width = WIDTH_LIMIT;
				}
				else if (img.height > HEIGHT_LIMIT) {
					img.width *= HEIGHT_LIMIT / img.height 
					img.height = HEIGHT_LIMIT;
				}
	
				// create tmp canvas to get the image array data
				var tmpCanvas = document.createElement("canvas")
				tmpCanvas.width = img.naturalWidth
				tmpCanvas.height = img.naturalHeight
				var ctx = tmpCanvas.getContext("2d")
				ctx!.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
				var imgData = ctx!.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height)
				
				setImgData(imgData)
	
				attachDrag(img)
				attachZoom(img)

				resolve('image loaded')

				setImgEle(img)
				divRef.current!.appendChild(img)
			}		

			img.onerror = reject
		})
	} 

	const greyScaleFilter = () => {
		if (!imgEle || !imgData) return

		// create tmp canvas to retrieve image data 
		var tmpCanvas = document.createElement("canvas")
		var h = imgEle.naturalHeight
		var w = imgEle.naturalWidth
		tmpCanvas.width = w
		tmpCanvas.height = h
		var ctx = tmpCanvas.getContext("2d")

		if(!imgEle.classList.contains("img-greyscale")) {
			/**
			 * 	add greyscale fitler to image component
			 * TODO: more elegant way to do it
			 * store the gray value?
			 */

			ctx!.drawImage(imgEle, 0, 0, w, h)
			var tmpImgData = ctx!.getImageData(0, 0, w, h)
			
		  tmpImgData.data.set(grayScaleFilter(tmpImgData.data))
		  ctx!.putImageData(tmpImgData, 0, 0)
			imgEle.src = tmpCanvas.toDataURL()
			imgEle.onload = function() {} 
		  imgEle.classList.add("img-greyscale")
	  }
	  else {
		  // remove it
			imgEle.classList.remove("img-greyscale")
			imgEle.src = rawData.imageRawData
			imgEle.onload = function() {
				// back to previous size
				imgEle.height = h
				imgEle.width = w
			}
	  }
	}  

  return (
		<div ref={divRef}>
		</div>
  )
}


export default ViewerImage