'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require('../data/items.json')
    data.forEach(e => {
      delete e.authorId
      e.createdAt = e.updatedAt = new Date()
    });
    await queryInterface.bulkInsert('Items', data)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Items')
  }
};
