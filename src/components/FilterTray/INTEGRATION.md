# FilterTray Integration Guide

## What's Included

This package contains a complete draggable filter tray component with all the functionality you've seen, packaged for easy integration.

### Package Contents

```
FilterTray/
├── FilterTray.tsx        # Main component with drag functionality
├── types.ts              # TypeScript interfaces
├── utils.ts              # Utility functions for filtering
├── example.tsx           # Complete usage example
├── index.ts              # Main exports
├── package.json          # Package configuration
├── README.md             # Full documentation
└── INTEGRATION.md        # This guide
```

## Quick Integration (3 Steps)

### 1. Copy the FilterTray folder to your project

```bash
cp -r FilterTray/ src/components/
```

### 2. Install dependencies

```bash
npm install lucide-react
```

### 3. Use in your component

```tsx
import { FilterTray, filterItems } from './components/FilterTray';

// In your component:
<FilterTray
  isVisible={true}
  onFilterChange={setActiveFilter}
  onSearchChange={setSearchValue}
>
  {/* Your filtered content */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {filteredItems.map(item => (
      <YourCard key={item.id} item={item} />
    ))}
  </div>
</FilterTray>
```

## Key Features Included

✅ **Draggable desktop tray** - Smooth drag-to-expand with responsive positioning  
✅ **Mobile-optimized interface** - Touch-friendly pill buttons and search  
✅ **Built-in filtering** - ALL, TEXT, IMAGE, AUDIO, VIDEO filters  
✅ **Search functionality** - Integrated search with debouncing  
✅ **Responsive breakpoints** - Automatically switches at 768px  
✅ **TypeScript support** - Full type definitions included  
✅ **Utility functions** - Helper functions for data filtering  
✅ **Tailwind styled** - Modern design with customizable classes  

## Layout Requirements

Your container needs this structure:

```tsx
<div className="relative">
  {/* Content area */}
  <div className="flex-shrink-0">
    <FilterTray {...props}>
      {/* Filtered content */}
    </FilterTray>
  </div>
  
  {/* Separator - REQUIRED */}
  <div className="border-t border-slate-200"></div>
  
  {/* Background section - REQUIRED for overlay */}
  <div className="bg-slate-100 flex-1 min-h-0">
    {/* Default content */}
  </div>
</div>
```

## Data Format

Your items should follow this structure:

```tsx
interface YourItem {
  id: string | number;
  type?: 'text' | 'image' | 'audio' | 'video';
  title?: string;    // Searchable
  content?: string;  // Searchable
  // ...other properties
}
```

## Customization

- **Colors**: Modify the Tailwind classes in FilterTray.tsx
- **Breakpoints**: Adjust responsive classes (currently md: = 768px)
- **Drag sensitivity**: Change maxDrag value in handleDragMove
- **Filter options**: Modify FILTER_OPTIONS and FILTER_ICONS arrays

## Need Help?

- Check `example.tsx` for a complete working example
- See `README.md` for full documentation
- All utility functions are in `utils.ts`
- Type definitions are in `types.ts`

This is a plug-and-play solution that includes all the draggable filter functionality you've built and tested! 