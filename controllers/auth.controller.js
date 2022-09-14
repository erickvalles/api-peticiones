const db = require("../models")
const config = require("../config/auth.config")
const Usuario = db.usuario
const Tipo = db.tipo

const Op = db.Sequelize.Op

var jwt = require("jsonwebtoken")
var bcrypt = require("bcryptjs")

exports.unirse = (req, res) => {
    Usuario.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        ap: req.body.ap,
        am: req.body.am,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(usuario => {
        if (req.body.roles) {
            Tipo.findAll({
                where: {
                    descripcion: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(tipos => {
                usuario.setTipos(tipos).then(() => {
                    res.send({
                        mensaje: "Usuario creado exitosamente"
                    })
                })
            })
        } else {
            usuario.setTipos([1]).then(() => {
                res.send({
                    mensaje: "Usuario creado exitosamente"
                })
            })
        }
    }).catch(err => {
        res.status(500).send({
            mensaje: err.message || "Algo salió mal"
        })
    })
}

exports.login = (req, res) => {
    Usuario.findOne({
        where: {
            codigo: req.body.codigo
        }
    }).then(usuario => {
        if (!usuario) {
            res.status(401).send({
                mensaje: "No se encuentra el usuario"
            })
        }

        var passValida = bcrypt.compareSync(req.body.password, usuario.password)

        console.log(passValida)
        if (!passValida) {
            return res.status(401).send({
                accessToken: null,
                mensaje: "Contraseña incorrecta"
            })
        }

        var token = jwt.sign({ codigo: usuario.codigo }, config.secret, {
            expiresIn: 43200 //12 horas 
        })

        var authorities = [];

        usuario.getTipos().then(tipos => {
            for (let i = 0; i < tipos.length; i++) {
                authorities.push("TIPO_" + tipos[i].descripcion.toUpperCase())
            }

            res.status(200).send({
                codigo: usuario.codigo,
                nombre: usuario.nombre,
                roles: authorities,
                accessToken: token
            })
        })
    }).catch(err => {
        res.status(500).send({ mensaje: err.message })
    })
}