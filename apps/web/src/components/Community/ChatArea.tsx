import React from 'react';
import { mockChatMessages, mockParticipants } from '../../data/mockData';

export const ChatArea: React.FC = () => {
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-slate-950 h-screen overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-10 transition-colors">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            Tech Summit 2024
            <span className="material-symbols-outlined text-blue-500 text-lg">verified</span>
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            {mockParticipants.total} Participants • <span className="text-green-500">{mockParticipants.onlineCount} Online</span>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <span className="material-symbols-outlined">search</span>
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {mockChatMessages.map((msg) => (
          <div key={msg.id} className="flex gap-4 group">
            <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-xl flex-shrink-0 flex items-center justify-center font-bold text-slate-500">
              {msg.user.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="font-bold text-slate-900 dark:text-white">{msg.user}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                  msg.role === 'Host' ? 'bg-primary/10 text-primary' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                }`}>
                  {msg.role}
                </span>
                <span className="text-xs text-slate-400">{msg.time}</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                {msg.content}
              </p>
              {msg.link && (
                <div className="mt-3 p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-between group/link cursor-pointer hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-8 h-8 bg-white dark:bg-slate-800 rounded flex items-center justify-center text-primary border border-slate-100 dark:border-slate-700">
                      <span className="material-symbols-outlined text-lg">link</span>
                    </div>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400 truncate">{msg.link.text}</span>
                  </div>
                  <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 group-hover/link:text-primary transition-colors">open_in_new</span>
                </div>
              )}
            </div>
          </div>
        ))}

        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
          <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
            <span className="material-symbols-outlined text-sm">lock</span>
            Messages are encrypted and visible only to event attendees
          </div>
          <div className="flex-1 h-px bg-slate-100 dark:bg-slate-800"></div>
        </div>
      </div>

      {/* Input */}
      <footer className="p-4 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800">
        <div className="max-w-4xl mx-auto flex items-center gap-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-1.5 focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/50 transition-all">
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined">add_circle</span>
          </button>
          <input 
            type="text" 
            placeholder="Type a message..." 
            className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2 text-slate-900 dark:text-white placeholder:text-slate-400"
          />
          <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors">
            <span className="material-symbols-outlined text-lg">mood</span>
          </button>
          <button className="bg-primary text-white p-2 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
            <span className="material-symbols-outlined">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
};
