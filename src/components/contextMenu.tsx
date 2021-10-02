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

import { ImageContext } from './imageContext'
import { useImageReducer } from './imageReducer'

const ContextMenu = () => {
  const {imageState, dispatch} = useContext(ImageContext)

  const [showMenu, setShowMenu] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [xpos, setXpos] = useState(0)
  const [ypos, setYpos] = useState(0)
  const [targetElement, setTargetElement] = useState({} as HTMLElement)

  const [isImageMenu, setIsImageMenu] = useState(false)

  const imageReducer = useImageReducer()

  useEffect(() => {
    // TODO: separate normal and image context menu
    document.addEventListener("contextmenu", handleContextMenu)

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu)
    }
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
            <MenuItem onClick={onDelete} key={3}>Delete</MenuItem>
          ]
          :
          <MenuItem onClick={onAbout}>About</MenuItem>
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
    /*
    marginTop: 0,
    display: 'flex',
    height: '100vh',  
    flexDirection: 'column',
    alignItems: 'center',
    */
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
