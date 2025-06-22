"use strict";
const path = require("path");
const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const filePath = path.resolve(
      __dirname,
      "../sample-data/docter-profiles.json"
    );
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    await queryInterface.bulkInsert("DoctorProfiles", data, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("DoctorProfiles", null, {});
  },
};
