import React from "react";
import {
  Grid,
  makeStyles,
  Typography,
  Divider,
  Paper,
  Button,
  Snackbar,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import Alert from "@material-ui/lab/Alert";

const useStyle = makeStyles((theme) => ({
  parentContainer: {
    padding: theme.spacing(4),
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: "auto",
    display: "block",
    maxWidth: "100%",
    maxHeight: "100%",
  },
  paper: {
    padding: theme.spacing(2),
    margin: "auto",
    maxWidth: 500,
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  updateButton: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  },
  margin: {
    marginTop: theme.spacing(2),
  },
}));

const api = "https://api-biblioteca-gcs.herokuapp.com/books/";

const BookDetails = ({ book, history }) => {
  const classes = useStyle();
  const [openSucess, setOpenSuccess] = React.useState(false);
  const [disableButton, setDisableButton] = React.useState(false);
  const {
    isbn_libro,
    titulo_libro,
    autor_libro,
    sinop_libro,
    editorial_libro,
    tipo_libro,
    fechPubli_libro,
    fechActuali_libro,
    idioma_libro,
    numPag_libro,
  } = book;

  const deleteBook = async () => {
    setDisableButton(true);

    const api_call = await fetch(`${api}${isbn_libro}`, {
      method: "DELETE",
    });

    const result = await api_call.json();
    if (result.status === "ok") {
      setOpenSuccess(true);
      setTimeout(
        (h) => {
          h.push("/");
        },
        3000,
        history
      );
    } else {
      setDisableButton(false);
    }
  };

  const handleCloseSuccess = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccess(false);
  };
  return (
    <div className={classes.parentContainer}>
      <Snackbar
        open={openSucess}
        autoHideDuration={3000}
        onClose={handleCloseSuccess}
      >
        <Alert onClose={handleCloseSuccess} severity="info">
          Se eliminó correctamente el libro, en unos segundos regresará a la
          pantalla principal...
        </Alert>
      </Snackbar>
      <Paper className={classes.paper} elevation={3}>
        <Grid container spacing={2}>
          <Grid item>
            <div className={classes.image}>
              <img
                className={classes.img}
                alt="book-cover"
                src={`http://covers.openlibrary.org/b/isbn/${isbn_libro}-L.jpg`}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="h5" component="h2" noWrap>
                  {titulo_libro}
                </Typography>
                <Typography
                  gutterBottom
                  variant="caption"
                  color="textSecondary"
                  noWrap
                  component="p"
                >
                  por {autor_libro}
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.paragraphHeight}
                  color="textSecondary"
                  component="p"
                >
                  {sinop_libro}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={2} direction="column">
          <Grid item className={classes.margin}>
            <Typography variant="h6" component="h3" noWrap>
              Detalles del libro
            </Typography>
          </Grid>
          <Divider />
          <Grid item xs={12} sm container spacing={2} direction="column">
            <Grid item>
              <Typography variant="subtitle2" component="p">
                ISBN
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                {isbn_libro}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" component="p">
                Editorial
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                {editorial_libro}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" component="p">
                Tipo
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                {tipo_libro}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" component="p">
                Fecha de publicación
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                {fechPubli_libro}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" component="p">
                Última actualización
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                {fechActuali_libro}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" component="p">
                Idioma
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                {idioma_libro}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" component="p">
                Número de páginas
              </Typography>
              <Typography variant="caption" color="textSecondary" component="p">
                {numPag_libro}
              </Typography>
            </Grid>
            <Divider />
            <Grid
              item
              xs={12}
              sm
              container
              justify="space-evenly"
              direction="row"
              className={classes.margin}
            >
              <Button
                variant="contained"
                size="small"
                className={classes.updateButton}
                startIcon={<EditOutlinedIcon />}
              >
                Modificar
              </Button>
              <Button
                variant="contained"
                size="small"
                disabled={disableButton}
                onClick={deleteBook}
                className={classes.deleteButton}
                startIcon={<DeleteOutlinedIcon />}
              >
                Eliminar
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default BookDetails;
