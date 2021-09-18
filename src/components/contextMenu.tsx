/**
 * Custom context menu 
 * - image option
 * 
 * https://mui.com/api/menu/
 */

import React, {useState, useEffect, useContext} from "react"
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { ImageContext } from './imageContext'

const ContextMenu = () => {
  const {imageState, dispatch} = useContext(ImageContext)

  const [showMenu, setShowMenu] = useState(false)
  const [xpos, setXpos] = useState(0)
  const [ypos, setYpos] = useState(0)
  const [targetElement, setTargetElement] = useState({} as HTMLElement)

  const [isImageMenu, setIsImageMenu] = useState(false)

  useEffect(() => {
    // TODO: separate normal and image context menu
    document.addEventListener("contextmenu", handleContextMenu)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

  useEffect(() => {
   
  }, [])

  const isImageElement = (ele: HTMLElement) => {
    return ele.tagName === 'IMG'
  }

  const handleContextMenu = (evt: any) => {
    evt.preventDefault() // remove browser default menu

    // store target element and details
    
    /**
     * BUG: when menu is open
     * - right again
     * - the target is always towards menu
     * any way to get the underneath element?
     * https://stackoverflow.com/questions/29518070/how-to-detecting-a-click-under-an-overlapping-element
     * 
     * for now just close the menu if it is opened
     */

    // https://stackoverflow.com/questions/54069253/usestate-set-method-not-reflecting-change-immediately
    setShowMenu(prevState => !prevState)

    if (isImageElement(evt.target)) {
      setIsImageMenu(true)
    }
    else {
      setIsImageMenu(false)
    }

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
  const onGreyScale = (evt: any) => {
    if (isImageElement) {
      let id = targetElement.id

      // string to num
      let i = imageState.images.findIndex(x => x.index.toString() === id)

      // https://stackoverflow.com/questions/37662708/react-updating-state-when-state-is-an-array-of-objects
      // find the image by id 
      // and flip the grey scale flag
      dispatch({ type: 'GREY_FILTER', payload: i})
    }

    onClose()
  }

  useEffect(() => {
    //console.log(imageState)
  }, [imageState])

  // trigger value analyzer
  // TODO
  const onValueAnalyzer = () => {
    onClose()
  }

  // on reset image
  // TODO
  const onReset = () => {
    onClose()
  }

  // on delete image
  // TODO
  const onDelete = () => {
    onClose()
  }

  const onClose = () => {
    setShowMenu(false)
  }

  return (
    <Menu
      id="img-context-menu"
      keepMounted
      open={showMenu}
      onClose={onClose}
      transitionDuration={{exit: 0}}
      anchorReference="anchorPosition"
      anchorPosition={
        xpos !== null && ypos !== null
          ? { top: ypos, left: xpos }
          : undefined
      }
    > 
      {isImageMenu? 
        [
          <MenuItem onClick={onGreyScale} key={0}>GreyScale</MenuItem>,
          <MenuItem onClick={onValueAnalyzer} key={1}>ValueAnalyzer</MenuItem>,
          <MenuItem onClick={onReset} key={2}>ResetSize</MenuItem>,
          <MenuItem onClick={onDelete} key={3}>Delete</MenuItem>
        ]
        :
        <MenuItem>To be implement</MenuItem>
      }
      
    </Menu>
  )
}

export default ContextMenu