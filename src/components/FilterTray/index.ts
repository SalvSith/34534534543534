// Main component
export { default as FilterTray, useFilterTray } from './FilterTray';

// Types
export type {
  FilterTrayProps,
  FilterTrayState,
  FilterOption,
  FilterTrayHookReturn,
  FilterResult,
  FilterableItem
} from './types';

// Utilities
export {
  filterItems,
  debounce,
  getFilterCounts,
  getResponsiveTransform
} from './utils';

// Example (for reference)
export { default as FilterTrayExample } from './example'; 