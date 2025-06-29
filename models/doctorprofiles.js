"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DoctorProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association
      DoctorProfile.belongsTo(models.User, {
        foreignKey: "userId", // 👈 Sequelize will map this to user_id in the DB
        as: "doctor",
      });
      DoctorProfile.hasMany(models.Appointment, { foreignKey: "doctorId" });
      DoctorProfile.hasMany(models.Queue, {
        foreignKey: "doctorId",
        as: "queue",
      });
    }
  }
  DoctorProfile.init(
    {
      specialization: DataTypes.STRING,
      availableFrom: DataTypes.TIME,
      availableTo: DataTypes.TIME,
      slotDurationInMinutes: DataTypes.INTEGER,
      userId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "DoctorProfile",
      tableName: "DoctorProfiles",
      underscored: true,
    }
  );
  return DoctorProfile;
};
