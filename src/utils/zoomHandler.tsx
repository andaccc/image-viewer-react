// attach zoom behaviour to image

export const attachZoom = (img : HTMLImageElement) => {
  img.classList.add("zoomable")
  
  img.addEventListener('wheel', (evt) => {
    evt.preventDefault();

    var scale = evt.deltaY * -0.001 + 1;
    
    img.height = Math.round(img.height * scale);
    img.width = Math.round(img.width * scale);
  })
}