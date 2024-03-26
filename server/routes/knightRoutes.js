const express = require('express')
const router = express.Router()
const knightController = require('../controllers/knightController')

router.get('/', knightController.getAllKnights)

router.get('/:id', knightController.getKnightById)

router.post('/', knightController.addKnight)

router.put('/:id', knightController.updateKnight)

router.delete('/:id', knightController.deleteKnight)

module.exports = router
