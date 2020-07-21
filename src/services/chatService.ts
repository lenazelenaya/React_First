import React from 'react';
import callWebApi from '../helpers/webApiHelper';
import Message from '../types/message'

class ChatService {
    async getMessages() {
        const endpoint: string = 'https://api.jsonbin.io/b/5f1726cbc58dc34bf5d7f76f';
        const type: string = 'GET';
        const response: Response = await callWebApi(endpoint, type);
        let messages: Message[] = await response.json();
        messages.map((message) => {message.timeShow = this.getTimeForShow(message.createdAt)});
        return messages.sort(this.compareMessages);
    }

    getTimeForShow = (date: string | Date) => {
        const newDate = new Date(date);
        let minutes = newDate.getMinutes().toString();
        if (minutes.length === 1) minutes = "0" + minutes;
        return `${newDate.getHours()}:${minutes}`;
    }

    compareMessages = (first: Message, second: Message) => {
        if (new Date(first.createdAt) > new Date(second.createdAt)) return 1;
        else if (new Date(first.createdAt) < new Date(second.createdAt)) return -1;
        else return 0;
      }

    getParticipantsCount(messages: Message[]) {
        const list = [];
        messages.map((message) => {list.push(message.user)});
        return list.length;
    }

    async loadData() {
        this.getMessages();
        const messagesInList = await this.getMessages();
        const messages = messagesInList.length;
        const participants = this.getParticipantsCount(messagesInList);
        return { messagesInList, participants, messages };
      }
}

export default new ChatService();