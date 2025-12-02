import { Post, Story, User } from './types';

export const CURRENT_USER: User = {
  id: 'current_user',
  username: 'creative_mind',
  avatarUrl: 'https://picsum.photos/seed/me/150/150',
  fullName: 'Alex Creator',
  bio: 'Building dreams with AI ✨ | Digital Artist',
  followers: 1250,
  following: 450,
  postsCount: 42
};

export const MOCK_USERS: User[] = [
  { id: 'u1', username: 'nature_lover', avatarUrl: 'https://picsum.photos/seed/u1/150/150' },
  { id: 'u2', username: 'tech_guru', avatarUrl: 'https://picsum.photos/seed/u2/150/150' },
  { id: 'u3', username: 'foodie_daily', avatarUrl: 'https://picsum.photos/seed/u3/150/150' },
  { id: 'u4', username: 'travel_bug', avatarUrl: 'https://picsum.photos/seed/u4/150/150' },
  { id: 'u5', username: 'art_collective', avatarUrl: 'https://picsum.photos/seed/u5/150/150' },
];

export const MOCK_STORIES: Story[] = MOCK_USERS.map((user, index) => ({
  id: `s_${index}`,
  user,
  imageUrl: `https://picsum.photos/seed/story_${index}/400/800`,
  hasSeen: index > 2
}));

export const MOCK_POSTS: Post[] = [
  {
    id: 'p1',
    userId: 'u1',
    user: MOCK_USERS[0],
    imageUrl: 'https://picsum.photos/seed/post1/600/600',
    caption: 'Lost in the woods today. The silence is loud. 🌲✨ #nature #peace',
    likes: 124,
    comments: [
      { id: 'c1', username: 'tech_guru', text: 'Amazing shot!', timestamp: '2h' }
    ],
    timestamp: '3 hours ago',
    hasLiked: false
  },
  {
    id: 'p2',
    userId: 'u3',
    user: MOCK_USERS[2],
    imageUrl: 'https://picsum.photos/seed/post2/600/750',
    caption: 'Sunday brunch goals! 🥑🍳 Nothing beats fresh avocado toast.',
    likes: 892,
    comments: [],
    timestamp: '5 hours ago',
    hasLiked: true
  },
  {
    id: 'p3',
    userId: 'u5',
    user: MOCK_USERS[4],
    imageUrl: 'https://picsum.photos/seed/post3/600/500',
    caption: 'Abstract thoughts on a digital canvas. What do you see? 🎨',
    likes: 45,
    comments: [
      { id: 'c2', username: 'nature_lover', text: 'I see a mountain!', timestamp: '10m' },
      { id: 'c3', username: 'travel_bug', text: 'Looks like the ocean to me.', timestamp: '5m' }
    ],
    timestamp: '1 hour ago',
    hasLiked: false
  }
];
