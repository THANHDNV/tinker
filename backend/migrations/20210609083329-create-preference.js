'use strict';
const { DataTypes } = require('sequelize')
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Preferences', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
				type: DataTypes.STRING,
				allowNull: false,
				references: { model: 'Users', key: 'id' }
			},
			targetId: {
				type: DataTypes.STRING,
				allowNull: false,
				references: { model: 'Users', key: 'id' }
			},
			isLiked: {
				type: DataTypes.BOOLEAN,
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

		await queryInterface.addConstraint('Preferences', {
			type: 'unique',
			fields: ['userId', 'targetId'],
			name: 'compositeIndex'
		});
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Preferences');
  }
};