import React, { useState, useEffect, useRef, ReactNode } from 'react';
import { 
  Search,
  CheckCheck,
  FileText,
  Image as ImageIcon,
  FileAudio,
  FileVideo2,
  X
} from 'lucide-react';

export interface FilterTrayProps {
  isVisible: boolean;
  onFilterChange?: (filter: string) => void;
  onSearchChange?: (search: string) => void;
  children: ReactNode;
  className?: string;
}

export interface FilterTrayState {
  showFilters: boolean;
  activeFilter: string;
  searchValue: string;
  isDragging: boolean;
  trayOffset: number;
}

const FILTER_OPTIONS = ['ALL', 'TEXT', 'IMAGE', 'AUDIO', 'VIDEO'];

const FILTER_ICONS = {
  ALL: CheckCheck,
  TEXT: FileText,
  IMAGE: ImageIcon,
  AUDIO: FileAudio,
  VIDEO: FileVideo2
};

export default function FilterTray({ 
  isVisible, 
  onFilterChange, 
  onSearchChange, 
  children,
  className = ""
}: FilterTrayProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchValue, setSearchValue] = useState('');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  // Dragging state - 0 = closed, 1 = fully open
  const [isDragging, setIsDragging] = useState(false);
  const [trayOffset, setTrayOffset] = useState(0);
  const dragStartY = useRef(0);
  const dragStartOffset = useRef(0);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setIsDragging(true);
    dragStartY.current = clientY;
    dragStartOffset.current = trayOffset;
  };

  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const deltaY = dragStartY.current - clientY; // Positive when dragging up
    const maxDrag = 200;
    
    const newOffset = Math.max(0, Math.min(1, dragStartOffset.current + deltaY / maxDrag));
    setTrayOffset(newOffset);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setTrayOffset(trayOffset > 0.3 ? 1 : 0);
  };

  useEffect(() => {
    if (!isDragging) return;

    // Disable text selection during drag
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    const handleMouseMove = (e: MouseEvent) => handleDragMove(e);
    const handleMouseUp = () => handleDragEnd();
    const handleTouchMove = (e: TouchEvent) => handleDragMove(e);
    const handleTouchEnd = () => handleDragEnd();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      
      // Re-enable text selection
      document.body.style.userSelect = '';
      document.body.style.webkitUserSelect = '';
    };
  }, [isDragging, trayOffset]);

  // Reset tray when filters are disabled
  useEffect(() => {
    if (!showFilters) {
      setTrayOffset(0);
    }
  }, [showFilters]);

  // Track window resize for responsive tray positioning
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Notify parent of filter changes
  useEffect(() => {
    onFilterChange?.(activeFilter);
  }, [activeFilter, onFilterChange]);

  // Notify parent of search changes
  useEffect(() => {
    onSearchChange?.(searchValue);
  }, [searchValue, onSearchChange]);

  const handleFilterChange = (filter: string) => {
    setActiveFilter(filter);
  };

  const handleSearchChange = (search: string) => {
    setSearchValue(search);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Filter Toggle Button */}
      <button 
        onClick={() => setShowFilters(!showFilters)}
        className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-full flex items-center justify-center gap-2 transition-colors whitespace-nowrap"
      >
        <svg className="w-4 h-4 text-purple-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
        </svg>
        <span className="font-medium text-xs text-purple-800 uppercase">Filter</span>
      </button>

      {/* Desktop Draggable Overlay */}
      {showFilters && (
        <div 
          className={`hidden md:block absolute inset-x-0 bg-slate-100 rounded-t-3xl shadow-lg transition-transform duration-300 ease-out z-20 w-full overflow-hidden ${
            isDragging ? 'transition-none select-none' : ''
          }`}
          style={{
            top: '0px',
            bottom: '0px',
            transform: `translateY(${(1 - trayOffset) * (windowWidth < 768 ? 60 : windowWidth < 1024 ? 50 : 42)}%)`
          }}
        >
          {/* Drag Handle */}
          <div 
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-10 h-1 bg-slate-300 rounded-full hover:bg-slate-400 transition-colors cursor-grab active:cursor-grabbing z-10 select-none"
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          />

          {/* Filter Tabs */}
          <div className="border-b border-slate-200 flex-shrink-0">
            <div className="px-6 pt-2 pb-0 flex gap-4 min-w-0">
              <div className="flex overflow-x-auto flex-1 min-w-0">
                {FILTER_OPTIONS.map((filter) => {
                  const Icon = FILTER_ICONS[filter as keyof typeof FILTER_ICONS];
                  const isActive = activeFilter === filter;
                  
                  return (
                    <button
                      key={filter}
                      onClick={() => handleFilterChange(filter)}
                      className={`flex items-center gap-2 px-4 pt-3 pb-5 border-b-2 transition-all whitespace-nowrap ${
                        isActive 
                          ? 'border-purple-800 text-slate-950' 
                          : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-xs uppercase">{filter}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Search */}
              <div className="relative w-full max-w-80 min-w-64 flex-shrink-0">
                <div className="absolute left-3 top-1/2 -translate-y-1/2">
                  <Search className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchValue}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white rounded-full border border-slate-200 focus:border-purple-800 focus:outline-none"
                />
                {searchValue && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-60"
                  >
                    <X className="w-4 h-4 text-slate-400" />
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Desktop Content */}
          <div className="flex-1 overflow-y-auto p-6 min-h-0">
            {children}
          </div>
        </div>
      )}

      {/* Mobile Version */}
      <div className={`flex-1 overflow-y-auto p-6 min-h-0 ${showFilters ? 'md:hidden' : ''} ${className}`}>
        {/* Mobile Filter Controls */}
        {showFilters && (
          <div className="block md:hidden mb-6">
            <div className="border border-slate-200 rounded-lg bg-white p-4 mb-4">
              <div className="flex overflow-x-auto pb-2">
                {FILTER_OPTIONS.map((filter) => {
                  const Icon = FILTER_ICONS[filter as keyof typeof FILTER_ICONS];
                  const isActive = activeFilter === filter;
                  
                  return (
                    <button
                      key={filter}
                      onClick={() => handleFilterChange(filter)}
                      className={`flex items-center gap-2 px-4 py-2 mr-2 rounded-full border transition-all ${
                        isActive 
                          ? 'border-purple-800 bg-purple-50 text-purple-800' 
                          : 'border-slate-200 text-slate-500 hover:border-slate-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-xs uppercase whitespace-nowrap">{filter}</span>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Mobile Search */}
            <div className="relative mb-4">
              <div className="absolute left-3 top-1/2 -translate-y-1/2">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <input
                type="text"
                placeholder="Search"
                value={searchValue}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white rounded-full border border-slate-200 focus:border-purple-800 focus:outline-none"
              />
              {searchValue && (
                <button
                  onClick={() => handleSearchChange('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-60"
                >
                  <X className="w-4 h-4 text-slate-400" />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Content */}
        {children}
      </div>
    </>
  );
}

// Hook for using the filter tray state
export function useFilterTray() {
  const [state, setState] = useState<FilterTrayState>({
    showFilters: false,
    activeFilter: 'ALL',
    searchValue: '',
    isDragging: false,
    trayOffset: 0
  });

  const setShowFilters = (show: boolean) => {
    setState(prev => ({ ...prev, showFilters: show }));
  };

  const setActiveFilter = (filter: string) => {
    setState(prev => ({ ...prev, activeFilter: filter }));
  };

  const setSearchValue = (search: string) => {
    setState(prev => ({ ...prev, searchValue: search }));
  };

  return {
    state,
    setShowFilters,
    setActiveFilter,
    setSearchValue
  };
} 