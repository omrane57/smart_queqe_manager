"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DoctorProfiles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association
      DoctorProfiles.belongsTo(models.User, {
        foreignKey: "userId", // 👈 Sequelize will map this to user_id in the DB
        as: "doctor",
      });
      DoctorProfiles.hasMany(models.Appointment, { foreignKey: "doctorId" });
      DoctorProfiles.hasMany(models.Queue, {
        foreignKey: "doctorId",
        as: "queue",
      });
    }
  }
  DoctorProfiles.init(
    {
      specialization: DataTypes.STRING,
      availableFrom: DataTypes.DATE,
      availableTo: DataTypes.DATE,
      slotDurationInMinutes: DataTypes.NUMBER,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "DoctorProfiles",
      underscored: true,
    }
  );
  return DoctorProfiles;
};
