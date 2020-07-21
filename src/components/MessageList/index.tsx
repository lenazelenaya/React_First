import React from "react";
import Message from "../../types/message";
import PropTypes from "prop-types";
import MessageC from '../Message/index'
import ms from '../../services/messageService'

interface ListState {}

interface ListProps {
  user: string;
  messages: Message[];
  addLike: Function;
  editMessage: Function;
  deleteMessage: Function;
}

export default class MessageList extends React.Component<ListProps, ListState> {
  static propTypes = {
    user: PropTypes.string,
    messages: PropTypes.array,
    addLike: PropTypes.func,
    editMessage: PropTypes.func,
    deleteMessage: PropTypes.func,
  };
  constructor(props: ListProps){
    super(props);
  }

  render() {
    return (
        <div className="message-list">
            {ms.groupByDate(this.props.messages).map((groupsByDate, id) => (
                <div key={id}>
                <div className="divider">{groupsByDate.date}</div>
                {groupsByDate.messages.map((message: Message, id: string) => (
                    <MessageC
                        id = {id}
                        user = {this.props.user}
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