const canvas = document.getElementById("canvas")
const colorPicker = document.getElementById("color-picker")
let userSize = prompt("Grid size?");

while(userSize > 100 || userSize < 1){
  userSize = prompt("Invalid size! Choose a new size!")
}

let color = "#000000";
let clearColor = "#00000000"
colorPicker.addEventListener("input", event => {color = event.target.value;})

addPixels(+userSize)

function addPixels(gridSize){
  const pixelSize = getPixelSize(gridSize)

  for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
      const pixel = document.createElement("div")
      pixel.className = "pixel"
      pixel.setAttribute("style", `width:${pixelSize}px; height:${pixelSize}px`)
      canvas.appendChild(pixel)
    }
  }
}

function getPixelSize(gridSize){
  const pixelSize = canvas.offsetHeight / gridSize
  return pixelSize
}


canvas.addEventListener("click", event => {
  if(!(Array.from(event.target.classList).includes("pixel"))) return
  if(!(event.target.style.background)){
    event.target.style.background = color
  } else {
    event.target.style.background = null
  }
})