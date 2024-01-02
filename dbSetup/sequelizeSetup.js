const MoviesModels = require('../models/movies')
const UserModel = require('../models/users')
const RoleModel = require('../models/RoleModel')
const SeriesModels = require('../models/series')
const GenreModels = require('../models/genre')
const {Sequelize , DataTypes} = require('sequelize');
const { setMovies , setRoles , setUsers , setSeries } =require('./setData')
const reviewModel = require('../models/reviewModels')

// config.js

const sequelize = new Sequelize('venom', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});



const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Movies = MoviesModels(sequelize, DataTypes)
const Series = SeriesModels(sequelize, DataTypes)
const Genre = GenreModels(sequelize , DataTypes)
const Review = reviewModel(sequelize , DataTypes)
// const Customer = customerModel(sequelize, DataTypes)
// const Registration = registrationModel(sequelize, DataTypes, Coworking, Customer)

Role.hasMany(User)
User.belongsTo(Role)

Movies.hasMany(Genre)
Genre.hasMany(Movies)

Series.hasMany(Genre)
Genre.hasMany(Series)

User.hasMany(Review)
Review.belongsTo(User)

Movies.hasMany(Review)
Review.belongsTo(Movies)

Series.hasMany(Review)
Review.belongsTo(Series)
// Coworking.belongsToMany(Customer, { through: Registration });
// Customer.belongsToMany(Coworking, { through: Registration });

sequelize.sync({ force: true })
    .then(async () => {
        await setRoles(Role)
        await setUsers(User)
        await setMovies(Movies)
        await setSeries(Series)
        // await setCustomers(Customer)
        // setRegistrations(Registration)
    })

    .catch(error => {
        console.log(error)
    })





sequelize
.authenticate()
.then(() => {
  console.log('Connection has been established successfully.');
})
.catch(err => {
  console.error('Unable to connect to the database:', err);
});

module.exports = { Role , Movies , Series , User , Genre , Review, sequelize}
