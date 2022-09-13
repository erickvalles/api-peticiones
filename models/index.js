const dbConfig = require("../config/db.config")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.tramite = require("./tramite.model.js")(sequelize, Sequelize)
db.categoria = require("./categoria.model")(sequelize, Sequelize)
db.pregunta = require("./pregunta.model")(sequelize, Sequelize)
db.tipo = require("./tipo.model")(sequelize, Sequelize)
db.usuario = require("./usuario.model")(sequelize, Sequelize)

db.tipo.belongsToMany(db.usuario, {
    through: "usuarios_tipo",
    foreignKey: "usuarios_codigo",
    otherKey: "tipo_id",
    as: "usuarios"
})
db.usuario.belongsToMany(db.tipo, {
    through: "usuarios_tipo",
    foreignKey: "tipo_id",
    otherKey: "usuarios_codigo",
    as: "tipos"
})

db.categoria.hasMany(db.pregunta, {
    foreignKey: "categoria_id",
    as: "preguntas"
})
db.pregunta.belongsTo(db.categoria, {
    foreignKey: "categoria_id",
    as: "categoria"
})

db.TIPOS = ["coordinador", "admin"]



module.exports = db;