var User = require('./../model/User');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');


async function login(req, res){
    const {username, password} = req.body;

    const user = await User.findOne({username});
    console.log(user);
    if(!user){
        return res.status(404).json({message: 'User not found'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({message: 'Invalid credentials'});
    }

    const token = jwt.sign({
        username: user.username,
        email: user.email,
        id: user._id
    },
    process.env.ACCESS_TOKEN_KEY,{ expiresIn: 60 * 60 });

    return res.status(200).json({
        message: 'Login successful',
        token: token,
        user: {
            username: user.username,
            email: user.email,
            id: user._id
        }
    })
}

async function email(req, res){
    try{
        const {email} = req.body;

        const token = req.headers.authorization?.split(' ')[1];

        const verify = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        if(!verify){
            return {status: 401, message: 'Unauthorized'};
        }
        res.status(200).json({message: 'Email verified'});
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Internal server error'});
    }
    
}

module.exports = {login, email};