const UserModel = require('../models/users')
const RoleModel = require('../models/RoleModel')
const MoviesModels = require('../models/movies')
const {Sequelize , DataTypes} = require('sequelize');
const { setRoles , setUsers , setMovies } =require('./setData')
const reviewModel = require('../models/reviewModels');
const feedBacksModel = require('../models/FeedBacks');

// config.js

const sequelize = new Sequelize('film2movies', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false,
}); 

const Role = RoleModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)
const Movies = MoviesModels(sequelize, DataTypes)
const Review = reviewModel(sequelize , DataTypes)
const feedBacks = feedBacksModel(sequelize , DataTypes)
// const Customer = customerModel(sequelize, DataTypes)
// const Registration = registrationModel(sequelize, DataTypes, Coworking, Customer)
User.hasMany(feedBacks)
feedBacks.belongsTo(User)

Role.hasMany(User)
User.belongsTo(Role)
 
User.hasMany(Review)
Review.belongsTo(User)

Movies.hasMany(Review)
Review.belongsTo(Movies)
// Coworking.belongsToMany(Customer, { through: Registration });
// Customer.belongsToMany(Coworking, { through: Registration });

sequelize.sync({ force: true })
    .then(async () => {
        await setRoles(Role)
        await setUsers(User)
        await setMovies(Movies)  
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

module.exports = { Role , Movies , User  , Review, sequelize , feedBacks}
