module.exports = (sequelize, Sequelize) => {
    const Tipo = sequelize.define("tipo", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true
        },
        descripcion: {
            type: Sequelize.STRING
        }
    },{
        freezeTableName:true,
        timestamps:false
    })

    return Tipo
}