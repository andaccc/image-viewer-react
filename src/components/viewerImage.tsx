/**
 *  Image component 
 * - context menu
 * - all filters
 * 
 * TODO
 * - create image
 * - attach context menu
 * - image filters
 *   - so storing image data 
 * 
 * https://fettblog.eu/typescript-react/hooks/
 */
import React, {useState, useEffect, useRef, useContext} from "react";

import { getImageData } from '../utils/getImageData'
import { grayScaleFilter } from '../utils/imageFilter'
import { attachDrag } from '../utils/dragHandler'
import { attachZoom } from '../utils/zoomHandler'
import ViewerImageProps from './../interfaces/imageInterface'
import ImageContext from './imageContext'

// image pixel limit
const WIDTH_LIMIT = 500; 
const HEIGHT_LIMIT = 500;

const ViewerImage = (params: {parentRef: any, props: ViewerImageProps}) => {
	const [rawData, setRawData] = useState(params.props.imageData)
	const [imgIndex, setImgIndex] = useState(params.props.index)
	const [isGreyFilter, setIsGreyFilter] = useState(params.props.isGreyScale)
	const [imgData, setImgData] = useState<ImageData>()
	const [imgEle, setImgEle] = useState<HTMLImageElement>()

	const imageParams = useContext(ImageContext)

	const parents = useRef<HTMLDivElement>(params.parentRef)
	const divRef = useRef<HTMLDivElement>(null)

	const onImageInit = async () => {
		//https://stackoverflow.com/questions/46399223/async-await-in-image-loading
		await onImageLoad()
	}
	
	useEffect(() => {
		applyGreyScaleFilter()
	}, [isGreyFilter]) 

	useEffect(() => {
		// run once
		onImageInit()

	}, [rawData]) // or on target state change

	function onImageLoad() {
		return new Promise((resolve, reject) => {
			if (!rawData || !rawData) reject("invalid image raw data")

			let img = new Image()
			img.src = rawData 
			
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
				setImgData(getImageData(img))
	
				attachDrag(img)
				attachZoom(img)

				setImgEle(img)
				divRef.current!.appendChild(img)

				resolve('image loaded')
			}		

			img.onerror = reject
		})
	} 

	const applyGreyScaleFilter = () => {
		if (!imgEle || !imgData) return

		// create tmp canvas to retrieve image data 
		// TODO: refractor
		var tmpCanvas = document.createElement("canvas")
		var h = imgEle.naturalHeight
		var w = imgEle.naturalWidth
		tmpCanvas.width = w
		tmpCanvas.height = h
		var ctx = tmpCanvas.getContext("2d")

		if(isGreyFilter) {
			ctx!.drawImage(imgEle, 0, 0, w, h)
			var tmpImgData = ctx!.getImageData(0, 0, w, h)
			
		  tmpImgData.data.set(grayScaleFilter(tmpImgData.data))
		  ctx!.putImageData(tmpImgData, 0, 0)
			imgEle.src = tmpCanvas.toDataURL()
			imgEle.onload = function() {} 
		  imgEle.classList.add("img-greyscale")
	  }
	  else {
		  // recover color
			imgEle.classList.remove("img-greyscale")
			imgEle.src = rawData
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