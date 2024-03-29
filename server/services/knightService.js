const Knight = require('../models/knightModel')

const knightService = {
    modMapping: {
        0: -2, 1: -2, 2: -2, 3: -2, 4: -2, 5: -2, 6: -2, 7: -2, 8: -2, 9: -1,
        10: -1, 11: 0, 12: 0, 13: 1, 14: 1, 15: 1, 16: 2, 17: 2, 18: 2, 19: 3, 20: 3
    },

    calculateMod: function(value) {
        if (value >= 0 && value <= 20) {
            return this.modMapping[value]
        } else {
            throw new Error('Value out of range (0-20)')
        }
    },

    calculateAttack: function(knight) {
        const { attributes, weapons, keyAttribute } = knight

        const keyAttributeValue = attributes[keyAttribute]
        const attackMod = this.calculateMod(keyAttributeValue)

        const equippedWeapon = weapons.find(weapon => weapon.equipped)
        const weaponMod = equippedWeapon ? equippedWeapon.mod : 0

        const attack = 10 + attackMod + weaponMod

        return attack
    },

    getAllKnights: async function(heroesParam) {
        try {
            let knights

            if (heroesParam === 'true') {
                knights = await Knight.find({ nickname: 'Hero' })
            } else {
                knights = await Knight.find({})
            }

            knights.forEach(knight => {
                knight.attack = this.calculateAttack(knight)
            })

            return knights
        } catch (error) {
            throw new Error("Error getting all knights: " + error.message)
        }
    },

    getKnightById: async function(id) {
        try {
            const knight = await Knight.findById(id)

            if (knight) {
                knight.attack = this.calculateAttack(knight)

                return knight
            } else {
                throw new Error('Knight not found')
            }
        } catch (error) {
            throw new Error("Error getting knight by id: " + error.message)
        }
    },

    addKnight: async (knightData) => {
        try {
            const newKnight = new Knight(knightData)
            await newKnight.save()

            return newKnight
        } catch (error) {
            throw new Error("Error adding knight: " + error.message)
        }
    },

    updateKnight: async (id, knightData) => {
        try {
            const updatedKnight = await Knight.findByIdAndUpdate(id, knightData, { new: true })

            return updatedKnight
        } catch (error) {
            throw new Error("Error updating knight: " + error.message)
        }
    },

    deleteKnight: async (id) => {
        try {
            const deletedKnight = await Knight.findByIdAndDelete(id)

            return deletedKnight
        } catch (error) {
            throw new Error("Error deleting knight: " + error.message)
        }
    }
}

module.exports = knightService
