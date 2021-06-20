# image-viewer-react

Original from https://github.com/andaccc/image-viewer-electron
now try to port as a pure web version 

Grey Scale/ histogram logic referenced from :
https://phg1024.github.io/image/processing/2014/02/26/ImageProcJS4.html

=== TODO ===
- value analyzer
  - histogram
  - simplify value

middlewheel -> resize all image
- resize all ?
- resize single image when mouse hover on image?

right click
-> grey scale

grey scale strategy

pan -> all image move

watermark

port to chrome extension?

=== Development Plan ===

# First phase
- react structure
  - image drag-drop
- Image canvas
  - z-index?
  - auto-resize?
  - auto-alignment?
- context-menu
  - value analyzer
# Later Stage
- simple image edit
- UI design
- leftside file explorer
- crtl c, v paste image 
- multiple image
- top menu bar
- save/load page
- tag page?
