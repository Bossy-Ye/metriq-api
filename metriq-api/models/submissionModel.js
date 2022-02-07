// submissionModel.js

const config = require('../config')
const { Sequelize, Model, DataTypes } = require('sequelize')
const sequelize = new Sequelize(config.pgConnectionString, { logging: false })
const Like = require('./likeModel')
const User = require('./userModel')
const SubmissionMethodRef = require('./submissionMethodRefModel')
const SubmissionTaskRef = require('./submissionTaskRefModel')
const SubmissionTagRef = require('./submissionTagRefModel')
const ModerationReport = require('./moderationReportModel')

class Submission extends Model {
  approve () {
    this.approvedAt = new Date()
  }

  static init (sequelize, DataTypes) {
    return super.init({
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
    }, { sequelize, paranoid: true, modelName: 'submission' })
  }
  static associate (db) {
    db.user.hasMany(db.submission)
    db.submission.hasMany(db.like)
    db.submission.hasMany(db.submissionMethodRef)
    db.submission.hasMany(db.submissionTaskRef)
    db.submission.hasMany(db.submissionTagRef)
    db.submission.hasMany(db.moderationReport)
  }
}
Submission.init(sequelize, DataTypes)

User.hasMany(Submission)

Submission.hasMany(Like)
Submission.hasMany(SubmissionMethodRef)
Submission.hasMany(SubmissionTaskRef)
Submission.hasMany(SubmissionTagRef)
Submission.hasMany(ModerationReport)

module.exports = Submission
