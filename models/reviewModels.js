module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Review', {
      content: {
          type: DataTypes.TEXT,
          allowNull: false,
      },
      rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
              min: {
                  msg: `the grade cannot be 0`,
                  args: [0]
              },
              max: {
                  msg: `the grade cannot be morethan 5 star`,
                  args: [5]
              }
          }
      }
  })
}
