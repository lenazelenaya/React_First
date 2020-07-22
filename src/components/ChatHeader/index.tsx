import React from "react";
import PropTypes from "prop-types";
import "./index.css";

interface headerState {}

interface headerProps {
  name: string;
  participants: number;
  messageCount: number;
  lastMessage: string;
}

export default class ChatHeader extends React.Component<
  headerProps,
  headerState
> {
  static prop = {
    name: PropTypes.string,
    participants: PropTypes.number,
    messages: PropTypes.number,
    lastMessage: PropTypes.string,
  };

  render() {
    return (
      <div className="chat-header">
        <div className="chat-name chat-header-div">{this.props.name}</div>
        <div className="chat-header-div chat-header-counts">
          <div className="participants-count">
            <span className="text">
              participants: {"      "}
              {this.props.participants}
            </span>
          </div>
          <div className="messages-count">
            <span className="text">
              messages: {"      "}
              {this.props.messageCount}
            </span>
          </div>
        </div>
        <div className="last-message chat-header-div">
          <span className="text">
            last message at:{"      "} {this.props.lastMessage}
          </span>
        </div>
      </div>
    );
  }
}
