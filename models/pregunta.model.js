module.exports = (sequelize, Sequlize) => {
    const Pregunta = sequelize.define("preguntas_frec",{
        id : {
            type : Sequlize.INTEGER,
            primaryKey : true
        },
        pregunta: {
            type : Sequlize.STRING
        },
        respuesta : {
            type : Sequlize.TEXT
        },
        categoria_id :{
            type : Sequlize.INTEGER
        },
        carrera_id : {
            type : Sequlize.INTEGER
        }
    },{
        freezeTableName : true,
        timestamps : false
    })

    return Pregunta
}