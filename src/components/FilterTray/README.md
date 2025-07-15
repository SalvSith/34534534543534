# FilterTray Component Package

A drag-and-drop filter tray component for React applications with responsive design and mobile support.

## Features

- 🖱️ **Draggable Desktop Interface**: Smooth drag-to-expand tray with customizable positioning
- 📱 **Responsive Mobile Design**: Optimized mobile interface with touch-friendly controls  
- 🔍 **Built-in Search**: Integrated search functionality with debouncing
- 🏷️ **Filter Categories**: Support for ALL, TEXT, IMAGE, AUDIO, VIDEO filter types
- ⚡ **TypeScript Support**: Full TypeScript definitions included
- 🎨 **Tailwind CSS Styled**: Modern design using Tailwind CSS classes
- 🔧 **Utility Functions**: Helper functions for filtering and data manipulation

## Installation

Copy the `FilterTray` folder to your project and ensure you have the required dependencies:

```bash
npm install react lucide-react
# If using TypeScript
npm install -D @types/react
```

## Quick Start

```tsx
import React, { useState } from 'react';
import { FilterTray, filterItems } from './FilterTray';

function MyComponent() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchValue, setSearchValue] = useState('');
  
  const myData = [
    { id: 1, type: 'text', title: 'Document 1', content: 'Sample content' },
    { id: 2, type: 'image', title: 'Photo 1', content: 'Sample photo' },
    // ... more data
  ];

  const filteredData = filterItems(myData, activeFilter, searchValue);

  return (
    <div className="relative">
      {/* Your existing UI */}
      <div className="flex gap-3">
        <FilterTray
          isVisible={true}
          onFilterChange={setActiveFilter}
          onSearchChange={setSearchValue}
        >
          {/* Your filtered content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredData.map(item => (
              <div key={item.id}>{item.title}</div>
            ))}
          </div>
        </FilterTray>
      </div>
      
      {/* Background section for tray overlay */}
      <div className="bg-slate-100 flex-1 min-h-0">
        {/* Default content */}
      </div>
    </div>
  );
}
```

## Component API

### FilterTray Props

```tsx
interface FilterTrayProps {
  isVisible: boolean;              // Controls component visibility
  onFilterChange?: (filter: string) => void;  // Filter change callback
  onSearchChange?: (search: string) => void;  // Search change callback
  children: ReactNode;             // Content to display in the tray
  className?: string;              // Additional CSS classes
}
```

### useFilterTray Hook

```tsx
const { state, setShowFilters, setActiveFilter, setSearchValue } = useFilterTray();
```

Returns:
- `state`: Current filter tray state
- `setShowFilters`: Toggle filter visibility
- `setActiveFilter`: Set active filter
- `setSearchValue`: Set search value

## Layout Requirements

The FilterTray component requires a specific layout structure to work properly:

```tsx
<div className="relative">
  {/* Your content area */}
  <div className="flex-shrink-0">
    {/* Action buttons including FilterTray */}
    <FilterTray {...props}>
      {/* Filtered content */}
    </FilterTray>
  </div>
  
  {/* Separator line */}
  <div className="border-t border-slate-200"></div>
  
  {/* Background section - REQUIRED for desktop overlay */}
  <div className="bg-slate-100 flex-1 min-h-0">
    {/* Default content when filters closed */}
  </div>
</div>
```

## Data Filtering

### Using the filterItems utility

```tsx
import { filterItems } from './FilterTray';

const filteredData = filterItems(myData, activeFilter, searchValue);
```

### Data format requirements

Your data items should extend the `FilterableItem` interface:

```tsx
interface FilterableItem {
  id: string | number;
  type?: string;        // 'text', 'image', 'audio', 'video', etc.
  title?: string;       // Searchable field
  content?: string;     // Searchable field
  [key: string]: any;   // Additional properties
}
```

## Responsive Behavior

### Desktop (≥768px)
- Draggable overlay tray
- Tabs-style filter interface
- Smooth drag animations
- Search input in header

### Mobile (<768px)  
- Pill-style filter buttons
- Touch-optimized interface
- Full-width search input
- Scrollable content area

## Styling and Customization

The component uses Tailwind CSS classes. Key customization points:

```tsx
// Filter button colors
className="border-purple-800 bg-purple-50 text-purple-800"  // Active
className="border-slate-200 text-slate-500"                 // Inactive

// Tray background
className="bg-slate-100"

// Drag handle
className="bg-slate-300 hover:bg-slate-400"
```

## Utility Functions

### debounce
```tsx
import { debounce } from './FilterTray';

const debouncedSearch = debounce(setSearchValue, 300);
```

### getFilterCounts
```tsx
import { getFilterCounts } from './FilterTray';

const counts = getFilterCounts(myData);
// Returns: { ALL: 10, TEXT: 4, IMAGE: 3, AUDIO: 2, VIDEO: 1 }
```

## Advanced Usage

### Custom Filter Options

You can extend the filter options by modifying the `FILTER_OPTIONS` and `FILTER_ICONS` constants in `FilterTray.tsx`.

### Custom Drag Behavior

The drag sensitivity can be adjusted by modifying the `maxDrag` value in the `handleDragMove` function.

### Performance Optimization

For large datasets, consider implementing virtualization or pagination within the children content.

## Troubleshooting

### Tray not positioning correctly
- Ensure the parent container has `position: relative`
- Verify the background section exists with proper classes
- Check that container has proper height constraints

### Mobile version not showing
- Verify screen width is below 768px breakpoint
- Check that Tailwind CSS is properly configured
- Ensure responsive classes are not being overridden

### Drag functionality not working
- Check that the drag handle element is not being blocked
- Verify touch events are properly supported
- Ensure pointer-events are not disabled

## Dependencies

- `react` (>=16.8.0)
- `lucide-react` (for icons)
- `tailwindcss` (for styling)

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers with touch support

## License

MIT License - feel free to use in your projects.

---

For more examples, see the `example.tsx` file included in this package. 