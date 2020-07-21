import React from 'react';
import { Message } from '../types/message';

interface ChatState {
    isLoading: boolean;
    messagesInList?: Message[];
    name: string;
    participants?: number;
    messages?: number;
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
  render(){
    return(
      <div className="chat-wrapper">
      </div>
    );
  }

}
export default Chat;
