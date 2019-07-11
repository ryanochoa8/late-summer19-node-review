import express from "express"
import bp from "body-parser"
import "./db/dbconfig"
let port = 3000

let server = express()


server.use(bp.json())
server.use('/api/galaxies', new Galaxy)
server.use((error, req, res, next) => {
  res.status(error.status || 400).send(error)
})

server.listen(port, () => {
  console.log("Server running on port:", port)
})