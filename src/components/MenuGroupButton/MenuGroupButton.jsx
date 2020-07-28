import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import PostAddOutlinedIcon from "@material-ui/icons/PostAddOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "#ffffff",
    marginRight: theme.spacing(1),
  },
  links: {
    color: "inherit",
    textDecoration: "none",
  },
}));

const MenuGroupButton = () => {
  const classes = useStyles();
  return (
    <div>
      <Tooltip title="Buscar libros">
        <Link to={{ pathname: "/" }} className={classes.links}>
          <IconButton aria-label="buscar libro" className={classes.icon}>
            <SearchOutlinedIcon />
          </IconButton>
        </Link>
      </Tooltip>
      <Tooltip title="Agregar nuevo libro">
        <Link to={{ pathname: "/books/newBook" }} className={classes.links}>
          <IconButton
            arial-label="agregar nuevo libro"
            className={classes.icon}
          >
            <PostAddOutlinedIcon />
          </IconButton>
        </Link>
      </Tooltip>
    </div>
  );
};

export default MenuGroupButton;
