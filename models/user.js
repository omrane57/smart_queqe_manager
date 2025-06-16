"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association
      User.hasOne(models.DoctorProfile, {
        foreignKey: "userId",
        as: "doctorProfile", // Optional alias
      });
      User.hasMany(models.Appointment, {
        foreignKey: "patientId",
        as: "patientAppointments",
      });
      User.hasMany(models.QueueLog, {
        foreignKey: "changedBy",
        as: "queueLogs",
      });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
    }
  );
  return User;
};
