module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Movies', {
  moviesName:{
    type: DataTypes.STRING , 
    allowNull: false,
  },
  moviesUrl:{
    type: DataTypes.TEXT , 
  },
  moviesPoster:{
    type: DataTypes.TEXT , 
    allowNull: false ,
  },
  moviesInfo:{
    type: DataTypes.TEXT,
    allowNull: true , 
  },
  moviesArtits:{
    type: DataTypes.TEXT,
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
    type: DataTypes.TEXT , 
    allowNull: false,
  }, 
  moviesLanguege:{
    type: DataTypes.STRING , 
    allowNull: false , 
  },
  moviesGenre:{
    type: DataTypes.JSON , 
    allowNull: false ,
  },
  imdb:{
    type: DataTypes.TEXT , 
    allowNull: false ,
  },



});
}