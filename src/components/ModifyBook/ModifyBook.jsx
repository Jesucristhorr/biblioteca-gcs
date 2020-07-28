import React from "react";
import Header from "../Header/Header";
import BookModifyForm from "../BookModifyForm/BookModifyForm";

class ModifyBook extends React.Component {
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
        <BookModifyForm book={this.props.location.state.book} />
      </React.Fragment>
    );
  }
}

export default ModifyBook;
