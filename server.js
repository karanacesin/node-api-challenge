const express = require('express')
const projectRouter = require('./projects/projectRouter')
const actionsRouter = require('./actions/actionsRouter')
const server = express()

server.use(express.json())

server.get('/', logger, (req, res) => {
    res.send(`<h2>Welcome!</h2>`);
  })

server.use("/api/projects", projectRouter)
server.use("/api/projects/:id/actions", actionsRouter)

function logger(req, res, next) {
    console.log(Date.now(), req.method, req.url)
  
    next()
  }

module.exports = server