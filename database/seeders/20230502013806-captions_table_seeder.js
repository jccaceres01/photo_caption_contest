'use strict';
const { faker } = require('@faker-js/faker');
const { Photo, User } = require('../../models');

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
    for (let i = 0; i < 10; i++) {
      const rndUserId = await User.findOne({ order: [Sequelize.fn('random')] });
      const rndPhotoId = await Photo.findOne({ order: [Sequelize.fn('random')] });

      await queryInterface.bulkInsert('Captions', [{
        caption: faker.lorem.sentence(10),
        photo_id: rndPhotoId.id,
        user_id: rndUserId.id
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
    await queryInterface.bulkDelete('Caption', null, {});
  }
};
