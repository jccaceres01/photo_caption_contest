'use strict';
const { Caption, User } = require('../../models');

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
    const captions = await Caption.findAll();
    const users = await User.findAll();

    for (let i = 0; i < captions.length; i++) {
      for (let j = 0; j < users.length; j++) {
        const makeVote = Math.floor(Math.random() * 2);
        if (makeVote) {
          await queryInterface.bulkInsert('Votes', [{
            vote: Math.ceil(Math.random() * 5),
            caption_id: captions[i].id,
            user_id: users[j].id
          }]);
        }
      }
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Votes', null, {});
  }
};
