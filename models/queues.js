"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Queue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Queue.belongsTo(models.Appointment, {
        foreignKey: "appointmentId",
        as: "appointment",
      });

      // Queue belongs to one DoctorProfile
      Queue.belongsTo(models.DoctorProfile, {
        foreignKey: "doctorId",
        as: "doctor",
      });

      Queue.hasMany(models.QueueLog, {
        foreignKey: "queueId",
        as: "logs",
      });
    }
  }
  Queue.init(
    {
      position: DataTypes.NUMBER,
      status: DataTypes.STRING,
      status: DataTypes.STRING,
      actualStartTime: DataTypes.DATE,
      actualEndTime: DataTypes.DATE,
      appointmentId: DataTypes.UUID,
      doctorId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Queue",
      underscored: true,
    }
  );
  return Queue;
};
