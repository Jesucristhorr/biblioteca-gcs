import React, { useState } from "react";
import {
  makeStyles,
  Button,
  Grid,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  TextField,
  Paper,
  Snackbar,
  Typography,
} from "@material-ui/core";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import Alert from "@material-ui/lab/Alert";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DateFnsUtils from "@date-io/date-fns";

const useStyle = makeStyles((theme) => ({
  parentContainer: {
    padding: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  button: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  },
}));

const api = "https://api-biblioteca-gcs.herokuapp.com/books/";

const BookModifyForm = ({ book }) => {
  const classes = useStyle();
  const [errors, setErrors] = useState({
    isbn: {
      isError: false,
      msg: "",
    },
    title: {
      isError: false,
      msg: "",
    },
    author: {
      isError: false,
      msg: "",
    },
    editor: {
      isError: false,
      msg: "",
    },
    pages: {
      isError: false,
      msg: "",
    },
    synopsis: {
      isError: false,
      msg: "",
    },
  });
  const [openSucess, setOpenSuccess] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const [form, setForm] = useState({
    fields: {
      isbn: book.isbn_libro,
      title: book.titulo_libro,
      author: book.autor_libro,
      editor: book.editorial_libro,
      type: book.tipo_libro,
      publishDate: new Date(book.fechPubli_libro),
      updateDate: new Date(book.fechActuali_libro),
      language: book.idioma_libro,
      synopsis: book.sinop_libro,
      pages: book.numPag_libro,
    },
  });

  const putBook = async () => {
    setDisableButton(true);

    const newBody = {
      isbn_libro: Number(form.fields.isbn),
      titulo_libro: form.fields.title.trimStart(),
      autor_libro: form.fields.author.trimStart(),
      editorial_libro: form.fields.editor.trimStart(),
      tipo_libro: form.fields.type,
      fechPubli_libro: form.fields.publishDate.toISOString(),
      fechActuali_libro: form.fields.updateDate.toISOString(),
      idioma_libro: form.fields.language,
      numPag_libro: Number(form.fields.pages),
      sinop_libro: form.fields.synopsis.trimStart(),
    };

    const api_call = await fetch(api, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBody),
    });

    const result = await api_call.json();

    if (result.status === "ok") {
      setOpenSuccess(true);
      setDisableButton(false);
    } else {
      setOpenError(true);
      setDisableButton(false);
    }
  };

  const handleValidation = (e) => {
    e.preventDefault();
    let finalObject = {};
    if (!form.fields.isbn.match(/^[0-9]{10}$/)) {
      finalObject.isbn = {
        isError: true,
        msg: "Ingrese un ISBN-10 válido",
      };
    } else {
      finalObject.isbn = {
        isError: false,
        msg: "",
      };
    }

    if (
      !form.fields.title.match(/^[0-9a-zA-ZÀ-ÿ.,;«»"\u00f1\u00d1\s]{4,84}$/)
    ) {
      finalObject.title = {
        isError: true,
        msg: "El título debe tener más de 4 y menos de 84 caracteres",
      };
    } else {
      finalObject.title = {
        isError: false,
        msg: "",
      };
    }

    if (
      !form.fields.author.match(/^[0-9a-zA-ZÀ-ÿ.,;«»"\u00f1\u00d1\s]{4,44}$/)
    ) {
      finalObject.author = {
        isError: true,
        msg: "El autor debe tener más de 4 y menos de 44 caracteres",
      };
    } else {
      finalObject.author = {
        isError: false,
        msg: "",
      };
    }

    if (
      !form.fields.editor.match(/^[0-9a-zA-ZÀ-ÿ.,;«»"\u00f1\u00d1\s]{4,44}$/)
    ) {
      finalObject.editor = {
        isError: true,
        msg: "La editorial debe tener más de 4 y menos de 44 caracteres",
      };
    } else {
      finalObject.editor = {
        isError: false,
        msg: "",
      };
    }

    if (!form.fields.pages.toString().match(/^[1-9]{1}[0-9]{0,2}$/)) {
      finalObject.pages = {
        isError: true,
        msg: "Ingrese un valor menor a 1000",
      };
    } else {
      finalObject.pages = {
        isError: false,
        msg: "",
      };
    }

    if (
      !form.fields.synopsis
        .toString()
        .match(/^[0-9a-zA-ZÀ-ÿ.,;«»"\u00f1\u00d1\s]{4,184}$/)
    ) {
      finalObject.synopsis = {
        isError: true,
        msg: "La sinopsis debe tener más de 4 y menos de 184 caracteres",
      };
    } else {
      finalObject.synopsis = {
        isError: false,
        msg: "",
      };
    }

    if (
      finalObject.pages.isError ||
      finalObject.author.isError ||
      finalObject.editor.isError ||
      finalObject.isbn.isError ||
      finalObject.title.isError ||
      finalObject.synopsis.isError
    ) {
      setErrors({
        ...errors,
        ...finalObject,
      });
    } else {
      setErrors({
        isbn: {
          isError: false,
          msg: "",
        },
        title: {
          isError: false,
          msg: "",
        },
        author: {
          isError: false,
          msg: "",
        },
        editor: {
          isError: false,
          msg: "",
        },
        pages: {
          isError: false,
          msg: "",
        },
        synopsis: {
          isError: false,
          msg: "",
        },
      });

      if (
        form.fields.publishDate.toString() !== "Invalid Date" &&
        form.fields.updateDate.toString() !== "Invalid Date" &&
        form.fields.publishDate <= new Date() &&
        form.fields.updateDate <= new Date()
      ) {
        putBook();
      }
    }
  };

  const handleChange = (e) => {
    const previousValues = {
      fields: { ...form.fields, [e.target.name]: e.target.value },
    };
    setForm(previousValues);
  };

  const handlePublishDateChange = (e) => {
    const previousValues = {
      fields: {
        ...form.fields,
        publishDate: e,
      },
    };

    setForm(previousValues);
  };

  const handleUpdateDateChange = (e) => {
    const previousValues = {
      fields: {
        ...form.fields,
        updateDate: e,
      },
    };

    setForm(previousValues);
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };
  return (
    <div className={classes.parentContainer}>
      <Snackbar
        open={openSucess}
        autoHideDuration={6000}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="success">
          Se modificó correctamente el libro
        </Alert>
      </Snackbar>
      <Snackbar
        open={openError}
        autoHideDuration={6000}
        onClose={handleCloseError}
      >
        <Alert onClose={handleCloseError} severity="error">
          Ocurrió un error inesperado al tratar de modificar el libro
        </Alert>
      </Snackbar>
      <Paper className={classes.paper} elevation={3}>
        <form onSubmit={handleValidation} noValidate>
          <Grid container justify="center" direction="column" spacing={2}>
            <Grid item>
              <Typography variant="h5" component="h2" noWrap align="center">
                Modificar
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                name="isbn"
                variant="outlined"
                fullWidth
                value={form.fields.isbn}
                onChange={handleChange}
                disabled={true}
                error={errors.isbn.isError}
                helperText={errors.isbn.isError ? errors.isbn.msg : null}
                label="ISBN"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="title"
                fullWidth
                variant="outlined"
                value={form.fields.title}
                onChange={handleChange}
                error={errors.title.isError}
                helperText={errors.title.isError ? errors.title.msg : null}
                label="Título"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="author"
                fullWidth
                variant="outlined"
                value={form.fields.author}
                onChange={handleChange}
                error={errors.author.isError}
                helperText={errors.author.isError ? errors.author.msg : null}
                label="Autor"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="editor"
                fullWidth
                variant="outlined"
                value={form.fields.editor}
                onChange={handleChange}
                error={errors.editor.isError}
                helperText={errors.editor.isError ? errors.editor.msg : null}
                label="Editorial"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="synopsis"
                fullWidth
                variant="outlined"
                multiline
                rowsMax={4}
                value={form.fields.synopsis}
                onChange={handleChange}
                error={errors.synopsis.isError}
                helperText={
                  errors.synopsis.isError ? errors.synopsis.msg : null
                }
                label="Sinopsis"
                required
              />
            </Grid>
            <Grid item>
              <TextField
                name="pages"
                fullWidth
                variant="outlined"
                value={form.fields.pages}
                onChange={handleChange}
                error={errors.pages.isError}
                helperText={errors.pages.isError ? errors.pages.msg : null}
                label="Nro de páginas"
                required
              />
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel id="type-label">Tipo</InputLabel>
                <Select
                  name="type"
                  labelId="type-label"
                  value={form.fields.type}
                  fullWidth
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="cientifico">Cientifico</MenuItem>
                  <MenuItem value="literatura">Literatura</MenuItem>
                  <MenuItem value="biografias">Biografías</MenuItem>
                  <MenuItem value="matematicas">Matemáticas</MenuItem>
                  <MenuItem value="idiomas">Idiomas</MenuItem>
                  <MenuItem value="computacion">Computación</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl>
                <InputLabel id="lang-label">Idiomas</InputLabel>
                <Select
                  name="language"
                  labelId="lang-label"
                  value={form.fields.language}
                  fullWidth
                  onChange={handleChange}
                  required
                >
                  <MenuItem value="ingles">Inglés</MenuItem>
                  <MenuItem value="español">Español</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="publishDate"
                  variant="inline"
                  format="dd/MM/yyyy"
                  fullWidth
                  margin="normal"
                  label="Fecha de publicación"
                  maxDate={new Date()}
                  value={form.fields.publishDate}
                  onChange={handlePublishDateChange}
                  required
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  name="updateDate"
                  variant="inline"
                  format="dd/MM/yyyy"
                  fullWidth
                  margin="normal"
                  label="Fecha de última actualización"
                  maxDate={new Date()}
                  value={form.fields.updateDate}
                  onChange={handleUpdateDateChange}
                  required
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Divider />
            <Grid item container justify="center">
              <Button
                type="submit"
                variant="contained"
                disabled={disableButton}
                className={classes.button}
                startIcon={<EditOutlinedIcon />}
              >
                Editar
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </div>
  );
};

export default BookModifyForm;
