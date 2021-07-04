const { Images } = require("../models/models");
const crypt = require('bcrypt');
const jwtoken = require('jsonwebtoken');
const ErrAPI = require("../error/errorAPI");
require('dotenv').config();
const fileupload = require('express-fileupload');
const path = require('path');

const generateToken = (id, email) => {
   return jwtoken.sign(
        {id, email},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class FileController {
    
    async addFile(req ,res, next){
        let sampleFile = req.files.foo;
       let aaa = path.join(__dirname, '..', '/public/');
        for(let i=0; i<sampleFile.length; i++){
            let uploadPath = aaa + sampleFile[i].name;
            let name = sampleFile[i].name;
            console.log("file name is");
            console.log(name);
            console.log(typeof(name));
            let userId =1;
            sampleFile[i].mv(uploadPath, function(err) {
                if (err) {
                    return res.status(500).send(err);
                }
             });
            const user = await Images.create({name, userId});
        }
            res.send('Файлы отправлены');

    }

    async getOne(req ,res, next){
        const {name, id} = req.body;
        const file = await Images.findOne({where: {name, id}});
        if(!name){
            return res.send("такого файла нету в базе данных");
        }
        return res.send(file);
    }

    async getAll(req ,res){
        const userId = req.query.id;
        const files = await Images.findAll({attributes:["name"], where: {userId:userId}, raw:true});
        let arr_images = [];
        for(let i=0; i<files.length; i++){
            arr_images.push(files[i].name.split('.')[0])
        }
        console.log(arr_images);
        return res.send(arr_images);
    }
}

module.exports = new FileController();