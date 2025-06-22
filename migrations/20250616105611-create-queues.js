"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Queues", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      position: {
        type: Sequelize.INTEGER,
      },
      status: {
        type: Sequelize.STRING,
      },
      actual_start_time: {
        type: Sequelize.DATE,
      },
      actual_end_time: {
        type: Sequelize.DATE,
      },
      appointment_id: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Appointments",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      doctor_id: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "DoctorProfiles",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Queues");
  },
};
