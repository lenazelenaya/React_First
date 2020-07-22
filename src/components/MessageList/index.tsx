import React from "react";
import Message from "../../types/message";
import PropTypes from "prop-types";
import MessageC from '../Message/index'
import ms from '../../services/messageService'

import './index.css'

interface ListState {}

interface ListProps {
  messages: Message[];
  addLike: Function;
  editMessage: Function;
  deleteMessage: Function;
}

export default class MessageList extends React.Component<ListProps, ListState> {
  static propTypes = {
    messages: PropTypes.array,
    addLike: PropTypes.func,
    editMessage: PropTypes.func,
    deleteMessage: PropTypes.func,
  };

  render() {
    return (
        <div className="message-list">
            {ms.groupByDate(this.props.messages).map((groupsByDate) => (
                <div className="message-list-group">
                  <div className="separator">{groupsByDate.date}</div>
                  {groupsByDate.messages.map((message: Message, id: string) => (
                      <MessageC
                          id = {id}
                          message = {message}
                          addLike = {this.props.addLike}
                          editMessage = {this.props.editMessage}
                          deleteMessage = {this.props.deleteMessage}
                      />
                  ))}
                </div>
            ))}
        </div>
    )
  }
}