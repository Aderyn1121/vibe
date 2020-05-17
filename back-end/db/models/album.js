'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    albumName: DataTypes.STRING,
    releaseDate: DataTypes.DATE,
    artistId: DataTypes.INTEGER
  }, {});
  Album.associate = function(models) {
    // associations can be defined here
    Album.belongsTo(models.Artist, {foreignKey: 'artistId'});
    Album.hasMany(models.Song, {foreignKey: 'albumId'});
  };
  return Album;
};