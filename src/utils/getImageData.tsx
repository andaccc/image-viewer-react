// create tmp canvas to get the image array data
/**
 * @param img 
 * @returns 
 */
export const getImageData = (img : HTMLImageElement) => {
  var tmpCanvas = document.createElement("canvas")
  tmpCanvas.width = img.naturalWidth
  tmpCanvas.height = img.naturalHeight
  var ctx = tmpCanvas.getContext("2d")
  ctx!.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
  const imgData = ctx!.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height)
  return imgData
}