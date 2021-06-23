/**
 * Custom context menu 
 * - image option
 * 
 */

/**
 * react hook ref:
 * https://codesandbox.io/s/proud-surf-31821?fontsize=14&hidenavigation=1&theme=dark&file=/src/lecturer.js
 */
import React, {useState, useEffect} from "react"
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { grayScaleFilter, grayScaleFilterCss} from './../utils/imageFilter'

export default function ContextMenu() {
  const [showMenu, setShowMenu] = useState(false)
  const [xpos, setXpos] = useState(0)
  const [ypos, setYpos] = useState(0)
  const [targetElement, setTargetElement] = useState({} as HTMLElement)

  useEffect(() => {
    // TODO: separate normal and image context menu
    document.addEventListener("contextmenu", handleContextMenu)
    
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  })

  const isImageElement = (ele: HTMLElement) => {
    return ele.tagName === 'IMG'
  }

  const handleContextMenu = (evt: any) => {
    // store target element and details 
    
    evt.preventDefault() 
    setShowMenu(true)
    setXpos(evt.pageX)
    setYpos(evt.pageY)
    setTargetElement(evt.target)
  }

  const handleClick = (evt: any) => {
    // close menu
    if (showMenu) {
      setShowMenu(false)
    }
  }

  /**
   * 
   * @param evt 
   */
  const handClickGreyScale = (evt: any) => {
    if (isImageElement(targetElement)) {

      let img = targetElement as HTMLImageElement;
      var tmpCanvas = document.createElement("canvas")

      tmpCanvas.width = img.naturalWidth
      tmpCanvas.height = img.naturalHeight
      var ctx = tmpCanvas.getContext("2d")
      ctx!.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)

      var imgData = ctx!.getImageData(0, 0, tmpCanvas.width, tmpCanvas.height)
     
      var greyScaleData = grayScaleFilter(imgData.data)

      imgData.data.set(greyScaleData)

      ctx!.putImageData(imgData, 0, 0)

      var dataURL = tmpCanvas.toDataURL()

      img.src = dataURL;
      img.onload = function() {}
    }

    handleClose()
  }

  const handleDelete = () => {
    handleClose()
  }

  const handleClose = () => {
    setShowMenu(false)
  }


  return (
    <Menu
      id="img-context-menu"
      keepMounted
      //open={Boolean(anchorEl)}
      open={showMenu}
      onClose={handleClose}
      anchorReference="anchorPosition"
      anchorPosition={
        xpos !== null && ypos !== null
          ? { top: ypos, left: xpos }
          : undefined
      }
    >
      <MenuItem onClick={handClickGreyScale}>GreyScale</MenuItem>
      <MenuItem onClick={handleClick}>ValueAnalyzer</MenuItem>
      <MenuItem onClick={handleClick}>ResetSize</MenuItem>
      <MenuItem onClick={handleDelete}>Delete</MenuItem>
    </Menu>
  )
 
}