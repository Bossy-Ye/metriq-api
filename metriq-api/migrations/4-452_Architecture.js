'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.createTable('Sequelize', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          updatedAt: Sequelize.DATE,
          createdAt: Sequelize.DATE,
          name: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          friendlyName: {
            type: Sequelize.TEXT,
            allowNull: false
          }
        }, { transaction: t }),
        queryInterface.createTable('architectures', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          updatedAt: Sequelize.DATE,
          createdAt: Sequelize.DATE,
          name: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          fullName: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: false
          }
        }, { transaction: t }),
        queryInterface.createTable('architectureSequelize', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          updatedAt: Sequelize.DATE,
          createdAt: Sequelize.DATE,
          name: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          fullName: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          description: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          dataTypeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'Sequelize', key: 'id' }
          },
          architectureId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'architectures', key: 'id' }
          }
        }, { transaction: t }),
        queryInterface.createTable('architectureDataTypeValues', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          updatedAt: Sequelize.DATE,
          createdAt: Sequelize.DATE,
          value: {
            type: Sequelize.TEXT,
            allowNull: false
          },
          architectureDataTypeId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'architectureSequelize', key: 'id' }
          }
        }, { transaction: t }),
        queryInterface.createTable('resultArchitectureRefModels', {
          id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
          },
          updatedAt: Sequelize.DATE,
          createdAt: Sequelize.DATE,
          deletedAt: Sequelize.DATE,
          userId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' }
          },
          resultId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'results', key: 'id' }
          },
          architectureId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: { model: 'architectures', key: 'id' }
          }
        }, { transaction: t })
      ])
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.dropTable('resultArchitectureRefModel', { transaction: t }),
        queryInterface.dropTable('architectureDataTypeValues', { transaction: t }),
        queryInterface.dropTable('architectureSequelize', { transaction: t }),
        queryInterface.dropTable('architecture', { transaction: t }),
        queryInterface.dropTable('Sequelize', { transaction: t })
      ])
    })
  }
}
