// model'na blueprint (schema) for mongo document
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String },
    age: { type: Number },
});

module.exports = mongoose.model('user', userSchema, 'user');