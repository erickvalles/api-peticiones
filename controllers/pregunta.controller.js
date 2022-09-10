const db = require("../models")
const Pregunta = db.pregunta
const Op = db.Sequelize.Op
const {validationResult} = require('express-validator')

/**
 * 
 * CRUD
 * C create
 * R read
 * U update
 * D delete
*/

exports.create = (req,res) =>{
    

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json({
            errors: errors.array()
        })
    }else{
        const preguntaObject = {
            pregunta: req.body.pregunta,
            respuesta : req.body.respuesta,
            categoria_id : req.body.categoria_id,
            carrera_id : req.body.carrera_id
        }

        Pregunta.create(preguntaObject)
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                mensaje : err.message || "Algo salió mal"
            })
        })
    }
    

    

}

exports.findAll = (req, res) => {
    const pregunta = req.query.pregunta
    var condicion = pregunta ? {pregunta: {[Op.like]: `%${pregunta}%`}} : null
    //select * from categoria where nombre like %variable%
    Pregunta.findAll({where : condicion, include: ["categoria"]})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                respuesta : err.message || "Algo salió mal"
            })
        })
}