module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Genre', {
  Action:{
    type: DataTypes.STRING , 
    allowNull: true,
  },
  Fantasy:{
    type: DataTypes.STRING , 
    allowNull: true,
  },
  ScienceFiction:{
    type: DataTypes.STRING , 
    allowNull: true ,
  },
  Mystry:{
    type: DataTypes.STRING,
    allowNull: true , 
  },
  Historic:{
    type: DataTypes.STRING,
    allowNull: true ,
  },
  Horror:{
    type: DataTypes.STRING ,
  },
  Gang:{
    type: DataTypes.STRING, 
    allowNull: true , 
  }

});
}