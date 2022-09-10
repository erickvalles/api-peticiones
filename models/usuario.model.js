module.exports = (sequelize, Sequelize) =>{
    const Usuario = sequelize.define('usuarios', {
        codigo : {
            type: Sequelize.STRING,
            primaryKey:true,
            autoIncrement:false
        },
        nombre : {
            type: Sequelize.STRING
        },
        ap: {
            type: Sequelize.STRING
        },
        am : {
            type : Sequelize.STRING
        },
        password : {
            type : Sequelize.STRING
        }
    },{
        freezeTableName : true,
        timestamps : false
    })

    return Usuario
}