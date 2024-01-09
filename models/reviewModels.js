module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Review', {
      content: {
          type: DataTypes.TEXT,
          allowNull: false,
      }
  })
}
