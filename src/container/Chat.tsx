import React from "react";
import Message from "../types/message";
import cs from "../services/chatService";
import MessageList from "../components/MessageList";
import Spinner from "../components/Spinner";
import ChatHeader from '../components/ChatHeader/index'
import MessageInput from '../components/MessageInput/index'
import MainHeader from '../components/MainHeader/index'
import Footer from '../components/Footer/index'

import './chat.css'


interface ChatState {
  isLoading: boolean;
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
    };
    this.addLike = this.addLike.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.deleteMessage = this.deleteMessage.bind(this);
    this.editMessage = this.editMessage.bind(this);
  }

  componentDidMount() {
    cs.loadData().then(({ messages, participants, messageCount }) => {
      this.setState({
        isLoading: false,
        messages: messages,
        participants,
        messageCount: messageCount,
        lastMessage: messages[messages.length -1].timeShow,
      });
    });
  }

  addLike(id: number) {
    const messages = this.state.messages;
    if (messages![id].likes) messages![id].likes! = 0;
    else  messages![id].likes = 1;
    this.setState({ messages });
  }

  addMessage(text: string) {
    if (text) {
      const messages = this.state.messages;
      const date = new Date();
      messages!.push({
        id: '17',
        text,
        user: "You",
        createdAt: date,
        timeShow: cs.getTimeShow(new Date()),
      });
      const count = this.state.messageCount! + 1;
      this.setState({ messages, messageCount: count, lastMessage: cs.getTimeShow(date) });
    }
  }

  deleteMessage(id: number) {
    const messages = this.state.messages;
    messages![id].text = "This message has been deleted";
    const c = this.state.messageCount! - 1;
    this.setState({ messages, messageCount: c });
  }

  editMessage(id: number, newText: string) {
    const messages = this.state.messages;
    messages![id].text = newText;
    this.setState({ messages });
  }

  render() {

    return (
      this.state.isLoading  ? <Spinner /> :
      <div className="chat-wrapper">
        <MainHeader
          name={this.state.name!}
        />
        <div className="chat-window">
          <ChatHeader 
            name={this.state.name!}
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
        <Footer />
      </div>
    );
  }
}
export default Chat;
