import { CommunitySidebar } from '../components/Community/Sidebar';
import { ChatArea } from '../components/Community/ChatArea';
import { ParticipantsSidebar } from '../components/Community/ParticipantsSidebar';

export const CommunityPage: React.FC<{ onNavigate: (view: 'home' | 'community') => void }> = ({ onNavigate }) => {
  return (
    <div className="flex bg-slate-50 dark:bg-slate-900 min-h-screen">
      <CommunitySidebar onNavigate={onNavigate} />
      <ChatArea />
      <ParticipantsSidebar />
    </div>
  );
};
