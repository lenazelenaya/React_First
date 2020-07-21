import React from "react";
import Message from "../../types/message";
import PropTypes from "prop-types";
import ms from '../../services/messageService'

interface MessageProps {
  user: string;
  id: string;
  message: Message;
  addLike: Function;
  editMessage: Function;
  deleteMessage: Function;
}
interface MessageState {}

class MessageC extends React.Component<MessageProps, MessageState> {
  constructor(props: MessageProps) {
    super(props);
    this.state = {
      likes: 0,
    };
  }

  static propTypes = {
    user: PropTypes.string,
    message: PropTypes.object,
    numberMessage: PropTypes.number,
    addLike: PropTypes.func,
    editMessage: PropTypes.func,
    deleteMessage: PropTypes.func,
  };

  usersMessage = (
    <div className="message-container">
        <div className="message-meta">
            <span className="message-date"></span>
            <span className="message-author">Your message</span>
        </div>
            <div className="message-text">{this.props.message.text}</div>
        <div className="actions">
            <div onClick={() => this.props.editMessage(this.props.message)}>
                Edit
            </div>
            <div onClick={() => this.props.deleteMessage(this.props.message.id)}>
                Delete
            </div>
        </div>
    </div>
);

notUsersMessage = (
    <div className="message-container">
        <div className="message-avatar">
            <img className="avatar" src={this.props.message.avatar} alt="ava" />
        </div>
        <div className="message-meta">
            <span className="message-date"></span>
            <span className="message-author">{this.props.message.user}</span>
        </div>
            <div className="message-text">{this.props.message.text}</div>
        <div className="actions">
            <div onClick={() => this.props.addLike(this.props.id)}>
                <span className="like">{this.props.message.likes ? this.props.message.likes : null}</span>
                <i className="fa fa-thumbs-up" aria-hidden="true"></i>
            </div>
        </div>
    </div>
);

  render() {
    return ms.isYourMessage(this.props.user, this.props.message) ? this.usersMessage : this.notUsersMessage;
  }
}
export default MessageC;
