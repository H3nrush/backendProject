module.exports = (sequelize, DataTypes) => {
  return sequelize.define('FeedBacks', {
  subject:{
    type: DataTypes.TEXT , 
    allowNull: false,
  },
  name:{
    type: DataTypes.TEXT , 
    allowNull: false ,
  },
  text:{
    type: DataTypes.TEXT ,
    allowNull: false ,
  },
  rating:{
    type: DataTypes.INTEGER , 
    allowNull : true ,
    validate: {
      min: {
          msg: `minimum rate is 0`,
          args: [0]
      },
      max: {
          msg: `maximum is 5`,
          args: [5]
      }
  }
  }
});
}