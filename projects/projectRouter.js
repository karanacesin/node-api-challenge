const express = require('express')
const projects = require('../data/helpers/projectModel')
const router = express.Router()

router.get('/', (req, res) => {
    projects.get()
  
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "can not find projects"})
    })
  })

  router.get('/:id', validateProjectId, (req, res) => {
    
      res.status(200).json(req.project)
    
  })

  router.get('/:id/actions', (req, res) => {
    const {id} = req.params
    projects.getProjectActions(id)
  
    .then(actions => {
      res.status(200).json(actions)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "can not find project's actions"})
    })
  })


  router.post('/',  validateProject, (req, res) => {
    projects.insert(req.body)
  
    .then(project => {
      res.status(200).json(project)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "failed to add new project"})
    })
    
  })

  router.put('/:id', validateProjectId, (req, res) => {
    projects.update(req.params.id, req.body)
  
    .then(project => {
      if(project) {
        res.status(200).json(project)
      } else {
        res.status(404).json({ errorMessage: "project does not exist"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "can not update project"})
    })
  })

  router.delete('/:id', validateProjectId, (req, res) => {
    projects.remove(req.params.id)
  
    .then (count => {
      if(count > 0) {
        res.status(200).json({message: "project has been deleted"})
      } else {
        res.status(404).json({ errorMessage: " project can not be found"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: "can not delete project"})
    })
  })

  function validateProjectId(req, res, next) {
    const {id} = req.params

    projects.get(id)
      .then (project => {
        req.project = project
        next()
      })
      .catch (err => {
        console.log(err)
        res.status(404).json({ error: "invalid project id"})
    })
  }

  function validateProject(req, res, next) {
    if(req.body.name && req.body.description && req.body.completed) {
      next()
    } else if (!req.body.name) {
      res.status (400).json({ message: "missing required name field"})
    } else if (!req.body.description){
     res.status (400).json({ message: "missing required description field"})
    } else {
      res.status (400).json({ message: "missing required completed field"})
    }
 }

module.exports = router