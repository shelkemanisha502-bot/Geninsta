import React, { useState, useRef, useEffect } from 'react';
import { X, ArrowLeft, Image as ImageIcon, Sparkles, Wand2 } from 'lucide-react';
import { generateCaptionFromImage } from '../services/geminiService';
import { CURRENT_USER } from '../constants';
import { Post } from '../types';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPostCreated: (post: Post) => void;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose, onPostCreated }) => {
  const [step, setStep] = useState<'select' | 'edit'>('select');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep('select');
        setSelectedImage(null);
        setCaption('');
        setIsGenerating(false);
      }, 300);
    }
  }, [isOpen]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelectedImage(event.target.result as string);
          setStep('edit');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateCaption = async () => {
    if (!selectedImage) return;
    
    setIsGenerating(true);
    const generatedText = await generateCaptionFromImage(selectedImage);
    setCaption(generatedText);
    setIsGenerating(false);
  };

  const handleShare = () => {
    if (!selectedImage) return;

    const newPost: Post = {
      id: `new_${Date.now()}`,
      userId: CURRENT_USER.id,
      user: CURRENT_USER,
      imageUrl: selectedImage,
      caption: caption,
      likes: 0,
      comments: [],
      timestamp: 'Just now',
      hasLiked: false
    };

    onPostCreated(newPost);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 md:p-10 animate-fade-in">
        {/* Close button outside */}
        <button onClick={onClose} className="absolute top-4 right-4 text-white z-50 hover:opacity-80">
            <X size={32} />
        </button>

        <div className="bg-white rounded-xl overflow-hidden w-full max-w-[800px] max-h-[90vh] md:max-h-[80vh] flex flex-col md:flex-row shadow-2xl animate-scale-in">
            
            {step === 'select' ? (
                <div className="flex-1 flex flex-col items-center justify-center p-12 md:p-24 min-h-[400px]">
                    <ImageIcon size={64} className="text-gray-800 mb-6" strokeWidth={1} />
                    <h3 className="text-xl font-light mb-6">Drag photos and videos here</h3>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileSelect} 
                        accept="image/*" 
                        className="hidden" 
                    />
                    <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="bg-[#0095f6] hover:bg-[#1877f2] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                        Select from computer
                    </button>
                </div>
            ) : (
                <>
                    {/* Image Preview Side */}
                    <div className="md:w-[60%] bg-black flex items-center justify-center relative">
                         <img src={selectedImage || ''} alt="Preview" className="max-h-[50vh] md:max-h-[80vh] w-full object-contain" />
                         <button 
                            onClick={() => setStep('select')}
                            className="absolute top-4 left-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                         >
                            <ArrowLeft size={20} />
                         </button>
                    </div>

                    {/* Details Side */}
                    <div className="md:w-[40%] flex flex-col bg-white border-l border-gray-100">
                        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                            <span className="font-semibold text-gray-800">New Post</span>
                            <button onClick={handleShare} className="text-[#0095f6] font-semibold text-sm hover:text-[#00376b]">
                                Share
                            </button>
                        </div>
                        
                        <div className="p-4 flex items-center space-x-3">
                            <img src={CURRENT_USER.avatarUrl} alt="Me" className="w-8 h-8 rounded-full" />
                            <span className="font-semibold text-sm">{CURRENT_USER.username}</span>
                        </div>

                        <div className="flex-1 p-2 relative">
                            <textarea
                                className="w-full h-full resize-none outline-none text-sm p-2"
                                placeholder="Write a caption..."
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                            />
                            
                            {/* Gemini Generator Button */}
                            <button
                                onClick={handleGenerateCaption}
                                disabled={isGenerating}
                                className="absolute bottom-4 right-4 flex items-center space-x-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                            >
                                {isGenerating ? (
                                    <>
                                        <div className="animate-spin h-3 w-3 border-2 border-white rounded-full border-t-transparent"></div>
                                        <span>Thinking...</span>
                                    </>
                                ) : (
                                    <>
                                        <Wand2 size={14} />
                                        <span>AI Caption</span>
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="p-4 border-t border-gray-100 text-gray-500 text-xs">
                           <div className="flex justify-between items-center mb-2">
                               <span>Add location</span>
                               <span className="text-gray-400 text-lg">›</span>
                           </div>
                           <div className="flex justify-between items-center mb-2">
                               <span>Accessibility</span>
                               <span className="text-gray-400 text-lg">›</span>
                           </div>
                           <div className="flex justify-between items-center">
                               <span>Advanced settings</span>
                               <span className="text-gray-400 text-lg">›</span>
                           </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    </div>
  );
};

export default CreatePostModal;
