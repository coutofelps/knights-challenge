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
    keyAttribute: String,
    attack: Number,
    experience: Number
})

const Knight = mongoose.model('Knight', knightSchema)

module.exports = Knight
