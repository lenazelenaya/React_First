import React from "react";
import Message from "../../types/message";
import PropTypes from "prop-types";

interface InputProps {
  message: Message;
}

interface InputState {
  likes: number;
}

export default class InputMessage extends React.Component<
  InputProps,
  InputState
> {
  static propTypes = {
    message: PropTypes.object,
  };
  constructor(props: InputProps) {
    super(props);
    this.state = {
      likes: 0,
    };
    this.addLike = this.addLike.bind(this);
  }

  addLike() {
    let likes = this.state.likes;
    this.setState({ likes: likes ? 0 : 1 });
  }

  render() {
    const likes = this.state.likes;
    return (
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
            <div className="message-like action" onClick={() => this.addLike()}>
              <span className="like">{likes ? "You like this" : "Like?"}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
