module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Movie', {
  movieName:{
    type: DataTypes.STRING , 
    allowNull: false,
  },
  movieUrl:{
    type: DataTypes.TEXT , 
    allowNull: false,
  },
  moviePoster:{
    type: DataTypes.TEXT , 
    allowNull: false ,
  },
  movieInfo:{
    type: DataTypes.STRING,
    allowNull: true , 
  },
  movieArtits:{
    type: DataTypes.STRING,
    defaultValue: false,
    allowNull: true ,
  },
  movieCountry:{
    type: DataTypes.STRING ,
  },
  isSubtitled:{
    type: DataTypes.BOOLEAN , 
    allowNull: false , 
  }, 
  movieGenre:{
    type: DataTypes.STRING , 
    allowNull: false ,
  },
  dateOfEcran:{
    type: DataTypes.DATE , 
    allowNull: false,
  }, 
  movieLanguege:{
    type: DataTypes.STRING , 
    allowNull: false , 
  },



});
}
