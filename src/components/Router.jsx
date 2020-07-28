import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import Book from "./Book/Book";
import NewBook from "./NewBook/NewBook";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/books/newBook" component={NewBook} exact />
      <Route path="/books/:isbn" component={Book} />
    </Switch>
  </BrowserRouter>
);

export default Router;
