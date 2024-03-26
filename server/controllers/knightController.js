const Knight = require('../models/knightModel')

const knightController = {
    getAllKnights: async (req, res) => {
        const heroesParam = req.query.heroes

        try {
            let knights

            if (heroesParam === 'true') {
                knights = await Knight.find({ nickname: 'Hero' })
            } else {
                knights = await Knight.find({})
            }

            res.json(knights)
        } catch (error) {
            console.error("Error getting all knights: ", error)

            res.status(500).json({ message: 'Internal server error' })
        }
    },

    getKnightById: async (req, res) => {
        const id = req.params.id

        try {
            const knight = await Knight.findById(id)

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
        const { name, nickname, birthday, weapons, attributes, keyAttribute } = req.body

        try {
            const newKnight = new Knight({
                name,
                nickname,
                birthday: new Date(birthday),
                weapons,
                attributes,
                keyAttribute
            })

            await newKnight.save()

            res.status(201).json(newKnight)
        } catch (error) {
            console.error("Error adding knight: ", error)

            res.status(500).json({ message: 'Internal server error' })
        }
    },

    updateKnight: async (req, res) => {
        const id = req.params.id
        const { name, nickname, birthday, weapons, attributes, keyAttribute } = req.body

        try {
            const updatedKnight = await Knight.findByIdAndUpdate(id, {
                name,
                nickname,
                birthday: new Date(birthday),
                weapons,
                attributes,
                keyAttribute
            }, { new: true })

            if (updatedKnight) {
                res.json(updatedKnight);
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
            const deletedKnight = await Knight.findByIdAndDelete(id)

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
