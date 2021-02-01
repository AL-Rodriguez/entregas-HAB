const fs = require('fs')
const path = './db/users.json'
const bcrypt = require('bcrypt');

const register = async (req,res) =>{
    try {
        const {username, email, password} = req.body
        const passwordBcrypt = await bcrypt.hash(password, 10);
        const newUser = {
            username,
            email,
            password: passwordBcrypt
        }

        const users = fs.readFileSync(path)
        const parseUsers = JSON.parse(users)

        const validateMail = parseUsers.find(user => user.email === email)

        if (validateMail){
            res.status(400).send('email not valid')
        }

        parseUsers.push(newUser)
        const stringifyUsers = JSON.stringify(parseUsers)
        fs.writeFileSync(path,stringifyUsers)

        res.send(newUser)
    } catch (error){
        res.status(401).send('Usuario no registrado')
    }
}

module.exports = register