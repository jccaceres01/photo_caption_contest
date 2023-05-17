'use strict';
const fs = require('fs');
const path = require('path');
const { User } = require('../../models');
const { v4: uuid } = require('uuid');
const { randomNumber, randomNumberWithZero } = require('../../utils/randomNumber');

const RESOURCE_PATH = path.join(__dirname, '../../', 'storage/resources');
const IMAGES_PATH = path.join(__dirname, '../../', 'storage/images');

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
    const users = await User.findAll();
    // Delete all images from images before copy
    fs.readdir(IMAGES_PATH, (err, files) => {
      if (err) throw err;
      files.forEach(file => fs.unlinkSync(path.resolve(IMAGES_PATH, file)));
    });

    users.forEach(async user => {
      const testImages = fs.readdirSync(RESOURCE_PATH);
      for (let i = 0; i < randomNumber(5); i++) {
        const fileName = `${uuid()}.jpg`;
        fs.copyFileSync(path.join(RESOURCE_PATH, testImages[randomNumberWithZero(4)]),
          path.join(IMAGES_PATH, fileName));
        const photo = {
          filename: fileName,
          user_id: user.id
        };

        await queryInterface.bulkInsert('Photos', [photo]);
      }
    });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    fs.readdir(IMAGES_PATH, (err, files) => {
      if (err) throw err;
      files.forEach(file => fs.unlinkSync(path.resolve(IMAGES_PATH, file)));
    });

    await queryInterface.bulkDelete('Photos', null, {});
  }
};
