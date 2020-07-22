import React from "react";
import PropTypes from "prop-types";

import "./index.css";

interface InputState {
  typeMessage: string;
}

interface InputProps {
  addMessage: Function;
}

export default class MessageInput extends React.Component<
  InputProps,
  InputState
> {
  constructor(props: InputProps) {
    super(props);
    this.state = {
      typeMessage: "",
    };
    this.handleTyping = this.handleTyping.bind(this);
  }

  static propTypes = {
    addMessage: PropTypes.func,
  };

  handleTyping(event: React.FormEvent<HTMLInputElement>) {
    this.setState({ typeMessage: event.currentTarget.value });
  }

  render() {
    return (
      <div className="message-input">
        <form className="message-input-area">
          <input
            type="text"
            className="text-area"
            value={this.state.typeMessage}
            onChange={this.handleTyping}
          />
        </form>
        <button
          className="message-input-btn"
          onClick={() => this.props.addMessage(this.state.typeMessage)}
        >
          Send
        </button>
      </div>
    );
  }
}
