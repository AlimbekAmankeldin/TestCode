const ErrAPI = require('../error/errorAPI');

module.exports = function (err, req, res, next){
    if(err instanceof ErrAPI){
        return res.status(err.status).json({message:err.message})
    }
    return res.status(500).json({message: "Что-то пошло не так"});
}

