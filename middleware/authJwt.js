const jwt = require("jsonwebtoken")
const config = require("../config/auth.config")
const { usuario } = require("../models")
const db = require("../models")
const Usuario = db.usuario

verifyToken = (req,res,next)=>{
    let token = req.headers["x-access-token"]
    if(!token){
        return res.status(403).send({
            mensaje:"No existe un token!"
        })
    }

    jwt.verify(token, config.secret, (err,decoded)=>{
        if(err){
            return res.status(401).send({
                mensaje:"No autorizado"
            })
        }
        req.codigo = decoded.codigo

        next()
    })

}

esAdmin = (req,res,next)=>{
    Usuario.findByPk(req.codigo).then(user=>{
        usuario.getTipos().then(tipos =>{
            for(let i=0; i<tipos.length;i++){
                if(tipos[i].descripcion == "admin"){
                    next()
                    return
                }
            }
            res.status(403).send({
                mensaje: "Se requiere el rol de admin"
            })
        })
    })
}

esCoordi = (req,res,next)=>{
    Usuario.findByPk(req.codigo).then(user=>{
        usuario.getTipos().then(tipos =>{
            for(let i=0; i<tipos.length;i++){
                if(tipos[i].descripcion == "coordinador"){
                    next()
                    return
                }
            }
            res.status(403).send({
                mensaje: "Se requiere el rol de coordi"
            })
        })
    })
}

const authJwt = {
    verifyToken: verifyToken,
    esAdmin:esAdmin,
    esCoordi:esCoordi
}

module.exports = authJwt