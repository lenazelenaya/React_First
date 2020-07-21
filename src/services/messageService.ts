import Message from '../types/message'
import dateFormat from './dateService'

class MessageService{
    isYourMessage(user: string, message: Message){
        return user === message.user;
    }

    groupByDate(messages: Message[]){
        const groups = messages.reduce((groups: any, message: Message) => {
            const date = new Date(message.createdAt);
            const separatorName = dateFormat.isYesterday(date) ? "Yesterday" : date.toLocaleDateString();
            if (!groups[separatorName]) { groups[separatorName] = []; }
            groups[separatorName].push(message);
            return groups;
          }, {});
        
          const groupArrays = Object.keys(groups).map((date) => {
            return {
              date,
              messages: groups[date],
            };
          });
          return groupArrays;
    }
}

export default new MessageService();