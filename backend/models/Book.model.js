/**
 * Book model
 * @author Jesus Moreira
 */

const { DataTypes } = require("sequelize");

const Book = {
  isbn_libro: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    validate: {
      max: 9999999999,
      min: 1000000000,
    },
  },
  titulo_libro: {
    type: DataTypes.STRING(200),
    validate: {
      notEmpty: true,
    },
  },
  autor_libro: {
    type: DataTypes.STRING(100),
    validate: {
      notEmpty: true,
    },
  },
  editorial_libro: {
    type: DataTypes.STRING(100),
    validate: {
      notEmpty: true,
    },
  },
  tipo_libro: {
    type: DataTypes.ENUM,
    values: [
      "cientifico",
      "literatura",
      "biografias",
      "matematicas",
      "idiomas",
      "computacion",
    ],
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  fechPubli_libro: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  fechActuali_libro: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  idioma_libro: {
    type: DataTypes.ENUM,
    values: ["español", "ingles"],
    allowNull: false,
    validate: {
      notNull: true,
    },
  },
  numPag_libro: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull: true,
      min: 1,
      max: 9999,
    },
  },
  sinop_libro: {
    type: DataTypes.STRING(350),
    validate: {
      notEmpty: true,
    },
  },
};

module.exports = Book;
