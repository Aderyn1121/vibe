'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    userName: DataTypes.STRING,
    birthday: DataTypes.DATE
  }, {});
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.User, {as: 'friends', through: 'UserFriends', foreignKey: 'userId', otherKey:'friendId'});
    User.hasMany(models.Playlist, {foreignKey: 'userId'});
  };
  return User;
};