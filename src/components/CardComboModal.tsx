import { 
  ChevronRight, 
  File, 
  Star, 
  Paperclip, 
  Search,
  CheckCheck,
  FileText,
  Image as ImageIcon,
  FileAudio,
  FileVideo2,
  Filter,
  X,
  List,
  Grid3x3,
  Eye,
  Trash2,
  Copy,
  FolderOpen
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

// Asset URLs for character images - using local Demo Characters
const demoCharacterImages = [
    "/Demo Characters/1.png",
    "/Demo Characters/2.png", 
    "/Demo Characters/3.png",
    "/Demo Characters/4.png",
    "/Demo Characters/5.png",
    "/Demo Characters/6.png",
    "/Demo Characters/7.png",
    "/Demo Characters/8.png",
    "/Demo Characters/9.png",
    "/Demo Characters/10.png"
];

// Character names corresponding to each demo image
const demoCharacterNames = [
    "Aria Moonwhisper",
    "Thane Ironforge", 
    "Luna Starweaver",
    "Gareth Stormwind",
    "Seraphina Dawnbringer",
    "Kael Shadowbane",
    "Lyra Frostborn",
    "Draven Nightfall",
    "Celeste Goldenheart",
    "Zara Flamestrike"
];

// Function to get unique demo character image for image cards only
const getUniqueImageForCard = (cards: any[], cardIndex: number) => {
    // Filter to get only image cards up to the current index
    const imageCards = cards.slice(0, cardIndex + 1).filter(card => card.mediaType === 'image');
    const imageCardIndex = imageCards.length - 1; // Current image card's position among image cards
    
    // Return demo character image if we have enough, otherwise fallback
    if (imageCardIndex < demoCharacterImages.length) {
        return demoCharacterImages[imageCardIndex];
    }
    return null; // Will fallback to default image
};

// Function to get unique demo character name for image cards only
const getUniqueNameForCard = (cards: any[], cardIndex: number) => {
    // Filter to get only image cards up to the current index
    const imageCards = cards.slice(0, cardIndex + 1).filter(card => card.mediaType === 'image');
    const imageCardIndex = imageCards.length - 1; // Current image card's position among image cards
    
    // Return demo character name if we have enough, otherwise fallback
    if (imageCardIndex < demoCharacterNames.length) {
        return demoCharacterNames[imageCardIndex];
    }
    return null; // Will fallback to original title
};

// Use demo character images as fallbacks
const imgFrame184 = "/Demo Characters/1.png";
const imgAvatar = "/Demo Characters/10.png";

// Assets from Figma design for hover tooltip - using demo character images as fallbacks
const imgImage = "/Demo Characters/9.png";
const imgImage1 = "/Demo Characters/2.png";
const imgFrame187 = "/Demo Characters/3.png";
const imgFrame185 = "/Demo Characters/4.png";
const imgFrame186 = "/Demo Characters/5.png";
// const imgHexagon = "http://localhost:3845/assets/d090f3ed711491b6d26d07800ce108242a362927.svg";
// const imgPlus = "http://localhost:3845/assets/7bac326c57b9f7353e78a7b7bf2380cc8cac46cb.svg";

// Hover tooltip component - EXACT 1:1 copy from Figma frame
interface HoverTooltipProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    itemCount?: number;
    disabled?: boolean;
}

function HoverTooltip({ children, title = "Heroes Collection", description = "A diverse collection of mystical characters, each with unique abilities and wisdom. From graceful Witcher Elves to battle-hardened warriors, they navigate the mystical realms with ease. Their combined expertise in magic and combat makes them formidable allies, while their deep connections to nature allow them to communicate with the forest spirits.", itemCount = 10, disabled = false }: HoverTooltipProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [isHoveringTooltip, setIsHoveringTooltip] = useState(false);
    const [tooltipCampaignActive, setTooltipCampaignActive] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const handleMouseEnter = () => {
        if (disabled) return;
        
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        if (!isHoveringTooltip) {
            timeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 100);
        }
    };

    const handleTooltipEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
        setIsHoveringTooltip(true);
    };

    const handleTooltipLeave = () => {
        setIsHoveringTooltip(false);
        timeoutRef.current = setTimeout(() => {
            setIsVisible(false);
        }, 100);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Hide tooltip when component becomes disabled
    useEffect(() => {
        if (disabled && isVisible) {
            setIsVisible(false);
            setIsHoveringTooltip(false);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        }
    }, [disabled, isVisible]);

    return (
        <div 
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
            {isVisible && (
                <div 
                    className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-[9999] pointer-events-auto"
                    onMouseEnter={handleTooltipEnter}
                    onMouseLeave={handleTooltipLeave}
                >
                    {/* Figma frame - reduced by 45% while maintaining proportions */}
                    <div className="bg-[#ffffff] relative rounded-xl w-[176px] h-[220px]" data-name="Hover Tooltip Card">
                        <div className="box-border content-stretch flex flex-col items-start justify-start overflow-clip p-0 relative size-full">
                            {/* Background image with overlay */}
                            <div className="absolute bg-center bg-cover bg-no-repeat inset-0 rounded-xl" style={{ backgroundImage: `url('${imgImage1}')` }}/>
                            <div className="absolute backdrop-blur backdrop-filter bg-gradient-to-t from-[#f8fafc80] inset-0 rounded-xl to-[#f8fafccc]"/>
                            
                            {/* Header section with title and action */}
                            <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                                <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                                    <div className="relative size-full">
                                        <div className="box-border content-stretch flex flex-col gap-1 items-start justify-start leading-[0] not-italic pb-2 pl-3 pr-0 pt-3 relative text-left text-slate-950 w-full">
                                            <div className={`font-['HvDTrial_Brandon_Grotesque:Medium',_sans-serif] font-medium relative shrink-0 tracking-[-0.3px] w-full transition-all duration-200 ${isVisible ? 'text-[12px]' : 'text-[11px]'}`}>
                                                <p className="block leading-none">{title}</p>
                                            </div>
                                            <div className={`font-['HvDTrial_Brandon_Grotesque:Regular',_sans-serif] font-normal relative shrink-0 w-full transition-all duration-200 ${isVisible ? 'text-[10px]' : 'text-[8px]'}`}>
                                                <p className="block leading-[11px]">{itemCount} items</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="shrink-0 size-8"/>
                                
                                {/* Add to campaign button */}
                                <div className="absolute box-border content-stretch flex flex-row items-center justify-end left-2 overflow-clip pl-2 pr-1 py-1 right-2 rounded-xl top-2">
                                    <button 
                                        onClick={() => setTooltipCampaignActive(!tooltipCampaignActive)}
                                        className="relative shrink-0 size-6 cursor-pointer hover:opacity-80 transition-all duration-300 ease-in-out"
                                    >
                                        <img 
                                            src="/AddToCampaign-simple.svg"
                                            alt="Add to Campaign" 
                                            className={`absolute inset-0 w-full h-full object-contain transition-all duration-300 ease-in-out ${tooltipCampaignActive ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
                                        />
                                        <img 
                                            src="/AddToCampaign-ON.svg"
                                            alt="Add to Campaign (Active)" 
                                            className={`absolute inset-0 w-full h-full object-contain transition-all duration-300 ease-in-out ${tooltipCampaignActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
                                        />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Content section */}
                            <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
                                <div className="relative size-full">
                                    <div className="box-border content-stretch flex flex-col gap-2 items-start justify-start pb-3 pt-0 px-3 relative size-full">
                                        <div className="line-clamp-5 basis-0 font-['HvDTrial_Brandon_Grotesque:Regular',_sans-serif] font-normal grow min-h-px min-w-px not-italic opacity-80 relative shrink-0 text-[11px] text-left text-slate-950 w-full">
                                            <p className="block leading-[16px]">{description}</p>
                                        </div>
                                        
                                        {/* Thumbnail images - scaled down proportionally */}
                                        <div className="box-border content-stretch flex flex-row-reverse gap-0.5 items-start justify-start p-0 relative shrink-0">
                                            <div className="bg-center bg-cover bg-no-repeat h-[41px] order-4 relative rounded-md shrink-0 w-[36px] hover:scale-105 transition-transform duration-200 cursor-pointer" style={{ backgroundImage: `url('${imgImage1}')` }}>
                                                <div className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_1px_-1px_rgba(0,0,0,0.1)]"/>
                                            </div>
                                            <div className="[background-size:cover,_auto] bg-[#ffffff] bg-[position:50%_50%,_0%_0%] h-[41px] order-3 relative rounded-md shrink-0 w-[36px] hover:scale-105 transition-transform duration-200 cursor-pointer" style={{ backgroundImage: `url('${imgFrame187}')` }}>
                                                <div className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_1px_-1px_rgba(0,0,0,0.1)]"/>
                                            </div>
                                            <div className="[background-size:cover,_auto] bg-[#ffffff] bg-[position:50%_50%,_0%_0%] h-[41px] order-2 relative rounded-md shrink-0 w-[36px] hover:scale-105 transition-transform duration-200 cursor-pointer" style={{ backgroundImage: `url('${imgFrame185}')` }}>
                                                <div className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_1px_-1px_rgba(0,0,0,0.1)]"/>
                                            </div>
                                            <div className="[background-size:cover,_auto] bg-[#ffffff] bg-[position:50%_50%,_0%_0%] h-[41px] order-1 relative rounded-md shrink-0 w-[36px] hover:scale-105 transition-transform duration-200 cursor-pointer" style={{ backgroundImage: `url('${imgFrame186}')` }}>
                                                <div className="absolute border border-[#ffffff] border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_1px_-1px_rgba(0,0,0,0.1)]"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Avatar section */}
                            <div className="relative shrink-0 w-full">
                                <div className="flex flex-col items-end justify-end relative size-full">
                                    <div className="box-border content-stretch flex flex-col gap-2 items-end justify-end pb-3 pt-0 px-3 relative w-full">
                                        <div className="relative rounded-[9999px] shrink-0">
                                            <div className="box-border content-stretch flex flex-row items-center justify-start overflow-clip p-0 relative">
                                                <div className="bg-center bg-cover bg-no-repeat rounded-[9999px] shrink-0 size-4" style={{ backgroundImage: `url('${imgImage}')` }}/>
                                            </div>
                                            <div className="absolute border border-slate-200 border-solid inset-0 pointer-events-none rounded-[9999px]"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Scaled border */}
                        <div className="absolute border-2 border-[#ffffff] border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_1px_-1px_rgba(0,0,0,0.1)]"/>
                    </div>
                    
                    {/* Tooltip arrow */}
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                        <div className="w-3 h-3 bg-white border-r border-b border-white rotate-45 transform -translate-y-1/2 shadow-sm"/>
                    </div>
                </div>
            )}
        </div>
    );
}

function LucideIconsChevronRight() {
    return (
        <ChevronRight className="w-4 h-4 text-slate-500" strokeWidth={2} />
    );
}

function AddToCampaignSimple({ active = false, onClick }: { active?: boolean; onClick?: (e?: React.MouseEvent) => void }) {
    return (
        <button 
            className="relative size-full cursor-pointer hover:opacity-80" 
            data-name={active ? "selected=yes" : "selected=no"}
            onClick={onClick}
        >
            <img 
                src="/AddToCampaign-simple.svg"
                alt="Add to Campaign" 
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-300 ease-in-out ${active ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
            />
            <img 
                src="/AddToCampaign-ON.svg"
                alt="Add to Campaign (Active)" 
                className={`absolute inset-0 w-full h-full object-contain transition-all duration-300 ease-in-out ${active ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
            />
        </button>
    );
}

// Unused component - keeping for future use
// function IconButton() {
// return null;
// }



// Context Menu Component
interface MenuItem {
    label: string;
    icon: React.ComponentType<any>;
    onClick: () => void;
    variant?: 'default' | 'danger';
}

interface ContextMenuProps {
    x: number;
    y: number;
    onClose: () => void;
    items: MenuItem[];
    excludeRefs?: React.RefObject<HTMLElement>[];
}

function ContextMenu({ x, y, onClose, items, excludeRefs = [] }: ContextMenuProps) {
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            
            // Don't close if clicking on the menu itself
            if (menuRef.current && menuRef.current.contains(target)) {
                return;
            }
            
            // Don't close if clicking on any excluded elements (like the trigger button)
            for (const ref of excludeRefs) {
                if (ref.current && ref.current.contains(target)) {
                    return;
                }
            }
            
            onClose();
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        // Delay adding the click-outside listener to avoid catching the initial right-click
        const timeoutId = setTimeout(() => {
            document.addEventListener('mousedown', handleClickOutside);
        }, 10);
        
        document.addEventListener('keydown', handleEscape);
        
        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [onClose, excludeRefs]);

    // Calculate position that stays within viewport
    const [position, setPosition] = useState({ x, y });
    
    useEffect(() => {
        if (menuRef.current) {
            const rect = menuRef.current.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            
            let adjustedX = x;
            let adjustedY = y;
            
            // Adjust if menu would go off right edge
            if (x + rect.width > viewportWidth) {
                adjustedX = viewportWidth - rect.width - 8;
            }
            
            // Adjust if menu would go off bottom edge
            if (y + rect.height > viewportHeight) {
                adjustedY = viewportHeight - rect.height - 8;
            }
            
            // Only update if position actually changed
            if (adjustedX !== position.x || adjustedY !== position.y) {
                setPosition({ x: adjustedX, y: adjustedY });
            }
        }
    }, [x, y, position.x, position.y]);

    const menuElement = (
        <div
            ref={menuRef}
            className="fixed z-50 bg-white rounded-xl min-w-32 border border-slate-200 shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]"
            style={{ left: `${position.x}px`, top: `${position.y}px` }}
            data-name="Context Menu"
        >
            <div className="flex flex-col p-1">
                {items.map((item, index) => {
                    const Icon = item.icon;
                    const isDanger = item.variant === 'danger';
                    
                    return (
                        <button
                            key={index}
                            onClick={() => {
                                item.onClick();
                                onClose();
                            }}
                            className={`flex items-center gap-2 px-2 py-1.5 rounded-lg transition-colors duration-200 w-full text-left ${
                                isDanger ? 'hover:bg-red-50' : 'hover:bg-slate-100'
                            }`}
                        >
                            <Icon className={`w-4 h-4 ${isDanger ? 'text-red-500' : 'text-slate-500'}`} strokeWidth={2} />
                            <span className={`font-hvd-regular text-[14px] leading-[20px] ${
                                isDanger ? 'text-red-600' : 'text-slate-950'
                            }`}>
                                {item.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    // Render the context menu at document.body level to avoid positioning issues
    return createPortal(menuElement, document.body);
}

interface CardItemProps {
    bodyCopy?: string;
    blank?: 'no' | 'yes';
    images?: 'none' | 'many' | 'one';
    state?: 'Default' | 'hover';
    imageStarred?: 'no' | 'yes';
    mediaType?: 'collection' | 'card' | 'image';
    cardIndex?: number;
    onDelete?: (cardIndex: number) => void;
    onSetCover?: (cardIndex: number) => void;
    showAvatar?: boolean;
    showStarIcon?: boolean;
    moreCount?: number;
    imageUrl?: string;
    title?: string;
    itemCount?: number;
    isCoverImage?: boolean;
    isSingleImageCard?: boolean;
}

function CardItem({ 
    bodyCopy = "This collection features diverse mystical characters, each with unique abilities and wisdom. From graceful Witcher Elves to battle-hardened warriors, they navigate the mystical realms with ease. Their combined expertise in magic and combat makes them formidable allies, while their deep connections to nature allow them to communicate with the forest spirits.",
    blank = "yes",
    images = "none",
    state = "Default",
    imageStarred = "no",
    mediaType = "card",
    cardIndex,
    onDelete,
    onSetCover,
    showAvatar = true,
    showStarIcon = true,
    moreCount = 0,
    imageUrl,
    title = "Signs (Spells)",
    itemCount = 12,
    isCoverImage = false,
    isSingleImageCard = false
}: CardItemProps) {
    const [contextMenu, setContextMenu] = useState<{ x: number; y: number } | null>(null);

    const handleRightClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY });
    };

    const handleView = () => {
        console.log('View image card');
        // Add your view logic here
    };

    const handleSetCover = () => {
        if (cardIndex !== undefined && onSetCover) {
            onSetCover(cardIndex);
        }
    };

    const handleDelete = () => {
        if (cardIndex !== undefined && onDelete) {
            onDelete(cardIndex);
        }
    };

    // Custom context menu items for cover image
    const getContextMenuItems = () => {
        if (isCoverImage) {
            // If this is a single image card, show "Delete" instead of "Remove cover"
            if (isSingleImageCard) {
                return [{
                    label: 'Delete',
                    icon: Trash2,
                    onClick: handleDelete,
                    variant: 'danger' as const
                }];
            } else {
                return [{
                    label: 'Remove cover',
                    icon: Star,
                    onClick: handleSetCover
                }];
            }
        }
        
        // Default context menu for regular cards
        return [
            {
                label: 'View',
                icon: Eye,
                onClick: handleView
            },
            ...(mediaType === 'image' ? [{
                label: imageStarred === 'yes' ? 'Remove cover' : 'Set cover',
                icon: Star,
                onClick: handleSetCover
            }] : []),
            {
                label: 'Delete',
                icon: Trash2,
                onClick: handleDelete,
                variant: 'danger' as const
            }
        ];
    };

    const element = (
        <div className="absolute border-2 border-slate-200 border-solid inset-0 pointer-events-none rounded-full"/>
    );
    const element1 = (
        <div className="absolute border-4 border-white border-solid inset-0 pointer-events-none rounded-3xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
    );

    if (blank === 'no' && images === 'many' && state === 'Default' && mediaType === 'image') {
        return (
            <>
                <div 
                    className="relative rounded-3xl size-full bg-white"
                    onContextMenu={handleRightClick}
                >
                <div className="box-border content-stretch flex flex-col items-start justify-start overflow-hidden p-0 relative size-full">
                    <div className="absolute aspect-[290/363] bg-center bg-cover bg-no-repeat left-0 right-0 rounded-3xl top-1/2 translate-y-[-50%]" style={{ backgroundImage: `url('${imageUrl || imgFrame184}')` }}/>
                    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
                        <div className="relative size-full">
                            <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start pb-6 pt-0 px-6 size-full"/>
                        </div>
                    </div>
                    {showAvatar && (
                        <div className="relative shrink-0 w-full">
                            <div className="flex flex-col items-end justify-end relative size-full">
                                <div className="box-border content-stretch flex flex-col gap-4 items-end justify-end pb-6 pt-0 px-6 relative w-full">
                                    <div className="relative rounded-full shrink-0">
                                        <div className="box-border content-stretch flex flex-row items-center justify-start overflow-hidden p-0 relative">
                                                <div className="bg-center bg-cover bg-no-repeat rounded-full shrink-0 size-8" style={{ backgroundImage: `url('${imgAvatar}')` }}/>
                                        </div>
                                        {element}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {showStarIcon && imageStarred === 'yes' && (
                        <div className="absolute bg-[rgba(248,250,252,0.5)] left-4 rounded-full size-10 top-4 flex items-center justify-center">
                            <Star className="w-4 h-4 text-slate-950 fill-current" />
                        </div>
                    )}
                </div>
                {element1}
            </div>
                
                {/* Context Menu */}
                {contextMenu && (
                    <ContextMenu
                        x={contextMenu.x}
                        y={contextMenu.y}
                        onClose={() => setContextMenu(null)}
                        items={getContextMenuItems()}
                    />
                )}
            </>
        );
    }

    if (blank === 'no' && images === 'one' && state === 'Default' && mediaType === 'card') {
        return (
            <>
            <div 
                className="bg-slate-50 relative rounded-3xl size-full"
                onContextMenu={handleRightClick}
            >
                <div className="box-border content-stretch flex flex-col items-start justify-start overflow-hidden p-0 relative size-full">
                    {/* Header with title and subtitle */}
                    <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                        <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                            <div className="relative size-full">
                                <div className="box-border content-stretch flex flex-col gap-1.5 items-start justify-start pb-4 pl-6 pr-0 pt-6 relative w-full">
                                    <div className="font-hvd-medium leading-none not-italic relative shrink-0 text-[20px] text-left text-slate-950 tracking-[-0.6px] w-full">
                                        <p className="block leading-none">{title}</p>
                                    </div>
                                    <div className="font-hvd-regular leading-[20px] not-italic relative shrink-0 text-[14px] text-left text-slate-500 w-full">
                                        <p className="block leading-[20px]">{itemCount} items</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="shrink-0 size-14"/>
                    </div>
                    
                    {/* Content section */}
                    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
                        <div className="relative size-full">
                            <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start pb-6 pt-0 px-6 relative size-full">
                                <div className="basis-0 font-hvd-regular grow min-h-px min-w-px not-italic opacity-80 overflow-hidden text-ellipsis relative shrink-0 text-[16px] text-left text-slate-950 w-full leading-[24px]">
                                    <p className="block leading-[24px]">{bodyCopy}</p>
                                </div>
                                
                                {/* Row of thumbnail images */}
                                <div className="box-border content-stretch flex flex-row gap-1 items-start justify-start p-0 relative shrink-0 pr-12">
                                    <div className="bg-center bg-cover bg-no-repeat h-[75px] relative rounded-lg shrink-0 w-[65px] hover:scale-105 transition-transform duration-200 cursor-pointer" style={{ backgroundImage: `url('${imageUrl || imgFrame184}')` }}>
                                        <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
                                    </div>
                                    <div className="bg-center bg-cover bg-no-repeat h-[75px] relative rounded-lg shrink-0 w-[65px] hover:scale-105 transition-transform duration-200 cursor-pointer" style={{ backgroundImage: `url('${imgFrame187}')` }}>
                                        <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
                                    </div>
                                    <div className="bg-center bg-cover bg-no-repeat h-[75px] relative rounded-lg shrink-0 w-[65px] hover:scale-105 transition-transform duration-200 cursor-pointer" style={{ backgroundImage: `url('${imgFrame185}')` }}>
                                        <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
                                    </div>
                                    {moreCount > 0 ? (
                                        <div className="bg-center bg-cover bg-no-repeat h-[75px] relative rounded-lg shrink-0 w-[65px] hover:scale-105 transition-transform duration-200 cursor-pointer flex flex-col items-center justify-center" style={{ backgroundImage: `url('${[imgFrame184, imgFrame187, imgFrame185, imgFrame186][(cardIndex || 0) % 4]}')` }}>
                                            {/* Blur overlay */}
                                            <div className="absolute inset-0 backdrop-blur-sm bg-white/60 rounded-lg"></div>
                                            {/* Content */}
                                            <div className="relative z-10 flex flex-col items-center justify-center">
                                                <div className="font-hvd-medium text-[16px] text-slate-950 leading-none">
                                                    +{moreCount}
                                                </div>
                                                <div className="font-hvd-regular text-[12px] text-slate-600 leading-none mt-1">
                                                    more
                                                </div>
                                            </div>
                                            <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
                                        </div>
                                    ) : (
                                        <div className="bg-center bg-cover bg-no-repeat h-[75px] relative rounded-lg shrink-0 w-[65px] hover:scale-105 transition-transform duration-200 cursor-pointer" style={{ backgroundImage: `url('${imgFrame186}')` }}>
                                            <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Avatar section - matches HoverTooltip layout */}
                    {showAvatar && (
                        <div className="relative shrink-0 w-full">
                            <div className="flex flex-col items-end justify-end relative size-full">
                                <div className="box-border content-stretch flex flex-col gap-2 items-end justify-end pb-6 pt-0 px-6 relative w-full">
                                    <div className="relative rounded-full shrink-0">
                                        <div className="box-border content-stretch flex flex-row items-center justify-start overflow-hidden p-0 relative">
                                            <div className="bg-center bg-cover bg-no-repeat rounded-full shrink-0 size-8" style={{ backgroundImage: `url('${imgAvatar}')` }}/>
                                        </div>
                                        {element}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {showStarIcon && imageStarred === 'yes' && (
                        <div className="absolute bg-[rgba(248,250,252,0.5)] left-4 rounded-full size-10 top-4 flex items-center justify-center">
                            <Star className="w-4 h-4 text-slate-950 fill-current" />
                        </div>
                    )}
                    {element1}
                </div>
            </div>
            
            {/* Context Menu */}
            {contextMenu && (
                <ContextMenu
                    x={contextMenu.x}
                    y={contextMenu.y}
                    onClose={() => setContextMenu(null)}
                    items={getContextMenuItems()}
                />
            )}
            </>
        );
    }

    // Default blank card
    return (
        <>
        <div 
            className="bg-slate-50 relative rounded-3xl size-full"
            onContextMenu={handleRightClick}
        >
            <div className="box-border content-stretch flex flex-col items-start justify-start overflow-hidden p-0 relative size-full">
                <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                        <div className="relative size-full">
                            <div className="box-border content-stretch flex flex-col gap-1.5 items-start justify-start pl-6 pr-0 py-6 relative w-full">
                                <div className="font-hvd-medium leading-none not-italic relative shrink-0 text-[20px] text-left text-slate-950 tracking-[-0.6px] w-full">
                                    <p className="block leading-none"></p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="shrink-0 size-14"/>
                </div>
                <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
                    <div className="relative size-full">
                        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start pb-6 pt-0 px-6 relative size-full">
                            <div className="basis-0 font-hvd-regular grow leading-[24px] min-h-px min-w-px not-italic opacity-80 overflow-hidden text-ellipsis relative shrink-0 text-[16px] text-left text-slate-950 w-full line-clamp-2">
                                <p className="block mb-0">Your card text here...</p>
                                <p className="block mb-0">Associate other cards with @card</p>
                                <p className="block">Organise your library with #tags</p>
                            </div>
                        </div>
                    </div>
                </div>
                {showAvatar && (
                    <div className="relative shrink-0 w-full">
                        <div className="flex flex-col items-end justify-end relative size-full">
                            <div className="box-border content-stretch flex flex-col gap-4 items-end justify-end pb-6 pt-0 px-6 relative w-full">
                                <div className="relative rounded-full shrink-0">
                                    <div className="box-border content-stretch flex flex-row items-center justify-start overflow-hidden p-0 relative">
                                        <div className="bg-center bg-cover bg-no-repeat rounded-full shrink-0 size-8" style={{ backgroundImage: `url('${imgAvatar}')` }}/>
                                    </div>
                                    {element}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {showStarIcon && imageStarred === 'yes' && (
                    <div className="absolute bg-[rgba(248,250,252,0.5)] left-4 rounded-full size-10 top-4 flex items-center justify-center">
                        <Star className="w-4 h-4 text-slate-950 fill-current" />
                    </div>
                )}
                {element1}
            </div>
        </div>
        
        {/* Context Menu */}
        {contextMenu && (
            <ContextMenu
                x={contextMenu.x}
                y={contextMenu.y}
                onClose={() => setContextMenu(null)}
                items={getContextMenuItems()}
            />
        )}
        </>
    );
}

interface ListViewItemProps {
    title?: string;
    bodyCopy?: string;
    imageUrl?: string;
    index?: number;
}

function ListViewItem({ 
    title = "Heroes Collection",
    bodyCopy = "A diverse collection of mystical characters, each with unique abilities and wisdom. From graceful Witcher Elves to battle-hardened warriors, they navigate the mystical realms with ease.",
    imageUrl = imgFrame184,
    index = 0
}: ListViewItemProps) {

    return (
        <div className={`${index % 2 === 0 ? 'bg-white hover:bg-slate-50' : 'bg-slate-50 hover:bg-slate-100'} border-b border-slate-100 transition-colors duration-200 cursor-pointer`}>
            <div className="flex items-center gap-4 px-4 py-3">
                {/* Thumbnail */}
                <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                    <div 
                        className="w-full h-full bg-center bg-cover bg-no-repeat"
                        style={{ backgroundImage: `url('${imageUrl}')` }}
                    />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                        <div className="flex-1">
                            <h3 className="font-hvd-medium text-[16px] text-slate-950 leading-tight mb-1 truncate">
                                {title}
                            </h3>
                            <p className="font-hvd-regular text-[14px] text-slate-600 leading-[20px] line-clamp-2 overflow-hidden text-ellipsis">
                                {bodyCopy}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CardComboModal() {
    const [showFilters, setShowFilters] = useState(false);
    const [campaignActive, setCampaignActive] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [searchFocused, setSearchFocused] = useState(false);
    const [activeFilter, setActiveFilter] = useState<'all' | 'cards' | 'images' | 'audio' | 'videos'>('all');
    const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
    const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
    const [hiddenCards, setHiddenCards] = useState<Set<number>>(new Set());
    const [starredCards, setStarredCards] = useState<Set<number>>(new Set([0])); // Card 0 starts starred
    const [ellipsisMenu, setEllipsisMenu] = useState<{ x: number; y: number } | null>(null);
    const ellipsisButtonRef = useRef<HTMLDivElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const filterButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
    const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
    const [hoverStyle, setHoverStyle] = useState({ width: 0, left: 0 });
    const [isInitialFilterPosition, setIsInitialFilterPosition] = useState(true);



    // Drag functionality state
    const [isDragging, setIsDragging] = useState(false);
    const [dragStartY, setDragStartY] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [dragMovement, setDragMovement] = useState(0);
    const dragHandleRef = useRef<HTMLDivElement>(null);

    // Check if device is mobile (screen width < 1024px which is the lg breakpoint)
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

        

    // Update indicator position when active filter changes or filters open
    useEffect(() => {
        const updateIndicatorPosition = () => {
            const filterKeys = ['all', 'cards', 'images', 'audio', 'videos'];
            const activeIndex = filterKeys.indexOf(activeFilter);
            const activeButton = filterButtonRefs.current[activeIndex];
            
            if (activeButton) {
                const containerRect = activeButton.parentElement?.getBoundingClientRect();
                const buttonRect = activeButton.getBoundingClientRect();
                
                if (containerRect && buttonRect.width > 0) {
                    setIndicatorStyle({
                        width: buttonRect.width,
                        left: buttonRect.left - containerRect.left
                    });
                    setIsInitialFilterPosition(false);
                }
            }
        };

        if (!showFilters) {
            // Reset when filters are hidden
            setIsInitialFilterPosition(true);
            return;
        }

        // For initial positioning when filters first open, use longer delay to ensure DOM is ready
        // For subsequent filter changes, use short delay
        const delay = isInitialFilterPosition ? 350 : 10;
        const timeoutId = setTimeout(updateIndicatorPosition, delay);
        
        return () => clearTimeout(timeoutId);
    }, [activeFilter, showFilters, isInitialFilterPosition]);

    // Clear hover state when filters are hidden
    useEffect(() => {
        if (!showFilters) {
            setHoveredFilter(null);
        }
    }, [showFilters]);

    // Also update on window resize
    useEffect(() => {
        const handleResize = () => {
            const filterKeys = ['all', 'cards', 'images', 'audio', 'videos'];
            const activeIndex = filterKeys.indexOf(activeFilter);
            const activeButton = filterButtonRefs.current[activeIndex];
            
            if (activeButton && showFilters) {
                const containerRect = activeButton.parentElement?.getBoundingClientRect();
                const buttonRect = activeButton.getBoundingClientRect();
                
                if (containerRect) {
                    setIndicatorStyle({
                        width: buttonRect.width,
                        left: buttonRect.left - containerRect.left
                    });
                }
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activeFilter, showFilters]);

    // Update hover indicator position
    const updateHoverPosition = (filterKey: string) => {
        const filterKeys = ['all', 'cards', 'images', 'audio', 'videos'];
        const hoverIndex = filterKeys.indexOf(filterKey);
        const hoverButton = filterButtonRefs.current[hoverIndex];
        
        if (hoverButton) {
            const containerRect = hoverButton.parentElement?.getBoundingClientRect();
            const buttonRect = hoverButton.getBoundingClientRect();
            
            if (containerRect) {
                setHoverStyle({
                    width: buttonRect.width,
                    left: buttonRect.left - containerRect.left
                });
            }
        }
    };

    // Drag event handlers
    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        // Don't allow dragging if there's no content to display
        if (!shouldShowContentArea) return;
        
        // Only handle left mouse button or touch events, ignore right clicks
        if ('button' in e && e.button !== 0) return;
        
        // Ensure this event is specifically from the drag handle
        if (!dragHandleRef.current?.contains(e.target as Node)) return;
        
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        setIsDragging(true);
        setDragStartY(clientY);
        setDragOffset(0);
        setDragMovement(0);
        
        // Prevent text selection during drag, but only prevent default for the drag handle
        e.preventDefault();
        e.stopPropagation();
        
        // Only set user-select none during actual dragging
        document.body.style.userSelect = 'none';
    };

    const handleDragMove = (e: MouseEvent | TouchEvent) => {
        if (!isDragging) return;
        
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        const deltaY = dragStartY - clientY; // Positive when dragging up
        const dragThreshold = 60; // Minimum drag distance to trigger expand
        
        // Track total movement for click detection
        setDragMovement(Math.abs(deltaY));
        
        // Update drag offset for smooth visual feedback
        setDragOffset(Math.max(-50, Math.min(50, deltaY)));
        
        // Auto-expand when dragging up significantly
        if (deltaY > dragThreshold && !isGalleryExpanded) {
            setIsGalleryExpanded(true);
            setIsDragging(false);
            setDragOffset(0);
            document.body.style.userSelect = '';
        }
        // Auto-collapse when dragging down significantly
        else if (deltaY < -dragThreshold && isGalleryExpanded) {
            setIsGalleryExpanded(false);
            setIsDragging(false);
            setDragOffset(0);
            document.body.style.userSelect = '';
        }
    };

    const handleDragEnd = () => {
        const wasClick = dragMovement < 5; // Consider it a click if movement was less than 5px
        setIsDragging(false);
        setDragOffset(0);
        document.body.style.userSelect = '';
        
        // Handle click to toggle tray
        if (wasClick) {
            setIsGalleryExpanded(!isGalleryExpanded);
        }
    };

    // Cleanup on unmount to ensure userSelect is restored
    useEffect(() => {
        return () => {
            document.body.style.userSelect = '';
        };
    }, []);

    // Add global mouse/touch move and end listeners when dragging
    useEffect(() => {
        if (isDragging) {
            const handleMouseMove = (e: MouseEvent) => {
                handleDragMove(e);
            };
            const handleTouchMove = (e: TouchEvent) => {
                handleDragMove(e);
            };
            const handleMouseUp = (e: MouseEvent) => {
                // Only end drag on left mouse button release
                if (e.button === 0) {
                    handleDragEnd();
                }
            };
            const handleTouchEnd = () => handleDragEnd();

            // Use normal phase, not capture, to avoid interfering with other components
            document.addEventListener('mousemove', handleMouseMove, { passive: true });
            document.addEventListener('touchmove', handleTouchMove, { passive: true });
            document.addEventListener('mouseup', handleMouseUp);
            document.addEventListener('touchend', handleTouchEnd);

            return () => {
                document.removeEventListener('mousemove', handleMouseMove);
                document.removeEventListener('touchmove', handleTouchMove);
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('touchend', handleTouchEnd);
            };
        }
    }, [isDragging, dragStartY]);



    // Handler for deleting cards
    const handleDeleteCard = (cardIndex: number) => {
        setHiddenCards(prev => new Set([...prev, cardIndex]));
        // Also remove from starred cards if it was the cover photo
        setStarredCards(prev => {
            const newStarred = new Set(prev);
            newStarred.delete(cardIndex);
            return newStarred;
        });
    };

    // Handler for restoring cards one by one via ATTACH button
    const handleAttachCard = () => {
        if (hiddenCards.size > 0) {
            // Get the first hidden card and restore it
            const firstHiddenCard = Array.from(hiddenCards)[0];
            setHiddenCards(prev => {
                const newHidden = new Set(prev);
                newHidden.delete(firstHiddenCard);
                return newHidden;
            });
        }
    };

    // Handler for setting cover/starring cards - only one cover allowed at a time
    const handleSetCover = (cardIndex: number) => {
        setStarredCards(prev => {
            if (prev.has(cardIndex)) {
                // If this card is already starred, remove it
                return new Set();
            } else {
                // If this card is not starred, clear all others and set this one
                return new Set([cardIndex]);
            }
        });
    };

    // Handlers for ellipsis menu options
    const handleRemoveCoverImage = () => {
        // Remove cover from all cards
        setStarredCards(new Set());
    };

    const handleCopyTo = () => {
        console.log('Copy to...');
        // Add your copy logic here
    };

    const handleMoveTo = () => {
        console.log('Move to...');
        // Add your move logic here
    };

    const handleDeleteCardFromMenu = () => {
        console.log('Delete card');
        // Add your delete card logic here
    };

    const handleEllipsisClick = (e: React.MouseEvent) => {
        e.preventDefault();
        if (ellipsisMenu) {
            // If menu is already open, close it
            setEllipsisMenu(null);
        } else if (ellipsisButtonRef.current) {
            // If menu is closed, open it
            const rect = ellipsisButtonRef.current.getBoundingClientRect();
            setEllipsisMenu({
                x: rect.right - 160, // Position dropdown to the left of the button
                y: rect.bottom + 4   // Position below the button with small gap
            });
        }
    };

    // Sample data for cards and list view
    const allCards = [
        { blank: "no" as const, images: "many" as const, mediaType: "image" as const, title: "Gerald's Silver Sword", bodyCopy: "A legendary silver sword forged for combating undead creatures and supernatural beings." },
        { blank: "no" as const, images: "many" as const, mediaType: "image" as const, title: "Gerald of Rivendell", bodyCopy: "A graceful Witcher Elf, known for unmatched agility and wisdom. Part of a diverse collection of mystical characters." },
        { blank: "no" as const, images: "many" as const, mediaType: "image" as const, title: "Steel Sword", bodyCopy: "For natural foes and human opponents, this steel blade has seen many battles." },
        { blank: "no" as const, images: "one" as const, mediaType: "card" as const, title: "Spells", bodyCopy: "Powerful magical incantations including fire bolts, protective wards, and healing spells.", itemCount: 15 },
        { blank: "no" as const, images: "many" as const, mediaType: "image" as const, title: "Witcher Medallion", bodyCopy: "A silver wolf medallion that vibrates in the presence of magic and monsters." },
        { blank: "no" as const, images: "one" as const, mediaType: "card" as const, title: "Potions", bodyCopy: "Alchemical brews for enhanced strength, night vision, toxicity resistance, and rapid healing.", itemCount: 8 },
        { blank: "no" as const, images: "many" as const, mediaType: "image" as const, title: "Forest Spirits", bodyCopy: "Gerald's ability to communicate with forest spirits aids him in his quest for knowledge." },
        { blank: "no" as const, images: "one" as const, mediaType: "card" as const, title: "Enhancements", bodyCopy: "Permanent upgrades and mutations that improve combat reflexes, magical resistance, and sensory perception.", itemCount: 12 },
        { blank: "no" as const, images: "many" as const, mediaType: "image" as const, title: "Emerald Eyes", bodyCopy: "His piercing emerald eyes can see through deception and into the soul." },
        { blank: "no" as const, images: "one" as const, mediaType: "card" as const, title: "Abilities", bodyCopy: "Special talents including enhanced swordsmanship, magical sign casting, and supernatural awareness.", itemCount: 18 },
        { blank: "no" as const, images: "many" as const, mediaType: "image" as const, title: "Ancient Scrolls", bodyCopy: "Mystical scrolls containing powerful spells and ancient knowledge." },
    ];

    // Additional cards for expanded view
    const expandedCards = [
        { blank: "no" as const, images: "many" as const, mediaType: "image" as const, title: "Dragon Scale Armor", bodyCopy: "Protective armor crafted from ancient dragon scales." },
        { blank: "no" as const, images: "one" as const, mediaType: "card" as const, title: "Combat Training", bodyCopy: "Years of rigorous training in sword combat and magical arts.", itemCount: 6 },
        { blank: "no" as const, images: "many" as const, mediaType: "image" as const, title: "Mystical Potions", bodyCopy: "Various alchemical concoctions for healing and enhancement." },
        { blank: "no" as const, images: "one" as const, mediaType: "card" as const, title: "Equipment", bodyCopy: "Weapons, armor, and tools essential for any adventurer's journey.", itemCount: 24 },
        { blank: "no" as const, images: "many" as const, mediaType: "image" as const, title: "Enchanted Cloak", bodyCopy: "A magical cloak that provides protection from the elements." },
    ];

    // Get visible cards (filter out hidden ones)
    const displayCards = isGalleryExpanded ? [...allCards, ...expandedCards] : allCards;
    const visibleCards = displayCards.filter((_, index) => !hiddenCards.has(index));

    // Auto-close tray when all cards are deleted
    useEffect(() => {
        if (visibleCards.length === 0 && isGalleryExpanded) {
            setIsGalleryExpanded(false);
        }
    }, [visibleCards.length, isGalleryExpanded]);

    // Auto-set single image card as cover
    useEffect(() => {
        if (visibleCards.length === 1) {
            const singleCard = visibleCards[0];
            const originalIndex = displayCards.findIndex(c => c === singleCard);
            
            // If it's an image card, automatically set it as cover
            if (singleCard.mediaType === 'image' && originalIndex !== -1) {
                setStarredCards(new Set([originalIndex]));
            }
        }
    }, [visibleCards, displayCards]);



    // Get the cover image URL from the starred card
    const getCoverImageUrl = () => {
        if (starredCards.size === 0) return null;
        const starredIndex = Array.from(starredCards)[0];
        const starredCard = displayCards[starredIndex];
        
        // Return the appropriate image based on card type
        if (starredCard && starredCard.blank === "no") {
            // Use demo character image if it's an image card, otherwise use default
            if (starredCard.mediaType === 'image') {
                return getUniqueImageForCard(displayCards, starredIndex);
            }
            return imgFrame184; // Using the main character image for non-image cards
        }
        return null;
    };

    const coverImageUrl = getCoverImageUrl();

    // Determine if content area should be shown
    // Hide when: no content OR when there's only 1 image card that's set as cover
    const shouldShowContentArea = visibleCards.length > 0 && !(
        visibleCards.length === 1 && 
        visibleCards[0].mediaType === 'image' && 
        starredCards.size > 0
    );

    // Scroll detection for auto-expansion only (both mobile and desktop)
    useEffect(() => {
        if (!cardsContainerRef.current || !shouldShowContentArea) return;

        let scrollThreshold = isMobile ? 50 : 30; // Minimum scroll distance before triggering expansion
        let scrollTimeout: number | null = null;

        const handleScroll = (e: Event) => {
            const target = e.target as HTMLElement;
            
            // Only handle expansion - no collapse logic
            if (isGalleryExpanded) return;
            
            // Clear existing timeout to debounce rapid scroll events
            if (scrollTimeout) {
                clearTimeout(scrollTimeout);
            }
            
            // Use requestAnimationFrame for smooth animation timing
            scrollTimeout = requestAnimationFrame(() => {
                // Expand when scrolling down past threshold (immediate)
                if (!isGalleryExpanded && target.scrollTop > scrollThreshold) {
                    setIsGalleryExpanded(true);
                }
            }) as any;
        };

        const container = cardsContainerRef.current;
        container.addEventListener('scroll', handleScroll, { passive: true });
        
        return () => {
            container.removeEventListener('scroll', handleScroll);
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
        };
    }, [isMobile, isGalleryExpanded, shouldShowContentArea]);

    return (
        <div className={`bg-slate-50 relative rounded-3xl w-full max-w-[1024px] min-w-0 mx-auto transition-all duration-300 ease-out ${shouldShowContentArea ? 'h-[80vh] max-h-[900px]' : 'h-auto min-h-[300px]'}`} style={{ width: 'min(100vw - 2rem, 1024px)' }} data-modal-container>
            <div className="box-border content-stretch flex flex-col items-start justify-start overflow-hidden p-0 relative w-full min-w-0 h-full transition-all duration-500 ease-out">
                {/* Header - Always visible */}
                <div 
                    className={`box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative w-full shrink-0 ${isGalleryExpanded ? 'cursor-pointer' : ''}`}
                    onClick={isGalleryExpanded ? () => setIsGalleryExpanded(false) : undefined}
                >
                    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                        <div className="relative size-full">
                            <div className={`box-border content-stretch flex flex-row gap-3 items-center justify-start relative w-full transition-all duration-500 ease-out ${isGalleryExpanded ? 'pt-6 pb-3 pl-6 pr-0' : 'py-6 pl-6 pr-0'}`}>
                                {/* Header Cover Image - Always show on mobile, only when expanded on desktop */}
                                {coverImageUrl && (
                                    <div 
                                        className={`bg-white relative rounded-xl shrink-0 overflow-hidden transition-all duration-700 ease-in-out ${
                                            isGalleryExpanded 
                                                ? 'size-16 opacity-100 scale-100 shadow-sm' 
                                                : 'size-16 opacity-100 scale-100 lg:size-0 lg:opacity-0 lg:scale-90'
                                        }`}
                                        style={{
                                            transitionProperty: 'all',
                                            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                                        }}
                                    >
                                        <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative w-full h-full">
                                            <div 
                                                className="absolute aspect-[290/363] bg-center bg-cover bg-no-repeat left-0 right-0 top-1/2 translate-y-[-50%]" 
                                                style={{ backgroundImage: `url('${coverImageUrl}')` }}
                                            />
                                        </div>
                                        <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
                                    </div>
                                )}
                                
                                {/* Title and Breadcrumb Section */}
                                <div className="basis-0 box-border content-stretch flex flex-col gap-2 grow items-start justify-start min-h-px min-w-px px-0 py-1.5 relative shrink-0">
                                    {/* Breadcrumb */}
                                    <div className="flex flex-wrap gap-2 items-center justify-start p-0 relative shrink-0">
                                        <div 
                                            className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0 cursor-pointer hover:text-slate-700 transition-colors duration-200"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="font-hvd-regular leading-[20px] not-italic relative shrink-0 text-[14px] text-left text-slate-500 hover:text-inherit">
                                                <p className="leading-[20px]">Library</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-center relative shrink-0 size-4">
                                            <LucideIconsChevronRight />
                                        </div>
                                        <div 
                                            className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <div className="font-hvd-regular leading-[20px] not-italic relative shrink-0 text-[14px] text-left text-slate-950">
                                                <p className="block leading-[20px]">Heroes</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Title */}
                                    <div className="font-hvd-medium leading-none not-italic relative shrink-0 text-[24px] sm:text-[28px] lg:text-[24px] text-left text-slate-950 tracking-[-0.6px] w-full">
                                        <p className="block leading-none">Azalea Characters</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Actions */}
                    <div className={`box-border content-stretch flex flex-row items-center justify-end gap-0 pb-0 pl-0 pr-3 sm:pr-6 relative shrink-0 transition-all duration-500 ease-out ${isGalleryExpanded ? 'pt-3' : 'pt-6'}`}>
                        <div className="relative shrink-0 w-8 h-8 sm:w-10 sm:h-10">
                            <AddToCampaignSimple 
                                active={campaignActive}
                                onClick={(e) => {
                                    e?.stopPropagation();
                                    setCampaignActive(!campaignActive);
                                }}
                            />
                        </div>
                        <div 
                            ref={ellipsisButtonRef}
                            onClick={(e) => {
                                e.stopPropagation();
                                handleEllipsisClick(e);
                            }}
                            className="relative shrink-0 w-8 h-8 sm:w-10 sm:h-10 cursor-pointer hover:bg-slate-200 rounded-lg transition-colors duration-200 p-1"
                        >
                            <img 
                                src="/Icon Button.svg" 
                                alt="More options" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div 
                            onClick={(e) => e.stopPropagation()}
                            className="relative shrink-0 w-8 h-8 sm:w-10 sm:h-10 cursor-pointer hover:bg-slate-200 rounded-lg transition-colors duration-200 p-1"
                        >
                            <img 
                                src="/Icon Button-1.svg" 
                                alt="Close" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Content - Animate when gallery is expanded */}
                <div className={`relative w-full transition-all duration-500 ease-out ${isGalleryExpanded ? 'opacity-0 max-h-0 transform -translate-y-8 overflow-hidden' : 'opacity-100 max-h-[500px] transform translate-y-0'}`}>
                    <div className="relative size-full">
                        <div className={`box-border content-stretch flex items-start justify-start pb-3 pt-0 px-3 sm:px-6 relative w-full transition-all duration-500 ease-out flex-col gap-4 max-w-[768px] ${coverImageUrl && !isGalleryExpanded ? 'lg:flex-row lg:gap-8 lg:max-w-none' : ''}`}>
                            {/* Text Area Cover Image - Hidden on mobile, scales when expanded on desktop */}
                            {coverImageUrl && (
                                <div 
                                    className={`bg-white relative rounded-3xl shrink-0 transition-all duration-700 ease-in-out hidden lg:block ${
                                        isGalleryExpanded 
                                            ? 'w-0 h-0 opacity-0 scale-90 overflow-hidden' 
                                            : 'w-60 h-[300px] opacity-100 scale-100 shadow-sm'
                                    }`}
                                    style={{
                                        transitionProperty: 'all',
                                        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                                        transformOrigin: 'top left'
                                    }}
                                >
                                    <CardItem 
                                        blank="no"
                                        images="many"
                                        imageStarred="yes"
                                        mediaType="image"
                                        bodyCopy="A diverse collection of mystical characters with unique abilities and wisdom."
                                        showAvatar={false}
                                        showStarIcon={false}
                                        imageUrl={coverImageUrl}
                                        isCoverImage={true}
                                        isSingleImageCard={!shouldShowContentArea}
                                        cardIndex={Array.from(starredCards)[0]}
                                        onSetCover={handleSetCover}
                                        onDelete={handleDeleteCard}
                                    />
                                </div>
                            )}
                            
                            {/* Text Content */}
                            <div className={`basis-0 box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 transition-all duration-500 ease-out w-full ${coverImageUrl && !isGalleryExpanded ? 'lg:grow lg:min-h-px lg:min-w-px lg:self-stretch' : ''}`}>
                                <div className="font-hvd-regular leading-[24px] w-full not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                    <p className="block leading-[24px]">{`A diverse group of mystical characters, each with their own unique abilities and wisdom. From graceful Witcher Elves to battle-hardened warriors, they navigate the mystical realms with ease.`}</p>
                                    <br/>
                                    <p className="block leading-[24px]">{`Their combined expertise in magic and combat makes them formidable allies, while their deep connections to nature allow them to communicate with the forest spirits.`}</p>
                                </div>
                                
                                {/* Items with links */}
                                <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 flex-wrap">
                                    <div className="font-hvd-regular leading-[24px] not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                        <p className="block leading-[24px]">They wield a</p>
                                    </div>
                                    <HoverTooltip 
                                        title="Gerald's Silver Sword" 
                                        description="A legendary silver sword forged for combating undead creatures and supernatural beings. This enchanted blade glows with a soft silver light when monsters are near, and its edge never dulls. Crafted by the finest elven smiths of Rivendell, it has been passed down through generations of monster hunters."
                                        itemCount={8}
                                        disabled={isDragging || isGalleryExpanded}
                                    >
                                    <div className="bg-slate-100 hover:bg-slate-200 box-border content-stretch flex flex-row gap-1 items-center justify-start px-1.5 py-1 relative rounded-md shrink-0 cursor-pointer transition-colors duration-200">
                                        <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
                                        <File className="w-4 h-4 text-slate-950" strokeWidth={2} />
                                        <div className="font-hvd-regular leading-none not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                            <p className="block leading-none">Silver sword</p>
                                        </div>
                                    </div>
                                    </HoverTooltip>
                                    <div className="font-hvd-regular leading-[24px] not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                        <p className="block leading-[24px]">{`for combatting undead forces and a `}</p>
                                    </div>
                                    <HoverTooltip 
                                        title="Gerald's Steel Sword" 
                                        description="For natural foes and human opponents, this steel blade has seen many battles. Its perfectly balanced design and razor-sharp edge make it deadly in combat against mortal enemies. The crossguard bears ancient runes that glow faintly in battle, and the leather-wrapped hilt provides perfect grip even in the heat of combat. This weapon has saved Gerald's life countless times in his adventures across the mystical realms."
                                        itemCount={12}
                                        disabled={isDragging || isGalleryExpanded}
                                    >
                                    <div className="bg-slate-100 hover:bg-slate-200 box-border content-stretch flex flex-row gap-1 items-center justify-start px-1.5 py-1 relative rounded-md shrink-0 cursor-pointer transition-colors duration-200">
                                        <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
                                        <File className="w-4 h-4 text-slate-950" strokeWidth={2} />
                                        <div className="font-hvd-regular leading-none not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                            <p className="block leading-none">Steel sword</p>
                                        </div>
                                    </div>
                                    </HoverTooltip>
                                    <div className="font-hvd-regular leading-[24px] not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                        <p className="block leading-[24px]">for natural foes</p>
                                    </div>
                                </div>
                                
                                <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 flex-wrap">
                                    <div className="font-hvd-regular leading-[24px] not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                        <p className="block leading-[24px]">They ride horses, including one named</p>
                                    </div>
                                    <HoverTooltip 
                                        title="Roach - Faithful" 
                                        description="Gerald's trusted horse, loyal and brave, has been with him through countless adventures across the mystical realms. This intelligent mare has an uncanny ability to find her way through any terrain and responds to Gerald's whistle from great distances. Her chestnut coat gleams in the sunlight, and her eyes show the wisdom of many journeys."
                                        itemCount={6}
                                        disabled={isDragging || isGalleryExpanded}
                                    >
                                    <div className="bg-slate-100 hover:bg-slate-200 box-border content-stretch flex flex-row gap-1 items-center justify-start px-1.5 py-1 relative rounded-md shrink-0 cursor-pointer transition-colors duration-200">
                                        <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
                                        <File className="w-4 h-4 text-slate-950" strokeWidth={2} />
                                        <div className="font-hvd-regular leading-none not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                            <p className="block leading-none">Roach</p>
                                        </div>
                                    </div>
                                    </HoverTooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions - Animate when gallery is expanded */}
                <div className={`relative w-full transition-all duration-500 ease-out ${isGalleryExpanded ? 'opacity-0 max-h-0 transform -translate-y-8 overflow-hidden' : 'opacity-100 max-h-[200px] transform translate-y-0'}`}>
                        <div className="relative size-full">
                            <div className="box-border content-stretch flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between pb-3 pt-0 px-3 sm:px-6 gap-2.5 sm:gap-0 relative w-full">
                                                                <div className="box-border content-stretch flex flex-col sm:flex-row gap-2.5 items-center justify-start p-0 relative shrink-0 w-full sm:w-auto">
                                </div>
                                <div className="basis-0 grow min-h-px min-w-px self-stretch shrink-0 hidden sm:block"/>
                                {/* Save Card Button - Hidden */}
                                {/* <div className="bg-purple-800 hover:bg-slate-800 box-border content-stretch flex flex-row gap-1 items-center justify-center min-w-20 overflow-hidden px-3 py-2 relative rounded-full shrink-0 w-full sm:w-auto transition-colors duration-200 cursor-pointer">
                                    <div className="box-border content-stretch flex flex-row items-start justify-start px-1 py-0 relative shrink-0">
                                        <div className="font-hvd-bold leading-[20px] not-italic relative shrink-0 text-[12px] text-left text-purple-50 uppercase">
                                            <p className="block leading-[20px]">SAVE CARD</p>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>

                {/* Tray Container - Always show filters, conditionally show drag handle and content */}
                <div className={`relative w-full transition-all duration-500 ease-out ${isGalleryExpanded && shouldShowContentArea ? 'flex-1 min-h-0' : ''}`}
                     style={{
                         transform: isDragging && shouldShowContentArea ? `translateY(${-dragOffset}px)` : 'translateY(0px)',
                         transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                     }}>
                    {/* Drag Handle - Only show when there's content to display */}
                    {shouldShowContentArea && (
                        <div 
                            ref={dragHandleRef}
                            className={`group relative w-full select-none transition-all duration-200 z-10 ${
                                isDragging 
                                    ? 'cursor-grabbing' 
                                    : 'cursor-grab'
                            } ${isGalleryExpanded ? 'py-2' : 'py-3'}`}
                            onMouseDown={handleDragStart}
                            onTouchStart={handleDragStart}
                        >
                            <div className="flex items-center justify-center">
                                <div className={`h-1 rounded-full transition-all duration-200 ${
                                    isDragging 
                                        ? 'w-16 bg-slate-400' 
                                        : 'w-12 bg-slate-300 hover:bg-slate-400'
                                }`}></div>
                            </div>
                        </div>
                    )}

                                        {/* Tabs and Cards Section - Only show when there's any content or when we need to show the attach button */}
                    <div className={`bg-slate-100 box-border content-stretch flex flex-col items-start justify-start pb-0 pt-0 px-0 relative w-full overflow-hidden transition-all duration-500 ease-out border-t border-slate-200 ${isGalleryExpanded && shouldShowContentArea ? 'flex-1 h-full' : shouldShowContentArea ? 'flex-1' : ''}`}>

                        {/* Search and Actions Bar */}
                        <div className="bg-slate-100 box-border content-stretch flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-start px-3 sm:px-6 relative shrink-0 w-full py-3">
                            
                            {/* Attach Button - Far Left */}
                            <div 
                                onClick={handleAttachCard}
                                className="bg-slate-200 hover:bg-slate-300 box-border content-stretch flex flex-row gap-1 items-center justify-center min-w-20 overflow-hidden px-3 py-2 relative rounded-full shrink-0 transition-colors duration-200 cursor-pointer"
                            >
                                <Paperclip className="w-4 h-4 text-purple-800" strokeWidth={2} />
                                <div className="box-border content-stretch flex flex-row items-start justify-start px-1 py-0 relative shrink-0">
                                    <div className="font-hvd-bold leading-[20px] not-italic relative shrink-0 text-[12px] text-left text-purple-800 uppercase">
                                        <p className="block leading-[20px]">ATTACH</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="basis-0 grow h-full min-h-px min-w-px shrink-0 hidden lg:block"/>
                            
                            {/* Search, Filter Toggle, View Toggle, and Expand Button - Only show when there's more than 1 item */}
                            {visibleCards.length > 1 && (
                                <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start p-0 relative shrink-0 w-full lg:w-auto">
                                    
                                    <div className={`bg-white relative rounded-full shrink-0 w-full lg:max-w-[300px] lg:w-[300px] border transition-all duration-200 ${searchFocused ? 'border-purple-800 shadow-sm' : 'border-slate-200'}`}>
                                        <div className="box-border content-stretch flex flex-row items-center justify-start overflow-hidden px-3 py-2.5 relative w-full">
                                            <div className="box-border content-stretch flex flex-row items-center justify-start pl-0 pr-2 py-0 relative shrink-0">
                                                <Search className={`w-4 h-4 transition-colors duration-200 ${searchFocused || searchValue ? 'text-slate-950' : 'text-slate-950 opacity-50'}`} strokeWidth={2} />
                                            </div>
                                            <input
                                                type="text"
                                                value={searchValue}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                                onFocus={() => setSearchFocused(true)}
                                                onBlur={() => setSearchFocused(false)}
                                                placeholder="Search"
                                                className="basis-0 font-hvd-regular grow h-5 leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[14px] text-left text-slate-950 bg-transparent border-0 outline-none placeholder:text-slate-950 placeholder:opacity-50"
                                            />
                                            {searchValue && (
                                                <button
                                                    onClick={() => setSearchValue('')}
                                                    className="box-border content-stretch flex flex-row items-center justify-center pl-2 pr-0 py-0 relative shrink-0 hover:opacity-60 transition-opacity duration-200"
                                                >
                                                    <X className="w-4 h-4 text-slate-950 opacity-40" strokeWidth={2} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    
                                    {/* Inline Segmented Filter Toggle - Animated */}
                                    <div className={`transition-all duration-300 ease-out origin-right ${
                                        showFilters 
                                            ? 'max-w-[500px] opacity-100 scale-x-100' 
                                            : 'max-w-0 opacity-0 scale-x-0'
                                    }`}>
                                        <div className={`bg-slate-200 box-border content-stretch flex flex-row items-center justify-start p-1 relative rounded-full shrink-0 whitespace-nowrap transition-all duration-300 ease-out origin-right ${
                                            showFilters ? 'overflow-visible scale-x-100' : 'overflow-hidden scale-x-0'
                                        }`}>
                                            {/* Hover indicator - behind active indicator */}
                                            {hoveredFilter && hoveredFilter !== activeFilter && (
                                                <div 
                                                    className="absolute bg-slate-300/50 h-[calc(100%-8px)] rounded-full transition-all duration-200 ease-out z-0"
                                                    style={{
                                                        width: `${hoverStyle.width}px`,
                                                        left: `${hoverStyle.left}px`,
                                                        top: '4px'
                                                    }}
                                                />
                                            )}
                                            
                                            {/* Active indicator - in front of hover */}
                                            <div 
                                                className={`absolute bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.05)] h-[calc(100%-8px)] rounded-full z-10 ${
                                                    !isInitialFilterPosition && indicatorStyle.width > 0 ? 'transition-all duration-300 ease-out' : ''
                                                }`}
                                                style={{
                                                    width: `${indicatorStyle.width}px`,
                                                    left: `${indicatorStyle.left}px`,
                                                    top: '4px'
                                                }}
                                            />
                                            
                                            {[
                                                { key: 'all' as const, icon: CheckCheck, label: 'ALL' },
                                                { key: 'cards' as const, icon: FileText, label: 'CARDS' },
                                                { key: 'images' as const, icon: ImageIcon, label: 'IMAGES' },
                                                { key: 'audio' as const, icon: FileAudio, label: 'AUDIO' },
                                                { key: 'videos' as const, icon: FileVideo2, label: 'VIDEOS' }
                                            ].map((filter, index) => {
                                                const Icon = filter.icon;
                                                const isActive = activeFilter === filter.key;
                                                return (
                                                    <button
                                                        key={filter.key}
                                                        ref={(el) => { filterButtonRefs.current[index] = el; }}
                                                        onClick={() => setActiveFilter(filter.key)}
                                                        onMouseEnter={() => {
                                                            setHoveredFilter(filter.key);
                                                            updateHoverPosition(filter.key);
                                                        }}
                                                        onMouseLeave={() => setHoveredFilter(null)}
                                                        className="box-border content-stretch flex flex-row gap-1 h-9 items-center justify-center min-w-14 px-3 py-1.5 relative rounded-full shrink-0 transition-all duration-200 z-20"
                                                    >
                                                        <Icon className={`w-5 h-5 transition-colors duration-300 ${
                                                            isActive ? 'text-slate-950' : 'text-slate-500'
                                                        }`} strokeWidth={2} />
                                                        <div className={`basis-0 font-hvd-medium grow leading-[14px] min-h-px min-w-px not-italic relative shrink-0 text-[12px] text-center uppercase transition-colors duration-300 ${
                                                            isActive ? 'text-slate-950' : 'text-slate-500'
                                                        }`}>
                                                            <p className="block leading-[14px]">{filter.label}</p>
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    
                                    {/* Filter Toggle Button */}
                                    <button
                                        onClick={() => setShowFilters(!showFilters)}
                                        className="bg-slate-200 hover:bg-slate-300 box-border content-stretch flex flex-row gap-1 h-9 items-center justify-center min-w-20 sm:min-w-0 overflow-hidden px-3 sm:px-2.5 py-1.5 relative rounded-full shrink-0 w-full sm:w-auto transition-colors duration-200 cursor-pointer"
                                        title={showFilters ? "Hide filters" : "Show filters"}
                                    >
                                        {showFilters ? (
                                            <X className="w-4 h-4 text-purple-800 transition-colors duration-200" strokeWidth={2} />
                                        ) : (
                                            <Filter className="w-4 h-4 text-purple-800 transition-colors duration-200" strokeWidth={2} />
                                        )}
                                    </button>
                                    
                                    {/* View Mode Toggle Button */}
                                    <button
                                        onClick={() => setViewMode(viewMode === 'card' ? 'list' : 'card')}
                                        className="bg-slate-200 hover:bg-slate-300 box-border content-stretch flex flex-row gap-1 h-9 items-center justify-center min-w-20 sm:min-w-0 overflow-hidden px-3 sm:px-2.5 py-1.5 relative rounded-full shrink-0 w-full sm:w-auto transition-colors duration-200 cursor-pointer"
                                        title={viewMode === 'card' ? "Switch to list view" : "Switch to card view"}
                                    >
                                        {viewMode === 'card' ? (
                                            <List className="w-4 h-4 text-purple-800" strokeWidth={2} />
                                        ) : (
                                            <Grid3x3 className="w-4 h-4 text-purple-800" strokeWidth={2} />
                                        )}
                                    </button>
                                    

                                </div>
                            )}
                        </div>

                    {/* Cards Grid / List View - Only show when there's content to display */}
                    {shouldShowContentArea ? (
                        <div className={`relative flex-1 w-full min-w-0 overflow-y-auto ${!isGalleryExpanded ? 'max-h-[400px]' : ''}`} ref={cardsContainerRef}>
                        {/* Mobile scroll hint - only shown on mobile when gallery is not expanded */}
                        {isMobile && !isGalleryExpanded && visibleCards.length > 6 && (
                            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 bg-slate-800 text-white text-xs px-3 py-1 rounded-full opacity-60 pointer-events-none lg:hidden transition-opacity duration-300">
                                Scroll to see more
                            </div>
                        )}
                        <div className="relative size-full min-w-0">
                            {viewMode === 'card' ? (
                                /* Card Grid View */
                                <div className={`box-border content-stretch grid gap-4 items-start justify-start relative w-full min-w-0 transition-all duration-300 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t-0 ${isGalleryExpanded ? 'pb-4 pt-4 px-3 sm:px-4' : 'pb-6 pt-6 px-3 sm:px-6'}`}>
                                    {visibleCards.map((card, _) => {
                                        // Find the original index in displayCards for proper card deletion tracking
                                        const originalIndex = displayCards.findIndex(c => c === card);
                                        const isStarred = starredCards.has(originalIndex);
                                        
                                        // Get demo character image for image cards
                                        const imageUrl = card.mediaType === 'image' ? getUniqueImageForCard(displayCards, originalIndex) || undefined : undefined;
                                        
                                        return (
                                            <div key={originalIndex} className="bg-white relative rounded-3xl w-full aspect-[290/363] min-w-0 max-w-[320px] mx-auto lg:mx-0">
                                                <CardItem 
                                                    blank={card.blank}
                                                    images={card.images}
                                                    imageStarred={isStarred ? "yes" : "no"}
                                                    mediaType={card.mediaType}
                                                    bodyCopy={card.bodyCopy}
                                                    cardIndex={originalIndex}
                                                    onDelete={handleDeleteCard}
                                                    onSetCover={handleSetCover}
                                                    state="Default"
                                                    moreCount={card.mediaType === 'card' ? [43, 28, 15, 67, 92, 34][originalIndex % 6] || 0 : 0}
                                                    imageUrl={imageUrl}
                                                    title={card.title}
                                                    itemCount={(card as any).itemCount}
                                                />
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                /* List View */
                                <div className={`relative w-full ${isGalleryExpanded ? 'pb-4 pt-4 px-3 sm:px-4' : 'pb-6 pt-6 px-3 sm:px-6'}`}>
                                    <div className="bg-white rounded-lg overflow-hidden border border-slate-200">
                                    {/* List Header */}
                                    <div className="bg-slate-50 border-b border-slate-200 px-4 py-3">
                                        <div className="flex items-center gap-4">
                                            <div className="w-36 shrink-0">
                                                <span className="font-hvd-medium text-[12px] text-slate-500 uppercase tracking-wide">Card Information</span>
                                            </div>
                                            <div className="flex-1">
                                            </div>
                                        </div>
                                    </div>
                                    
                                    {/* List Items */}
                                    <div>
                                        {visibleCards.slice(0, isGalleryExpanded ? visibleCards.length : 10).map((card, visibleIndex) => {
                                            const originalIndex = displayCards.findIndex(c => c === card);
                                            
                                            // Get demo character image for image cards
                                            const imageUrl = card.mediaType === 'image' ? getUniqueImageForCard(displayCards, originalIndex) || imgFrame184 : imgFrame184;
                                            
                                            // Get demo character name for image cards
                                            const title = card.mediaType === 'image' ? getUniqueNameForCard(displayCards, originalIndex) || card.title : card.title;
                                            
                                            return (
                                            <ListViewItem 
                                                    key={originalIndex}
                                                    title={title}
                                                    bodyCopy={card.bodyCopy}
                                                    index={visibleIndex}
                                                    imageUrl={imageUrl}
                                                />
                                            );
                                        })}
                                    </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        </div>
                    ) : null}
                </div>
                </div>
            </div>
            

            <div className="absolute border-4 border-white border-solid inset-0 pointer-events-none rounded-3xl shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.05),0px_8px_10px_-6px_rgba(0,0,0,0.05)]"/>
            
            {/* Ellipsis Dropdown Menu */}
            {ellipsisMenu && (
                <ContextMenu
                    x={ellipsisMenu.x}
                    y={ellipsisMenu.y}
                    onClose={() => setEllipsisMenu(null)}
                    excludeRefs={[ellipsisButtonRef]}
                    items={[
                        ...(starredCards.size > 0 ? [{
                            label: 'Remove cover',
                            icon: Star,
                            onClick: handleRemoveCoverImage
                        }] : []),
                        {
                            label: 'Copy to..',
                            icon: Copy,
                            onClick: handleCopyTo
                        },
                        {
                            label: 'Move to..',
                            icon: FolderOpen,
                            onClick: handleMoveTo
                        },
                        {
                            label: 'Delete',
                            icon: Trash2,
                            onClick: handleDeleteCardFromMenu,
                            variant: 'danger' as const
                        }
                    ]}
                />
            )}
        </div>
    );
} 