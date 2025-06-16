"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class QueueLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      QueueLog.belongsTo(models.Queue, {
        foreignKey: "queueId",
        as: "queue",
      });
      QueueLog.belongsTo(models.User, {
        foreignKey: "changedBy",
        as: "changer",
      });
    }
  }
  QueueLog.init(
    {
      statusBefore: DataTypes.STRING,
      statusAfter: DataTypes.STRING,
      queueChangeReason: DataTypes.STRING,
      queueId: DataTypes.UUID,
      changedBy: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "QueueLog",
      underscored: true,
    }
  );
  return QueueLog;
};
