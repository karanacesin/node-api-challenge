const express = require('express')
const actions = require('../data/helpers/actionModel')
const router = express.Router()

router.get('/', (req, res) => {
    actions.get(req.params.id)
  
    .then(action => {
      res.status(200).json(action)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: "can not find actions"})
    })
  })

  router.get('/:id', (req, res) => {
    const {id} = req.params

    actions.get(id)
    .then(action => {
      res.status(200).json(action)  
    })
    .catch (err => {
        console.log(err)
        res.status(404).json({ error: "invalid action id"})
    })
    
  })

  router.post('/',  (req, res) => {
    actions.insert(req.body)
  
    .then(action => {
      res.status(200).json(action)
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "failed to add new action"})
    })
    
  })

  router.put('/:id', (req, res) => {
    actions.update(req.params.id, req.body)
  
    .then(action => {
      if(action) {
        res.status(200).json(action)
      } else {
        res.status(404).json({ errorMessage: "action does not exist"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({errorMessage: "can not update action"})
    })
  })

  router.delete('/:id', (req, res) => {
    actions.remove(req.params.id)
  
    .then (count => {
      if(count > 0) {
        res.status(200).json({message: "action has been deleted"})
      } else {
        res.status(404).json({ errorMessage: " action can not be found"})
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ errorMessage: "can not delete action"})
    })
  })

module.exports = router