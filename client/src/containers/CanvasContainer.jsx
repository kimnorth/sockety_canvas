import React from "react"
import io from "socket.io-client"

class CanvasContainer extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = null;
    this.context = null;
    this.colourInput = null;
    this.currentColour = null;
    this.socket = io("http://localhost:3000")
    this.socket.on("paint", this.paint.bind(this))
    this.socket.on("clear", this.clearCanvas.bind(this))
    this.socket.on("colourChange", this.changeColour.bind(this))
}

  componentDidMount(){
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    this.colourInput = document.querySelector("input")
  }

  handleClick(e) {
    const X = (e.pageX - this.canvas.getBoundingClientRect().left)
    const Y = (e.pageY - this.canvas.getBoundingClientRect().top)
    this.socket.emit("paint", { x: X, y: Y })
  }

  handleClearClick(){
    this.socket.emit("clear")
  }

  handleColourChange() {
    this.socket.emit("colourChange", this.colourInput.value)
  }

  paint(coords) {
    const width = 20;
    const height = 20;
    this.context.fillStyle = this.currentColour
    this.context.fillRect(coords.x - (width / 2), coords.y - (height / 2), width, height)
  }

  clearCanvas(){
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  changeColour(colour) {
    this.currentColour = colour
    this.colourInput.value = colour
  }

  render() {
    return (
      <div>
        <canvas onClick={this.handleClick.bind(this)} width="600" height="500" />
        <button onClick={this.handleClearClick.bind(this)}>Clear Canvas</button>
        <input onChange={this.handleColourChange.bind(this)} type="color" />
      </div>
    )
  }
}

export default CanvasContainer
