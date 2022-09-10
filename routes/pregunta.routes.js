const { route } = require("express/lib/application")

module.exports = app => {
    const preguntasController = require("../controllers/pregunta.controller")
    var router = require("express").Router()
    const {body} = require('express-validator')

    router.post("/",[
        body('pregunta').isLength({min:5}),
        body('respuesta').isLength({min:3}),
        body('categoria_id').isNumeric(),
        body('carrera_id').isNumeric()
    ], preguntasController.create)
    router.get("/", preguntasController.findAll)


    app.use('/api/faq', router)
}