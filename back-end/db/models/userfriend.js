'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserFriend = sequelize.define('UserFriend', {
    userName: DataTypes.STRING,
    friendName: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER
  }, {});
  UserFriend.associate = function(models) {
    // associations can be defined here
    UserFriend.belongsToMany(models.User, {through: 'UserFriends', foreignKey: 'userId', otherKey:'friendId'})
  };
  return UserFriend;
};