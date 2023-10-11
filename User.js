const mongoose = require("mongoose")

const addressSchema = new mongoose.Schema({
    street: String,
    city: String
})

// custom validation function to check if digits is present in name
function isAlpha(name) {
    for (let i = 0; i < name.length; i++){
        if ('0' <= name[i] && name[i] <= '9')
            return false
    }
    return true
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 5,
        validate: {
            validator: username => isAlpha(username) == true,
            message: props => `${props.value} contains digits! Name can't contain digit.`
        }
    },
    age: {
        type: Number,
        min: 5,
        max: 100
    },
    email: {
        type: String,
        required: true, // makes sure that that the email field is given
        lowercase: true, //will convert the entered email in lowercase before saving in db
    },
    createdAt: {
        type: Date,
        immutable: true, // it's value won't get changed
        default: new Date()
    },
    updatedAt: {
        type: Date,
        default: new Date()
    },
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId, // bestFriend-> it will have the id of another user
        ref: "User" // bestFriend is a reference to the User model
    },  
    hobbies: [String],
    address: addressSchema  //nested schema
})


// custom instance method
// it gets applied on the instances of a model(i.e on a document)
// we can call this method for any of the instance of the model
// don't use arrow function, because we can't use ```this``` in arrow function
userSchema.methods.sayHello = function () {
    console.log(`Hello ${this.name}!`)
}


// it gets applied on the model
userSchema.statics.findUsers = function (age) {
    return this.where("age").eq(age)
}


//Middlewares

userSchema.pre('save', function (next) {
    this.updatedAt = new Date()
    // next()
    throw new Error("Save Failed!")
})

userSchema.post('save', function (doc, next) {
    doc.sayHello()
    next()
})

module.exports = mongoose.model("User",userSchema)