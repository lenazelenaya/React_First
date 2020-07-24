import React from "react";
import Message from "../types/message";
import cs from "../services/chatService";
import MessageList from "../components/MessageList";
import Spinner from "../components/Spinner";
import ChatHeader from "../components/ChatHeader/index";
import MessageInput from "../components/MessageInput/index";
import MainHeader from "../components/MainHeader/index";
import Footer from "../components/Footer/index";
import EditModal from "../components/Modal";

import "./chat.css";

interface ChatState {
  isLoading: boolean;
  modalOn: boolean;
  messages?: Message[];
  name: string;
  participants?: number;
  messageCount?: number;
  lastMessage?: string;
  editedMessage?: Message | undefined;
}

interface ChatProps {}

class Chat extends React.Component<ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
    this.state = {
      name: "LOGO",
      isLoading: true,
      modalOn: false,
      messages: [],
    };
    this.addMessage = this.addMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.toggle = this.toggle.bind(this);
    this.editMessage = this.editMessage.bind(this);
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

  addMessage(text: string) {
    if (text) {
      const messages = this.state.messages;
      const date = new Date();
      messages!.push({
        id: cs.generateId(),
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
      cs.scrollBottom();
    }
  }

  deleteMessage(message: Message) {
    const messages = this.state.messages;
    for (let i = 0; i < messages!.length; i++) {
      if (messages![i].id === message.id) {
        messages?.splice(i, 1);
      }
    }
    const c = messages?.length;
    this.setState({ messages, messageCount: c });
  }

  toggle(message: Message) {
    this.setState({ editedMessage: message, modalOn: !this.state.modalOn });
  }

  editMessage(message: Message, text: string) {
    let messages = this.state.messages!;
    for (let i = 0; i < messages!.length; i++) {
      if (messages![i].id === message.id) {
        messages![i].text = text;
      }
    }
    this.setState({ messages, modalOn: !this.state.modalOn });
  }

  render() {
    return (
      <div className="wrapper">
        {this.state.modalOn ? (
          <EditModal
            toggle={this.toggle}
            message={this.state.editedMessage!}
            editMessage={this.editMessage}
          />
        ) : (
          ""
        )}
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
                deleteMessage={this.deleteMessage}
                editMessage={this.toggle}
              />
              <MessageInput addMessage={this.addMessage} />
            </div>
          )}
          <Footer />
        </div>
      </div>
    );
  }
}
export default Chat;
