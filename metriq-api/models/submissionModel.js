// submissionModel.js

'use strict'
module.exports = function (sequelize, DataTypes) {
  return sequelize.define('submission', {
    name: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    nameNormal: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    contentUrl: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    thumbnailUrl: {
      type: DataTypes.TEXT
    },
    approvedAt: {
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function (db) {
        db.user.hasMany(db.submission)
        db.submission.hasMany(db.like)
        db.submission.hasMany(db.submissionMethodRef)
        db.submission.hasMany(db.submissionTaskRef)
        db.submission.hasMany(db.submissionTagRef)
        db.submission.hasMany(db.moderationReport)
      }
    }
  })
}
