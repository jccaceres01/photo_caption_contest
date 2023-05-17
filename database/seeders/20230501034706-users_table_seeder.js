'use strict';
const { faker } = require('@faker-js/faker');
const { hashPassword } = require('../../utils/handlePassword');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const myHashedPass = await hashPassword('Password1');

    await queryInterface.bulkInsert('Users', [{
      name: 'Julio Caceres',
      email: 'jcesar01@hotmail.es',
      password: myHashedPass
    }]);

    for (let i = 0; i < 10; i++) {
      const userHashedPass = await hashPassword(faker.internet.password());

      await queryInterface.bulkInsert('Users', [{
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        password: userHashedPass
      }]);
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
