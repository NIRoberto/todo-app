const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class wrestlenames extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

  }
  wrestlenames.init({
    name: DataTypes.STRING,
    wrestleCreatorEmail: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'wrestlenames',
  });
  return wrestlenames;
};
