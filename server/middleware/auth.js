require("dotenv").config();

const fs = require('fs');
const jwt = require("jsonwebtoken");
const path = './db/users.json';

const isAuth = async (req, res, next) =>{

    const {authorization} = req.headers
    const users = fs.readFileSync(path)
    const parseUsers = JSON.parse(users)

    try{
        if(!authorization){
            return res.status(401).send('No Token')
        }

        let decodedToken;

        try {
          decodedToken = jwt.verify(authorization, process.env.SECRET);
          const validateMail = parseUsers.find(user => user.email === decodedToken.email)
          if(!validateMail){
            res.status(401).send(('Invalid token'))
        }
        } catch (error) {
          throw res.status(401).send('Invalid token');
        }

        next()

    }catch(error){
        next(error);

    }
}

module.exports = isAuth