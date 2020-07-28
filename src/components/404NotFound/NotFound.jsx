import React from "react";
import { makeStyles, Grid, Typography, Button } from "@material-ui/core";
import Header from "../Header/Header";
import { Link } from "react-router-dom";

const useStyle = makeStyles((theme) => ({
  parentContainer: {
    padding: theme.spacing(4),
  },
  gridContainer: {
    minHeight: "86vh",
  },
  links: {
    textDecoration: "none",
    color: "inherit",
  },
}));

const NotFound = () => {
  const classes = useStyle();
  return (
    <React.Fragment>
      <Header title="Biblioteca virtual" />
      <div className={classes.parentContainer}>
        <Grid
          container
          justify="center"
          alignItems="center"
          className={classes.gridContainer}
          direction="column"
          spacing={2}
        >
          <Grid item>
            <Typography variant="h3" component="h1" align="center">
              Error 404
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="h5" component="h2" gutterBottom align="center">
              La página a la que intentó acceder no se encuentra
            </Typography>
          </Grid>
          <Grid item>
            <Link to={{ pathname: "/" }} className={classes.links}>
              <Button size="large" color="secondary">
                Regresar a inicio
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default NotFound;
