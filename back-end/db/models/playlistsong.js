'use strict';
const Song = require('./song');
const Playlist = require('./playlist')

module.exports = (sequelize, DataTypes) => {
  const PlaylistSong = sequelize.define('PlaylistSong', {
    song: DataTypes.STRING,
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {});
  PlaylistSong.associate = function(models) {
    // associations can be defined here
    PlaylistSong.belongsTo(models.Song, {foreignKey: 'songId'});
  };
  return PlaylistSong;
};