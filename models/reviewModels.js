module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Review', {
      content: {
          type: DataTypes.STRING,
          allowNull: false,
      },
      rating: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
              min: {
                  msg: `the point cannot be 0`,
                  args: [0]
              },
              max: {
                  msg: `the point cannot be morethan 5 star`,
                  args: [5]
              }
          }
      }
  })
}
