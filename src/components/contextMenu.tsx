/**
 * Custom context menu 
 * - image option
 * TODO: restructure?
 * - https://nmingaleev.medium.com/how-to-create-a-custom-context-menu-with-react-hooks-30d011f205a0
 * 
 * - https://www.javascriptstuff.com/component-communication/
 */

/**
 * react hook ref:
 * https://codesandbox.io/s/proud-surf-31821?fontsize=14&hidenavigation=1&theme=dark&file=/src/lecturer.js
 */
import {useState, useEffect, useContext} from "react"
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

import { ImageContext } from './imageContext'

const ContextMenu = () => {
  const {imageState, setImageState} = useContext(ImageContext)

  const [showMenu, setShowMenu] = useState(false)
  const [xpos, setXpos] = useState(0)
  const [ypos, setYpos] = useState(0)
  const [targetElement, setTargetElement] = useState({} as HTMLElement)

  const [testCount, setTestCount] = useState(0)

  /*
  // setState inside useEffect test 
  useEffect(() => {
    //https://stackoverflow.com/questions/53024496/state-not-updating-when-using-react-state-hook-within-setinterval

    setInterval(function() { 
      var newCount = testCount + 1
      setTestCount( newCount ) 

    }, 1000)
  }, [])

  useEffect(() => {
    console.log(testCount)
  }, [testCount])
  */


  useEffect(() => {
    // TODO: separate normal and image context menu
    document.addEventListener("contextmenu", handleContextMenu)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  }, [])

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
  const onGreyScale = (evt: any) => {
    if (isImageElement(targetElement)) {
      let id = targetElement.id

      let i = imageState.images.findIndex(x => x.index.toString() === id)

      // https://stackoverflow.com/questions/37662708/react-updating-state-when-state-is-an-array-of-objects
      // find the image by id 
      // and flip the grey scale flag
      // TODO: move to reducer
      if (i !== -1) {
        setImageState(prevState => ({
          images: [
            ...prevState.images.slice(0, i),
            Object.assign({}, prevState.images[i], {isGreyScale: !prevState.images[i].isGreyScale}),
            ...prevState.images.slice(i + 1)
          ],
          count: prevState.count
        })
        )
      }

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
      anchorReference="anchorPosition"
      anchorPosition={
        xpos !== null && ypos !== null
          ? { top: ypos, left: xpos }
          : undefined
      }
    >
      <MenuItem onClick={onGreyScale}>GreyScale</MenuItem>
      <MenuItem onClick={onValueAnalyzer}>ValueAnalyzer</MenuItem>
      <MenuItem onClick={onReset}>ResetSize</MenuItem>
      <MenuItem onClick={onDelete}>Delete</MenuItem>
    </Menu>
  )
}

export default ContextMenu