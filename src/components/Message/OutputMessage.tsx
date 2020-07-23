import React from "react";
import Message from "../../types/message";
import PropTypes from "prop-types";

interface OutputProps {
  message: Message;
  deleteMessage: Function;
  editMessage: Function;
}

interface OutputState {}

export default class InputMessage extends React.Component<
  OutputProps,
  OutputState
> {
  static propTypes = {
    message: PropTypes.object,
    deleteMessage: PropTypes.func,
    editMessage: PropTypes.func,
  };

  shouldComponentUpdate(nextProps: OutputProps) {
    if (
      nextProps.deleteMessage === this.props.deleteMessage &&
      nextProps.editMessage === this.props.editMessage &&
      nextProps.message === this.props.message
    ) {
      return false;
    } else return true;
  }

  render() {
    return (
      <div className="message-container your-message">
        <div className="message-content">
          <div className="message-meta">
            <span className="message-date"></span>
            <span className="message-author">Your message</span>
          </div>
          <div className="message-text">{this.props.message.text}</div>
          <div className="actions">
            <div
              className="message-edit action"
              onClick={() => this.props.editMessage(this.props.message)}
            >
              Edit
            </div>
            <div
              className="message-delete action"
              onClick={() => this.props.deleteMessage(this.props.message)}
            >
              Delete
            </div>
          </div>
        </div>
      </div>
    );
  }
}
