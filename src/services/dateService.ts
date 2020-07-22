import { monthList, dayList } from "../types/enums";

class DateForChat {
  getFormatDate(dateFromData: string | Date) {
    const date = new Date(dateFromData);
    if (this.isToday(date)) return "Today";
    else if (this.isYesterday(date)) return "Yesterday";
    else {
      const day = dayList[date.getDay()];
      const month = monthList[date.getMonth()];
      const number = date.getDate();
      return `${day}, ${month}, ${number}th`;
    }
  }

  isToday(date: Date) {
    const today = new Date();
    return this.comparator(today, date);
  }
  isYesterday(date: Date) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return this.comparator(yesterday, date);
  }

  comparator(first: Date, second: Date) {
    return first.getDate() === second.getDate() &&
      first.getMonth() === second.getMonth() &&
      first.getFullYear() === second.getFullYear()
      ? true
      : false;
  }
}

export default new DateForChat();
