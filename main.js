const canvas = document.getElementById("canvas")
const colorPicker = document.getElementById("color-picker")
let userSize = prompt("Grid size?");

let currentTool = "pencil"

let color = "#000000";
let clearColor = "#00000000"

colorPicker.addEventListener("input", event => {color = event.target.value;})

while(userSize > 100 || userSize < 1){
  userSize = prompt("Invalid size! Choose a new size!")
}

addPixels(+userSize)

function addPixels(gridSize){
  const pixelSize = getPixelSize(gridSize)

  for(let i = 0; i < gridSize; i++){
    for(let j = 0; j < gridSize; j++){
      const pixel = document.createElement("div")
      pixel.className = "pixel"
      pixel.draggable = false;
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

  fillOrErasePixel(event.target)
})

canvas.addEventListener("mouseover", event => {
  if(!(Array.from(event.target.classList).includes("pixel"))) return

  if(event.buttons === 1){
    fillOrErasePixel(event.target)
  }
})

function fillOrErasePixel(target){
  if(currentTool === "pencil"){
    target.style.background = color
  } else if (currentTool === "eraser") {
    target.style.background = null
  }
}

const pencilButton = document.querySelector("button.pencil")
const pencilIcon = document.querySelector("path.pencil")

const eraserButton = document.querySelector("button.eraser")
const eraserIcon = document.querySelector("path.eraser")


pencilButton.addEventListener("click", () => setCurrentTool("pencil"))
eraserButton.addEventListener("click", () => setCurrentTool("eraser"))

setCurrentTool("pencil")

function setCurrentTool(tool){
  if(tool === "pencil"){
    currentTool = "pencil"
    pencilButton.style.backgroundColor = "#606c38"
    pencilIcon.setAttribute("fill", "#ffffff")

    eraserButton.style.backgroundColor = "transparent"
    eraserIcon.setAttribute("fill", "#606c38")
  } else if (tool === "eraser"){
    currentTool = "eraser"
    eraserButton.style.backgroundColor = "#606c38"
    eraserIcon.setAttribute("fill", "#ffffff")

    pencilButton.style.backgroundColor = "transparent"
    pencilIcon.setAttribute("fill", "#606c38")
  }
}