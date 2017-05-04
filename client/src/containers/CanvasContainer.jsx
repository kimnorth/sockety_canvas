import React from "react"

class CanvasContainer extends React.Component {
  constructor(props) {
    super(props)
    this.canvas = null;
    this.context = null;
}

  componentDidMount(){
    this.canvas = document.querySelector('canvas');
    this.context = this.canvas.getContext('2d');
    console.log(this.context)
  }

  handleClick(e){
    const X = (e.pageX - this.canvas.getBoundingClientRect().left)
    const Y = (e.pageY - this.canvas.getBoundingClientRect().top)

    const width = 20;
    const height = 20;

    this.context.fillRect(X - (width / 2), Y - (height / 2), width, height)

    // console.log(e.pageX)
    // console.log(e.pageY)

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