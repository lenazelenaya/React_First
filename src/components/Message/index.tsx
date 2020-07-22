import React from "react";
import Message from "../../types/message";
import PropTypes from "prop-types";
import ms from "../../services/messageService";

interface MessageProps {
  id: string;
  message: Message;
  addLike: Function;
  editMessage: Function;
  deleteMessage: Function;
}
interface MessageState {}

export default class MessageC extends React.Component<
  MessageProps,
  MessageState
> {
  constructor(props: MessageProps) {
    super(props);
    this.state = {
      likes: 0,
    };
  }

  static propTypes = {
    message: PropTypes.object,
    numberMessage: PropTypes.number,
    addLike: PropTypes.func,
    editMessage: PropTypes.func,
    deleteMessage: PropTypes.func,
  };

  yourMessage = (
    <div className="message-container">
      <div className="message-meta">
        <span className="message-date"></span>
        <span className="message-author">Your message</span>
      </div>
      <div className="message-text">{this.props.message.text}</div>
      <div className="actions">
        <div
          className="message-edit"
          onClick={() => this.props.editMessage(this.props.message)}
        >
          Edit
        </div>
        <div
          className="message-delete"
          onClick={() => this.props.deleteMessage(this.props.message.id)}
        >
          Delete
        </div>
      </div>
    </div>
  );

  notYourMessage = (
    <div className="message-container">
      <div className="message-avatar">
        <img className="avatar" src={this.props.message.avatar} alt="avatar" />
      </div>
      <div className="message-meta">
        <span className="message-date"></span>
        <span className="message-author">{this.props.message.user}</span>
      </div>
      <div className="message-text">{this.props.message.text}</div>
      <div className="actions">
        <div onClick={() => this.props.addLike(this.props.id)}>
          <span className="like">
            {this.props.message.likes ? this.props.message.likes : null}
          </span>
          <i className="fa fa-thumbs-up" aria-hidden="true"></i>
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
