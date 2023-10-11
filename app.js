const express = require("express")
const mongoose = require("mongoose")
const User = require("./User")
const app = express()

mongoose.connect("mongodb://127.0.0.1:27017/testDB")

// CREATE
async function createUser() {
    try {
        const user = new User({
            name: "Shweta Bhagat",
            age: 20,
            email:"SB@gamil.com",
            hobbies: ["swimming","cooking"]
        })
        await user.save() // this may take time to be saved in db
        console.log(user)
    }
    catch (err) {
        console.log(err.message)
    }
}
// createUser() // uncomment this to create a new user

// FIND
async function findUser(userID) {
    try {
        const user = await User.findById(userID)
        console.log(user)
        user.sayHello()
    }
    catch (err) {
        console.log(err.message)
    }
}

// findUser("6524f30caff8256f7878a553")


// DELETE
async function deleteUser(userID) {
    try {
        const user = await User.deleteOne({ _id: userID })
        console.log(user)
    }
    catch (err) {
        console.log(err.message)
    }
}

// deleteUser("6524ff1c31386995d0fd7027") // uncomment to delete a user with a particular id


async function queryToFindUser() {
    try {
        const user = await User.where("name").eq("Sahil")
                               .limit(1) // limit(n) -> displays only n number of results
        console.log("name : Sahil & show only one result")
        console.log(user)

        const user2 = await User.where("age").gt(20).limit(1)
        console.log("display 1 user with age > 20")
        console.log(user2)

        const user3 = await User.where("name").eq("Shweta")
                                .where("age").eq(21)
        console.log("result for name: Shweta & age = 21")
        console.log(user3)
    }
    catch (err) {
        console.log(err.message)
    }
}

// queryToFindUser()

async function setBestfriend() {
    try {
        const user = await User.where("name").eq("Vatsal")
                               .where("age").gt(20)
                            //    .populate("bestFriend")
        user[0].bestFriend = "6524fee5815f053abf2924cd"
        await user[0].save()
        console.log(user)
    }
    catch (err) {
        console.log(err.message)
    }
}

// setBestfriend() // uncomment to set a bestFriend


async function implementingStatics() {
    try {
        const users = await User.findUsers(21)
        console.log(users)
    }
    catch (err) {
        console.log(err.message)
    }
}
// implementingStatics()