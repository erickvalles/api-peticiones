const db = require("../models")
const Usuario = db.usuario

exports.allAccess = (req, res) => {
    Usuario.findAll({
        attibutes: ["codigo", "nombre"],
        include: ['tipos']
    }).then(usuarios => {
        usuarios.getTipo().then(tipos => {
            res.status(200).send(tipos)
        })
    })

}

exports.coordinadorContent = (req, res) => {
    res.status(200).send("Solamente coordis")
}


exports.adminContent = (req, res) => {
    res.status(200).send("Solamente admins")
}