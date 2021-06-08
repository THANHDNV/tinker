'use strict';
const { name, internet, date, datatype } = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
		const users = [];

		const fromDate = new Date();
		fromDate.setFullYear(fromDate.getFullYear() - 18);

		const toDate = new Date();
		toDate.setFullYear(toDate.getFullYear() - 60);
		console.log(fromDate, toDate)

		for (let i = 0; i < 1000; i++) {
			users.push({
				id: datatype.uuid(),
				firstName: name.firstName(),
				lastName: name.lastName(),
				picture: internet.avatar(),
				dateOfBirth: date.between(fromDate, toDate)
			});
		}

		await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
