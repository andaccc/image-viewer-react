# image-viewer-react

- image zoom in/out 
- analyze image's value 

Hosting on aws: https://master.d2o67qcn52znqy.amplifyapp.com 

pure front end app

![Intro](public/intro.png)

### Control:

Drop / Ctrl+V paste image to lord image

Mouse scroll image to zoom in/out

Right click image for image options

Drag image to move image


---

Original from https://github.com/andaccc/image-viewer-electron

now port as a pure web version 


## TODO 
- value analyzer
  - simplify value

middlewheel -> resize all image
- resize all ?
- resize single image when mouse hover on image?

pan -> all image move

## Development Plan 

### First phase
- react structure
  - image drag-drop
- Image canvas
  - z-index?
  - auto-resize?
  - auto-alignment?
- context-menu
  - value analyzer
### Later Stage
- simple image edit
- UI design
- leftside file explorer
- crtl c, v paste image 
- multiple image
- top menu bar
- save/load page
- tag page?


### Grey Scale/ histogram logic referenced from :

https://phg1024.github.io/image/processing/2014/02/26/ImageProcJS4.html


### How to port to chrome extension

https://blog.logrocket.com/creating-chrome-extension-react-typescript/ 

https://github.com/sblask/webextension-enhanced-image-viewer
