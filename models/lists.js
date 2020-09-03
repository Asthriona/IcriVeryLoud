const mongoose = require('mongoose');

const listsSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    done: Boolean
});
module.exports = mongoose.model("Lists", listsSchema);