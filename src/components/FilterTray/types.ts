import { ReactNode } from 'react';

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

export type FilterOption = 'ALL' | 'TEXT' | 'IMAGE' | 'AUDIO' | 'VIDEO';

export interface FilterTrayHookReturn {
  state: FilterTrayState;
  setShowFilters: (show: boolean) => void;
  setActiveFilter: (filter: string) => void;
  setSearchValue: (search: string) => void;
}

export interface FilterResult {
  activeFilter: FilterOption;
  searchValue: string;
  filteredData: any[];
}

// Utility type for filtering data based on current filter and search
export interface FilterableItem {
  id: string | number;
  type?: string;
  title?: string;
  content?: string;
  [key: string]: any;
} 