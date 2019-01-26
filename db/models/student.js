'use strict';

const Sequelize = require('sequelize');
const db = require('../db');

const Student = db.define(
  'student',
  {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    hooks: {
      beforeCreate: student => {
        student.firstName =
          student.firstName.slice(0, 1).toUpperCase() +
          student.firstName.slice(1);
        student.lastName =
          student.lastName.slice(0, 1).toUpperCase() +
          student.lastName.slice(1);
      },
    },
  }
);
module.exports = Student;
