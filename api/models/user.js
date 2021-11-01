const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, 
        required: true, 
        //unique doesn't validate the uniqueness of the value but 
        //uses it to optimization in the database and internal indexing.
        unique: true, 
        //match property will match the pattern with the email string 
        //add the pattern between two back slashes.
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    }, 
    password: {type: String, required: true}
});

module.exports = mongoose.model('User', userSchema);