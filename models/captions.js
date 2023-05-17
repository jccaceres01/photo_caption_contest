'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Caption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      // define association here
      this.hasMany(models.Vote, { sourceKey: 'id' });
      this.belongsTo(models.Photo);
    }
  }
  Caption.init({
    caption: DataTypes.STRING,
    style: DataTypes.STRING,
    photo_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Caption',
    underscored: true,
    tableName: 'Captions'
  });
  return Caption;
};
