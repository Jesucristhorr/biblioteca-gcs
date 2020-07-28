import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import App from "../App";
import Book from "./Book/Book";
import NewBook from "./NewBook/NewBook";
import ModifyBook from "./ModifyBook/ModifyBook";
import NotFound from "./404NotFound/NotFound";

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={App} exact />
      <Route path="/books/newBook" component={NewBook} exact />
      <Route path="/books/:isbn" component={Book} exact />
      <Route path="/books/modify/:isbn" component={ModifyBook} exact />
      <Route path="*" component={NotFound} exact />
    </Switch>
  </BrowserRouter>
);

export default Router;
