const { User} = require("../models/models");
const crypt = require('bcrypt');
const jwtoken = require('jsonwebtoken');
const ErrAPI = require("../error/errorAPI");
require('dotenv').config();

const generateToken = (id, email) => {
   return jwtoken.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}



class UserController {
    async signup(req ,res, next){
        const {email, password} = req.body;
        if(!email || !password){
            return res.send("Неправильный пароль или почта");
            
        }
        const mail = await User.findOne({where:{email}});
        if(mail){
            return res.send("Пользователь с такой почтой уже существует");
            
        }

        const passwordHash = await crypt.hash(password, 3);
        const user = await User.create({email, password:passwordHash});
        const jwebToken = generateToken(user.id, user.email);
        return res.json({jwebToken});
    }

    async login(req ,res, next){
        const {email, password} = req.body;
        const user = await User.findOne({where: {email}});
        if(!user){
            return res.send("пользователь не найден, зарегистрируйтесь");
            
        }
        let comparePas = crypt.compareSync(password, user.password);
        if(!comparePas) {
            return res.send("неправильный пароль");
            
        }
        const token = generateToken(user.id, user.email, user.role);
        return res.json({token});
        flag = true;
    }

    async check(req ,res){
        return res.render('main');
    }
}

module.exports = new UserController();