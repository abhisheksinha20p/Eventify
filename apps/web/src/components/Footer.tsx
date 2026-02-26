import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6 text-white">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
                <span className="material-symbols-outlined text-xl">confirmation_number</span>
              </div>
              <span className="text-xl font-bold">Eventify</span>
            </div>
            <p className="mb-8 max-w-sm">Elevating your event experience with premium discovery and seamless management tools. From intimate gatherings to global summits.</p>
            <div className="flex gap-4">
              <a className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#"><span className="material-symbols-outlined text-sm">social_leaderboard</span></a>
              <a className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#"><span className="material-symbols-outlined text-sm">share</span></a>
              <a className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all" href="#"><span className="material-symbols-outlined text-sm">alternate_email</span></a>
            </div>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">About</h5>
            <ul className="space-y-4 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">Our Story</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Careers</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Press</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Support</h5>
            <ul className="space-y-4 text-sm">
              <li><a className="hover:text-primary transition-colors" href="#">Help Center</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Safety Center</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Terms of Service</a></li>
              <li><a className="hover:text-primary transition-colors" href="#">Privacy Policy</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-white font-bold mb-6">Newsletter</h5>
            <p className="text-sm mb-4">Stay updated with the latest premium events.</p>
            <div className="flex flex-col gap-2">
              <input className="bg-slate-900 border border-slate-800 rounded-lg text-sm px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary" placeholder="Your email" type="email"/>
              <button className="bg-primary text-white font-bold py-3 rounded-lg hover:opacity-90 transition-opacity text-sm">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© 2026 Eventify Inc. All rights reserved.</p>
          <div className="flex gap-8">
            <a className="hover:text-white transition-colors" href="#">Privacy</a>
            <a className="hover:text-white transition-colors" href="#">Terms</a>
            <a className="hover:text-white transition-colors" href="#">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
