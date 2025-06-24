"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Appointment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Appointment.belongsTo(models.DoctorProfile, {
        foreignKey: "doctorId",
        as: "doctor",
      });

      Appointment.belongsTo(models.User, {
        foreignKey: "patientId",
        as: "patient",
      });
      Appointment.hasOne(models.Queue, {
        foreignKey: "appointmentId",
        as: "queue",
      });
    }
  }
  Appointment.init(
    {
      slotTime: DataTypes.DATE,
      status: DataTypes.STRING,
      notes: DataTypes.STRING,
      doctorId: DataTypes.UUID,
      patientId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Appointment",
      underscored: true,
    }
  );
  return Appointment;
};
