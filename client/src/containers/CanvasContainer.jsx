import React from "react"

class CanvasContainer extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <canvas width="600" height="500" />
      </div>
    )
  }
}

export default CanvasContainer