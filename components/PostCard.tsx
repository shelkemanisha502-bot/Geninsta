import React, { useState } from 'react';
import { Post } from '../types';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Smile } from 'lucide-react';
import { generateCommentSuggestion } from '../services/geminiService';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [liked, setLiked] = useState(post.hasLiked);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [saved, setSaved] = useState(post.isSaved);
  const [commentText, setCommentText] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);

  const toggleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleMagicComment = async () => {
      if (suggestions.length > 0) {
          setSuggestions([]); // Toggle off
          return;
      }

      setLoadingSuggestions(true);
      const generated = await generateCommentSuggestion(post.caption);
      setSuggestions(generated);
      setLoadingSuggestions(false);
  };

  const applySuggestion = (text: string) => {
      setCommentText(text);
      setSuggestions([]);
  };

  return (
    <div className="bg-white border-b border-gray-200 md:border md:rounded-lg mb-4 md:mb-8">
      {/* Header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px] rounded-full">
            <img 
              src={post.user.avatarUrl} 
              alt={post.user.username} 
              className="w-8 h-8 rounded-full border-2 border-white object-cover" 
            />
          </div>
          <span className="font-semibold text-sm">{post.user.username}</span>
        </div>
        <button className="text-gray-600">
          <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Image */}
      <div className="w-full bg-gray-100 aspect-square md:aspect-auto">
        <img src={post.imageUrl} alt="Post content" className="w-full h-full object-cover" loading="lazy" />
      </div>

      {/* Actions */}
      <div className="p-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-4">
            <button onClick={toggleLike} className={`transition-transform active:scale-125 ${liked ? 'text-red-500' : 'text-black'}`}>
              <Heart size={24} fill={liked ? "currentColor" : "none"} />
            </button>
            <button className="text-black hover:text-gray-600">
              <MessageCircle size={24} />
            </button>
            <button className="text-black hover:text-gray-600">
              <Send size={24} />
            </button>
          </div>
          <button onClick={() => setSaved(!saved)} className="text-black hover:text-gray-600">
            <Bookmark size={24} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm mb-2">
          {likesCount.toLocaleString()} likes
        </div>

        {/* Caption */}
        <div className="text-sm mb-2">
          <span className="font-semibold mr-2">{post.user.username}</span>
          <span className="">{post.caption}</span>
        </div>

        {/* Comments Preview */}
        {post.comments.length > 0 && (
          <div className="text-gray-500 text-sm mb-2 cursor-pointer">
            View all {post.comments.length + 42} comments
          </div>
        )}
        {post.comments.map(comment => (
          <div key={comment.id} className="text-sm mb-1">
            <span className="font-semibold mr-2">{comment.username}</span>
            <span>{comment.text}</span>
          </div>
        ))}

        {/* Timestamp */}
        <div className="text-gray-400 text-xs uppercase mb-3 mt-2">
          {post.timestamp}
        </div>

        {/* AI Comment Suggestion UI */}
        {suggestions.length > 0 && (
            <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar py-1">
                {suggestions.map((s, idx) => (
                    <button 
                        key={idx} 
                        onClick={() => applySuggestion(s)}
                        className="whitespace-nowrap px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs font-medium border border-purple-100 hover:bg-purple-100 transition-colors"
                    >
                        {s}
                    </button>
                ))}
            </div>
        )}

        {/* Add Comment */}
        <div className="flex items-center border-t border-gray-100 pt-3 relative">
            <button 
                onClick={handleMagicComment}
                className="absolute right-12 top-3 text-purple-600 hover:text-purple-800 p-1"
                title="AI Suggestions"
            >
                {loadingSuggestions ? (
                     <div className="animate-spin h-5 w-5 border-2 border-purple-500 rounded-full border-t-transparent"></div>
                ) : (
                    <span className="text-lg">✨</span>
                )}
            </button>
          <button className="mr-3 text-gray-500">
            <Smile size={24} />
          </button>
          <input 
            type="text" 
            placeholder="Add a comment..." 
            className="flex-1 outline-none text-sm pr-10"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <button 
            disabled={!commentText}
            className={`text-sm font-semibold ml-2 ${commentText ? 'text-blue-500' : 'text-blue-200'}`}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
