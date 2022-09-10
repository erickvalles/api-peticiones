const express = require("express")
const cors = require("cors")
const app = express()
const db = require("./models")


var corsOptions = {
    origin: "http://localhost:3001"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const Tipo = db.tipo
db.sequelize.sync({force:true})
    .then(()=>{
        console.log("Base de datos sincronizada")
        inicializarTipos()
    }).catch((err)=>{
        console.log("Falló la sincronización de la DB "+err.message)
    })

    function inicializarTipos(){
        Tipo.create({
            id:1,
            descripcion:"coordinador"
        })
        Tipo.create({
            id:2,
            descripcion:"admin"
        })
    }

app.get('/', (req,res)=>{
    res.send({
        mensaje:"Es el index"
    })
})

require("./routes/tramite.routes")(app)
require("./routes/categoria.routes")(app)
require("./routes/pregunta.routes")(app)

const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log("Servidor corriendo en el puerto "+PORT)
})
