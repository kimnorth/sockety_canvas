var express = require("express")
var app = express()
var http = require("http").Server(app)
var io = require("socket.io")(http)

var path = require("path")

app.use(express.static('client/build'))

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

io.on("connection", function(socket) {
  socket.on("paint", (coords) => {
    io.sockets.emit("paint", coords)  // transmit clicks to all sockets
  })
  socket.on("clear", () => {
    io.sockets.emit("clear")
  })
})

http.listen(3000, function() {
  console.log("listening on 3000")
})
