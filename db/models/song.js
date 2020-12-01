'use strict';
module.exports = (sequelize, DataTypes) => {
  const Song = sequelize.define('Song', {
    songName: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    albumId: DataTypes.INTEGER
  }, {});
  Song.associate = function(models) {
    // associations can be defined here
    Song.belongsTo(models.Album, { foreignKey: 'albumId'});
    Song.belongsToMany(models.Playlist, {through: 'playlistSongs', foreignKey: 'songId'});
  };
  return Song;
};