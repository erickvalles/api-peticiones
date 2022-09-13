const db = require("../models")
const TIPOS = db.TIPOS
const Usuario = db.usuario

checkUsuarioDuplicado = (req,res,next) =>{
    Usuario.findOne({
        where: {
            codigo : req.body.codigo
        }
    }).then(usuario=>{
        if(usuario){
            res.status(400).send({
                mensaje:"El código ya está registrado"
            })
            return
        }
        next()        //denme un segundo por favor
    })
}

verificarTipo = (req,res,next)=>{
    if(req.body.tipos){
        for(let i=0; i<req.body.roles.length;i++){
            if(!TIPOS.includes(req.body.roles[i])){
                res.status(400).send({
                    menssaje:"El tipo no existe ="+req.body.tipos[i]
                })
            }
            return
        }
    }
    next()
}

const verificaCreacionCuenta = {
    checkUsuarioDuplicado : checkUsuarioDuplicado,
    verificarTipo : verificarTipo
}

module.exports = verificaCreacionCuenta