export interface Message {
    id: string;
    text: string;
    user: string;
    avatar?: string;
    editedAt?: Date | string;
    createdAt: Date | string;
    likes?: number;
    formattedTime?: string;
  }
  