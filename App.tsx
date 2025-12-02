import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import CreatePostModal from './components/CreatePostModal';
import { Post } from './types';
import { MOCK_POSTS } from './constants';

const App: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);

  const handleCreatePost = (newPost: Post) => {
    setPosts([newPost, ...posts]);
  };

  return (
    <HashRouter>
      <div className="flex min-h-screen bg-[#fafafa]">
        <Sidebar onCreateClick={() => setIsCreateModalOpen(true)} />
        
        <main className="flex-1 md:ml-[245px] min-h-screen">
          <Routes>
            <Route path="/" element={<HomePage posts={posts} />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/explore" element={
              <div className="flex items-center justify-center h-screen text-gray-500">
                <div className="text-center">
                    <h2 className="text-2