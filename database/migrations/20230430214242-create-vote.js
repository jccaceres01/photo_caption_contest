'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Votes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      vote: {
        type: Sequelize.INTEGER
      },
      caption_id: {
        type: Sequelize.INTEGER,
        references: { model: 'Captions', key: 'id' }
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }, {
      uniqueKeys: {
        unique_votes_users: {
          fields: ['vote', 'caption_id', 'user_id']
        }
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Votes');
  }
};
