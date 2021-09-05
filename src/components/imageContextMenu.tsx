/**
 * Custom context menu 
 * - image option
 * TODO: restructure
 * - https://nmingaleev.medium.com/how-to-create-a-custom-context-menu-with-react-hooks-30d011f205a0
 */

import React, {useState, useEffect} from "react"
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { grayScaleFilter, grayScaleFilterCss} from './../utils/imageFilter'

const ImageContextMenu = (parentRef: any) => {
  const [isVisible, setIsVisible] = useState(false)
  const [xpos, setXpos] = useState(0)
  const [ypos, setYpos] = useState(0)
  const [targetElement, setTargetElement] = useState({} as HTMLElement)

  useEffect(() => {
    const parent = parentRef
    if (!parent) {
      return
    } 

    document.addEventListener("contextmenu", handleContextMenu)
    
    // clean up
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  })

  const handleContextMenu = (evt: any) => {
    evt.preventDefault() 
    setIsVisible(true)
    setXpos(evt.pageX)
    setYpos(evt.pageY)
    setTargetElement(evt.target)
  }
  
  const isImageElement = (ele: HTMLElement) => {
    return ele.tagName === 'IMG'
  }

  /**
   * on click menu tmp
   */
  const onClick = (evt: any) => {
    // close menu
    if (isVisible) {
      setIsVisible(false)
    }
  }
 
  /**
  * on greyScale
  * @param evt 
  */
  const onGreyScale = (evt: any) => {
    if (isImageElement(targetElement)) {
    
    }

    onClose()
  }

  // on delete option
  const onDelete = () => {
    onClose()
  }

  // on menu close
  const onClose = () => {
    setIsVisible(false)
  }

  return (
    <Menu
      id="img-context-menu"
      keepMounted
      open={isVisible}
      onClose={onClose}
      anchorReference="anchorPosition"
      anchorPosition={
        xpos !== null && ypos !== null
          ? { top: ypos, left: xpos }
          : undefined
      }
    >
      <MenuItem onClick={onGreyScale}>GreyScale</MenuItem>
      <MenuItem onClick={onClick}>ValueAnalyzer</MenuItem>
      <MenuItem onClick={onClick}>ResetSize</MenuItem>
      <MenuItem onClick={onDelete}>Delete</MenuItem>
    </Menu>
  )  
}

export default ImageContextMenu