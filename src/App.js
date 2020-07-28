import React, { useState } from "react";
import Header from "./components/Header/Header";
import SearchForm from "./components/Search/SearchForm";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CardList from "./components/CardList/CardList";
import { Typography } from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(4),
  },
  cardContainer: {
    padding: theme.spacing(4),
  },
}));

const api = "https://api-biblioteca-gcs.herokuapp.com/books/";

function App() {
  const classes = useStyle();
  const [search, setSearch] = useState(false);
  const [books, setBooks] = useState([]);

  const getBooks = async (values, setDisableButton) => {
    setSearch(false);
    const api_url = `${api}${values.searchCriteria}/${values.searchValue}`;

    const api_call = await fetch(api_url, {
      method: "GET",
    });

    const data = await api_call.json();

    if (data.status === "ok" && values.searchCriteria === "isbn") {
      setBooks([data.book]);
      setSearch(true);
      setDisableButton(false);
    } else if (data.status === "ok") {
      setBooks(data.books);
      setSearch(true);
      setDisableButton(false);
    } else {
      setBooks([]);
      setSearch(true);
      setDisableButton(false);
    }
  };
  return (
    <div>
      <Header title="Biblioteca virtual" />
      <Grid
        container
        alignContent="center"
        alignItems="center"
        justify="center"
        className={classes.container}
      >
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <SearchForm getBooks={getBooks} />
        </Grid>
      </Grid>
      <div className={classes.cardContainer}>
        <Grid
          container
          alignContent="center"
          alignItems="center"
          justify="center"
          wrap="wrap"
          spacing={4}
        >
          {search && books.length > 0 ? (
            books.map((book) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                xl={3}
                key={book.isbn_libro}
              >
                <CardList book={book} />
              </Grid>
            ))
          ) : search ? (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
              <Typography
                variant="h5"
                component="h2"
                gutterBottom
                align="center"
              >
                No se encontraron resultados
              </Typography>
            </Grid>
          ) : null}
        </Grid>
      </div>
    </div>
  );
}

export default App;
