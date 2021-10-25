/**
 * Custom context menu 
 * - image option
 * 
 * https://mui.com/api/menu/
 */

import React, {useState, useEffect, useContext} from "react"
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'


import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText'

import { ImageContext } from './imageContext'
import { useImageReducer } from './imageReducer'

const ContextMenu = () => {
  const {imageState, dispatch} = useContext(ImageContext)

  const [showMenu, setShowMenu] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [xpos, setXpos] = useState(0)
  const [ypos, setYpos] = useState(0)
  const [targetElement, setTargetElement] = useState({} as HTMLImageElement)

  const [isImageMenu, setIsImageMenu] = useState(false)

  const imageReducer = useImageReducer()

  useEffect(() => {
    // TODO: separate normal and image context menu
    document.addEventListener("contextmenu", handleContextMenu)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    //console.log(imageState)
  }, [imageState])

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
      let i = imageState.images.findIndex(x => x.index === id)

      imageReducer.greyFilter(i)
    }

    onClose()
  }

  // trigger value analyzer
  const onValueAnalyzer = () => {
    if (isImageElement) {
      let id = targetElement.id
      let i = imageState.images.findIndex(x => x.index === id)

      imageReducer.ValueAnalyzer(i)
    }    
    onClose()
  }

  // on reset image
  // TODO
  const onReset = () => {
    onClose()
  }

  // on delete image
  const onDelete = (evt: any) => {
    if (isImageElement) {
      let id = targetElement.id
      let i = imageState.images.findIndex(x => x.index === id)

      imageReducer.deleteImage(i)
    }

    onClose()
  }

  const onClose = () => {
    setShowMenu(false)
  }

  const onDialogClose = () => {
    setShowMenu(false)
    setShowDialog(false)
  }

  const onAbout = () =>{
    setShowMenu(false)
    setShowDialog(true)
  }


  /**
   * no direct way to trigger copy/paste as web security problem from chrome...
   * https://stackoverflow.com/questions/48178302/implementing-paste-in-custom-context-menu/48342112
   */
  const onPaste = () => {
  }

  const imageHeightStr = `Height: ${targetElement.naturalHeight}`
  const imageWidthStr = `Width: ${targetElement.naturalWidth}`
  
  return (
    <React.Fragment>
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
            // <MenuItem onClick={onReset} key={2}>ResetSize</MenuItem>,
            <MenuItem onClick={onDelete} key={3}>Delete</MenuItem>,
            <Divider />,
            <ListItem><ListItemText primary={imageHeightStr} /></ListItem>,
            <ListItem><ListItemText primary={imageWidthStr} /></ListItem>
          ]
          :
          [
            //<MenuItem onClick={onPaste}>Paste Image</MenuItem>,
            <MenuItem onClick={onAbout}>About</MenuItem>
          ]
        }
        
      </Menu>
      <SimpleDialog
        open={showDialog}
        onClose={onDialogClose}
      />
    </React.Fragment>
  )
}


const SimpleDialog = (props: any) => {
  const { open, onClose } = props;

  const handleClose = () => {
    onClose();
  };

  const dialogStyle = {
    margin: '15px'
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>About</DialogTitle>
      <div style={dialogStyle as React.CSSProperties}>
        <p>Image Viewer React by github.com/andaccc</p>
        <p>Drag drop image to canvas</p>
        <p>Right click image for image options</p>
      </div>
    </Dialog>
  );
}

export {ContextMenu, SimpleDialog}
