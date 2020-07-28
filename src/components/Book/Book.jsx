import React from "react";
import Header from "../Header/Header";
import BookDetails from "../BookDetails/BookDetails";

class Book extends React.Component {
  state = {
    activeBook: [],
  };
  componentDidMount = () => {
    if (!this.props.location.state) {
      this.props.history.push("/");
    } else {
      this.setState({ activeBook: this.props.location.state.book });
    }
  };
  render() {
    return (
      <React.Fragment>
        <Header title="Biblioteca virtual" />
        <BookDetails
          book={this.state.activeBook}
          history={this.props.history}
        />
      </React.Fragment>
    );
  }
}

export default Book;
