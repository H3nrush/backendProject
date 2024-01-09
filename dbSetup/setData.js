const dataOfUsers = require('../db/users')
const dataOfMovies = require('../db/movies')
const bcrypt = require('bcrypt')


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

const setMovies = (movies) => {
  return Promise.all(dataOfMovies.map((element)=>{
    const newMovies = { ...element , id:null }
    return movies.create(newMovies)
    .then(()=> {})
    .catch((error)=>{
      console.log(error.message)
    })
  }))
} 

module.exports = { setMovies , setUsers , setRoles }
