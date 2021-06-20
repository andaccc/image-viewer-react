// all image filters put here

/**
 * // https://phg1024.github.io/image/processing/2014/02/26/ImageProcJS4.html
 * @param imgData 
 * @returns 
 */
export function grayScaleFilter(imgData: any) {
  // each 4 places [0][1][2][3] = [r][g][b][a]
  var arr_r = imgData.filter( (d: any, i: any) => ((i + 4) % 4) === 0)  
  var arr_g = imgData.filter( (d: any, i: any) => ((i + 3) % 4) === 0)
  var arr_b = imgData.filter( (d: any, i: any) => ((i + 2) % 4) === 0)
  //var arr_a = imgData.filter( (d: any, i: any) => ((i + 1) % 4) === 0)

  // single brightness channel
  var l = arr_r.map( (data: any, i: any) => {
    return Math.round(arr_r[i] * 0.299 + arr_g[i] * 0.587 + arr_b[i] * 0.114)
  })

  return l
}


/**
 * grey scale image by css
 * - seem css method value appears darker...

  * @param {*} imgId 
  */
export function grayScaleFilterCss(img: HTMLElement ) {
  if (img.classList.contains("img-greyscale")) {
    img.classList.remove("img-greyscale")
  }
  else {
    img.classList.add("img-greyscale")
  }

}