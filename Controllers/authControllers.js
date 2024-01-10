const { User , Role } = require('../dbSetup/sequelizeSetup')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRET_KEY = require('../configs/tokenData')

const rolesHierarchy = {
  edit: ["edit"],
  admin: ["admin", "edit"],
  superadmin: ["superadmin", "admin", "edit"],
}

const login = (req, res)=>{
  User.scope('withPassword').findOne({where: { username : req.body.username }})
       .then((result)=>{
        if(!result){
          return res.status(404).json({ message: `the name of this user is not found!`})
        }
        return bcrypt.compare(req.body.password , result.password)
        .then((isValid)=>{
          if(!isValid){
            return res.status(401).json({ message: `the password is not valid!`})
          }
          const token = jwt.sign({
            data: result.username ,
            RoleId: result.RoleId, // Include the RoleId in the payload
            id: result.id, 
          }, SECRET_KEY,{expiresIn: '10h'});
          res.json({ message: `Login Successfull!` , data: token})
        })
       })
       .catch((error)=>{
        res.status(500).json({ data: error.message })
       })
}

const protect = (req , res , next) => {
  if(!req.headers.authorization){
    return res.status(401).json({ message: `You are not authenticated.` })
  }

  const token = req.headers.authorization.split(' ')[1]
  if(token){
    try{
      const decoded = jwt.verify(token, SECRET_KEY);
      req.username = decoded.data
      next()
    } catch (error) {
      return res.status(403).json({ message: `the token is not valid!`})
    }
  }
}


const restrict = (roleParam) =>{
  return (req , res , next) => {
    User.findOne({
      where: {
        username: req.username
      }
    })
    .then(user => {
      Role.findByPk(user.RoleId)
          .then(role => {
            if (rolesHierarchy[role.label].includes(roleParam)){
              next()
            } else {
              res.status(403).json({ message: `Insufficient rights.`})
            }
          })
          .catch(error => {
            console.log(error.message)
          })
    })
    .catch(error =>{
      console.log(error)
    })
  }
}




const restrictToOwnUser = (model) => {
  return (req, res, next) => {
      User.findOne(
          {
              where:
                  { username: req.username }
          })
          .then(user => {
              if (!user) {
                  return res.status(404).json({ message: `Pas d'utilisateur trouvé.` })
              }
              // on teste d'abord si le user est admin
              return Role.findByPk(user.RoleId)
                  .then(role => {
                      if (rolesHierarchy[role.label].includes('admin')) {
                          return next()
                      }
                      model.findByPk(req.params.id)
                          .then(resource => {
                              if (!resource) return res.status(404).json({ message: `La ressource n'existe pas.` })
                              if (user.id === resource.UserId) {
                                  next()
                              } else {
                                  res.status(403).json({ message: `Vous n'êtes pas l'auteur de la ressource.` })
                              }
                          })
                          .catch(error => {
                              return res.status(500).json({ message: error.message })
                          })
                  })
          })
          .catch(error => console.log(error.message))
  }
}

const correctUser = (req, res, next) => {
  User.findOne({ where: { username: req.username } })
      .then(authUser => {
          console.log(authUser.id, parseInt(req.params.id))
          if (authUser.id === parseInt(req.params.id)) {
              next()
          } else {
              res.status(403).json({ message: "Droits insuffisants." })
          }
      })
      .catch(error => {
          res.status(500).json({ message: error.message })
      })
}

module.exports ={ login , protect , restrict , restrictToOwnUser , correctUser }