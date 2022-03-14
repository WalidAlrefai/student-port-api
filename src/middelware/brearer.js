'user status'

const {users} = require('../models/index');
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET || "theSecret";

module.exports = async (req, res, next) => {
    if (req.headers['authorization']){
        let token = req.headers.authorization.split(' ')[1];
        try{
            const parsedToken = jwt.verify(token,SECRET);
            const user = await users.findOne({where:{username:parsedToken.username}});
            if(user){
                req.user= user;
                next();
            }else{
                res.status(403).send('invalid token')
            }
        }catch(e){
            res.status(403).send('invalid token')
        }
    }else {
        res.status(403).send('authorization is not valid');
    }
}