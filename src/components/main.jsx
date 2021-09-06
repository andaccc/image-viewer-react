import React from "react";

import Container from '@material-ui/core/Container';
import ImageViewer from "./ImageViewer"
import ContextMenu from './contextMenu'

import Parent from './../test/Parent'

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
        <Parent/>
        <ImageViewer />
      </Container>
    )
  }
}