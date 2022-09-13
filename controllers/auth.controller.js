const db = require('../models')
const config = require('../config/auth.config')
const Usuario = db.usuario
const Tipo = db.tipo
const Op = db.Sequelize.Op
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const { USER } = require('../config/db.config')

exports.unirse = (req, res) => {

   
    
    Usuario.create({
        codigo:req.body.codigo,
        nombre:req.body.nombre,
        ap:req.body.ap,
        am:req.body.am,
        password:bcrypt.hashSync(req.body.password,8)
    }).then(user=>{
        if(req.body.roles){
            Tipo.findAll({
                where: {
                    descripcion:{
                        [Op.or]: req.body.roles
                    }
                }
            }).then(tipos=>{
                user.setTipos(tipos).then(()=>{
                    res.send({
                        mensaje:"Usuario registrado ok!"
                    })
                })
            })
        }else{
            user.setTipos([1]).then(()=>{
                res.send({
                    mensaje:"Usuario registrado ok!"
                })
            })
        }
    }).catch(err=>{
        res.status(500).send({
            mensaje: err.message
        })
    })
}

exports.login = (req,res)=>{
    Usuario.findOne({
        where:{
            codigo:req.body.codigo
        }
    }).then(usuario=>{
        if(!usuario){
            return res.status(404).send({mensaje:"Usuario no encontrado!"})
        }

        var passwordValida = bcrypt.compareSync(
            req.body.password,
            usuario.password
        )
        if(!passwordValida){
            return res.status(401).send({
                accessToken:null,
                mensaje:"Contraseña incorrecta"
            })
        }

        var token = jwt.sign({id:usuario.codigo},config.secret,{
            expiresIn: 43200//12 horas
        })

        var authorities = []

        usuario.getTipos().then(tipos=>{
            for (let i = 0; i<tipos.length; i++){
                authorities.push("TIPO_"+tipos[i].descripcion.toUpperCase())
            }

            res.status(200).send({
                id: usuario.codigo,
                nombre: usuario.nombre,
                tipos: authorities,
                accessToken: token
            })
        })
    }).catch(err=>{
        res.status(500).send({mensaje:err.message})
    })
}