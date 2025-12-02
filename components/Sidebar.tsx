import React from 'react';
import { NavItem } from '../types';
import { 
  Home, Search, Compass, Film, MessageCircle, Heart, PlusSquare, Menu, UserCircle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  onCreateClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onCreateClick }) => {
  const location = useLocation();
  const currentPath = location.pathname.substring(1) || 'home';

  const navItems = [
    { id: NavItem.HOME, icon: Home, label: 'Home', path: '/' },
    { id: NavItem.SEARCH, icon: Search, label: 'Search', path: '/explore' },
    { id: NavItem.EXPLORE, icon: Compass, label: 'Explore', path: '/explore' },
    { id: NavItem.REELS, icon: Film, label: 'Reels', path: '/explore' },
    { id: NavItem.MESSAGES, icon: MessageCircle, label: 'Messages', path: '/messages' },
    { id: NavItem.NOTIFICATIONS, icon: Heart, label: 'Notifications', path: '/notifications' },
    { id: NavItem.CREATE, icon: PlusSquare, label: 'Create', action: onCreateClick },
    { id: NavItem.PROFILE, icon: UserCircle, label: 'Profile', path: '/profile' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex flex-col fixed left-0 top-0 h-full w-[245px] border-r border-gray-200 bg-white px-3 py-8 z-30">
        <Link to="/" className="mb-8 px-3">
          <h1 className="text-2xl font-bold font-serif italic tracking-wider">InstaGen</h1>
        </Link>
        
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            item.action ? (
              <button
                key={item.id}
                onClick={item.action}
                className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 w-full transition-all group ${currentPath === item.id ? 'font-bold' : ''}`}
              >
                <item.icon size={26} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="text-md">{item.label}</span>
              </button>
            ) : (
              <Link
                key={item.id}
                to={item.path!}
                className={`flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 w-full transition-all group ${currentPath === item.path!.substring(1) ? 'font-bold' : ''}`}
              >
                <item.icon size={26} className="group-hover:scale-110 transition-transform duration-200" />
                <span className="text-md">{item.label}</span>
              </Link>
            )
          ))}
        </nav>

        <button className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 w-full mt-auto">
          <Menu size={26} />
          <span className="text-md">More</span>
        </button>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center p-3 z-30">
        <Link to="/" className="p-2"><Home size={28} /></Link>
        <Link to="/explore" className="p-2"><Compass size={28} /></Link>
        <button onClick={onCreateClick} className="p-2"><PlusSquare size={28} /></button>
        <Link to="/messages" className="p-2"><MessageCircle size={28} /></Link>
        <Link to="/profile" className="p-2"><UserCircle size={28} /></Link>
      </div>
    </>
  );
};

export default Sidebar;
