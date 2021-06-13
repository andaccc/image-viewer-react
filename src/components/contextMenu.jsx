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

export default function ContextMenu() {
  const [anchorEl, setAnchorEl] = useState(null)
  const [showMenu, setShowMenu] = useState(false)


  /*
  componentWillUnmount() {

  }*/

  const handleContextMenu = (e) => {
    e.preventDefault() 
    /*
    this.setState({
      xPos: `${e.pageX}px`,
      yPos: `${e.pageY}px`,
      showMenu: true
    })
    */
    setAnchorEl(e.target)
    setShowMenu(true)

  }

  const handleClick = (e) => {
    // close menu
    if (this.state.showMenu) {
      this.setState({ showMenu: false })
    }

  }

  const handleClose = () => {
    setAnchorEl(null)
    setShowMenu(false)
  }

  useEffect(() => {
    // TODO: separate normal and image context menu
    document.addEventListener("contextmenu", handleContextMenu)
  })

  // use material ui menu
  // https://material-ui.com/components/menus/
  // https://codesandbox.io/s/1bfrm?file=/demo.js
  return (
    <Menu
      id="img-context-menu"
      anchorEl={anchorEl}
      keepMounted
      //open={Boolean(anchorEl)}
      open={showMenu}
      onClose={handleClose}
    >
      <MenuItem onClick={handleClose}>GreyScale</MenuItem>
      <MenuItem onClick={handleClose}>ValueAnalyzer</MenuItem>
      <MenuItem onClick={handleClose}>ResetSize</MenuItem>
    </Menu>
  )
 
}