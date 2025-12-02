export interface User {
  id: string;
  username: string;
  avatarUrl: string;
  fullName?: string;
  bio?: string;
  followers?: number;
  following?: number;
  postsCount?: number;
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

export interface Post {
  id: string;
  userId: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: Comment[];
  timestamp: string;
  hasLiked?: boolean;
  isSaved?: boolean;
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
  hasSeen: boolean;
}

export enum NavItem {
  HOME = 'home',
  SEARCH = 'search',
  EXPLORE = 'explore',
  REELS = 'reels',
  MESSAGES = 'messages',
  NOTIFICATIONS = 'notifications',
  CREATE = 'create',
  PROFILE = 'profile'
}
