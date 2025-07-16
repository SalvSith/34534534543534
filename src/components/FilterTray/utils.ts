import { FilterableItem, FilterOption } from './types';

/**
 * Filters an array of items based on the active filter and search value
 */
export function filterItems<T extends FilterableItem>(
  items: T[],
  activeFilter: FilterOption,
  searchValue: string
): T[] {
  return items.filter(item => {
    // Filter by type
    if (activeFilter !== 'ALL' && item.type && item.type.toLowerCase() !== activeFilter.toLowerCase()) {
      return false;
    }
    
    // Filter by search
    if (searchValue) {
      const searchLower = searchValue.toLowerCase();
      const searchableFields = [
        item.title,
        item.content,
        item.id?.toString()
      ].filter(Boolean);
      
      const hasMatch = searchableFields.some(field => 
        field?.toLowerCase().includes(searchLower)
      );
      
      if (!hasMatch) return false;
    }
    
    return true;
  });
}

/**
 * Debounce function for search input to improve performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number;
  
  return function(this: any, ...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = window.setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Get filter counts for displaying badges
 */
export function getFilterCounts<T extends FilterableItem>(
  items: T[]
): Record<FilterOption, number> {
  const counts: Record<FilterOption, number> = {
    ALL: items.length,
    TEXT: 0,
    IMAGE: 0,
    AUDIO: 0,
    VIDEO: 0
  };
  
  items.forEach(item => {
    if (item.type) {
      const type = item.type.toUpperCase() as FilterOption;
      if (type in counts) {
        counts[type]++;
      }
    }
  });
  
  return counts;
}

/**
 * Get responsive transform value based on screen size
 */
export function getResponsiveTransform(windowWidth: number): number {
  if (windowWidth < 768) return 60;
  if (windowWidth < 1024) return 50;
  return 42;
} 