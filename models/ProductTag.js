const { sequelize } = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class ProductTag extends Model { }

ProductTag.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      model: 'product',
      key: 'id',
      unique: false
    },
    tag_id: {
      type: DataTypes.INTEGER,
      model: 'tag',
      key: 'id',
      unique: false
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product_tag',
  }
);

module.exports = ProductTag;