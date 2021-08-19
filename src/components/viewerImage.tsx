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

	const divRef = useRef<HTMLDivElement>(null)
	const imgRef = useRef<HTMLImageElement>(null)

	const onImageInit = async () => {
		//https://stackoverflow.com/questions/46399223/async-await-in-image-loading
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

					divRef.current!.appendChild(img)
				}		

				img.onerror = reject
			})
		} 

		await onImageLoad()
	}
	
	useEffect(() => {
		// run once
		onImageInit()

	}, [rawData]) // or on target state change


  return (
		<div ref={divRef}>
		</div>
  )
}

export default ViewerImage