const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const User = new Schema({
    firstname: {
        type: String,
        trim: true,
        // required: "First Name is required"
    },

    lastname: {
        type: String,
        trim: true,
        // required: "Last Name is required"
    },

    MI: String,

    fullname: {
        type: String
    },
    
    grade: {
        type: String,
        // required: "Grade is required"
    },

    address: {
        type: String,
        // required: true
    },
    city: String,

    state: {
        type: String,
        default: "NJ"
    },

    phone_no: {
        type: String
    },

    library_card_no: {
        type: String,
        trim: true,
        // required: "Please enter your library card number"
    },

    graduation_year: {
        type: Number,
        // required: true
    },
    email: {
        type: String,
        // unique: true,
        // match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    Created_at: {
        type: Date,
        default: Date.now
    },

    timecards: []

});

//Custom methods

User.methods.fullName = function(){
    if(MI){
    this.fullname = this.firstname+" "+this.MI+" "+this.lastname;
    return fullname;
    } else{
        this.fullname = this.firstname+" "+this.lastname;
        return fullname;
    }
}

User.methods.makeAdmin = function() {
    if(this.email === "chitra@chitra.com"){
        this.isAdmin = true;
        return this.isAdmin;
    }
}

User.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', User);