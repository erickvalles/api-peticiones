const db = require("../models")
const Usuario = db.usuario

exports.allAccess = (req, res) => {
    res.status(200).send({
        mensaje: "contenido público"
    })

}

exports.coordinadorContent = (req, res) => {
    res.status(200).send("Solamente coordis")
}


exports.adminContent = (req, res) => {
    res.status(200).send("Solamente admins")
}