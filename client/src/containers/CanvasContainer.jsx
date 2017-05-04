import React from "react"
import io from "socket.io-client"

class CanvasContainer extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = null;
    this.context = null;
    this.socket = io("http://localhost:3000")
    this.socket.on("paint", this.paint.bind(this))
}

  componentDidMount(){
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
  }

  handleClick(e){
    const X = (e.pageX - this.canvas.getBoundingClientRect().left)
    const Y = (e.pageY - this.canvas.getBoundingClientRect().top)
    this.socket.emit("paint", { x: X, y: Y })
  }

  paint(coords) {
    const width = 20;
    const height = 20;
    this.context.fillRect(coords.x - (width / 2), coords.y - (height / 2), width, height)
  }

  render() {
    return (
      <div>
        <canvas onClick={this.handleClick.bind(this)} width="600" height="500" />
      </div>
    )
  }
}

export default CanvasContainer

{/*<canvas onClick={this.handleClickEvent.bind(this)} width="600" height="500" />*/}