import React from 'react';
import { 
  Home, 
  MessageCircle, 
  Users, 
  Brain, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useAppStore } from '@/lib/store';
import { cn } from '@/lib/utils';

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  id: string;
  isActive: boolean;
  isCollapsed: boolean;
  onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  icon: Icon, 
  label, 
  id, 
  isActive, 
  isCollapsed,
  onClick 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
        isActive 
          ? "bg-[#ED1C24]/10 text-[#ED1C24] border-l-4 border-[#ED1C24]" 
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
        isCollapsed && "justify-center px-2"
      )}
    >
      <Icon size={20} />
      {!isCollapsed && <span className="font-medium">{label}</span>}
    </button>
  );
};

export const Sidebar: React.FC = () => {
  const { sidebarOpen, activeView, setSidebarOpen, setActiveView } = useAppStore();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'conversations', label: 'AI Conversations', icon: MessageCircle },
    { id: 'travelers', label: 'Traveler Management', icon: Users },
    { id: 'training', label: 'AI Training', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-50",
      sidebarOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className={cn(
            "flex items-center space-x-3",
            !sidebarOpen && "justify-center"
          )}>
            <div className="p-2 bg-[#ED1C24]/10 rounded-lg">
              <Zap size={20} className="text-[#ED1C24]" />
            </div>
            {sidebarOpen && (
              <div>
                <h1 className="text-lg font-bold text-gray-900">Magic World</h1>
                <p className="text-sm text-gray-500">AI Agent Dashboard</p>
              </div>
            )}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
      </div>
      
      <nav className="px-4 space-y-2">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.id}
            icon={item.icon}
            label={item.label}
            id={item.id}
            isActive={activeView === item.id}
            isCollapsed={!sidebarOpen}
            onClick={() => setActiveView(item.id)}
          />
        ))}
      </nav>
    </div>
  );
};