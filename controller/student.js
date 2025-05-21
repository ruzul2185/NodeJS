var User = require('./../model/User');
var bcrypt = require('bcrypt');

var saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';


async function getData(req, res, next){

    ///add to database
    const username = "Rujul2185"
    const password = "password"
    const hashedPassword = await bcrypt.hash(password,saltRounds);
    console.log(hashedPassword);
    const email = "ruj@gamil.com"

    const output = await User.insertOne({username,password:hashedPassword,email})
    console.log(output)
    ///response " added to the database!"
    res.render('student',{title:output});//view
}

module.exports = getData;