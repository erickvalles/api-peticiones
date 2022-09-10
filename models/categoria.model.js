module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("categoria", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey : true
        },
        nombre:{
            type: Sequelize.STRING,

        }
    },{
        freezeTableName : true,
        timestamps : false
    });
    return Categoria
}