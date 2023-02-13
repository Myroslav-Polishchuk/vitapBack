'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
        'Articles',
        'resume_keywords',
        {
          type: Sequelize.TEXT
        }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'Articles',
      'resume_keywords',
      {
        type: Sequelize.STRING
      }
  );
  }
};
