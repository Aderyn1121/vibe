'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    artistName: DataTypes.STRING
  }, {});
  Artist.associate = function(models) {
    // associations can be defined here
    Artist.hasMany(models.Album, { foreignKey: 'artistId'});
  };
  return Artist;
};