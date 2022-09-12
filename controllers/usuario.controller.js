const db = require("../models")
const Usuario = db.usuario

exports.allAccess = (req,res)=>{
    Usuario.findAll(
        {
            attibutes: ["codigo","nombre"],
            include: ['tipos']}
        ).then(usuarios=>{

            res.status(200).send(usuarios.tipos)
        })
    
}

exports.coordinadorContent = (req,res)=>{
    res.status(200).send("Solamente coordis")
}


exports.adminContent = (req,res)=>{
    res.status(200).send("Solamente coordis")
}