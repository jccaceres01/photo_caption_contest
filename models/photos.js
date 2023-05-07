'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.belongsTo(models.User, { targetKey: 'id' });
      this.hasMany(models.Caption, { foreignKey: 'id' });
    }
  }
  Photo.init({
    filename: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Photo',
    underscored: true,
    tableName: 'Photos'
  });
  return Photo;
};
