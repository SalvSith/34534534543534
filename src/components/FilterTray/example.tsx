import React, { useState, useMemo } from 'react';
import FilterTray from './FilterTray';
import { filterItems } from './utils';
import { FilterableItem } from './types';

// Example card data
interface Card extends FilterableItem {
  id: number;
  type: 'image' | 'text' | 'blank';
  title: string;
  content?: string;
  starred?: boolean;
  image?: string;
}

const sampleCards: Card[] = [
  { id: 1, type: 'image', title: 'Gerald Image 1', starred: true, image: 'https://picsum.photos/290/363?random=1' },
  { id: 2, type: 'text', title: 'Character Description', content: 'Gerald of Rivendell, a graceful Witcher Elf...' },
  { id: 3, type: 'image', title: 'Gerald Image 2', starred: true, image: 'https://picsum.photos/290/363?random=2' },
  { id: 4, type: 'text', title: 'Background Story', content: 'His expertise in magic and combat...' },
  { id: 5, type: 'image', title: 'Gerald Image 3', starred: false, image: 'https://picsum.photos/290/363?random=3' },
  { id: 6, type: 'blank', title: 'New Card' },
  { id: 7, type: 'text', title: 'Quest Details', content: 'Gerald\'s quest for knowledge...' },
  { id: 8, type: 'image', title: 'Gerald Image 4', starred: true, image: 'https://picsum.photos/290/363?random=4' },
];

// Card component
function Card({ card }: { card: Card }) {
  if (card.type === 'image') {
    return (
      <div className="bg-white rounded-3xl aspect-[290/363] overflow-hidden shadow-sm border-4 border-white relative">
        <img src={card.image} alt={card.title} className="w-full h-full object-cover" />
        {card.starred && (
          <div className="absolute top-4 left-4 w-10 h-10 bg-slate-50/80 rounded-full flex items-center justify-center">
            <span className="w-4 h-4 text-slate-950">★</span>
          </div>
        )}
      </div>
    );
  }
  
  if (card.type === 'text') {
    return (
      <div className="bg-slate-50 rounded-3xl aspect-[290/363] p-6 shadow-sm border-4 border-white flex flex-col justify-between">
        <div>
          <h3 className="font-medium text-lg text-slate-950 mb-4">{card.title}</h3>
          <p className="font-regular text-slate-950/80 text-sm leading-6">{card.content}</p>
        </div>
      </div>
    );
  }
  
  // Blank card
  return (
    <div className="bg-slate-50 rounded-3xl aspect-[290/363] p-6 shadow-sm border-4 border-white flex flex-col justify-between">
      <div>
        <div className="text-slate-950/80 text-sm space-y-2">
          <p>Your card text here...</p>
          <p>Associate other cards with @card</p>
          <p>Organise your library with #tags</p>
        </div>
      </div>
    </div>
  );
}

// Main example component
export default function FilterTrayExample() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchValue, setSearchValue] = useState('');

  // Filter cards based on current filter and search
  const filteredCards = useMemo(() => {
    return filterItems(sampleCards, activeFilter as any, searchValue);
  }, [activeFilter, searchValue]);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div 
        className="bg-slate-50 rounded-3xl border-4 border-white shadow-lg overflow-hidden relative w-full max-w-[1024px] mx-auto"
        style={{
          height: '80vh',
          maxHeight: '900px',
          minHeight: '600px'
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-0">
          <div>
            <div className="flex items-center gap-2 text-sm mb-2">
              <span className="text-slate-500">Library</span>
              <span className="text-slate-500">›</span>
              <span className="text-slate-950">Heroes</span>
            </div>
            <h1 className="font-medium text-2xl text-slate-950 tracking-tight">Gerald of Rivendell</h1>
          </div>
        </div>

        {/* Content with FilterTray */}
        <div className="flex flex-col h-full pt-6 relative min-h-0">
          {/* Your existing content */}
          <div className="px-6 pb-6 flex-shrink-0">
            <p className="text-slate-950/80 leading-6 mb-4">
              Gerald of Rivendell, a graceful Witcher Elf, is known for his unmatched agility and wisdom.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-4 flex-shrink-0">
            <div className="flex items-center justify-between gap-3">
              <div className="flex gap-3">
                <button className="bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-full">
                  <span className="font-bold text-xs text-purple-800 uppercase">Attach</span>
                </button>
                
                {/* FilterTray Component */}
                <FilterTray
                  isVisible={true}
                  onFilterChange={setActiveFilter}
                  onSearchChange={setSearchValue}
                >
                  {/* Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCards.map((card) => (
                      <Card key={card.id} card={card} />
                    ))}
                  </div>
                </FilterTray>
              </div>
              
              <button className="bg-purple-800 hover:bg-slate-800 px-4 py-2 rounded-full">
                <span className="font-bold text-xs text-white uppercase">Save Card</span>
              </button>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-slate-200 flex-shrink-0"></div>

          {/* Bottom section - this will be the background for the tray */}
          <div className="bg-slate-100 flex-1 flex flex-col overflow-hidden min-h-0">
            {/* Default content when no filters */}
            <div className="p-6">
              <p className="text-slate-600">
                Click the Filter button above to see the draggable filter tray in action!
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sampleCards.slice(0, 3).map((card) => (
                  <Card key={card.id} card={card} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 