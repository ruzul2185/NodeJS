var User = require('./../model/User');
var bcrypt = require('bcrypt');

var saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';


async function getData(req, res, next){

    const userList = await User.find();
    console.log(userList)
    ///response " added to the database!"
    res.render('student',{title:JSON.stringify(userList)});//view
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
    const { id } = req.body;
    const output = await User.deleteOne({_id:id});
    console.log(output);
    res.status(200).send(JSON.stringify(output));
}

module.exports = {
    getData,
    addStudent,
    editStudent,
    deleteStudent
};