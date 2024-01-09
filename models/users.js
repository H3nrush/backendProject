module.exports = (sequelize, DataTypes) => {
  return sequelize.define('User' , {
    username:{
      type: DataTypes.STRING , 
      allowNull: false,
      unique:{
        msg: "This username is already in use!"
      },
      validate:{
        len: {
          msg: "Your username must be more than 5 characters!",
          args: [5, 40]
        }
      },
    },
    password:{
      type: DataTypes.STRING , 
      allowNull: false,
    }
    
  },{
    onDelete: 'CASCADE' , 
    defaultScope: {
      attributes: {exclude: ['password']}
    },
    scopes:{
      withPassword: {
        attributes:{}
      }
    }
  }
  );
}
