const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// Define Lead model with appropriate fields and validations
const Lead = sequelize.define(
  "Lead",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: true },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { isEmail: true },
    },
    companySize: { type: DataTypes.STRING },
    jobTitle: { type: DataTypes.STRING },
    website: { type: DataTypes.STRING },
    message: { type: DataTypes.TEXT },
    score: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
  }
);

module.exports = Lead;
