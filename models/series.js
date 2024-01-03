module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Series', {
  seriesName:{
    type: DataTypes.STRING , 
    allowNull: false,
  },
  seriesUrl:{
    type: DataTypes.TEXT , 
    allowNull: false,
  },
  seriesPoster:{
    type: DataTypes.TEXT , 
    allowNull: false ,
  },
  seriesInfo:{
    type: DataTypes.STRING,
    allowNull: true , 
  },
  seriesArtits:{
    type: DataTypes.STRING,
    defaultValue: false,
    allowNull: true ,
  },
  seriesCountry:{
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
  seriesLanguege:{
    type: DataTypes.STRING , 
    allowNull: false , 
  },



});
}