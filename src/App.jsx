import React, { useState, useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import { 
  Download, 
  Image as ImageIcon, 
  Sparkles, 
  Palette, 
  Smartphone, 
  FileText, 
  RotateCcw, 
  Type, 
  Printer, 
  Sliders, 
  BookmarkPlus, 
  Trash2, 
  Sticker, 
  Move, 
  Share2, 
  PlusCircle, 
  ArrowUp, 
  ArrowDown, 
  Wand2, 
  Eye, 
  Eraser, 
  Shapes,
  LayoutGrid,
  Search,
  SlidersHorizontal,
  Undo2,
  Redo2,
  SunMedium
} from 'lucide-react';

const FONTS = [
  { name: 'Gujarati Traditional (Rasa)', family: "'Rasa', serif" },
  { name: 'Gujarati Clean (Noto Sans)', family: "'Noto Sans Gujarati', sans-serif" },
  { name: 'Modern Sans (Poppins)', family: "'Poppins', sans-serif" },
  { name: 'Royal Classic (Cinzel)', family: "'Cinzel', serif" },
  { name: 'Luxury Serif (Playfair)', family: "'Playfair Display', serif" },
];

const LAYOUT_STYLES = [
  { id: 'ROYAL', name: '👑 Royal Heritage', borderOuter: '#B45309', borderInner: '#FDE68A', bg: '#FFFBEB', headerBg: '#FEF3C7', headerBorder: '#D97706', primaryText: '#78350F', secondaryText: '#9A3412', badgeText: '#92400E' },
  { id: 'MINIMAL', name: '⚡ Modern Minimal', borderOuter: '#0F172A', borderInner: '#CBD5E1', bg: '#FFFFFF', headerBg: '#F1F5F9', headerBorder: '#94A3B8', primaryText: '#0F172A', secondaryText: '#475569', badgeText: '#0F172A' },
  { id: 'FESTIVE_RED', name: '🔥 Vibrant Festive', borderOuter: '#E11D48', borderInner: '#FFE4E6', bg: '#FFF1F2', headerBg: '#FFE4E6', headerBorder: '#FB7185', primaryText: '#881337', secondaryText: '#9F1239', badgeText: '#BE123C' },
  { id: 'MIDNIGHT_NEON', name: '🌙 Midnight Neon', borderOuter: '#38BDF8', borderInner: '#1E293B', bg: '#0F172A', headerBg: '#1E293B', headerBorder: '#0284C7', primaryText: '#F8FAFC', secondaryText: '#38BDF8', badgeText: '#F59E0B' },
  { id: 'FLORAL_PASTEL', name: '🌸 Pastel Floral', borderOuter: '#EC4899', borderInner: '#FCE7F3', bg: '#FDF2F8', headerBg: '#FCE7F3', headerBorder: '#F472B6', primaryText: '#831843', secondaryText: '#9D174D', badgeText: '#BE185D' },
  { id: 'SUPER_SALE', name: '🛍️ Super Sale', borderOuter: '#EAB308', borderInner: '#FEF08A', bg: '#FEFCE8', headerBg: '#FEF08A', headerBorder: '#CA8A04', primaryText: '#713F12', secondaryText: '#854D0E', badgeText: '#A16207' }
];

const PRESET_BACKGROUNDS = [
  { name: 'None (Solid)', value: null },
  { name: '✨ Golden Mandala', value: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80' },
  { name: '🔥 Kesariya Glow', value: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
  { name: '🌙 Midnight Blue', value: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80' },
  { name: '🌺 Royal Velvet', value: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80' },
];

const CATEGORY_TABS = [
  { id: 'ALL', name: 'બધા (All 50+)' },
  { id: 'FESTIVAL', name: '🪔 તહેવારો & પર્વો' },
  { id: 'DEVOTIONAL', name: '🕉️卐 પૂજન & સાધના' },
  { id: 'INVITATION', name: '💍 લગ્ન & આમંત્રણ' },
  { id: 'BUSINESS', name: '🛍️ બિઝનેસ & સેલ' },
  { id: 'EDUCATION', name: '📚 ટ્યુશન & સ્કૂલ' },
  { id: 'SPORTS', name: '🏏 સ્પોર્ટ્સ ટુર્નામેન્ટ' },
  { id: 'SOCIAL', name: '🌹 બેસણું / સુવિચાર' },
];

const TEXT_EFFECTS = [
  { id: 'NONE', name: 'સામાન્ય (None)', shadow: null },
  { id: 'GOLD_GLOW', name: '✨ Gold Glow', shadow: new fabric.Shadow({ color: 'rgba(234, 179, 8, 0.7)', blur: 12, offsetX: 0, offsetY: 0 }) },
  { id: 'NEON_GLOW', name: '🌙 Neon Glow', shadow: new fabric.Shadow({ color: 'rgba(56, 189, 248, 0.9)', blur: 14, offsetX: 0, offsetY: 0 }) },
  { id: 'DARK_SHADOW', name: '🌑 Soft Drop', shadow: new fabric.Shadow({ color: 'rgba(0, 0, 0, 0.35)', blur: 6, offsetX: 2, offsetY: 3 }) }
];

const MASTER_TEMPLATES = [
  {
    id: 'DIWALI_MAIN',
    cat: 'FESTIVAL',
    title: 'શુભ દીપાવલી & સાલ મુબારક',
    subHeader: '🪔 દીપોત્સવી પર્વની મંગલમય શુભકામનાઓ 🪔',
    personName: 'દિવ્ય વાઘેલા & પરિવાર',
    extraInfo1: 'વિક્રમ સંવત ૨૦૮૩ - નૂતન વર્ષાભિનંદન',
    extraInfo2: 'આપના ઘરમાં સુખ, શાંતિ, સમૃદ્ધિ અને લક્ષ્મી કૃપા સદા રહે ✨',
    venue: 'અમદાવાદ, ગુજરાત',
    footer: 'સર્વે સ્નેહીજનોને દિવાળી અને નવા વર્ષની હાર્દિક શુભેચ્છાઓ!',
    badgeIcon: '🪔',
    layoutStyle: 'ROYAL',
    slogans: ['।। શુભ દીપાવલી & સાલ મુબારક ।। 🪔', 'ધનતેરસ અને લક્ષ્મી પૂજનની મંગલકામનાઓ 💰'],
    stickers: ['🪔', '🎆', '🎇', '✨', '🪷', '💰', '🎁']
  },
  {
    id: 'UTTARAYAN_ROOFTOP',
    cat: 'FESTIVAL',
    title: 'KAYPO CHHE - UTTARAYAN 2026',
    subHeader: '🪁 ભવ્ય રૂફટોપ પતંગોત્સવ & ડીજે પાર્ટી 🪁',
    personName: 'સ્કાય હાઇ પતંગ ક્લબ',
    extraInfo1: 'તારીખ: ૧૪ અને ૧૫ જાન્યુઆરી, ૨૦૨૬',
    extraInfo2: 'તલસાંકળી, ઉંધિયું, જલેબી અને લાઉડ મ્યુઝિક સાથે ધમાલ!',
    venue: 'મેગા ટેરેસ, ઘાટલોડિયા, અમદાવાદ',
    footer: 'સાવચેતી સાથે પતંગ ચગાવો, પક્ષીઓને બચાવો 🕊️',
    badgeIcon: '🪁',
    layoutStyle: 'FESTIVE_RED',
    slogans: ['🪁 કાઈપો છે! લપેટ! ઉત્તરાયણ પર્વની ખૂબ ખૂબ શુભેચ્છાઓ 🪁', 'Happy Makar Sankranti!'],
    stickers: ['🪁', '🧵', '☀️', '🎉', '🔥', '✨']
  },
  {
    id: 'HOLI_DHULANDI',
    cat: 'FESTIVAL',
    title: 'HOLI HAI - રંગોત્સવ ૨૦૨૬',
    subHeader: '🌈 હોળી અને ધૂળેટીની હાર્દિક શુભેચ્છાઓ 🌈',
    personName: 'ઓર્ગેનિક હર્બલ ગુલાલ સેલિબ્રેશન',
    extraInfo1: 'હોલિકા દહન: ૨ માર્ચ | ધૂળેટી રંગોત્સવ: ૩ માર્ચ',
    extraInfo2: 'ઢોલ, ડીજે, ઠંડાઈ, ગુલાલ અને પિચકારી સાથે ઉજવણી!',
    venue: 'ધ પાર્ટી લોન, અમદાવાદ',
    footer: 'રંગોના તહેવારમાં આપનું જીવન સદા ખુશહાલ રહે!',
    badgeIcon: '🎨',
    layoutStyle: 'FLORAL_PASTEL',
    slogans: ['🎨 રંગોના પાવન પર્વ હોળી-ધુળેટીની હાર્દિક શુભેચ્છાઓ 🎨', 'Happy & Safe Herbal Colors 🌈'],
    stickers: ['🎨', '🔫', '💦', '🌈', '✨', '🥳']
  },
  {
    id: 'RAKSHABANDHAN_BOND',
    cat: 'FESTIVAL',
    title: 'HAPPY RAKSHA BANDHAN',
    subHeader: '✨ સ્નેહ અને રક્ષાનું પવિત્ર અતૂટ બંધન ✨',
    personName: 'ભાઈ-બહેન સ્નેહ મિલન',
    extraInfo1: 'તારીખ: ૨૮ ઓગસ્ટ, ૨૦૨૬ (શ્રાવણી પૂર્ણિમા)',
    extraInfo2: 'સદા હસતા રહો અને જીવનમાં ઉત્તરોત્તર પ્રગતિ કરો 💖',
    venue: 'અમદાવાદ',
    footer: 'વિશ્વના સૌથી વ્હાલા ભાઈ/બહેનને રક્ષાબંધનની શુભેચ્છાઓ!',
    badgeIcon: '🎁',
    layoutStyle: 'FLORAL_PASTEL',
    slogans: ['પવિત્ર પ્રેમ અને રક્ષાનું અતૂટ બંધન - રક્ષાબંધન 🎁', 'Happy Rakhi 💖'],
    stickers: ['🎁', '🍬', '✨', '💐', '💖', '👫']
  },
  {
    id: 'GANESH_UTSAV_MAIN',
    cat: 'DEVOTIONAL',
    title: '।। ગણેશોત્સવ ૨૦૨૬ ।।',
    subHeader: '🌺 ભવ્ય ગણેશ સ્થાપના અને મહાઆરતી 🌺',
    personName: 'શ્રી સિદ્ધિ વિનાયક યુવક મંડળ',
    extraInfo1: 'તારીખ: ૧૪ સપ્ટેમ્બર થી અનંત ચતુર્દશી',
    extraInfo2: 'રોજ સાંજે ૭:૩૦ કલાકે ભવ્ય મહાઆરતી & મોદક પ્રસાદ',
    venue: 'મેઈન ચોક, ઘાટલોડિયા, અમદાવાદ',
    footer: 'સર્વે ભક્તોને દર્શન અને પ્રસાદનો લાભ લેવા ભાવભર્યું નિમંત્રણ.',
    badgeIcon: '🚩',
    layoutStyle: 'ROYAL',
    slogans: ['।। વક્રતુંડ મહાકાય સૂર્યકોટિ સમપ્રભ ।। 🐘', 'ગણપતિ બાપ્પા મોરિયા, પુઢચ્યા વર્ષી લવકર યા!'],
    stickers: ['🐘', '🪔', '🚩', '✨', '💐', '🙏', '🌺']
  },
  {
    id: 'JANMASHTAMI_MATKI',
    cat: 'DEVOTIONAL',
    title: '।। શ્રી કૃષ્ણ શરણં મમઃ ।।',
    subHeader: '🦚 ભવ્ય જન્માષ્ટમી મહોત્સવ & મટકી ફોડ 🦚',
    personName: 'ગોકુલાષ્ટમી જન્મોત્સવ ૨૦૨૬',
    extraInfo1: 'તારીખ: ૪ સપ્ટેમ્બર, ૨૦૨૬ (શ્રાવણ વદ આઠમ)',
    extraInfo2: 'રાત્રે ૧૨:૦૦ કલાકે કૃષ્ણ પ્રાગટ્ય, મહાઆરતી & પંજરી પ્રસાદ',
    venue: 'શ્રી રાધા કૃષ્ણ મંદિર, ઇસ્કોન, અમદાવાદ',
    footer: 'નંદ ઘેર આનંદ ભયો, જય કન્હૈયા લાલ કી!',
    badgeIcon: '🦚',
    layoutStyle: 'ROYAL',
    slogans: ['।। હાથી ઘોડા પાલખી, જય કન્હૈયા લાલ કી ।। 🦚', 'કૃષ્ણ જન્મોત્સવની હાર્દિક શુભકામનાઓ 🙏'],
    stickers: ['🦚', '🏺', '✨', '🪔', '🚩', '🙏']
  },
  {
    id: 'JAIN_SAMVATSARI',
    cat: 'DEVOTIONAL',
    title: '।। મિચ્છામિ દુક્કડમ્ ।।',
    subHeader: '卐 પરમ પાવન પર્વાધિરાજ પર્યુષણ & સંવત્સરી 卐',
    personName: 'ક્ષમાપના પર્વ ૨૦૨૬',
    extraInfo1: 'પર્યુષણ પ્રારંભ: ૧૦ સપ્ટે | સંવત્સરી: ૧૭ સપ્ટેમ્બર',
    extraInfo2: 'જાણે-અજાણે મન, વચન, કાયાથી થયેલ ભૂલો બદલ અંતઃકરણપૂર્વક ક્ષમા',
    venue: 'સમસ્ત જૈન શ્વેતાંબર-દિગંબર સમાજ, અમદાવાદ',
    footer: 'સર્વે જીવો પ્રત્યે મૈત્રીભાવ - ખામણેણા!',
    badgeIcon: '卐',
    layoutStyle: 'ROYAL',
    slogans: ['।। મિચ્છામિ દુક્કડમ્ - સર્વે જીવો પ્રત્યે મૈત્રીભાવ ।। 🙏', 'તપ એ જ સાચું જીવનધન છે 卐'],
    stickers: ['卐', 'ॐ', '🪔', '🚩', '✨', '💐', '🙏']
  },
  {
    id: 'WEDDING_KANKOTRI',
    cat: 'INVITATION',
    title: '।। શ્રી ગણેશાય નમઃ ।।',
    subHeader: 'શુભ લગ્ન આમંત્રણ પત્રિકા',
    personName: 'ચિ. વરરાજા સંગ ચિ. કન્યા',
    extraInfo1: 'શુભ લગ્ન તારીખ: ૨૮ ઓગસ્ટ, ૨૦૨૬',
    extraInfo2: 'હસ્તમેળાપ: સાંજે ૭:૩૦ કલાકે | ભોજન સમારંભ: ૮:૩૦ થી',
    venue: 'ધ ગ્રાન્ડ હેરીટેજ પેલેસ રિસોર્ટ, અમદાવાદ',
    footer: 'સ્નેહીજનો તથા પરિવારજનોને પધારવા ભાવભર્યું નિમંત્રણ.',
    badgeIcon: '卐',
    layoutStyle: 'ROYAL',
    slogans: ['।। મંગલમ્ ભગવાન વિષ્ણુઃ મંગલમ્ ગરુડધ્વજઃ ।।', 'બે હૃદયનું મિલન, સ્નેહનું મંગલ પ્રસ્થાન ❤️'],
    stickers: ['卐', '🪔', '💍', '💐', '✨', '🥁', '❤️']
  },
  {
    id: 'GRAND_OPENING_SHOP',
    cat: 'BUSINESS',
    title: 'GRAND OPENING CEREMONY',
    subHeader: '✨ આપનું હાર્દિક સ્વાગત છે ✨',
    personName: 'JD3 FASHION & LIFESTHUB',
    extraInfo1: 'તારીખ: ૨૮ ઓગસ્ટ, ૨૦૨૬ | સમય: સવારે ૯:૦૦ થી',
    extraInfo2: '🎉 પ્રથમ ૧૦૦ ગ્રાહકો માટે ફ્લેટ 30% OFF! 🎉',
    venue: 'શોપ નં. 12, શિવમ આર્કેડ, ઘાટલોડિયા, અમદાવાદ',
    footer: 'સંપર્ક: 98989 00000 | ખાસ પધારી આશીર્વાદ આપવા વિનંતી.',
    badgeIcon: '🛍️',
    layoutStyle: 'SUPER_SALE',
    slogans: ['💥 ભવ્ય ઓપનિંગ - ખાસ 30% સુધીનું ડિસ્કાઉન્ટ 💥', 'નવી શરૂઆત, શ્રેષ્ઠ ગુણવત્તા, વિશ્વાસપાત્ર સેવા!'],
    stickers: ['🛍️', '🎉', '🔥', '✨', '📢', '🏷️', '⭐', '💥']
  },
  {
    id: 'TUITION_ADMISSION',
    cat: 'EDUCATION',
    title: 'SHREE TUITION CLASSES',
    subHeader: '🎯 ADMISSION OPEN 2026-2027 🎯',
    personName: 'Std: 8th to 12th (Commerce & Science)',
    extraInfo1: 'વિષયો: Maths, Science, English, Accounts',
    extraInfo2: '✨ સ્પેશિયલ પર્સનલ ધ્યાન & વીકલી ટેસ્ટ સીરીઝ ✨',
    venue: 'ઘાટલોડિયા, અમદાવાદ | મો. 98989 00000',
    footer: 'પહેલા 20 વિદ્યાર્થીઓ માટે ખાસ 20% ડિસ્કાઉન્ટ!',
    badgeIcon: '📚',
    layoutStyle: 'MINIMAL',
    slogans: ['🎯 ઉજ્જવળ ભવિષ્યની મજબૂત શરૂઆત 🎯', 'શ્રેષ્ઠ પરિણામ & વ્યક્તિગત માર્ગદર્શનની ગેરંટી'],
    stickers: ['📚', '🎯', '💡', '🎓', '⭐', '✍️', '🏅']
  },
  {
    id: 'BOX_CRICKET_LEAGUE',
    cat: 'SPORTS',
    title: 'PREMIER CRICKET LEAGUE - 2026',
    subHeader: '🏆 MEGA BOX CRICKET TOURNAMENT 🏆',
    personName: 'વિનિંગ પ્રાઇઝ: ₹25,000/- | રનર્સ અપ: ₹11,000/-',
    extraInfo1: 'એન્ટ્રી ફી: ₹1500 / ટીમ | લિમિટેડ 16 ટીમો',
    extraInfo2: 'તારીખ: 10 થી 12 સપ્ટેમ્બર | ડે-નાઇટ મેચો (ટર્ફ)',
    venue: 'ધ બોક્સ એરેના ટર્ફ, એસ.જી. હાઇવે, અમદાવાદ',
    footer: 'રજીસ્ટ્રેશન માટે સંપર્ક: 98765 43210 (દિવ્ય)',
    badgeIcon: '🏏',
    layoutStyle: 'MIDNIGHT_NEON',
    slogans: ['🔥 ધમાકેદાર બોક્સ ક્રિકેટ જંગ - ચેમ્પિયન કોણ? 🔥', 'READY TO PLAY? REGISTER YOUR SQUAD NOW ⚡'],
    stickers: ['🏏', '🏆', '🥇', '⚡', '🔥', '🎯', '📢']
  },
  {
    id: 'DAILY_GOOD_MORNING',
    cat: 'SOCIAL',
    title: 'શુભ સવાર - જય શ્રી કૃષ્ણ',
    subHeader: '✨ આજના દિવસનો સુંદર સુવિચાર ✨',
    personName: 'સકારાત્મક વિચારો એ જ સફળતાની ચાવી છે',
    extraInfo1: 'તમારો આજનો દિવસ આનંદમય અને પ્રગતિશીલ રહે',
    extraInfo2: 'હંમેશાં હસતા રહો અને ખુશીઓ વહેંચતા રહો 🌸',
    venue: 'અમદાવાદ, ગુજરાત',
    footer: 'શુભ પ્રભાત - Have a Wonderful Day!',
    badgeIcon: '☀️',
    layoutStyle: 'FLORAL_PASTEL',
    slogans: ['શુભ સવાર! પ્રભુ આપનો દિવસ મંગલમય રાખે ☀️', 'હસતા રહો, ખુશ રહો 🌸'],
    stickers: ['☀️', '🌸', '✨', '☕', '🪷', '🙏']
  }
];

export default function App() {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const previewContainerRef = useRef(null);

  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplateId, setSelectedTemplateId] = useState('DIWALI_MAIN');
  const [currentStyle, setCurrentStyle] = useState(LAYOUT_STYLES[0]);
  const [selectedFont, setSelectedFont] = useState(FONTS[0].family);
  const [selectedEffect, setSelectedEffect] = useState('NONE');
  const [canvasFormat, setCanvasFormat] = useState('PORTRAIT');
  const [frameShape, setFrameShape] = useState('CIRCLE');
  
  // Mobile View Switcher: 'CONTROLS' | 'PREVIEW'
  const [mobileActiveView, setMobileActiveView] = useState('CONTROLS');

  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [showCornerBadges, setShowCornerBadges] = useState(true);
  const [customTextColor, setCustomTextColor] = useState('#4F46E5');
  const [elementOpacity, setElementOpacity] = useState(1);
  const [previewScale, setPreviewScale] = useState(1);

  // Undo / Redo History Tracking
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const isHistoryAction = useRef(false);

  const [savedDrafts, setSavedDrafts] = useState(() => {
    const drafts = localStorage.getItem('designly_drafts');
    return drafts ? JSON.parse(drafts) : [];
  });

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('designly_data');
    return saved ? JSON.parse(saved) : MASTER_TEMPLATES[0];
  });

  useEffect(() => {
    localStorage.setItem('designly_data', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('designly_drafts', JSON.stringify(savedDrafts));
  }, [savedDrafts]);

  // Push state to history
  const pushHistory = (currentFormData, currentStyleObj, effectId) => {
    if (isHistoryAction.current) return;
    const snapshot = {
      formData: { ...currentFormData },
      currentStyle: { ...currentStyleObj },
      selectedEffect: effectId
    };
    const newHistory = history.slice(0, historyIndex + 1);
    setHistory([...newHistory, snapshot]);
    setHistoryIndex(newHistory.length);
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      isHistoryAction.current = true;
      const targetState = history[historyIndex - 1];
      setFormData(targetState.formData);
      setCurrentStyle(targetState.currentStyle);
      setSelectedEffect(targetState.selectedEffect || 'NONE');
      setHistoryIndex(historyIndex - 1);
      setTimeout(() => { isHistoryAction.current = false; }, 100);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      isHistoryAction.current = true;
      const targetState = history[historyIndex + 1];
      setFormData(targetState.formData);
      setCurrentStyle(targetState.currentStyle);
      setSelectedEffect(targetState.selectedEffect || 'NONE');
      setHistoryIndex(historyIndex + 1);
      setTimeout(() => { isHistoryAction.current = false; }, 100);
    }
  };

  // Keyboard shortcut listener (Ctrl+Z, Ctrl+Y, Delete)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        handleUndo();
        return;
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.shiftKey && e.key === 'Z'))) {
        e.preventDefault();
        handleRedo();
        return;
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        const canvas = fabricCanvasRef.current;
        if (!canvas) return;
        const activeObj = canvas.getActiveObject();
        if (activeObj && activeObj.isEditing) return;

        if (activeObj && activeObj.selectable) {
          canvas.remove(activeObj);
          canvas.discardActiveObject();
          canvas.renderAll();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [historyIndex, history]);

  // Responsive Canvas Auto-Scaling
  useEffect(() => {
    const handleResize = () => {
      if (previewContainerRef.current) {
        const containerWidth = previewContainerRef.current.clientWidth - 24;
        const baseWidth = 500;
        if (containerWidth < baseWidth && containerWidth > 0) {
          setPreviewScale(containerWidth / baseWidth);
        } else {
          setPreviewScale(1);
        }
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [canvasFormat, mobileActiveView]);

  const handleSelectTemplate = (template) => {
    setSelectedTemplateId(template.id);
    const matchedStyle = LAYOUT_STYLES.find(s => s.id === template.layoutStyle) || LAYOUT_STYLES[0];
    setCurrentStyle(matchedStyle);
    const updated = {
      ...template,
      imageUrl: formData.imageUrl || null,
      bgTextureUrl: null,
    };
    setFormData(updated);
    pushHistory(updated, matchedStyle, selectedEffect);
    confetti({ particleCount: 35, spread: 40 });
  };

  const handleReset = () => {
    const t = MASTER_TEMPLATES.find(x => x.id === selectedTemplateId) || MASTER_TEMPLATES[0];
    setFormData(t);
    setFontSizeOffset(0);
    pushHistory(t, currentStyle, selectedEffect);
  };

  const handleSaveDraft = () => {
    const newDraft = {
      id: Date.now(),
      dateSaved: new Date().toLocaleDateString('gu-IN'),
      templateId: selectedTemplateId,
      styleId: currentStyle.id,
      data: { ...formData }
    };
    setSavedDrafts([newDraft, ...savedDrafts.slice(0, 5)]);
    confetti({ particleCount: 40, spread: 40 });
  };

  const handleLoadDraft = (draft) => {
    setSelectedTemplateId(draft.templateId || 'DIWALI_MAIN');
    const matchedStyle = LAYOUT_STYLES.find(s => s.id === draft.styleId) || LAYOUT_STYLES[0];
    setCurrentStyle(matchedStyle);
    setFormData(draft.data);
    pushHistory(draft.data, matchedStyle, selectedEffect);
  };

  const handleDeleteDraft = (id, e) => {
    e.stopPropagation();
    setSavedDrafts(savedDrafts.filter(d => d.id !== id));
  };

  const handleAddCustomText = (textValue = 'નવું લખાણ (Double Click to Edit)') => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const existingCustomCount = canvas.getObjects().filter(o => o.selectable).length;
    const staggeredTop = 260 + (existingCustomCount * 35) % 250;
    const staggeredLeft = 250 + ((existingCustomCount % 3) - 1) * 20;

    const effectObj = TEXT_EFFECTS.find(e => e.id === selectedEffect);

    const customText = new fabric.IText(textValue, {
      left: staggeredLeft,
      top: staggeredTop,
      originX: 'center',
      originY: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: selectedFont,
      fill: customTextColor,
      shadow: effectObj ? effectObj.shadow : null,
      opacity: elementOpacity,
      selectable: true,
      hasControls: true,
      cornerColor: '#4F46E5',
      cornerSize: 8,
      transparentCorners: false,
    });

    canvas.add(customText);
    canvas.setActiveObject(customText);
    canvas.renderAll();
  };

  const handleAddSticker = (stickerEmoji) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const existingCustomCount = canvas.getObjects().filter(o => o.selectable).length;
    const staggeredTop = 320 + (existingCustomCount * 30) % 220;
    const staggeredLeft = 250 + ((existingCustomCount % 4) - 1.5) * 30;

    const sticker = new fabric.FabricText(stickerEmoji, {
      left: staggeredLeft,
      top: staggeredTop,
      originX: 'center',
      originY: 'center',
      fontSize: 38,
      opacity: elementOpacity,
      selectable: true,
      hasControls: true,
      cornerColor: '#4F46E5',
      cornerSize: 8,
      transparentCorners: false,
    });

    canvas.add(sticker);
    canvas.setActiveObject(sticker);
    canvas.renderAll();
  };

  const handleDeleteSelected = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.selectable) {
      canvas.remove(activeObj);
      canvas.discardActiveObject();
      canvas.renderAll();
    }
  };

  const handleClearAllCustom = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const customObjects = canvas.getObjects().filter(obj => obj.selectable);
    customObjects.forEach(obj => canvas.remove(obj));
    canvas.discardActiveObject();
    canvas.renderAll();
  };

  const handleBringForward = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.selectable) {
      canvas.bringObjectForward(activeObj);
      canvas.renderAll();
    }
  };

  const handleSendBackward = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.selectable) {
      canvas.sendObjectBackwards(activeObj);
      canvas.renderAll();
    }
  };

  const handleOpacityChange = (val) => {
    const num = parseFloat(val);
    setElementOpacity(num);
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;
    const activeObj = canvas.getActiveObject();
    if (activeObj && activeObj.selectable) {
      activeObj.set({ opacity: num });
      canvas.renderAll();
    }
  };

  const handleWhatsAppShare = () => {
    const shareText = `*${formData.title}*\n${formData.subHeader}\n\n*${formData.personName}*\n${formData.extraInfo1}\n${formData.extraInfo2}\n📍 *સ્થળ:* ${formData.venue}\n\n_Created on Designly by JD3studio_`;
    const encoded = encodeURIComponent(shareText);
    window.open(`https://api.whatsapp.com/send?text=${encoded}`, '_blank');
  };

  const canvasDimensions = canvasFormat === 'PORTRAIT' 
    ? { width: 500, height: 700 } 
    : { width: 500, height: 888 };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasDimensions.width,
      height: canvasDimensions.height,
      backgroundColor: currentStyle.bg,
    });

    fabricCanvasRef.current = canvas;
    renderTemplate(formData, currentStyle, canvasFormat, selectedFont, fontSizeOffset, showCornerBadges, frameShape, selectedEffect);

    return () => {
      canvas.dispose();
    };
  }, [canvasFormat]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      renderTemplate(formData, currentStyle, canvasFormat, selectedFont, fontSizeOffset, showCornerBadges, frameShape, selectedEffect);
    }
  }, [formData, currentStyle, canvasFormat, selectedFont, fontSizeOffset, showCornerBadges, frameShape, selectedEffect]);

  const cropImageToShape = (imgUrl, shape = 'CIRCLE', size = 300) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = size;
        offCanvas.height = size;
        const ctx = offCanvas.getContext('2d');

        ctx.beginPath();
        if (shape === 'CIRCLE' || shape === 'ROYAL_RING') {
          ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        } else if (shape === 'SQUARE') {
          ctx.roundRect(0, 0, size, size, 24);
        } else if (shape === 'HEART') {
          const d = size;
          ctx.moveTo(d / 2, d * 0.8);
          ctx.bezierCurveTo(d / 2, d * 0.7, 0, d * 0.45, 0, d * 0.25);
          ctx.bezierCurveTo(0, 0, d * 0.4, 0, d / 2, d * 0.25);
          ctx.bezierCurveTo(d * 0.6, 0, d, 0, d, d * 0.25);
          ctx.bezierCurveTo(d, d * 0.45, d / 2, d * 0.7, d / 2, d * 0.8);
        }
        ctx.closePath();
        ctx.clip();

        const minDim = Math.min(img.width, img.height);
        const sx = (img.width - minDim) / 2;
        const sy = (img.height - minDim) / 2;

        ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, size, size);
        resolve(offCanvas.toDataURL('image/png'));
      };
      img.src = imgUrl;
    });
  };

  const renderTemplate = async (data, theme, format, fontFam, sizeOffset, withBadges, fShape, effectId) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const customObjects = canvas.getObjects().filter(obj => obj.selectable);
    const isStory = format === 'STORY';
    const cHeight = isStory ? 888 : 700;

    const effectObj = TEXT_EFFECTS.find(e => e.id === effectId);
    const activeShadow = effectObj ? effectObj.shadow : null;

    canvas.setDimensions({ width: 500, height: cHeight });
    canvas.clear();

    // Background Texture
    if (data.bgTextureUrl) {
      try {
        const bgImgElement = new Image();
        bgImgElement.src = data.bgTextureUrl;
        bgImgElement.onload = () => {
          const scale = Math.max(500 / bgImgElement.width, cHeight / bgImgElement.height);

          const fBg = new fabric.FabricImage(bgImgElement, {
            left: 250,
            top: cHeight / 2,
            originX: 'center',
            originY: 'center',
            scaleX: scale,
            scaleY: scale,
            selectable: false,
            opacity: 0.95
          });

          canvas.add(fBg);
          canvas.sendObjectToBack(fBg);
          canvas.renderAll();
        };
      } catch (e) {
        canvas.backgroundColor = theme.bg;
      }
    } else {
      canvas.backgroundColor = theme.bg;
    }

    // Frosted Glass Content Panel
    if (data.bgTextureUrl) {
      const glassCard = new fabric.Rect({
        left: 20,
        top: 20,
        width: 460,
        height: cHeight - 40,
        fill: 'rgba(255, 255, 255, 0.85)',
        stroke: 'rgba(255, 255, 255, 0.4)',
        strokeWidth: 1,
        rx: 16,
        ry: 16,
        selectable: false,
      });
      canvas.add(glassCard);
    }

    // Double Borders
    const outerBorder = new fabric.Rect({
      left: 15,
      top: 15,
      width: 470,
      height: cHeight - 30,
      fill: 'transparent',
      stroke: theme.borderOuter,
      strokeWidth: 2.5,
      rx: 16,
      ry: 16,
      strokeUniform: true,
      selectable: false,
    });

    const innerBorder = new fabric.Rect({
      left: 23,
      top: 23,
      width: 454,
      height: cHeight - 46,
      fill: 'transparent',
      stroke: theme.borderInner,
      strokeWidth: 1.2,
      rx: 12,
      ry: 12,
      strokeUniform: true,
      selectable: false,
    });
    canvas.add(outerBorder, innerBorder);

    // Corner Badges
    if (withBadges && data.badgeIcon) {
      const b1 = new fabric.FabricText(data.badgeIcon, { left: 34, top: 34, fontSize: 16, fill: theme.badgeText, selectable: false });
      const b2 = new fabric.FabricText(data.badgeIcon, { left: 450, top: 34, fontSize: 16, fill: theme.badgeText, selectable: false });
      canvas.add(b1, b2);
    }

    // Top Header Badge
    const topBadge = new fabric.Rect({
      left: 250,
      top: isStory ? 75 : 55,
      width: 380,
      height: 44,
      originX: 'center',
      originY: 'center',
      fill: theme.headerBg,
      stroke: theme.headerBorder,
      strokeWidth: 1.5,
      rx: 22,
      ry: 22,
      selectable: false,
    });

    const titleText = new fabric.FabricText(data.title || '', {
      left: 250,
      top: isStory ? 75 : 55,
      originX: 'center',
      originY: 'center',
      fontSize: 17 + sizeOffset,
      fontWeight: 'bold',
      fontFamily: fontFam,
      fill: theme.badgeText,
      shadow: activeShadow,
      selectable: false,
    });
    canvas.add(topBadge, titleText);

    // Photo Frame
    const circleCenterX = 250;
    const circleCenterY = isStory ? 220 : 175;
    const frameRadius = isStory ? 75 : 65;

    if (data.imageUrl) {
      try {
        const croppedDataUrl = await cropImageToShape(data.imageUrl, fShape, 300);
        const imgElement = new Image();
        imgElement.src = croppedDataUrl;
        imgElement.onload = () => {
          const fImg = new fabric.FabricImage(imgElement);
          fImg.set({
            left: circleCenterX,
            top: circleCenterY,
            originX: 'center',
            originY: 'center',
            scaleX: (frameRadius * 2) / 300,
            scaleY: (frameRadius * 2) / 300,
            selectable: false,
          });

          if (fShape === 'ROYAL_RING' || fShape === 'CIRCLE') {
            const photoBorder = new fabric.Circle({
              left: circleCenterX,
              top: circleCenterY,
              radius: frameRadius,
              originX: 'center',
              originY: 'center',
              fill: 'transparent',
              stroke: theme.borderOuter,
              strokeWidth: fShape === 'ROYAL_RING' ? 5 : 3,
              selectable: false,
            });
            canvas.add(fImg, photoBorder);
          } else {
            canvas.add(fImg);
          }
          canvas.renderAll();
        };
      } catch (err) {
        console.error("Error loading image", err);
      }
    } else {
      const placeholderCircle = new fabric.Circle({
        left: circleCenterX,
        top: circleCenterY,
        radius: frameRadius,
        originX: 'center',
        originY: 'center',
        fill: theme.headerBg,
        stroke: theme.borderOuter,
        strokeWidth: 2.5,
        selectable: false,
      });

      const placeholderText = new fabric.FabricText('ફોટો / લોગો', {
        left: circleCenterX,
        top: circleCenterY,
        originX: 'center',
        originY: 'center',
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: fontFam,
        fill: theme.secondaryText,
        selectable: false,
      });
      canvas.add(placeholderCircle, placeholderText);
    }

    // Sub-Header & Main Name
    const subHeaderY = isStory ? 340 : 265;
    const nameY = isStory ? 380 : 298;

    const subHeaderText = new fabric.FabricText(data.subHeader || '', {
      left: 250,
      top: subHeaderY,
      originX: 'center',
      fontSize: 13,
      fontWeight: 'bold',
      fontFamily: fontFam,
      fill: theme.badgeText,
      selectable: false,
    });

    const nameText = new fabric.FabricText(data.personName || '', {
      left: 250,
      top: nameY,
      originX: 'center',
      fontSize: 22 + sizeOffset,
      fontWeight: 'bold',
      fontFamily: fontFam,
      fill: theme.primaryText,
      shadow: activeShadow,
      selectable: false,
    });
    canvas.add(subHeaderText, nameText);

    // Middle Info Card
    const infoBgY = isStory ? 495 : 395;
    const infoBg = new fabric.Rect({
      left: 250,
      top: infoBgY,
      width: 410,
      height: 90,
      originX: 'center',
      originY: 'center',
      fill: theme.headerBg,
      stroke: theme.headerBorder,
      strokeWidth: 1.2,
      rx: 12,
      ry: 12,
      selectable: false,
    });

    const infoText1 = new fabric.FabricText(data.extraInfo1 || '', {
      left: 250,
      top: infoBgY - 16,
      originX: 'center',
      originY: 'center',
      fontSize: 15,
      fontWeight: 'bold',
      fontFamily: fontFam,
      fill: theme.primaryText,
      selectable: false,
    });

    const infoText2 = new fabric.FabricText(data.extraInfo2 || '', {
      left: 250,
      top: infoBgY + 16,
      originX: 'center',
      originY: 'center',
      fontSize: 14,
      fontWeight: '600',
      fontFamily: fontFam,
      fill: theme.secondaryText,
      selectable: false,
    });
    canvas.add(infoBg, infoText1, infoText2);

    // Venue Section
    const venueY = isStory ? 610 : 480;
    const venueLabel = new fabric.FabricText('— શુભ સંદેશ / સ્થળ —', {
      left: 250,
      top: venueY,
      originX: 'center',
      fontSize: 13,
      fontWeight: 'bold',
      fontFamily: fontFam,
      fill: theme.badgeText,
      selectable: false,
    });

    const venueText = new fabric.FabricText(data.venue || '', {
      left: 250,
      top: venueY + 32,
      originX: 'center',
      fontSize: 14,
      fontFamily: fontFam,
      fill: theme.primaryText,
      textAlign: 'center',
      selectable: false,
    });
    canvas.add(venueLabel, venueText);

    // Footer Note
    const footerY = isStory ? cHeight - 65 : 630;
    const footerText = new fabric.FabricText(data.footer || '', {
      left: 250,
      top: footerY,
      originX: 'center',
      fontSize: 12,
      fontWeight: 'bold',
      fontFamily: fontFam,
      fill: theme.badgeText,
      selectable: false,
    });
    canvas.add(footerText);

    customObjects.forEach((obj) => canvas.add(obj));
    canvas.renderAll();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const updated = { ...formData, imageUrl: event.target.result };
        setFormData(updated);
        pushHistory(updated, currentStyle, selectedEffect);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDownloadPNG = () => {
    if (!fabricCanvasRef.current) return;
    confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });

    const dataURL = fabricCanvasRef.current.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 3,
    });
    const link = document.createElement('a');
    link.download = `Designly-${formData.title || 'design'}-${canvasFormat.toLowerCase()}.png`;
    link.href = dataURL;
    link.click();
  };

  const handleDownloadPDF = () => {
    if (!fabricCanvasRef.current) return;
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

    const dataURL = fabricCanvasRef.current.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 3,
    });

    const isStory = canvasFormat === 'STORY';
    const pdfWidth = 210;
    const pdfHeight = isStory ? (210 * 888) / 500 : (210 * 700) / 500;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });

    pdf.addImage(dataURL, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`Designly-${formData.title || 'design'}-print.pdf`);
  };

  const activeStickers = formData.stickers || ['✨', '🪔', '💐', '🎉', '🙏'];
  const activeSlogans = formData.slogans || [];

  const filteredTemplates = MASTER_TEMPLATES.filter(t => {
    const matchesTab = activeTab === 'ALL' || t.cat === activeTab;
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          t.subHeader.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          t.personName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between overflow-x-hidden">
      {/* Top Navbar */}
      <nav className="w-full bg-white border-b border-slate-200 px-4 sm:px-6 md:px-8 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <Sparkles size={16} />
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-black text-slate-900 text-base sm:text-lg tracking-tight">
              Designly
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full">
              by JD3studio
            </span>
          </div>
        </div>

        {/* Top Action Buttons (Undo / Redo / PWA) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleUndo}
            disabled={historyIndex <= 0}
            className={`p-1.5 sm:p-2 rounded-lg border text-xs font-bold flex items-center gap-1 transition ${
              historyIndex > 0 ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm' : 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
            }`}
            title="Undo (Ctrl+Z)"
          >
            <Undo2 size={14} />
          </button>
          <button
            onClick={handleRedo}
            disabled={historyIndex >= history.length - 1}
            className={`p-1.5 sm:p-2 rounded-lg border text-xs font-bold flex items-center gap-1 transition ${
              historyIndex < history.length - 1 ? 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200 shadow-sm' : 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
            }`}
            title="Redo (Ctrl+Y)"
          >
            <Redo2 size={14} />
          </button>
        </div>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-5 md:p-8 flex flex-col items-center">
        
        {/* Clean Centered Header & Search */}
        <header className="w-full mb-6 text-center max-w-5xl mx-auto px-4 flex flex-col items-center">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold mb-2 shadow-sm">
            <LayoutGrid size={14} /> ૫૦+ રેડી-મેડ ટેમ્પ્લેટ્સ & મલ્ટી-લેઆઉટ સ્ટાઇલ સ્ટુડિયો
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-800">
            Festival & Business Poster Studio
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-0.5">મોબાઈલ, ટેબ્લેટ કે પીસી - ૧-મિનિટમાં કસ્ટમ પોસ્ટર બનાવો</p>

          {/* Search Bar */}
          <div className="mt-4 w-full flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3.5 top-2.5 text-slate-400" size={15} />
              <input
                type="text"
                placeholder="સર્ચ કરો (દિવાળી, કંકોત્રી, સેલ, ક્રિકેટ...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm transition"
              />
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 w-full max-w-4xl mx-auto">
            {CATEGORY_TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1.5 rounded-xl font-bold text-[11px] sm:text-xs transition-all ${
                  activeTab === t.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100 scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Horizontal Scrollable Templates Grid */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 w-full px-1 scrollbar-thin">
            {filteredTemplates.map((template) => {
              const isSelected = selectedTemplateId === template.id;
              return (
                <button
                  key={template.id}
                  onClick={() => handleSelectTemplate(template)}
                  className={`flex-shrink-0 p-2 sm:p-2.5 rounded-2xl border text-left transition-all max-w-[190px] sm:max-w-[210px] ${
                    isSelected
                      ? 'bg-indigo-50 border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                      : 'bg-white border-slate-200 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-base">{template.badgeIcon}</span>
                    <h4 className="text-[11px] sm:text-xs font-bold text-slate-800 truncate">{template.title}</h4>
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">{template.subHeader}</p>
                </button>
              );
            })}
          </div>
        </header>

        {/* Mobile View Switcher Tabs */}
        <div className="flex lg:hidden w-full max-w-md bg-white p-1 rounded-2xl border border-slate-200 shadow-sm mb-4">
          <button
            onClick={() => setMobileActiveView('CONTROLS')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              mobileActiveView === 'CONTROLS'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <SlidersHorizontal size={14} /> 🛠️ એડિટર (Controls)
          </button>
          <button
            onClick={() => setMobileActiveView('PREVIEW')}
            className={`flex-1 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition ${
              mobileActiveView === 'PREVIEW'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-50'
            }`}
          >
            <Eye size={14} /> 👁️ લાઈવ પ્રિવ્યુ (Preview)
          </button>
        </div>

        {/* Responsive Grid Layout */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-start">
          
          {/* Controls Form Box */}
          <div className={`bg-white p-4 sm:p-6 rounded-2xl shadow-md border border-slate-200 space-y-4 w-full ${
            mobileActiveView === 'CONTROLS' ? 'block' : 'hidden lg:block'
          }`}>
            
            <div className="space-y-3 pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                  <Palette size={14} className="text-indigo-600" /> લેઆઉટ સ્ટાઇલ:
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleSaveDraft} 
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded transition"
                  >
                    <BookmarkPlus size={13} /> સેવ ડ્રાફ્ટ
                  </button>
                  <button 
                    onClick={handleReset} 
                    className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1"
                  >
                    <RotateCcw size={12} /> રીસેટ
                  </button>
                </div>
              </div>
              
              {/* Layout Styles Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {LAYOUT_STYLES.map((style) => (
                  <button
                    key={style.id}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, bgTextureUrl: null }));
                      setCurrentStyle(style);
                      pushHistory({ ...formData, bgTextureUrl: null }, style, selectedEffect);
                    }}
                    className={`p-1.5 text-[11px] font-bold rounded-lg border transition truncate ${
                      currentStyle.id === style.id && !formData.bgTextureUrl
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>

              {/* Ready-made Background Library */}
              <div>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mb-1.5">
                  <Sparkles size={13} className="text-indigo-600" /> પ્રી-સેટ બેકગ્રાઉન્ડ:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {PRESET_BACKGROUNDS.map((bg) => (
                    <button
                      key={bg.name}
                      onClick={() => {
                        const updated = { ...formData, bgTextureUrl: bg.value };
                        setFormData(updated);
                        pushHistory(updated, currentStyle, selectedEffect);
                      }}
                      className={`p-1.5 text-[11px] font-bold rounded-lg border transition truncate ${
                        formData.bgTextureUrl === bg.value
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      {bg.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Frame Shapes */}
              <div>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mb-1.5">
                  <Shapes size={13} className="text-indigo-600" /> ફોટો ફ્રેમ સ્ટાઈલ:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                  {[
                    { id: 'CIRCLE', label: 'ગોળ' },
                    { id: 'ROYAL_RING', label: 'રોયલ રીંગ' },
                    { id: 'SQUARE', label: 'સ્ક્વેર કાર્ડ' },
                    { id: 'HEART', label: 'હાર્ટ શેપ ❤️' }
                  ].map((sh) => (
                    <button
                      key={sh.id}
                      onClick={() => setFrameShape(sh.id)}
                      className={`py-1 px-2 rounded-lg text-xs font-bold transition border ${
                        frameShape === sh.id
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {sh.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Shadow & Glow Effects */}
              <div>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mb-1.5">
                  <SunMedium size={13} className="text-indigo-600" /> ટેક્સ્ટ ગ્લો / શેડો ઇફેક્ટ:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 sm:gap-2">
                  {TEXT_EFFECTS.map((eff) => (
                    <button
                      key={eff.id}
                      onClick={() => {
                        setSelectedEffect(eff.id);
                        pushHistory(formData, currentStyle, eff.id);
                      }}
                      className={`py-1 px-2 rounded-lg text-xs font-bold transition border ${
                        selectedEffect === eff.id
                          ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-600'
                      }`}
                    >
                      {eff.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography & Scaling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mb-1">
                    <Type size={13} className="text-indigo-600" /> ફોન્ટ સ્ટાઇલ:
                  </span>
                  <select
                    value={selectedFont}
                    onChange={(e) => setSelectedFont(e.target.value)}
                    className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 bg-slate-50 focus:ring-2 focus:ring-indigo-500 outline-none"
                  >
                    {FONTS.map((f) => (
                      <option key={f.name} value={f.family}>{f.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="text-xs font-bold text-slate-500 flex items-center justify-between mb-1">
                    <span className="flex items-center gap-1"><Sliders size={13} className="text-indigo-600" /> ટેક્સ્ટ સાઇઝ:</span>
                    <span className="text-[10px] bg-slate-100 px-1.5 rounded">{fontSizeOffset > 0 ? `+${fontSizeOffset}` : fontSizeOffset}px</span>
                  </span>
                  <input 
                    type="range" 
                    min="-4" 
                    max="6" 
                    value={fontSizeOffset} 
                    onChange={(e) => setFontSizeOffset(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mt-2"
                  />
                </div>
              </div>

              {/* Quick Tools */}
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <button
                    onClick={() => handleAddCustomText()}
                    className="flex-1 py-1.5 px-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition"
                  >
                    <PlusCircle size={13} /> + ટેક્સ્ટ બોક્સ
                  </button>

                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-1 rounded-lg">
                    <span className="text-[11px] font-bold text-slate-500">રંગ:</span>
                    <input
                      type="color"
                      value={customTextColor}
                      onChange={(e) => setCustomTextColor(e.target.value)}
                      className="w-5 h-5 rounded cursor-pointer border-none bg-transparent"
                    />
                  </div>

                  <button
                    onClick={handleBringForward}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition"
                    title="Bring Forward"
                  >
                    <ArrowUp size={13} />
                  </button>

                  <button
                    onClick={handleSendBackward}
                    className="p-1.5 bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-lg text-xs font-bold transition"
                    title="Send Backward"
                  >
                    <ArrowDown size={13} />
                  </button>

                  <button
                    onClick={handleDeleteSelected}
                    className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-lg text-xs font-bold transition"
                    title="Delete Selected"
                  >
                    <Trash2 size={13} />
                  </button>

                  <button
                    onClick={handleClearAllCustom}
                    className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300 rounded-lg text-xs font-bold transition"
                    title="Clear All"
                  >
                    <Eraser size={13} />
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 bg-slate-50 border border-slate-200 p-1.5 px-2.5 rounded-lg">
                  <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                    <Eye size={12} className="text-indigo-600" /> ઓપેસિટી:
                  </span>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={elementOpacity}
                    onChange={(e) => handleOpacityChange(e.target.value)}
                    className="w-28 sm:w-36 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              {/* Slogans */}
              {activeSlogans.length > 0 && (
                <div className="pt-1">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1 mb-1.5">
                    <Wand2 size={13} className="text-indigo-600" /> સ્લોગન્સ:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeSlogans.map((slogan, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddCustomText(slogan)}
                        className="text-[11px] font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-2 py-1 rounded-md transition truncate max-w-full text-left"
                      >
                        + {slogan}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stickers */}
              {activeStickers.length > 0 && (
                <div className="pt-1">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1 mb-1.5">
                    <Sticker size={13} className="text-indigo-600" /> સ્ટીકર્સ:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
                    {activeStickers.map((stk, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddSticker(stk)}
                        className="p-1.5 px-2 bg-slate-100 hover:bg-indigo-100 border border-slate-200 rounded-lg text-base transition transform hover:scale-110 active:scale-95"
                      >
                        {stk}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Format Switcher */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-1.5 text-xs font-bold text-slate-600 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={showCornerBadges} 
                    onChange={(e) => setShowCornerBadges(e.target.checked)} 
                    className="rounded text-indigo-600 focus:ring-0 cursor-pointer"
                  />
                  કોર્નર બેજ
                </label>

                <div className="inline-flex rounded-lg border border-slate-200 p-0.5 bg-slate-50">
                  <button
                    onClick={() => setCanvasFormat('PORTRAIT')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition flex items-center gap-1 ${
                      canvasFormat === 'PORTRAIT' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    <FileText size={12} /> Portrait
                  </button>
                  <button
                    onClick={() => setCanvasFormat('STORY')}
                    className={`px-2.5 py-1 text-xs font-bold rounded-md transition flex items-center gap-1 ${
                      canvasFormat === 'STORY' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-600'
                    }`}
                  >
                    <Smartphone size={12} /> WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">હેડિંગ / શ્લોક</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    const updated = { ...formData, title: e.target.value };
                    setFormData(updated);
                    pushHistory(updated, currentStyle, selectedEffect);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">સબ-હેડર / ટેગલાઇન</label>
                <input
                  type="text"
                  value={formData.subHeader}
                  onChange={(e) => {
                    const updated = { ...formData, subHeader: e.target.value };
                    setFormData(updated);
                    pushHistory(updated, currentStyle, selectedEffect);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">મુખ્ય નામ / આયોજક / બ્રાન્ડ</label>
                <input
                  type="text"
                  value={formData.personName}
                  onChange={(e) => {
                    const updated = { ...formData, personName: e.target.value };
                    setFormData(updated);
                    pushHistory(updated, currentStyle, selectedEffect);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">વિશેષતા / તારીખ</label>
                  <input
                    type="text"
                    value={formData.extraInfo1}
                    onChange={(e) => {
                      const updated = { ...formData, extraInfo1: e.target.value };
                      setFormData(updated);
                      pushHistory(updated, currentStyle, selectedEffect);
                    }}
                    className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">સમય / ઓફર / વિગત</label>
                  <input
                    type="text"
                    value={formData.extraInfo2}
                    onChange={(e) => {
                      const updated = { ...formData, extraInfo2: e.target.value };
                      setFormData(updated);
                      pushHistory(updated, currentStyle, selectedEffect);
                    }}
                    className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">સ્થળ / સરનામું</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => {
                    const updated = { ...formData, venue: e.target.value };
                    setFormData(updated);
                    pushHistory(updated, currentStyle, selectedEffect);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">નીચેની નોંધ / સંપર્ક</label>
                <input
                  type="text"
                  value={formData.footer}
                  onChange={(e) => {
                    const updated = { ...formData, footer: e.target.value };
                    setFormData(updated);
                    pushHistory(updated, currentStyle, selectedEffect);
                  }}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-xs"
                />
              </div>

              {/* Upload Box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">ફોટો / લોગો અપલોડ</label>
                <label className="flex flex-col items-center justify-center border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-xl p-3 cursor-pointer transition text-center">
                  <ImageIcon className="text-slate-400 mb-0.5" size={20} />
                  <span className="text-xs font-semibold text-slate-600">
                    {formData.imageUrl ? '✓ ફોટો સેટ છે (બદલવા માટે ક્લિક કરો)' : 'ફોટો પસંદ કરો'}
                  </span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
                {formData.imageUrl && (
                  <button
                    onClick={() => {
                      const updated = { ...formData, imageUrl: null };
                      setFormData(updated);
                      pushHistory(updated, currentStyle, selectedEffect);
                    }}
                    className="text-xs text-red-500 hover:text-red-700 block text-center mt-1"
                  >
                    ફોટો હટાવો
                  </button>
                )}
              </div>
            </div>

            {/* Direct Free Download Buttons */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={handleDownloadPNG}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition text-xs active:scale-98"
                >
                  <Download size={15} /> HD PNG ડાઉનલોડ
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition text-xs active:scale-98"
                >
                  <Printer size={15} /> Print PDF ડાઉનલોડ
                </button>
              </div>
              <button
                onClick={handleWhatsAppShare}
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition text-xs active:scale-98"
              >
                <Share2 size={14} /> WhatsApp પર શેર કરો
              </button>
            </div>
          </div>

          {/* Live Preview Container */}
          <div className={`space-y-6 w-full flex flex-col items-center ${
            mobileActiveView === 'PREVIEW' ? 'block' : 'hidden lg:block'
          }`}>
            <div 
              ref={previewContainerRef}
              className="w-full flex flex-col items-center bg-white p-3 sm:p-6 rounded-2xl shadow-md border border-slate-200 overflow-hidden"
            >
              <div className="flex items-center justify-between w-full mb-3">
                <h2 className="text-base sm:text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span>લાઇવ પ્રિવ્યુ</span>
                </h2>
                <span className="text-[10px] sm:text-xs bg-indigo-100 text-indigo-800 font-semibold px-2 py-0.5 rounded">
                  {canvasDimensions.width} x {canvasDimensions.height} px
                </span>
              </div>

              {/* Responsive Scaled Canvas Wrapper */}
              <div 
                className="w-full flex justify-center items-center overflow-hidden transition-all duration-200"
                style={{
                  height: `${canvasDimensions.height * previewScale}px`
                }}
              >
                <div 
                  className="rounded-xl overflow-hidden shadow-xl border border-slate-300 origin-top transition-transform duration-200"
                  style={{ 
                    width: `${canvasDimensions.width}px`, 
                    height: `${canvasDimensions.height}px`,
                    transform: `scale(${previewScale})`
                  }}
                >
                  <canvas ref={canvasRef} />
                </div>
              </div>

              <p className="text-[11px] text-slate-400 mt-3 text-center flex items-center justify-center gap-1">
                <Move size={11} /> લખાણ પર ડબલ-ક્લિક કરીને ટાઈપ કરો | Ctrl+Z / Ctrl+Y સપોર્ટ
              </p>
            </div>

            {/* Quick Download Buttons on Mobile Preview View */}
            <div className="w-full grid grid-cols-2 gap-2 lg:hidden">
              <button
                onClick={handleDownloadPNG}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition text-xs"
              >
                <Download size={14} /> HD PNG
              </button>
              <button
                onClick={handleDownloadPDF}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition text-xs"
              >
                <Printer size={14} /> Print PDF
              </button>
            </div>

            {/* Saved Drafts */}
            {savedDrafts.length > 0 && (
              <div className="w-full bg-white p-4 rounded-2xl shadow-md border border-slate-200">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                  📁 Saved Drafts ({savedDrafts.length})
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {savedDrafts.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => handleLoadDraft(d)}
                      className="p-2 border border-slate-200 rounded-xl hover:border-indigo-500 bg-slate-50 cursor-pointer transition relative group"
                    >
                      <p className="text-xs font-bold text-slate-700 truncate">{d.data.title || 'Untitled'}</p>
                      <p className="text-[10px] text-slate-400">{d.dateSaved}</p>
                      <button
                        onClick={(e) => handleDeleteDraft(d.id, e)}
                        className="absolute top-1 right-1 text-slate-300 hover:text-red-500 p-1 rounded transition opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white border-t border-slate-200 py-4 text-center mt-8">
        <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase flex items-center justify-center gap-1">
          POWERED BY <span className="text-indigo-600 font-bold hover:underline cursor-pointer">JD3studio</span>
        </p>
      </footer>
    </div>
  );
}