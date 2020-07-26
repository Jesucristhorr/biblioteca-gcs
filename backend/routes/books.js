/**
 * Books router /books
 * @author Jesus Moreira
 */

const router = require("express").Router();
const { sequelize } = require("../config/db");
const { Op } = require("sequelize");

const Book = sequelize.models.TMAELIBROBIBLIO;

// GET books/
router.route("/").get(async (req, res) => {
  try {
    const books = await Book.findAll();
    res.status(200).json({
      status: "ok",
      books,
    });
  } catch (err) {
    res.status(500).json({
      status: "server error",
      msg: err,
    });
  }
});

// POST books/
router.route("/").post(async (req, res) => {
  try {
    const newBook = Book.build(req.body);
    const result = await newBook.save();
    res.status(200).json({
      status: "ok",
      msg: `Book inserted successfully. Its ISBN is: ${result.getDataValue(
        "isbn_libro"
      )}`,
    });
  } catch (err) {
    if (
      err.name === "SequelizeDatabaseError" ||
      err.name === "SequelizeValidationError"
    ) {
      res.status(400).json({
        status: "bad request",
        msg: "Request body is invalid",
        err,
      });
    } else {
      res.status(500).json({
        status: "server error",
        msg: err,
      });
    }
  }
});

// PUT books/
router.route("/").put(async (req, res) => {
  try {
    const isbn = req.body.isbn_libro;
    const values = req.body;
    if (!isbn) {
      res.status(400).json({
        status: "bad request",
        msg: "The request body doesn't have isbn_libro",
      });
    } else {
      const result = await Book.update(values, {
        where: {
          isbn_libro: isbn,
        },
      });

      if (result[0] === 0) {
        res.status(404).json({
          status: "not found",
          msg: "The Book doesn't exist",
        });
      } else {
        res.status(200).json({
          status: "ok",
          msg: "The Book has been modified successfully",
        });
      }
    }
  } catch (err) {
    if (
      err.name === "SequelizeDatabaseError" ||
      err.name === "SequelizeValidationError"
    ) {
      res.status(400).json({
        status: "bad request",
        msg: "Request body is invalid or the isbn is invalid",
        err,
      });
    } else {
      res.status(500).json({
        status: "server error",
        msg: err,
      });
    }
  }
});

// DELETE books/
router.route("/").delete(async (req, res) => {
  try {
    const isbn = req.body.isbn_libro;
    if (!isbn) {
      res.status(400).json({
        status: "bad request",
        msg: "The request body doesn't have isbn_libro",
      });
    } else {
      const result = await Book.destroy({
        where: {
          isbn_libro: isbn,
        },
      });

      if (result === 0) {
        res.status(404).json({
          status: "not found",
          msg: "The Book doesn't exist",
        });
      } else {
        res.status(200).json({
          status: "ok",
          msg: "The Book has been deleted successfully",
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "server error",
      msg: err,
    });
  }
});

// GET books/isbn
router.route("/isbn").get(async (req, res) => {
  try {
    const isbn = req.body.isbn_libro;
    if (!isbn) {
      res.status(400).json({
        status: "bad request",
        msg: "The request body doesn't have isbn_libro",
      });
    } else {
      const book = await Book.findByPk(isbn);

      if (book === null) {
        res.status(404).json({
          status: "not found",
          msg: "The Book doesn't exist",
        });
      } else {
        res.status(200).json({
          status: "ok",
          book,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "server error",
      msg: err,
    });
  }
});

// GET books/author
router.route("/author").get(async (req, res) => {
  try {
    const author = req.body.autor_libro;
    if (!author) {
      res.status(400).json({
        status: "bad request",
        msg: "The request body doesn't have autor_libro",
      });
    } else {
      const books = await Book.findAll({
        where: {
          autor_libro: {
            [Op.substring]: author,
          },
        },
      });

      if (books.length === 0) {
        res.status(404).json({
          status: "not found",
          msg: "There are no books from that author",
        });
      } else {
        res.status(200).json({
          status: "ok",
          books,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "server error",
      msg: err,
    });
  }
});

// GET books/type
router.route("/type").get(async (req, res) => {
  try {
    const type = req.body.tipo_libro;
    if (!type) {
      res.status(400).json({
        status: "bad request",
        msg: "The request body doesn't have tipo_libro",
      });
    } else {
      const books = await Book.findAll({
        where: {
          tipo_libro: {
            [Op.substring]: type,
          },
        },
      });

      if (books.length === 0) {
        res.status(404).json({
          status: "not found",
          msg: "There are no books on that type",
        });
      } else {
        res.status(200).json({
          status: "ok",
          books,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "server error",
      msg: err,
    });
  }
});

// GET books/title
router.route("/title").get(async (req, res) => {
  try {
    const title = req.body.titulo_libro;
    if (!title) {
      res.status(400).json({
        status: "bad request",
        msg: "The request body doesn't have titulo_libro",
      });
    } else {
      const books = await Book.findAll({
        where: {
          titulo_libro: {
            [Op.substring]: title,
          },
        },
      });

      if (books.length === 0) {
        res.status(404).json({
          status: "not found",
          msg: "There are no books with that name",
        });
      } else {
        res.status(200).json({
          status: "ok",
          books,
        });
      }
    }
  } catch (err) {
    res.status(500).json({
      status: "server error",
      msg: err,
    });
  }
});

module.exports = router;
