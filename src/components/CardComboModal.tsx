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
  FileVideo2
} from 'lucide-react';

// Asset URLs for character images - using placeholder for now but keeping original structure
const imgFrame184 = "https://picsum.photos/290/363?random=1";
const img1 = "https://picsum.photos/32/32?random=2";

function LucideIconsChevronRight() {
    return (
        <ChevronRight className="w-4 h-4 text-slate-500" strokeWidth={2} />
    );
}

function AddToCampaignSimple() {
    return (
        <div className="relative size-full" data-name="selected=no">
            <img 
                src="/AddToCampaign-simple.svg" 
                alt="Add to Campaign" 
                className="w-full h-full object-contain"
            />
        </div>
    );
}

// Unused component - keeping for future use
// function IconButton() {
// return null;
// }

function Separator() {
    return (
        <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative size-full" data-name="Vert. / Horz.=True">
            <div className="h-0 relative shrink-0 w-full" data-name="Line">
                <div className="absolute bottom-0 left-0 right-0 top-[-1px] bg-slate-200 h-px"></div>
            </div>
        </div>
    );
}

interface CardItemProps {
    bodyCopy?: string;
    blank?: 'no' | 'yes';
    images?: 'none' | 'many' | 'one';
    state?: 'Default' | 'hover';
    imageStarred?: 'no' | 'yes';
    mediaType?: 'collection' | 'card' | 'image';
}

function CardItem({ 
    bodyCopy = "Gerald of Rivendell, a graceful Witcher Elf, is known for his unmatched agility and wisdom. With silver hair cascading down his shoulders and piercing emerald eyes, he navigates the mystical realms with ease. His expertise in magic and combat makes him a formidable ally, while his deep connection to nature allows him to communicate with the forest spirits. Gerald's quest for knowledge and justice drives him to protect the innocent and uphold the balance between worlds.",
    blank = "yes",
    images = "none",
    state = "Default",
    imageStarred = "no",
    mediaType = "card"
}: CardItemProps) {
    const element = (
        <div className="absolute border-2 border-slate-200 border-solid inset-0 pointer-events-none rounded-full"/>
    );
    const element1 = (
        <div className="absolute border-4 border-white border-solid inset-0 pointer-events-none rounded-3xl shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
    );

    if (blank === 'no' && images === 'many' && state === 'Default' && imageStarred === 'yes' && mediaType === 'image') {
        return (
            <div className="relative rounded-3xl size-full bg-white">
                <div className="box-border content-stretch flex flex-col items-start justify-start overflow-hidden p-0 relative size-full">
                    <div className="absolute aspect-[290/363] bg-center bg-cover bg-no-repeat left-0 right-0 rounded-3xl top-1/2 translate-y-[-50%]" style={{ backgroundImage: `url('${imgFrame184}')` }}/>
                    <div className="basis-0 grow min-h-px min-w-px relative shrink-0 w-full">
                        <div className="relative size-full">
                            <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start pb-6 pt-0 px-6 size-full"/>
                        </div>
                    </div>
                    <div className="relative shrink-0 w-full">
                        <div className="flex flex-col items-end justify-end relative size-full">
                            <div className="box-border content-stretch flex flex-col gap-4 items-end justify-end pb-6 pt-0 px-6 relative w-full">
                                <div className="relative rounded-full shrink-0">
                                    <div className="box-border content-stretch flex flex-row items-center justify-start overflow-hidden p-0 relative">
                                        <div className="bg-center bg-cover bg-no-repeat rounded-full shrink-0 size-8" style={{ backgroundImage: `url('${img1}')` }}/>
                                    </div>
                                    {element}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bg-[rgba(248,250,252,0.5)] left-4 rounded-full size-10 top-4 flex items-center justify-center">
                        <Star className="w-4 h-4 text-slate-950 fill-current" />
                    </div>
                </div>
                {element1}
            </div>
        );
    }

    if (blank === 'no' && images === 'one' && state === 'Default' && imageStarred === 'no' && mediaType === 'card') {
        return (
            <div className="bg-slate-50 relative rounded-3xl size-full">
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
                                <div className="basis-0 font-hvd-regular grow min-h-px min-w-px not-italic opacity-80 overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-left text-slate-950 w-full leading-[24px]">
                                    <p className="block leading-[24px]">{bodyCopy}</p>
                                </div>
                                <div className="box-border content-stretch flex flex-row-reverse gap-1 items-start justify-start p-0 relative shrink-0">
                                    <div className="bg-center bg-cover bg-no-repeat aspect-[65/75] order-1 relative rounded-lg shrink-0 w-16 sm:w-[65px]" style={{ backgroundImage: `url('${imgFrame184}')` }}>
                                        <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-lg shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="relative shrink-0 w-full">
                        <div className="flex flex-col items-end justify-end relative size-full">
                            <div className="box-border content-stretch flex flex-col gap-4 items-end justify-end pb-6 pt-0 px-6 relative w-full">
                                <div className="relative rounded-full shrink-0">
                                    <div className="box-border content-stretch flex flex-row items-center justify-start overflow-hidden p-0 relative">
                                        <div className="bg-center bg-cover bg-no-repeat rounded-full shrink-0 size-8" style={{ backgroundImage: `url('${img1}')` }}/>
                                    </div>
                                    {element}
                                </div>
                            </div>
                        </div>
                    </div>
                    {element1}
                </div>
            </div>
        );
    }

    // Default blank card
    return (
        <div className="bg-slate-50 relative rounded-3xl size-full">
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
                            <div className="basis-0 font-hvd-regular grow leading-[24px] min-h-px min-w-px not-italic opacity-80 overflow-ellipsis overflow-hidden relative shrink-0 text-[16px] text-left text-slate-950 w-full">
                                <p className="block mb-0">Your card text here...</p>
                                <p className="block mb-0">Associate other cards with @card</p>
                                <p className="block">Organise your library with #tags</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative shrink-0 w-full">
                    <div className="flex flex-col items-end justify-end relative size-full">
                        <div className="box-border content-stretch flex flex-col gap-4 items-end justify-end pb-6 pt-0 px-6 relative w-full">
                            <div className="relative rounded-full shrink-0">
                                <div className="box-border content-stretch flex flex-row items-center justify-start overflow-hidden p-0 relative">
                                    <div className="bg-center bg-cover bg-no-repeat rounded-full shrink-0 size-8" style={{ backgroundImage: `url('${img1}')` }}/>
                                </div>
                                {element}
                            </div>
                        </div>
                    </div>
                </div>
                {element1}
            </div>
        </div>
    );
}

export default function CardComboModal() {
    return (
        <div className="bg-slate-50 relative rounded-3xl w-full max-w-[1024px] mx-auto min-h-[900px] h-auto">
            <div className="box-border content-stretch flex flex-col items-start justify-start overflow-hidden p-0 relative w-full h-full">
                {/* Header */}
                <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 w-full">
                    <div className="basis-0 grow min-h-px min-w-px relative shrink-0">
                        <div className="relative size-full">
                            <div className="box-border content-stretch flex flex-col gap-1.5 items-start justify-start pl-6 pr-0 py-6 relative w-full">
                                {/* Breadcrumb */}
                                <div className="flex flex-wrap gap-2 items-center justify-start p-0 relative shrink-0">
                                    <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
                                        <div className="font-hvd-regular leading-[20px] not-italic relative shrink-0 text-[14px] text-left text-slate-500">
                                            <p className="leading-[20px]">Library</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center relative shrink-0 size-4">
                                        <LucideIconsChevronRight />
                                    </div>
                                    <div className="box-border content-stretch flex flex-row items-center justify-center p-0 relative shrink-0">
                                        <div className="font-hvd-regular leading-[20px] not-italic relative shrink-0 text-[14px] text-left text-slate-950">
                                            <p className="block leading-[20px]">Heroes</p>
                                        </div>
                                    </div>
                                </div>
                                {/* Title */}
                                <div className="font-hvd-medium leading-none not-italic relative shrink-0 text-[24px] sm:text-[28px] lg:text-[24px] text-left text-slate-950 tracking-[-0.6px] w-full">
                                    <p className="block leading-none">Gerald of Rivendell</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Actions */}
                    <div className="box-border content-stretch flex flex-row items-center justify-end gap-0 pb-0 pl-0 pr-3 sm:pr-6 pt-6 relative shrink-0">
                        <div className="relative shrink-0 w-8 h-8 sm:w-10 sm:h-10">
                            <AddToCampaignSimple />
                        </div>
                        <div className="relative shrink-0 w-8 h-8 sm:w-10 sm:h-10">
                            <img 
                                src="/Icon Button.svg" 
                                alt="More options" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                        <div className="relative shrink-0 w-8 h-8 sm:w-10 sm:h-10">
                            <img 
                                src="/Icon Button-1.svg" 
                                alt="Close" 
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="relative shrink-0 w-full">
                    <div className="relative size-full">
                        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start pb-6 pt-0 px-3 sm:px-6 relative w-full max-w-[768px]">
                            <div className="font-hvd-regular leading-[24px] w-full not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                <p className="block leading-[24px]">{`Gerald of Rivendell, a graceful Witcher Elf, is known for his unmatched agility and wisdom. With silver hair cascading down his shoulders and piercing emerald eyes, he navigates the mystical realms with ease.`}</p>
                                <br/>
                                <p className="block leading-[24px]">{`His expertise in magic and combat makes him a formidable ally, while his deep connection to nature allows him to communicate with the forest spirits.`}</p>
                            </div>
                            
                            {/* Items with links */}
                            <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 flex-wrap">
                                <div className="font-hvd-regular leading-[24px] not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                    <p className="block leading-[24px]">He has a</p>
                                </div>
                                <div className="bg-slate-100 box-border content-stretch flex flex-row gap-1 items-center justify-start px-1.5 py-1 relative rounded-md shrink-0">
                                    <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
                                    <File className="w-4 h-4 text-slate-950" strokeWidth={2} />
                                    <div className="font-hvd-regular leading-none not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                        <p className="block leading-none">Silver sword</p>
                                    </div>
                                </div>
                                <div className="font-hvd-regular leading-[24px] not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                    <p className="block leading-[24px]">{`for combatting undead forces and a `}</p>
                                </div>
                                <div className="bg-slate-100 box-border content-stretch flex flex-row gap-1 items-center justify-start px-1.5 py-1 relative rounded-md shrink-0">
                                    <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
                                    <File className="w-4 h-4 text-slate-950" strokeWidth={2} />
                                    <div className="font-hvd-regular leading-none not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                        <p className="block leading-none">Steel sword</p>
                                    </div>
                                </div>
                                <div className="font-hvd-regular leading-[24px] not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                    <p className="block leading-[24px]">for natural foes</p>
                                </div>
                            </div>
                            
                            <div className="box-border content-stretch flex flex-row gap-2 items-start justify-start p-0 relative shrink-0 flex-wrap">
                                <div className="font-hvd-regular leading-[24px] not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                    <p className="block leading-[24px]">He rides a horse named</p>
                                </div>
                                <div className="bg-slate-100 box-border content-stretch flex flex-row gap-1 items-center justify-start px-1.5 py-1 relative rounded-md shrink-0">
                                    <div className="absolute border-2 border-white border-solid inset-0 pointer-events-none rounded-md shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)]"/>
                                    <File className="w-4 h-4 text-slate-950" strokeWidth={2} />
                                    <div className="font-hvd-regular leading-none not-italic opacity-80 relative shrink-0 text-[16px] text-left text-slate-950">
                                        <p className="block leading-none">Roach</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions */}
                <div className="relative shrink-0 w-full">
                    <div className="relative size-full">
                        <div className="box-border content-stretch flex flex-col-reverse sm:flex-row items-start sm:items-center justify-between pb-6 pt-0 px-3 sm:px-6 gap-4 sm:gap-0 relative w-full">
                            <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full sm:w-auto">
                                <div className="bg-slate-200 box-border content-stretch flex flex-row gap-1 items-center justify-center min-w-20 overflow-hidden px-3 py-2 relative rounded-full shrink-0 w-full sm:w-auto">
                                    <Paperclip className="w-4 h-4 text-purple-800" strokeWidth={2} />
                                    <div className="box-border content-stretch flex flex-row items-start justify-start px-1 py-0 relative shrink-0">
                                        <div className="font-hvd-bold leading-[20px] not-italic relative shrink-0 text-[12px] text-left text-purple-800 uppercase">
                                            <p className="block leading-[20px]">ATTACH</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="basis-0 grow min-h-px min-w-px self-stretch shrink-0 hidden sm:block"/>
                            <div className="bg-purple-800 box-border content-stretch flex flex-row gap-1 items-center justify-center min-w-20 overflow-hidden px-3 py-2 relative rounded-full shrink-0 w-full sm:w-auto">
                                <div className="box-border content-stretch flex flex-row items-start justify-start px-1 py-0 relative shrink-0">
                                    <div className="font-hvd-bold leading-[20px] not-italic relative shrink-0 text-[12px] text-left text-purple-50 uppercase">
                                        <p className="block leading-[20px]">SAVE CARD</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Separator */}
                <div className="box-border content-stretch flex flex-col items-start justify-start p-0 relative shrink-0 w-full">
                    <Separator />
                </div>

                {/* Tabs and Cards Section */}
                <div className="bg-slate-100 box-border content-stretch flex flex-col min-h-[490px] items-start justify-start pb-6 pt-0 px-0 relative shrink-0 w-full">
                                    {/* Tabs Header */}
                <div className="bg-slate-100 box-border content-stretch flex flex-col lg:flex-row gap-4 min-h-[58px] items-start lg:items-center justify-start px-3 sm:px-6 py-3 lg:py-0 relative shrink-0 w-full border-b border-slate-200">
                    <div className="box-border content-stretch flex flex-row items-start justify-start p-0 relative shrink-0 overflow-x-auto w-full lg:w-auto lg:self-end">
                        {/* Active Tab - All */}
                        <div className="box-border content-stretch flex flex-row gap-1 items-center justify-center min-w-14 pb-3.5 pt-2 px-2 sm:px-4 relative shrink-0 border-b-2 border-purple-800">
                            <CheckCheck className="w-4 h-4 sm:w-5 sm:h-5 text-slate-950" strokeWidth={2} />
                            <div className="basis-0 font-hvd-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[10px] sm:text-[12px] text-center text-slate-950 uppercase">
                                <p className="block leading-[20px]">ALL</p>
                            </div>
                        </div>
                        
                        {/* Other tabs */}
                        {[
                            { icon: FileText, label: 'TEXT' },
                            { icon: ImageIcon, label: 'IMAGE' },
                            { icon: FileAudio, label: 'AUDIO' },
                            { icon: FileVideo2, label: 'VIDEO' }
                        ].map((tab, index) => {
                            const Icon = tab.icon;
                            return (
                                <div key={index} className="box-border content-stretch flex flex-row gap-1 items-center justify-center min-w-14 pb-3.5 pt-2 px-2 sm:px-4 relative shrink-0">
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-slate-500" strokeWidth={2} />
                                    <div className="basis-0 font-hvd-medium grow leading-[20px] min-h-px min-w-px not-italic relative shrink-0 text-[10px] sm:text-[12px] text-center text-slate-500 uppercase">
                                        <p className="block leading-[20px]">{tab.label}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="basis-0 grow h-full min-h-px min-w-px shrink-0 hidden lg:block"/>
                    
                    {/* Search */}
                    <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0 w-full lg:w-auto">
                            <div className="bg-white relative rounded-full shrink-0 w-full max-w-[300px] lg:w-[300px] border border-slate-200">
                                <div className="box-border content-stretch flex flex-row items-center justify-start overflow-hidden px-3 py-2.5 relative w-full">
                                    <div className="box-border content-stretch flex flex-row items-center justify-start pl-0 pr-2 py-0 relative shrink-0">
                                        <Search className="w-4 h-4 text-slate-950 opacity-50" strokeWidth={2} />
                                    </div>
                                    <div className="basis-0 font-hvd-regular grow h-5 leading-[20px] min-h-px min-w-px not-italic opacity-50 overflow-ellipsis overflow-hidden relative shrink-0 text-[14px] text-left text-slate-950">
                                        <p className="block leading-[20px] overflow-inherit">Search</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="relative shrink-0 w-full">
                        <div className="relative size-full">
                            <div className="box-border content-stretch grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start justify-start pb-0 pt-6 px-3 sm:px-6 relative w-full">
                                <div className="bg-white relative rounded-3xl w-full aspect-[290/363] min-w-0 max-w-[400px] mx-auto lg:mx-0">
                                    <CardItem blank="no" images="many" imageStarred="yes" mediaType="image"/>
                                </div>
                                <div className="bg-white relative rounded-3xl w-full aspect-[290/363] min-w-0 max-w-[400px] mx-auto lg:mx-0">
                                    <CardItem blank="no" images="many" imageStarred="yes" mediaType="image"/>
                                </div>
                                <div className="bg-white relative rounded-3xl w-full aspect-[290/363] min-w-0 max-w-[400px] mx-auto lg:mx-0 md:col-span-2 lg:col-span-1">
                                    <CardItem blank="no" images="many" imageStarred="yes" mediaType="image"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="absolute border-4 border-white border-solid inset-0 pointer-events-none rounded-3xl shadow-[0px_20px_25px_-5px_rgba(0,0,0,0.05),0px_8px_10px_-6px_rgba(0,0,0,0.05)]"/>
        </div>
    );
} 