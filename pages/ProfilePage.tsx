import React from 'react';
import { CURRENT_USER, MOCK_POSTS } from '../constants';
import { Grid, Bookmark, UserBox, Settings, Disc } from 'lucide-react';

const ProfilePage: React.FC = () => {
  return (
    <div className="flex justify-center w-full min-h-screen bg-[#fafafa]">
      <div className="w-full max-w-[935px] px-5 pt-8 mb-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start md:ml-10 mb-12">
            <div className="md:mr-24 mb-6 md:mb-0">
                <div className="w-20 h-20 md:w-36 md:h-36 rounded-full p-[2px] bg-gradient-to-tr from-gray-200 to-gray-300">
                     <img src={CURRENT_USER.avatarUrl} alt={CURRENT_USER.username} className="w-full h-full rounded-full object-cover border-2 border-white" />
                </div>
            </div>

            <div className="flex-1">
                <div className="flex flex-col md:flex-row items-center mb-5 space-y-3 md:space-y-0 md:space-x-4">
                    <h2 className="text-xl md:text-2xl font-light text-gray-800">{CURRENT_USER.username}</h2>
                    <div className="flex space-x-2">
                        <button className="bg-[#efefef] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#dbdbdb]">Edit profile</button>
                        <button className="bg-[#efefef] px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#dbdbdb]">View archive</button>
                        <button className="p-1.5 text-gray-800"><Settings size={24}/></button>
                    </div>
                </div>

                <div className="flex space-x-10 mb-5 text-sm md:text-base">
                    <span><span className="font-bold">{MOCK_POSTS.length}</span> posts</span>
                    <span><span className="font-bold">{CURRENT_USER.followers}</span> followers</span>
                    <span><span className="font-bold">{CURRENT_USER.following}</span> following</span>
                </div>

                <div className="hidden md:block">
                    <h3 className="font-bold text-sm">{CURRENT_USER.fullName}</h3>
                    <p className="text-sm whitespace-pre-line">{CURRENT_USER.bio}</p>
                </div>
            </div>
        </div>

        {/* Mobile Bio */}
        <div className="md:hidden mb-6 px-2">
             <h3 className="font-bold text-sm">{CURRENT_USER.fullName}</h3>
             <p className="text-sm whitespace-pre-line">{CURRENT_USER.bio}</p>
        </div>

        {/* Highlights */}
        <div className="flex space-x-6 md:space-x-10 overflow-x-auto no-scrollbar mb-10 px-2 md:px-10">
            {[1,2,3].map(i => (
                <div key={i} className="flex flex-col items-center space-y-1 min-w-[70px]">
                    <div className="w-16 h-16 rounded-full bg-gray-100 border border-gray-200 p-1">
                        <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                            <Disc size={20} />
                        </div>
                    </div>
                    <span className="text-xs font-medium">Highlight {i}</span>
                </div>
            ))}
            <div className="flex flex-col items-center space-y-1 min-w-[70px]">
                    <div className="w-16 h-16 rounded-full bg-white border border-gray-300 p-1 flex items-center justify-center">
                         <span className="text-2xl font-light text-gray-400">+</span>
                    </div>
                    <span className="text-xs font-medium">New</span>
            </div>
        </div>

        {/* Tab Nav */}
        <div className="border-t border-gray-200 flex justify-center space-x-12 mb-4">
            <button className="flex items-center space-x-1 py-4 border-t border-black -mt-[1px] text-xs font-bold tracking-widest text-gray-800">
                <Grid size={12} />
                <span>POSTS</span>
            </button>
             <button className="flex items-center space-x-1 py-4 text-xs font-bold tracking-widest text-gray-400 hover:text-gray-600">
                <Bookmark size={12} />
                <span>SAVED</span>
            </button>
             <button className="flex items-center space-x-1 py-4 text-xs font-bold tracking-widest text-gray-400 hover:text-gray-600">
                <UserBox size={12} />
                <span>TAGGED</span>
            </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 gap-1 md:gap-7">
            {MOCK_POSTS.map((post) => (
                <div key={post.id} className="relative group aspect-square cursor-pointer bg-gray-100">
                    <img src={post.imageUrl} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/30 hidden group-hover:flex items-center justify-center space-x-6 text-white transition-opacity">
                        <div className="flex items-center space-x-1 font-bold">
                            <span className="text-white fill-white">♥</span>
                            <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 font-bold">
                            <span className="text-white fill-white">💬</span>
                            <span>{post.comments.length}</span>
                        </div>
                    </div>
                </div>
            ))}
            {/* Fillers for visual */}
            {[1,2,3,4,5,6].map(i => (
                 <div key={`filler_${i}`} className="relative aspect-square cursor-pointer bg-gray-100 hover:opacity-90">
                    <img src={`https://picsum.photos/seed/filler${i}/500/500`} className="w-full h-full object-cover" />
                 </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
