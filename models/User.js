const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {
      // set up method to run on instance data (per user) to check password
//   checkPassword(loginPw) {
//     return bcrypt.compareSync(loginPw, this.password);
//   }
}

User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [7]
        }
      }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
              newUserData.password = await bcrypt.hash(newUserData.password, 10);
              return newUserData;
            },
              // set up beforeUpdate lifecycle "hook" functionality
  async beforeUpdate(updatedUserData) {
    updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
    return updatedUserData;
  }
          },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
  );

module.exports = User;