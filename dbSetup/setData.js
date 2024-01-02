const dataOfUsers = require('../db/users')
const dataOfSeries = require('../db/series')
const dataOfMovies = require('../db/movies')
const bcrypt = require('bcrypt')

const setMovies = (Movies) =>{
  return Promise.all(dataOfMovies.map((element)=>{
    const newMovie = { ...element , id: null }
    return Movies.create(newMovie)
    .then(()=> {})
    .catch((error)=>{
      console.log(error.message)
    })
  }))
}


const setUsers = (User) => {
  return Promise.all(dataOfUsers.map(user => {
      return bcrypt.hash(user.password, 10)
          .then(hashResult => {
              return User.create({ ...user, password: hashResult })
                  .then(() => { })
                  .catch((error) => {
                      console.log(error.message)
                  })
          })
  }))
}

const setRoles = (Role) => {
  return Promise.all([Role.create({ label: "superadmin" }), Role.create({ label: "admin" }), Role.create({ label: "edit" })])
}

const setSeries = (Serial) => {
  return Promise.all(dataOfSeries.map((element)=>{
    const newSeries = { ...element , id:null }
    return Serial.create(newSeries)
    .then(()=> {})
    .catch((error)=>{
      console.log(error.message)
    })
  }))
} 

module.exports = { setMovies , setSeries , setUsers , setRoles }
