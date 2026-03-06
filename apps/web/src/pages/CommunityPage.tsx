import { CommunitySidebar } from '../components/Community/Sidebar';
import { ChatArea } from '../components/Community/ChatArea';
import { ParticipantsSidebar } from '../components/Community/ParticipantsSidebar';

export const CommunityPage: React.FC = () => {
  return (
    <div className="flex bg-slate-50 dark:bg-slate-900 min-h-screen">
      <CommunitySidebar />
      <ChatArea />
      <ParticipantsSidebar />
    </div>
  );
};
