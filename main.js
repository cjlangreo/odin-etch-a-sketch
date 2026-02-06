const canvas = document.getElementById("canvas")

canvas.addEventListener("mousedown", event => useTool(event))
canvas.addEventListener("mouseover", event => useTool(event))


const colorPicker = document.getElementById("color-picker")
colorPicker.addEventListener("input", event => {color = event.target.value;})

const clearButton = document.querySelector("button.clear")
clearButton.addEventListener("click", () => displayModal("Clear Canvas?", clearCanvas))

const pencilButton = document.querySelector("button.pencil")
const pencilIcon = document.querySelector("path.pencil")
pencilButton.addEventListener("click", () => setCurrentTool("pencil"))

const eraserButton = document.querySelector("button.eraser")
const eraserIcon = document.querySelector("path.eraser")
eraserButton.addEventListener("click", () => setCurrentTool("eraser"))

const eyedropperButton = document.querySelector("button.eyedropper")
const eyedropperIcon = document.querySelector("path.eyedropper")
eyedropperButton.addEventListener("click", () => setCurrentTool("eyedropper"))

const gridSizeCounter = document.getElementById("grid-size-counter")
const gridSizeInput = document.getElementById("grid-size-input")
const gridSizeApplyButton = document.getElementById("grid-size-apply")


const mainColor = "#606c38"

gridSizeInput.addEventListener("input",event => {
  gridSize = +event.target.value
  updateGridSizeCounter(gridSize)
})

gridSizeApplyButton.addEventListener("click", () => {
  displayModal("This will clear the current canvas. Continue?", () => {
    destroyCanvas()
    addPixels(gridSize)
  })
})

let gridSize = 64;
let currentTool = "pencil"
let color = "#000000";

function addPixels(gridSize){
  const pixelSize = getPixelSize(gridSize)

  console.log(`Creating a ${gridSize}x${gridSize} grid`);
  
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

function useTool(event){
  if(!(Array.from(event.target.classList).includes("pixel"))) return
  if(event.buttons !== 1 && event.type === "mouseover") return
  
  
  switch(currentTool){
    case "pencil":
      event.target.style.background = color
      break
    case "eraser":
      event.target.style.background = null
      break
    case "eyedropper":
      colorPicker.value = rgbToHex(event.target.style.backgroundColor)
      color = colorPicker.value
      console.log(`Color picked: ${color}`);
      setCurrentTool("pencil")
  }
}

function rgbToHex(rgb){
  console.log(`Original color in rgb: ${rgb ?? "rgb(1,1,1"}`);
  if(!rgb) return "#ffffff"
  const numbersString = rgb.slice(4, -1)
  const numbers = numbersString.split(", ").map(number => +number)
  const hex = numbers.map(number => number.toString(16).padStart(2, "0"))
  return `#${hex.join("")}`
}

function setCurrentTool(tool){
  eraserButton.style.backgroundColor = "transparent"
  eraserIcon.setAttribute("fill", mainColor)
  eyedropperButton.style.backgroundColor = "transparent"
  eyedropperIcon.setAttribute("fill", mainColor)
  pencilButton.style.backgroundColor = "transparent"
  pencilIcon.setAttribute("fill", mainColor)

  currentTool = tool
  
  if(tool === "pencil"){
    pencilButton.style.backgroundColor = mainColor
    pencilIcon.setAttribute("fill", "#ffffff")
  } else if (tool === "eraser"){
    eraserButton.style.backgroundColor = mainColor
    eraserIcon.setAttribute("fill", "#ffffff")
  } else if (tool === "eyedropper"){
    eyedropperButton.style.backgroundColor = mainColor
    eyedropperIcon.setAttribute("fill", "#ffffff")
  }
}

function displayModal(innerText, callback){
  const modalBackground = document.createElement("div")
  modalBackground.className = "modal-background"

  console.log("Modal shown");
  
  const modal = document.createElement("div")
  modal.className = "modal"
  modal.textContent = innerText

  const modalButtonContainer = document.createElement("div")
  modalButtonContainer.className = "modal-button-container"

  const cancelButton = document.createElement("button") 
  cancelButton.className = "cancel"
  cancelButton.textContent = "Cancel"

  cancelButton.addEventListener("click", () => {
    modalBackground.remove()
  })
  
  
  const yesButton = document.createElement("button")
  yesButton.className = "yes"
  yesButton.textContent = "Yes"
  
  yesButton.addEventListener("click", () => {
    callback()
    modalBackground.remove()
  })
  
  modalButtonContainer.appendChild(yesButton)
  modalButtonContainer.appendChild(cancelButton)
  modal.appendChild(modalButtonContainer)
  modalBackground.appendChild(modal)
  document.body.appendChild(modalBackground)
}

function clearCanvas(){
    const pixels = document.getElementsByClassName("pixel")
    Array.from(pixels).forEach(pixel => pixel.style.backgroundColor = null)
}

function destroyCanvas(){
    const pixels = document.getElementsByClassName("pixel")
    Array.from(pixels).forEach(pixel => pixel.remove())
}

function updateGridSizeCounter(value){
  gridSizeCounter.innerText = `${value} x ${value}`
}


setCurrentTool("pencil")
updateGridSizeCounter(gridSize)
addPixels(+gridSize)
