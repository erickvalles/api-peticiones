module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "hola123",
    DB: "sistema_proyectofinal",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}