const canvas = document.getElementById("canvas")
const colorPicker = document.getElementById("color-picker")

let currentTool = "pencil"

let color = "#000000";
let clearColor = "#00000000"

const clearButton = document.querySelector("button.clear")

colorPicker.addEventListener("input", event => {color = event.target.value;})

const eyedropperButton = document.querySelector("button.eyedropper")
const eyedropperIcon = document.querySelector("path.eyedropper")

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


canvas.addEventListener("mousedown", event => {
  if(!(Array.from(event.target.classList).includes("pixel"))) return

  useTool(event.target)
})

canvas.addEventListener("mouseover", event => {
  if(!(Array.from(event.target.classList).includes("pixel"))) return

  if(event.buttons === 1){
    useTool(event.target)
  }
})

function useTool(target){
  if(currentTool === "pencil"){
    target.style.background = color
  } else if (currentTool === "eraser") {
    target.style.background = null
  } else if (currentTool === "eyedropper"){
    colorPicker.value = rgbToHex(target.style.backgroundColor)
    color = colorPicker.value
    console.log(`Color picked: ${color}`);
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

const pencilButton = document.querySelector("button.pencil")
const pencilIcon = document.querySelector("path.pencil")

const eraserButton = document.querySelector("button.eraser")
const eraserIcon = document.querySelector("path.eraser")

eyedropperButton.addEventListener("click", () => {
  setCurrentTool("eyedropper")
})
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
    eyedropperButton.style.backgroundColor = "transparent"
    eyedropperIcon.setAttribute("fill", "#606c38")
  } else if (tool === "eraser"){
    currentTool = "eraser"
    eraserButton.style.backgroundColor = "#606c38"
    eraserIcon.setAttribute("fill", "#ffffff")

    pencilButton.style.backgroundColor = "transparent"
    pencilIcon.setAttribute("fill", "#606c38")
    eyedropperButton.style.backgroundColor = "transparent"
    eyedropperIcon.setAttribute("fill", "#606c38")
  } else if (tool === "eyedropper"){
    currentTool = "eyedropper"
    eyedropperButton.style.backgroundColor = "#606c38"
    eyedropperIcon.setAttribute("fill", "#ffffff")

    pencilButton.style.backgroundColor = "transparent"
    pencilIcon.setAttribute("fill", "#606c38")
    eraserButton.style.backgroundColor = "transparent"
    eraserIcon.setAttribute("fill", "#606c38")
  }
}

clearButton.addEventListener("click", () => {
  displayModal("Clear Canvas?", clearCanvas)
})


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

const gridSizeCounter = document.getElementById("grid-size-counter")
const gridSizeInput = document.getElementById("grid-size-input")
const gridSizeApplyButton = document.getElementById("grid-size-apply")

let gridSize = 64;
updateGridSizeCounter(gridSize)
addPixels(+gridSize)

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


function updateGridSizeCounter(value){
  gridSizeCounter.innerText = `${value} x ${value}`
}

