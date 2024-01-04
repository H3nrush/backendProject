module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Movies', {
  moviesName:{
    type: DataTypes.STRING , 
    allowNull: false,
  },
  moviesUrl:{
    type: DataTypes.TEXT , 
    allowNull: false,
  },
  moviesPoster:{
    type: DataTypes.TEXT , 
    allowNull: false ,
  },
  moviesInfo:{
    type: DataTypes.STRING,
    allowNull: true , 
  },
  moviesArtits:{
    type: DataTypes.STRING,
    defaultValue: false,
    allowNull: true ,
  },
  moviesCountry:{
    type: DataTypes.STRING ,
  },
  isSubtitled:{
    type: DataTypes.BOOLEAN , 
    allowNull: false , 
  }, 
  dateOfEcran:{
    type: DataTypes.DATE , 
    allowNull: false,
  }, 
  moviesLanguege:{
    type: DataTypes.STRING , 
    allowNull: false , 
  },



});
}