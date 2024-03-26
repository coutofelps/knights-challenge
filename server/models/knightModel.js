const mongoose = require('mongoose')

const knightSchema = new mongoose.Schema({
    name: String,
    nickname: String,
    birthday: Date,
    weapons: [{
        name: String,
        mod: Number,
        attr: String,
        equipped: Boolean
    }],
    attributes: {
        strength: Number,
        dexterity: Number,
        constitution: Number,
        intelligence: Number,
        wisdom: Number,
        charisma: Number
    },
    keyAttribute: String
})

const Knight = mongoose.model('Knight', knightSchema)

module.exports = Knight
