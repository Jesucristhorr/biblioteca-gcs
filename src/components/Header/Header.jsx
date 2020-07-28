import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import MenuGroupButton from "../MenuGroupButton/MenuGroupButton";
import HeaderHideOnScroll from "./HeaderHideOnScroll";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
}));

const Header = (props) => {
  const classes = useStyles();
  return (
    <HeaderHideOnScroll {...props}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" noWrap>
            {props.title}
          </Typography>
          <div className={classes.grow} />
          <MenuGroupButton />
        </Toolbar>
      </AppBar>
    </HeaderHideOnScroll>
  );
};

export default Header;
