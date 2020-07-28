import React, { useState } from "react";
import Header from "./components/Header/Header";
import SearchForm from "./components/Search/SearchForm";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import CardList from "./components/CardList/CardList";

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
  const [books, setBooks] = useState([]);

  const getBooks = async (values) => {
    const api_url = `${api}${values.searchCriteria}/${values.searchValue}`;

    const api_call = await fetch(api_url, {
      method: "GET",
    });

    const data = await api_call.json();

    if (data.status === "ok" && values.searchCriteria === "isbn") {
      setBooks([data.book]);
    } else if (data.status === "ok") {
      setBooks(data.books);
    } else {
      setBooks([]);
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
          {books.map((book) => (
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
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default App;
