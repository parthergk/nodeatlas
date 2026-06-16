import React from 'react';
import { Menu, Maximize2, Moon, Sun, ChevronRight, X } from 'lucide-react';

interface TopBarProps {
  onMenuToggle?: () => void;
  onFitView?: () => void;
  onToggleTheme?: () => void;
  isMobilePanelOpen: boolean;
  theme?: 'light' | 'dark';
}

export const TopBar: React.FC<TopBarProps> = ({
  isMobilePanelOpen,
  onMenuToggle,
  onFitView,
  onToggleTheme,
  theme = 'dark',
}) => {
  return (
    <header className="w-full h-16 bg-bg-panel border-b border-border-dark flex items-center justify-between px-4 sm:px-6 select-none z-50 shadow-[0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-none">
      {/* Left side: Brand Logo and Title */}
      <div className="flex items-center gap-4">
        {/* Custom NodeAtlas Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center text-foreground">
            <svg
              className="w-6 h-6 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Globe contours (Atlas concept) */}
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.2" />
              <path d="M12 2a14 14 0 0 1 3.5 10A14 14 0 0 1 12 22a14 14 0 0 1-3.5-10A14 14 0 0 1 12 2z" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.25" />
              <path d="M2 12h20" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.25" />
              
              {/* Node Atlas active network overlay */}
              <line x1="12" y1="5" x2="17" y2="10" stroke="currentColor" strokeWidth="1.75" />
              <line x1="17" y1="10" x2="13" y2="18" stroke="currentColor" strokeWidth="1.75" />
              <line x1="13" y1="18" x2="7" y2="13" stroke="currentColor" strokeWidth="1.75" />
              <line x1="7" y1="13" x2="12" y2="5" stroke="currentColor" strokeWidth="1.75" />
              <line x1="12" y1="5" x2="13" y2="18" stroke="currentColor" strokeWidth="1.25" strokeDasharray="2 2" />
              
              {/* Intersecting Nodes */}
              <circle cx="12" cy="5" r="2" fill="currentColor" />
              <circle cx="17" cy="10" r="2" fill="currentColor" />
              <circle cx="13" cy="18" r="2" fill="currentColor" />
              <circle cx="7" cy="13" r="2" fill="currentColor" />
            </svg>
          </div>
          <span className="font-sans font-semibold text-[17px] text-foreground tracking-wide hidden sm:inline">
            NodeAtlas
          </span>
        </div>
      </div>

      {/* Right side: Action Buttons */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Fit View Button */}
        <button
          onClick={onFitView}
          className="flex items-center gap-2 px-2.5 py-2 sm:px-3 sm:py-1.5 rounded-lg border border-border-dark hover:bg-bg-active text-[13px] font-medium text-text-muted hover:text-foreground transition-all duration-200 cursor-pointer"
        >
          <Maximize2 className="w-4 h-4" />
          <span className="hidden sm:inline">Fit View</span>
        </button>

        {/* Theme Toggle Button with chevron */}
        <button
          onClick={onToggleTheme}
          className="flex items-center gap-1.5 px-2.5 py-2 sm:px-3 sm:py-1.5 rounded-lg border border-border-dark hover:bg-bg-active text-[13px] font-medium text-text-muted hover:text-foreground transition-all duration-200 cursor-pointer"
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? (
            <Sun className="w-4 h-4" />
          ) : (
            <Moon className="w-4 h-4" />
          )}
          <ChevronRight className="w-3.5 h-3.5 hidden sm:inline" />
        </button>

        {/* Menu/Hamburger toggle */}
        <button
          onClick={onMenuToggle}
          className="text-text-muted hover:text-foreground p-2 transition-colors duration-200 cursor-pointer lg:hidden"
          aria-label="Toggle Menu"
        >
          {
            isMobilePanelOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />
          }
        </button>
      </div>
    </header>
  );
};

export default TopBar;
