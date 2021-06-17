/**
 * Custom context menu 
 * - image option
 * 
 * ref:
 * https://www.pluralsight.com/guides/how-to-create-a-right-click-menu-using-react
 */

/**
 * react hook ref:
 * https://codesandbox.io/s/proud-surf-31821?fontsize=14&hidenavigation=1&theme=dark&file=/src/lecturer.js
 */
import React, {useState, useEffect} from "react"
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from "@material-ui/core/styles"

export default function ContextMenu() {
  const [showMenu, setShowMenu] = useState(false)
  const [xpos, setXpos] = useState(0)
  const [ypos, setYpos] = useState(0)

  useEffect(() => {
    // TODO: separate normal and image context menu
    document.addEventListener("contextmenu", handleContextMenu)
    
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
  })

  const handleContextMenu = (evt: any) => {
    evt.preventDefault() 
    setShowMenu(true)
    setXpos(evt.pageX)
    setYpos(evt.pageY)
  }

  const handleClick = (evt: any) => {
    // close menu
    if (showMenu) {
      setShowMenu(false)
    }
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
      <MenuItem onClick={handleClick}>GreyScale</MenuItem>
      <MenuItem onClick={handleClick}>ValueAnalyzer</MenuItem>
      <MenuItem onClick={handleClick}>ResetSize</MenuItem>
    </Menu>
  )
 
}