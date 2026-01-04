import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FileText, Github, User, LayoutDashboard, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Button from './Button';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-slate-100 selection:bg-primary/30 selection:text-white">
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight">ResumeAI</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com/younglord3302" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>

              {user ? (
                <>
                  {user.role === 'admin' && (
                    <Link to="/admin">
                      <Button variant="ghost" size="sm" leftIcon={<LayoutDashboard className="w-4 h-4"/>}>
                        Admin
                      </Button>
                    </Link>
                  )}
                  <div className="flex items-center gap-3 pl-4 border-l border-white/10">
                    <span className="text-sm font-medium text-slate-300 hidden sm:block">
                      {user.name}
                    </span>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handleLogout}
                      leftIcon={<LogOut className="w-4 h-4"/>}
                    >
                      Logout
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">Log In</Button>
                  </Link>
                  <Link to="/register">
                    <Button variant="primary" size="sm" leftIcon={<User className="w-4 h-4"/>}>
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="grow pt-16">
        {children}
      </div>
      
      <footer className="border-t border-white/5 bg-black/20 backdrop-blur-sm mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-500" />
              <span className="text-slate-400 text-sm">© 2025 ResumeAI. All rights reserved.</span>
            </div>
            <div className="flex gap-6 text-sm text-slate-500">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
