/**
 * https://alligator.io/react/usereducer/
 */
import {IViewerImageState, IViewerImageContext} from "./imageInterface";

export type ACTIONS = any

export const reducer = (imageState: IViewerImageState, action: ACTIONS) => {
  switch (action.type) {
    case "ADD": {
      let newContext = {
        images: [...imageState.images, {
          imageData: action.paylow,
          index: imageState.count,
          isGreyScale: false
        }],
        count: imageState.count + 1
      }

      return newContext
    }

    case "GREY_FILTER": {
      const id = action.paylow

      if (id === -1) return imageState
      let newContext = {
        images: [
          ...imageState.images.slice(0, id),
          Object.assign({}, imageState.images[id], 
            {isGreyScale: !imageState.images[id].isGreyScale}
            ),
          ...imageState.images.slice(id + 1)
        ],
        count: imageState.count + 1
      }
      return newContext
    }

    case "DELETE":
      return {}
  }


  /*
  if(action.type == 'chomp') {
    return people.map(person => {
      if(person.name == action.payload) {
        person.alive = false;
      }
      return person;
    })
  }
  if(action.type == 'revive') {
    return people.map(person => {
      if(person.name == action.payload) {
        person.alive = true;
      }
      return person;
    })
  }
  */
}