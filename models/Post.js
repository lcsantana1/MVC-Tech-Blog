const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/config');

class Post extends Model { }

Post.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },

  // post need title and body

  title: DataTypes.STRING,
  body: DataTypes.STRING

},
  {
    sequelize
  },
);

module.exports = Post;
