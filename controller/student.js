var User = require('./../model/User');
var mongoose = require('mongoose')
var bcrypt = require('bcrypt');

var saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';


async function getData(req, res, next){
    try {
        const userList = await User.find();
        console.log(userList);

        // Optionally, log or flash message like "Added to the database!"
        res.render('students', {
            title: 'Student List',
            users: userList
        });
    } catch (error) {
        next(error); // Passes error to error-handling middleware
    }
}

async function addStudent(req, res, next){
    // const body = req.body;
    // error prone

    const { username, password, email } = req.body;
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    const alreadyUsed = await User.findOne({email});
    if(alreadyUsed){
        res.status(400).send({message:"Email is already in uses!"})
    }
    const output = await User.insertOne({username,password:hashedPassword,email})
    res.status(200).send(JSON.stringify(output));
}

async function editStudent(req, res, next){
    const { id, username, password, email } = req.body;
    const user = await User.findOne({_id:id});
    // User obj shoule be edit
    if(user.username !== username){
        user.username = username;
    }else{
        res.status(400).send({message:"Username is same."})
    }

    const output = await User.updateOne(user);
    res.status(200).send(JSON.stringify(output));
}

async function deleteStudent(req, res, next){
    const id = req.query._id;
    console.log(id)
    const _id = new mongoose.Types.ObjectId(id)
    const output = await User.deleteOne({_id});
    const userList = await User.find();
    console.log(output);
    // res.status(200).send(JSON.stringify(output));
    // res.render('students',{
    //     title: 'Student List',
    //     users: userList,
    // })
    res.redirect('/students/');
}

module.exports = {
    getData,
    addStudent,
    editStudent,
    deleteStudent
};