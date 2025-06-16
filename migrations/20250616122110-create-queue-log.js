"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("QueueLogs", {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      status_before: {
        type: Sequelize.STRING,
      },
      status_after: {
        type: Sequelize.STRING,
      },
      queue_change_reason: {
        type: Sequelize.STRING,
      },
      queue_id: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Queues",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      changed_by: {
        type: Sequelize.UUID,
        references: {
          key: "id",
          model: "Users",
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
    await queryInterface.dropTable("QueueLogs");
  },
};
