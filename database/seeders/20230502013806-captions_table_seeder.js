'use strict';
const { faker } = require('@faker-js/faker');
const { Photo, User } = require('../../models');
const { randomNumberWithZero } = require('../../utils/randomNumber');

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
    const styles = ['style1', 'style2', 'style3'];

    for (let i = 0; i < 30; i++) {
      const rndUserId = await User.findOne({ order: [Sequelize.fn('random')] });
      const rndPhotoId = await Photo.findOne({ order: [Sequelize.fn('random')] });

      await queryInterface.bulkInsert('Captions', [{
        caption: faker.lorem.sentence(10),
        style: styles[randomNumberWithZero(2)],
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
