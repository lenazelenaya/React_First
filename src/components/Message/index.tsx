import React from "react";
import Message from "../../types/message";
import PropTypes from "prop-types";
import ms from "../../services/messageService";
import InputMessage from "./InputMessage";
import OutputMessage from "./OutputMessage";

import "./index.css";

interface MessageProps {
  message: Message;
  editMessage: Function;
  deleteMessage: Function;
}
interface MessageState {}

export default class MessageC extends React.Component<
  MessageProps,
  MessageState
> {
  static propTypes = {
    message: PropTypes.object,
    editMessage: PropTypes.func,
    deleteMessage: PropTypes.func,
  };

  shouldComponentUpdate(nextProps: MessageProps) {
    if (
      nextProps.deleteMessage === this.props.deleteMessage &&
      nextProps.editMessage === this.props.editMessage &&
      nextProps.message === this.props.message
    ) {
      return false;
    } else return true;
  }

  render() {
    return ms.isYourMessage(this.props.message) ? (
      <OutputMessage
        message={this.props.message}
        deleteMessage={this.props.deleteMessage}
        editMessage={this.props.editMessage}
      />
    ) : (
      <InputMessage message={this.props.message} />
    );
  }
}
