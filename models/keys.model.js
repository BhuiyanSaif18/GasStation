const mongoose = require('mongoose');

let keySchema = new mongoose.Schema({
    publicKey: {
        type: String,
        required: 'This field is required.'
    },
    balance: {
        type: String
    }
});

mongoose.model('Keys', keySchema);