import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import { makeStyles } from "@material-ui/core/styles";
import {
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  FormLabel,
  Button,
  Grid,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
  separator: {
    marginTop: theme.spacing(2),
  },
}));

const SearchForm = ({ getBooks }) => {
  const classes = useStyle();
  const [disableButton, setDisableButton] = React.useState(false);
  const [error, setError] = React.useState({
    isError: false,
    msg: "",
  });

  const [formValues, setFormValues] = React.useState({
    searchValue: "",
    searchCriteria: "isbn",
  });

  const handleChange = (event) => {
    const previousValues = {
      ...formValues,
      [event.target.name]: event.target.value,
    };
    setFormValues(previousValues);
  };

  const handleValidation = (e) => {
    e.preventDefault();
    if (formValues.searchValue.length === 0) {
      setError({
        isError: true,
        msg: "El campo no puede estar vacío",
      });
    } else if (
      !formValues.searchValue.match(
        /^[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[0-9a-zA-ZÀ-ÿ\u00f1\u00d1]+$/
      )
    ) {
      setError({
        isError: true,
        msg: "Realice una búsqueda válida",
      });
    } else {
      setError({
        isError: false,
        msg: "",
      });
      setDisableButton(true);
      getBooks(formValues, setDisableButton);
    }
  };

  return (
    <form onSubmit={handleValidation} noValidate>
      <FormControl fullWidth>
        <TextField
          name="searchValue"
          label="Buscar"
          placeholder="Ej. La Ilíada"
          fullWidth
          variant="filled"
          error={error.isError}
          helperText={error.isError ? error.msg : null}
          onChange={handleChange}
          value={formValues.searchValue}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlinedIcon />
              </InputAdornment>
            ),
          }}
          required
        />
        <div className={classes.separator}>
          <FormLabel>Criterio de búsqueda</FormLabel>
          <RadioGroup
            aria-label="criterio de busqueda"
            name="searchCriteria"
            onChange={handleChange}
            value={formValues.searchCriteria}
            row
          >
            <FormControlLabel value="isbn" control={<Radio />} label="ISBN" />
            <FormControlLabel
              value="title"
              control={<Radio />}
              label="Título"
            />
            <FormControlLabel
              value="author"
              control={<Radio />}
              label="Autor"
            />
            <FormControlLabel value="type" control={<Radio />} label="Tipo" />
          </RadioGroup>
        </div>
        <Grid container justify="center">
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={disableButton}
              className={classes.separator}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
};

export default SearchForm;
