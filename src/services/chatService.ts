import callWebApi from "../helpers/webApiHelper";
import Message from "../types/message";

class ChatService {
  async getMessages() {
    const endpoint: string =
      "https://api.jsonbin.io/b/5f1726cbc58dc34bf5d7f76f";
    const type: string = "GET";
    const response: Response = await callWebApi(endpoint, type);
    const messages: Message[] = await response.json();
    messages.map((message) => {
      message.timeShow = this.getTimeShow(message.createdAt);
    });
    return messages.sort(this.dateComparator);
  }

  //Time that is seen on the message box
  getTimeShow = (date: string | Date) => {
    const newDate = new Date(date);
    let minutes = newDate.getMinutes().toString();
    if (minutes.length === 1) minutes = "0" + minutes;
    return `${newDate.getHours()}:${minutes}`;
  };

  dateComparator = (first: Message, second: Message) => {
    if (new Date(first.createdAt) > new Date(second.createdAt)) return 1;
    else if (new Date(first.createdAt) < new Date(second.createdAt)) return -1;
    else return 0;
  };

  getParticipantsCount(messages: Message[] | undefined) {
    if(messages === undefined) return 0;
    const list = new Set();
    messages.map((message) => {
      list.add(message.user);
    });
    return list.size;
  }

  async loadData() {
    this.getMessages();
    const messages = await this.getMessages();
    const messageCount = messages.length;
    const participants = this.getParticipantsCount(messages);
    return { messages, participants, messageCount };
  }

  generateId(){
    return (Math.random() * new Date().getTime()).toString();
  }

  scrollBottom(){
    const list = document.getElementById('list');
    list!.scrollTop = list!.scrollHeight;
  }
}

export default new ChatService();
