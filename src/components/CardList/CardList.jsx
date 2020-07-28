import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  Grid,
} from "@material-ui/core";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  paragraphHeight: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 3,
  },
  deleteButton: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
  },
  updateButton: {
    backgroundColor: theme.palette.warning.main,
    color: theme.palette.warning.contrastText,
  },
  links: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const CardList = ({ book }) => {
  const classes = useStyle();
  const { isbn_libro, titulo_libro, autor_libro, sinop_libro } = book;
  return (
    <Card>
      <Link
        to={{ pathname: `/books/${isbn_libro}`, state: { book } }}
        className={classes.links}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            alt="book-cover"
            height="140"
            image={`http://covers.openlibrary.org/b/isbn/${isbn_libro}-L.jpg`}
            title="Random image"
          />
          <CardContent>
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
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Grid container justify="space-evenly">
          <Link
            to={{ pathname: `/books/modify/${isbn_libro}`, state: { book } }}
            className={classes.links}
          >
            <Button
              variant="contained"
              size="small"
              className={classes.updateButton}
              startIcon={<EditOutlinedIcon />}
            >
              Modificar
            </Button>
          </Link>
        </Grid>
      </CardActions>
    </Card>
  );
};

export default CardList;
