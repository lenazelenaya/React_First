import React from "react";
import Message from "../../types/message";
import PropTypes from "prop-types";
import ms from "../../services/messageService";

import "./index.css";

interface MessageProps {
  id: string;
  message: Message;
  addLike: Function;
  editMessage: Function;
  deleteMessage: Function;
}
interface MessageState {}

class MessageC extends React.Component<
  MessageProps,
  MessageState
> {
  static propTypes = {
    message: PropTypes.object,
    numberMessage: PropTypes.number,
    addLike: PropTypes.func,
    editMessage: PropTypes.func,
    deleteMessage: PropTypes.func,
  };

  yourMessage = (
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

  notYourMessage = (
    <div className="message-container not-your-message">
      <div className="message-avatar">
        <div className="message-avatar-shadow">
          <img
            className="avatar"
            src={this.props.message.avatar}
            alt="avatar"
          />
        </div>
      </div>
      <div className="message-content">
        <div className="message-meta">
          <span className="message-date">{this.props.message.timeShow}</span>
          <span className="message-author">{this.props.message.user}</span>
        </div>
        <div className="message-text">{this.props.message.text}</div>
        <div className="actions">
          <button
            className="message-like action"
            onClick={() => this.props.addLike(this.props.id)}
          >
            {this.props.message.likes ? "You like this" : "Like?"}
          </button>
          <span className="like">
            {this.props.message.likes ? this.props.message.likes : null}{" "}
          </span>
        </div>
      </div>
    </div>
  );

  render() {
    return ms.isYourMessage(this.props.message)
      ? this.yourMessage
      : this.notYourMessage;
  }
}

export default MessageC;