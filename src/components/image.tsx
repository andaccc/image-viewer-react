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
 */
import React, {useState, useEffect} from "react";

const Image = (imageData : HTMLImageElement["src"]) => {
	const [rawData, setRawData] = useState(null)

	useEffect(() => {
		// run once


	}, []) // or on target state change

  return (
		<div>
		</div>
  )
}