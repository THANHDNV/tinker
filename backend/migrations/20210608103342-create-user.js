'use strict';
const { DataTypes } = require('sequelize')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        type: Sequelize.STRING
      },
			firstName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			lastName: {
				type: DataTypes.STRING,
				allowNull: false
			},
			picture: {
				type: DataTypes.TEXT,
				allowNull: false
			},
			dateOfBirth: {
				type: DataTypes.DATE,
				allowNull: false
			},
      createdAt: {
        type: "TIMESTAMP",
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: "TIMESTAMP",
				defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};