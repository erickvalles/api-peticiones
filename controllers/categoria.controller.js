const db = require("../models")
const Categoria = db.categoria
const Op = db.Sequelize.Op

/**
 * 
 * CRUD
 * C create
 * R read
 * U update
 * D delete
*/

exports.create = (req,res) =>{
    if(!req.body.nombre){
        res.status(400).send({
            mensaje: "Nombre no puede ser vacío"
        })
        return
    }

    const categoria = {
        nombre: req.body.nombre
    }

    Categoria.create(categoria)
        .then(data => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                mensaje : err.message || "Algo salió mal"
            })
        })
}

exports.findAll = (req, res) => {
    const nombre = req.query.nombre
    var condicion = nombre ? {nombre: {[Op.like]: `%${nombre}%`}} : null
    //select * from categoria where nombre like %variable%
    Categoria.findAll({where : condicion, include: ["preguntas"]})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                respuesta : err.message || "Algo salió mal"
            })
        })
}

exports.findOne = (req,res)=>{
    let id = req.params.id
    Categoria.findByPk(id, {include : ["preguntas"]})
        .then(resultado =>{
            if(resultado){
                res.send(resultado)
            }else{
                res.status(404).send({
                    mensaje: "Categoría no encontrada"
                })
            }
        })
        .catch(error =>{
            res.status(500).send({
                mensaje:error.message || "Algo salió mal"
            })
        })
}

exports.update = (req,res) =>{
    const id = req.params.id

    if(!req.body.nombre || req.body.nombre.length ==0){
        res.status(400).send({
            mensaje: "Nombre no puede ser vacío"
        })
        return
    }
    Categoria.update(req.body, {
        where : {id:id}
    })
    .then(num=>{
        if(num ==1){
            res.send({
                mensaje : "Categoría actualizada"
            })
        }else{
            res.send({
                mensaje: "No se encuentra para actualizar la categoría con id "+id
            })
        }
    }).catch(err=>{
        res.status(500).send({
            mensaje: "error actualizando la categoría con id" +id
        })
    })
}

exports.delete = (req,res) =>{
    const id = req.params.id

    Categoria.destroy({
        where : {id:id}
    }).then(num=>{
        if(num == 1){
            res.send({
                mensaje : "Categoría eliminada"
            })
        }else{
            res.send({
                mensaje : "No se encuentra la categoría a eliminar"
            })
        }
    }).catch(err => {
        res.status(500).send({
            mensaje:"No se pudo eliminar la categoría con id "+id
        })
    })
}