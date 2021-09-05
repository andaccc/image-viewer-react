import Container from '@material-ui/core/Container';
import ImageViewer from "./ImageViewer"
import ContextMenu from './contextMenu'
import React from "react";

// main container
export default class Main extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <Container id="main">
        <ImageViewer />
        
      </Container>
    )
  }
}