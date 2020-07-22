import React from "react";
import Message from "../types/message";
import cs from "../services/chatService";
import MessageList from "../components/MessageList";
import Spinner from "../components/Spinner";
import ChatHeader from "../components/ChatHeader/index";
import MessageInput from "../components/MessageInput/index";
import MainHeader from "../components/MainHeader/index";
import Footer from "../components/Footer/index";

import "./chat.css";

interface ChatState {
  isLoading: boolean;
  modalOn: boolean;
  messages?: Message[];
  name: string;
  participants?: number;
  messageCount?: number;
  lastMessage?: string;
}

interface ChatProps {}

class Chat extends React.Component<ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
    this.state = {
      name: "LOGO",
      isLoading: true,
      modalOn: false,
    };
    this.addLike = this.addLike.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    //this.editMessage = this.editMessage.bind(this);
  }

  componentDidMount() {
    cs.loadData().then(({ messages, participants, messageCount }) => {
      this.setState({
        isLoading: false,
        modalOn: false,
        messages: messages,
        participants,
        messageCount: messageCount,
        lastMessage: messages[messages.length - 1].timeShow,
      });
    });
  }

  addLike(message: Message) {
    const messages = this.state.messages;
    for (let i = 0; i < messages!.length; i++) {
      if (messages![i].id === message.id) {
        if (messages![i].likes === 1) messages![i].likes = 0;
        else messages![i].likes = 1;
      }
    }
    this.setState({ messages });
  }

  addMessage(text: string) {
    if (text) {
      const messages = this.state.messages;
      const date = new Date();
      messages!.push({
        id: "17",
        text,
        user: "You",
        createdAt: date,
        timeShow: cs.getTimeShow(date),
      });
      const count = this.state.messageCount! + 1;
      const participants = cs.getParticipantsCount(messages);

      this.setState({
        messages,
        messageCount: count,
        lastMessage: cs.getTimeShow(date),
        participants,
      });
    }
  }

  deleteMessage(message: Message) {
    const messages = this.state.messages;
    for (let i = 0; i < messages!.length; i++) {
      if (messages![i].id === message.id) {
        messages![i].text = "This message has been deleted";
      }
    }
    const c = this.state.messageCount! - 1;
    this.setState({ messages, messageCount: c });
  }

  editMessage(message: Message) {
    const messages = this.state.messages;
    for (let i = 0; i < messages!.length; i++) {
      if (messages![i].id === message.id) {
      }
    }

    this.setState({ messages, modalOn: true });
  }

  render() {
    return (
      <div className="chat-wrapper">
        <MainHeader name={this.state.name!} />
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <div className="chat-window">
            <ChatHeader
              name={this.state.name! + "-chat"}
              participants={this.state.participants!}
              messageCount={this.state.messageCount!}
              lastMessage={this.state.lastMessage!}
            />
            <MessageList
              messages={this.state.messages!}
              addLike={this.addLike}
              deleteMessage={this.deleteMessage}
              editMessage={this.editMessage}
            />
            <MessageInput addMessage={this.addMessage} />
          </div>
        )}
        <Footer />
      </div>
    );
  }
}
export default Chat;
