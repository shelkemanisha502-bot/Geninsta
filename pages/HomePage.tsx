import React from 'react';
import { MOCK_POSTS, MOCK_STORIES } from '../constants';
import { Post } from '../types';
import PostCard from '../components/PostCard';

interface HomePageProps {
  posts: Post[];
}

const HomePage: React.FC<HomePageProps> = ({ posts }) => {
  return (
    <div className="flex justify-center w-full min-h-screen bg-[#fafafa]">
      <div className="w-full max-w-[470px] pt-8 md:pt-8 pb-20 md:pb-0">
        
        {/* Stories - Top Mobile / Desktop */}
        <div className="flex space-x-4 overflow-x-auto no-scrollbar pb-8 px-2 md:px-0">
          {MOCK_STORIES.map(story => (
            <div key={story.id} className="flex flex-col items-center space-y-1 min-w-[66px] cursor-pointer">
              <div className={`p-[3px] rounded-full ${story.hasSeen ? 'bg-gray-300' : 'bg-gradient-to-tr from-yellow-400 to-purple-600'}`}>
                <div className="bg-white p-[2px] rounded-full">
                  <img src={story.user.avatarUrl} alt={story.user.username} className="w-14 h-14 rounded-full object-cover" />
                </div>
              </div>
              <span className="text-xs text-gray-700 truncate w-16 text-center">{story.user.username}</span>
            </div>
          ))}
        </div>

        {/* Feed */}
        <div className="flex flex-col">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {/* End of Feed */}
        <div className="flex flex-col items-center justify-center py-10 text-gray-500">
             <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-4 text-red-500 font-bold text-2xl animate-bounce">✓</div>
             <h3 className="text-lg font-medium">You're all caught up</h3>
             <p className="text-sm">You've seen all new posts from the past 3 days.</p>
        </div>
      </div>
      
      {/* Right Suggestion Sidebar (Desktop only) */}
      <div className="hidden lg:block w-[320px] pl-16 pt-10">
          <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                 <img src="https://picsum.photos/seed/me/150/150" className="w-12 h-12 rounded-full border border-gray-200" />
                 <div className="flex flex-col">
                     <span className="font-bold text-sm">creative_mind</span>
                     <span className="text-gray-500 text-sm">Alex Creator</span>
                 </div>
              </div>
              <button className="text-xs font-bold text-[#0095f6]">Switch</button>
          </div>
          
          <div className="flex justify-between mb-4">
              <span className="text-gray-500 font-bold text-sm">Suggestions For You</span>
              <button className="text-xs font-bold text-gray-800">See All</button>
          </div>

          {[1,2,3,4,5].map(i => (
              <div key={i} className="flex items-center justify-between mb-3">
                 <div className="flex items-center space-x-3">
                     <img src={`https://picsum.photos/seed/sugg${i}/100/100`} className="w-8 h-8 rounded-full" />
                     <div className="flex flex-col">
                         <span className="font-bold text-xs hover:underline cursor-pointer">suggested_user_{i}</span>
                         <span className="text-gray-400 text-[10px]">Followed by others</span>
                     </div>
                 </div>
                 <button className="text-xs font-bold text-[#0095f6] hover:text-[#00376b]">Follow</button>
              </div>
          ))}

          <div className="mt-8 text-xs text-gray-300">
              <p>© 2025 INSTAGEN AI FROM GOOGLE GEMINI</p>
          </div>
      </div>

    </div>
  );
};

export default HomePage;
