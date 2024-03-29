const knightService = require('../services/knightService')

const knightController = {
    getAllKnights: async (req, res) => {
        const heroesParam = req.query.heroes

        try {
            const knights = await knightService.getAllKnights(heroesParam)

            res.json(knights)
        } catch (error) {
            console.error("Error getting all knights: ", error)
            res.status(500).json({ message: 'Internal server error' })
        }
    },

    getKnightById: async (req, res) => {
        const id = req.params.id

        try {
            const knight = await knightService.getKnightById(id)

            if (knight) {
                res.json(knight)
            } else {
                res.status(404).json({ message: 'Knight not found' })
            }
        } catch (error) {
            console.error("Error getting knight by id: ", error)
            res.status(500).json({ message: 'Internal server error' })
        }
    },

    addKnight: async (req, res) => {
        const knightData = req.body

        try {
            const newKnight = await knightService.addKnight(knightData)

            res.status(201).json(newKnight)
        } catch (error) {
            console.error("Error adding knight: ", error)
            res.status(500).json({ message: 'Internal server error' })
        }
    },

    updateKnight: async (req, res) => {
        const id = req.params.id
        const knightData = req.body

        try {
            const updatedKnight = await knightService.updateKnight(id, knightData)

            if (updatedKnight) {
                res.json(updatedKnight)
            } else {
                res.status(404).json({ message: 'Knight not found' })
            }
        } catch (error) {
            console.error("Error updating knight: ", error)
            res.status(500).json({ message: 'Internal server error' })
        }
    },

    deleteKnight: async (req, res) => {
        const id = req.params.id

        try {
            const deletedKnight = await knightService.deleteKnight(id)

            if (deletedKnight) {
                res.status(204).send()
            } else {
                res.status(404).json({ message: 'Knight not found' })
            }
        } catch (error) {
            console.error("Error deleting knight: ", error)
            res.status(500).json({ message: 'Internal server error' })
        }
    }
}

module.exports = knightController
