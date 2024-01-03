"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          "advertisingMaterials",
          "thumbnail",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "advertisingMaterials",
          "brand",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          "advertisingMaterials",
          "typeOfMpdv",
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("advertisingMaterials", "thumbnail", {
        transaction: t,
      }),
      queryInterface.removeColumn("advertisingMaterials", "brand", {
        transaction: t,
      }),
      queryInterface.removeColumn("advertisingMaterials", "typeOfMpdv", {
        transaction: t,
      }),
    ]);
  },
};
