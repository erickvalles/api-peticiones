const dbConfig = require("../config/db.config")
const Sequelize = require("sequelize")

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD,{
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire:dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize
db.tramite = require("./tramite.model.js")(sequelize,Sequelize)
db.categoria = require("./categoria.model")(sequelize,Sequelize)
db.pregunta = require("./pregunta.model")(sequelize,Sequelize)
db.categoria.hasMany(db.pregunta, {
    foreignKey : "categoria_id",
    as : "preguntas"
})
db.pregunta.belongsTo(db.categoria, {
    foreignKey : "categoria_id",
    as: "categoria"
})

module.exports = db;