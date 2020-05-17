'use strict';
module.exports = (sequelize, DataTypes) => {
  const Playlist = sequelize.define('Playlist', {
    playlistName: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Playlist.associate = function(models) {
    // associations can be defined here
    Playlist.belongsTo(models.User, {foreignKey: 'userId'})
    Playlist.hasMany(models.Song, {as: 'playlistSongs', foreignKey: 'playlistId'})
  };
  return Playlist;
};