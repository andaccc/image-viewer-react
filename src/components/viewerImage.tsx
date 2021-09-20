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
import { ImageContext } from './imageContext'

import './image.css'

// image pixel limit
const WIDTH_LIMIT = 500; 
const HEIGHT_LIMIT = 500;

const ViewerImage = (params: any) => {
	const [rawData, setRawData] = useState(params.image.imageData)
	const [imgIndex, setImgIndex] = useState(params.image.index)
	const [isGreyFilter, setIsGreyFilter] = useState(params.image.isGreyScale)
	const [imgData, setImgData] = useState<ImageData>()
	const [imgEle, setImgEle] = useState<HTMLImageElement>()

	const parents = useRef<HTMLDivElement>(params.parentRef)
	const divRef = useRef<HTMLDivElement>(null)

	const onImageInit = async () => {
		//https://stackoverflow.com/questions/46399223/async-await-in-image-loading
		await onImageLoad()
	}
	
	// need to manualy update it...
	useEffect(() => {
		setIsGreyFilter(params.image.isGreyScale)
	}, [params.image.isGreyScale])

	useEffect(() => {
		applyGreyScaleFilter()
	}, [isGreyFilter]) 

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
				//imgEle.height = h
				//imgEle.width = w
			}
		}
	}  

	useEffect(() => {
		onImageInit() 
	}, [rawData]) 

	function onImageLoad() {
		return new Promise((resolve, reject) => {
			if (!divRef.current) reject("invalid ref")
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
				divRef.current?.appendChild(img)
				//img.classList.add(`img-id-${imgIndex}`)
				img.id = imgIndex

				resolve('image loaded')
			}		

			img.onerror = reject
		})
	} 

	const handleMousedown = (evt : any) => {
		/**
		 * try to set top zindex on clicked image
		 */
		var ele = document.getElementsByClassName('zTop');

		// remove class from all other image
		// probably a very dumb way
		Array.from(ele).forEach( (element) => {
			element.classList.remove('zTop')
		})

		evt.target.classList.add('zTop')
	}

  return (
		<div ref={divRef} onMouseDown={handleMousedown}>
		</div>
  )
}

export default ViewerImage