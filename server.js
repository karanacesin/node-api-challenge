const express = require('express')
const projectRouter = require('./projects/projectRouter')
const actionsRouter = require('./actions/actionsRouter')
const server = express()

server.use(express.json())

server.use("/api/projects", projectRouter)
server.use("/api/projects/:id/actions", actionsRouter)

module.exports = server