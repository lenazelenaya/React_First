import React from 'react';
import Message from '../types/message';
import cs from '../services/chatService'

interface ChatState {
    isLoading: boolean;
    messagesInList?: Message[];
    name: string;
    participants?: number;
    messages?: number; //count of messages in MessageList for ChatHeader
}

interface ChatProps {}

class Chat extends React.Component<ChatProps, ChatState> {
  constructor(props: ChatProps) {
    super(props);
    this.state = {
      name: "LOGO",
      isLoading: true,
    };
  }

  componentDidMount() {
    cs.loadData().then(
      ({ messagesInList, participants, messages }) => {
        this.setState({
          isLoading: false,
          messagesInList,
          participants,
          messages,
        });
      }
    );
  }

  render(){
    return(
      <div className="chat-wrapper">
      </div>
    );
  }

}
export default Chat;
