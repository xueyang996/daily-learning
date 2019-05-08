var ws = require('nodejs-websocket')
var data = require('./data') 

var server = ws.createServer(function (conn) {
  setInterval(function() {
    conn.sendText(data.getData() + '')
  }, 1000)
  conn.on('text', function(str) {
    console.log('??????@@@@@@@@@@@@', str)
  })
  conn.on("close", function(error) {
    console.log("close", error)
  })

  // 捕获错误
  conn.on("error", function(error) {
    console.log("error", error)
  })
}).listen(9008, () => {
  console.log('port', 9008 )
})