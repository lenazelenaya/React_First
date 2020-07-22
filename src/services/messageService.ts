import Message from '../types/message'
import dateFormat from './dateService'

class MessageService{
  //If this message is your then you can edit and delete it
    isYourMessage(message: Message){
        return 'You' === message.user;
    }

    groupByDate(messages: Message[]){
        const groups = messages.reduce((groups: any, message: Message) => {
            const date = new Date(message.createdAt);
            const separatorName = dateFormat.getFormatDate(date);
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