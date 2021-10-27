import React from "react";

import Container from '@material-ui/core/Container';
import ImageViewer from "./ImageViewer"
import { ImageContextProvider } from './imageContext'
import WaterMark from './waterMark'

//import Parent from './../test/Parent'

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
        {/* <Parent/> */}
        <ImageContextProvider>
          <ImageViewer />
        </ImageContextProvider>
        <WaterMark/>
      </Container>
    )
  }
}