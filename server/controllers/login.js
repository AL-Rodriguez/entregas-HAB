const fs = require('fs');
const jwt = require("jsonwebtoken");
const path = './db/users.json';
const bcrypt = require('bcrypt');

const login = async (req,res) => {
    try {
    const {email, password} = req.body

    const users = fs.readFileSync(path)
    const parseUsers = JSON.parse(users)
    const validateMail = parseUsers.find(user => user.email === email)

    const validatePassword = await bcrypt.compare(password, validateMail.password)

    if(!validateMail){
        res.status(400).send(('email not valid'))
    }
    if(!validatePassword){
        res.status(400).send(('Wrong Password'))
    }

    const tokenPayload = {email:email}
    const token = jwt.sign(tokenPayload, process.env.SECRET, {
        expiresIn: '1d'
    })
    res.json({
        token
      });
    } catch (error) {
        res.status(401).send('Usuario no validado')
      }
}

module.exports = login