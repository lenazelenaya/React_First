import React from "react";
import Message from "../../types/message";
import PropTypes from "prop-types";
import MessageC from "../Message/index";
import ms from "../../services/messageService";
import cs from "../../services/chatService";

import "./index.css";

interface ListState {}

interface ListProps {
  messages: Message[];
  editMessage: Function;
  deleteMessage: Function;
}

export default class MessageList extends React.Component<ListProps, ListState> {
  static propTypes = {
    messages: PropTypes.array,
    editMessage: PropTypes.func,
    deleteMessage: PropTypes.func,
  };

  render() {
    return (
      <div className="message-list" id="list">
        {ms.groupByDate(this.props.messages).map((groupsByDate, id) => (
          <div className="message-list-group" key={id}>
            <div className="separator">{groupsByDate.date}</div>
            {groupsByDate.messages.map((message: Message, id: string) => (
              <MessageC
                key={id}
                message={message}
                editMessage={this.props.editMessage}
                deleteMessage={this.props.deleteMessage}
              />
            ))}
          </div>
        ))}
      </div>
    );
    
  }
}
