const mongoose = require('mongoose');

var keySchema = new mongoose.Schema({
    publicKey: {
        type: String,
        required: 'This field is required.'
    },
    balance: {
        type: String
    }
});

mongoose.model('Keys', keySchema);