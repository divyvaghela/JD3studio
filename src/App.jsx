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
  ExternalLink, 
  ArrowUp, 
  ArrowDown, 
  Wand2, 
  Eye, 
  Eraser, 
  X, 
  Calendar,
  Shapes,
  Globe,
  Copy,
  Check,
  Filter
} from 'lucide-react';

const FONTS = [
  { name: 'Gujarati Traditional (Rasa)', family: "'Rasa', serif" },
  { name: 'Gujarati Clean (Noto Sans)', family: "'Noto Sans Gujarati', sans-serif" },
  { name: 'Modern Sans (Poppins)', family: "'Poppins', sans-serif" },
  { name: 'Royal Classic (Cinzel)', family: "'Cinzel', serif" },
  { name: 'Luxury Serif (Playfair)', family: "'Playfair Display', serif" },
];

const PRESET_BACKGROUNDS = [
  { name: 'None (Solid)', value: null },
  { name: '✨ Golden Mandala', value: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80' },
  { name: '🔥 Kesariya Festive', value: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80' },
  { name: '🌙 Midnight Glow', value: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80' },
  { name: '🌺 Royal Velvet', value: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80' },
];

// Unified Category Tags
const CATEGORY_TAGS = [
  { id: 'ALL', name: 'બધા તહેવારો & ઇવેન્ટ્સ (All)' },
  { id: 'COMMON_FESTIVAL', name: '🎉 સર્વસામાન્ય પર્વો (Diwali, Uttarayan...)' },
  { id: 'DEVOTIONAL', name: '🕉️卐 ધાર્મિક / તપસ્યા / પૂજન' },
  { id: 'NATIONAL_GLOBAL', name: '🇮🇳🌙 રાષ્ટ્રીય & વૈશ્વિક પર્વો' },
  { id: 'BUSINESS_SOCIAL', name: '💼 બિઝનેસ, લગ્ન & આમંત્રણ' }
];

const ALL_FESTIVALS = {
  // Common & Shared Festivals
  DIWALI: {
    id: 'DIWALI',
    tags: ['ALL', 'COMMON_FESTIVAL', 'DEVOTIONAL'],
    name: '🪔 દિવાળી / બેસતું વર્ષ / મહાવીર નિર્વાણ',
    badgeIcon: '🪔',
    colorPresets: [
      { name: 'Deepavali Gold', bg: '#FFFBEB', borderOuter: '#D97706', borderInner: '#FDE68A', headerBg: '#FEF3C7', headerBorder: '#F59E0B', primaryText: '#78350F', secondaryText: '#92400E', badgeText: '#B45309' }
    ],
    defaultData: {
      title: 'શુભ દીપાવલી & નૂતન વર્ષાભિનંદન',
      subHeader: '🪔 ધનતેરસ, દિવાળી અને સાલ મુબારક ૨૦૮૩ 🪔',
      personName: 'દિવ્ય વાઘેલા & પરિવાર',
      extraInfo1: 'સુખ, સમૃદ્ધિ, શાંતિ અને ઉત્તમ સ્વાસ્થ્યની મંગલકામના',
      extraInfo2: 'આપ સર્વેનું નવું વર્ષ પ્રગતિશીલ રહે ✨',
      venue: 'અમદાવાદ, ગુજરાત',
      footer: 'આપના સમગ્ર પરિવારને દીપોત્સવી પર્વની હાર્દિક શુભેચ્છાઓ!',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'હેડિંગ', subHeader: 'સંદેશ', personName: 'શુભેચ્છક / પરિવાર', extraInfo1: 'શુભકામના ૧', extraInfo2: 'શુભકામના ૨', venue: 'સ્થળ', footer: 'નીચેની નોંધ' },
    slogans: ['।। શુભ દીપાવલી & સાલ મુબારક ।। 🪔', 'નવું વર્ષ આપના જીવનમાં સુખ-શાંતિ લાવે ✨', 'ભગવાન મહાવીર નિર્વાણ કલ્યાણક મહોત્સવ 卐'],
    stickers: ['🪔', '🎆', '🎇', '✨', '🪷', '💰', '卐', '🎁']
  },

  UTTARAYAN: {
    id: 'UTTARAYAN',
    tags: ['ALL', 'COMMON_FESTIVAL'],
    name: '🪁 ઉત્તરાયણ / મકરસંક્રાંતિ / લોહડી',
    badgeIcon: '🪁',
    colorPresets: [
      { name: 'Sky Festive', bg: '#F0F9FF', borderOuter: '#0284C7', borderInner: '#BAE6FD', headerBg: '#E0F2FE', headerBorder: '#38BDF8', primaryText: '#0C4A6E', secondaryText: '#0369A1', badgeText: '#0284C7' }
    ],
    defaultData: {
      title: 'HAPPY MAKAR SANKRANTI',
      subHeader: '🪁 કાઈપો છે! ઉત્તરાયણ & લોહડી મહોત્સવ 🪁',
      personName: 'રૂફટોપ પતંગ સેલિબ્રેશન',
      extraInfo1: 'તારીખ: ૧૪ અને ૧૫ જાન્યુઆરી, ૨૦૨૬',
      extraInfo2: 'તલ-ચીકી, ઉંધિયું, જલેબી અને સંગીત સાથે આનંદ!',
      venue: 'અમદાવાદ, ગુજરાત',
      footer: 'સાવચેતીપૂર્વક પતંગ ચગાવો - Happy Uttarayan!',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'હેડિંગ', subHeader: 'સ્લોગન', personName: 'આયોજક / નામ', extraInfo1: 'તારીખ', extraInfo2: 'વિગત', venue: 'સ્થળ', footer: 'સંદેશ' },
    slogans: ['🪁 કાઈપો છે! લપેટ! ઉત્તરાયણ પર્વની ખૂબ ખૂબ શુભેચ્છાઓ 🪁', 'મીઠા તલના લાડુ અને પતંગોત્સવનો અનેરો આનંદ!'],
    stickers: ['🪁', '🧵', '☀️', '🎉', '🔥', '✨']
  },

  AKSHAYA_TRITIYA: {
    id: 'AKSHAYA_TRITIYA',
    tags: ['ALL', 'COMMON_FESTIVAL', 'DEVOTIONAL'],
    name: '💰 અખાત્રીજ / અક્ષય તૃતીયા / વર્ષીતપ પારણા',
    badgeIcon: '💰',
    colorPresets: [
      { name: 'Laxmi Gold', bg: '#FFFBEB', borderOuter: '#CA8A04', borderInner: '#FEF08A', headerBg: '#FEF9C3', headerBorder: '#EAB308', primaryText: '#713F12', secondaryText: '#854D0E', badgeText: '#A16207' }
    ],
    defaultData: {
      title: '।। શુભ અક્ષય તૃતીયા & પારણા ।।',
      subHeader: '✨ અખાત્રીજ પર્વ & વર્ષીતપ પારણા મહોત્સવ ✨',
      personName: 'શુભ મુહૂર્ત & સાધના અભિનંદન',
      extraInfo1: 'તારીખ: ૧૯ એપ્રિલ, ૨૦૨૬ (વૈશાખ સુદ ત્રીજ)',
      extraInfo2: 'અખંડ સૌભાગ્ય, અક્ષય પુણ્ય અને ધન-ધાન્ય વૃદ્ધિ મુહૂર્ત',
      venue: 'અમદાવાદ, ગુજરાત',
      footer: 'આપના જીવનમાં સદા અક્ષય સુખ અને સમૃદ્ધિ બની રહે.',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'હેડિંગ', subHeader: 'સંદેશ', personName: 'પરિવાર / બિઝનેસ', extraInfo1: 'તારીખ', extraInfo2: 'વિગત', venue: 'સ્થળ', footer: 'સંદેશ' },
    slogans: ['અક્ષય તૃતીયાના પાવન પર્વે આપના જીવનમાં સુખ અક્ષય રહે 💰', 'ધન્ય છે વર્ષીતપના તપસ્વીઓને! 卐 🙏'],
    stickers: ['💰', '🪷', '✨', '🪔', '卐', '💐']
  },

  RAKSHABANDHAN: {
    id: 'RAKSHABANDHAN',
    tags: ['ALL', 'COMMON_FESTIVAL'],
    name: '🎁 રક્ષાબંધન (ભાઈ-બહેન સ્નેહ પર્વ)',
    badgeIcon: '🎁',
    colorPresets: [
      { name: 'Pink Affinity', bg: '#FFF1F2', borderOuter: '#E11D48', borderInner: '#FFE4E6', headerBg: '#FFE4E6', headerBorder: '#FB7185', primaryText: '#881337', secondaryText: '#9F1239', badgeText: '#BE123C' }
    ],
    defaultData: {
      title: 'HAPPY RAKSHA BANDHAN',
      subHeader: '✨ સ્નેહ અને રક્ષાનું પવિત્ર બંધન ✨',
      personName: 'ભાઈ-બહેન સ્નેહ મિલન',
      extraInfo1: 'તારીખ: ૨૮ ઓગસ્ટ, ૨૦૨૬ (શ્રાવણી પૂર્ણિમા)',
      extraInfo2: 'સદા હસતા રહો અને જીવનમાં નવી ઊંચાઈઓ સર કરો 💖',
      venue: 'અમદાવાદ',
      footer: 'વિશ્વના સૌથી વ્હાલા ભાઈ/બહેનને રક્ષાબંધનની શુભેચ્છાઓ!',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'હેડિંગ', subHeader: 'સંદેશ', personName: 'શુભેચ્છક', extraInfo1: 'તારીખ', extraInfo2: 'વાક્ય', venue: 'સ્થળ', footer: 'નોંધ' },
    slogans: ['પવિત્ર પ્રેમ અને રક્ષાનું અતૂટ બંધન - રક્ષાબંધન 🎁', 'Happy Raksha Bandhan 💖'],
    stickers: ['🎁', '🍬', '✨', '💐', '💖', '👫']
  },

  HOLI: {
    id: 'HOLI',
    tags: ['ALL', 'COMMON_FESTIVAL'],
    name: '🎨 હોળી-ધુળેટી રંગોત્સવ',
    badgeIcon: '🎨',
    colorPresets: [
      { name: 'Holi Colors', bg: '#FFF1F2', borderOuter: '#EC4899', borderInner: '#FBCFE8', headerBg: '#FCE7F3', headerBorder: '#F472B6', primaryText: '#831843', secondaryText: '#9D174D', badgeText: '#BE185D' }
    ],
    defaultData: {
      title: 'HOLI HAI - રંગોત્સવ ૨૦૨૬',
      subHeader: '🌈 હોલિકા દહન & ધૂળેટીની હાર્દિક શુભેચ્છાઓ 🌈',
      personName: 'ઓર્ગેનિક હર્બલ કલર્સ સેલિબ્રેશન',
      extraInfo1: 'હોલિકા દહન: ૨ માર્ચ | ધૂળેટી રંગોત્સવ: ૩ માર્ચ',
      extraInfo2: 'ઢોલ, ડીજે, ઠંડાઈ, ગુલાલ અને પિચકારી સાથે ધમાલ!',
      venue: 'અમદાવાદ, ગુજરાત',
      footer: 'રંગોના તહેવારમાં આપનું જીવન સદા રંગીન રહે!',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'હેડિંગ', subHeader: 'સબ-હેડર', personName: 'ઇવેન્ટ નામ', extraInfo1: 'તારીખ', extraInfo2: 'વિશેષતા', venue: 'સ્થળ', footer: 'સંદેશ' },
    slogans: ['🎨 રંગોના પાવન પર્વ હોળી-ધુળેટીની હાર્દિક શુભેચ્છાઓ 🎨', 'Happy & Safe Herbal Holi 🌈'],
    stickers: ['🎨', '🔫', '💦', '🌈', '✨', '🥳']
  },

  // Devotional & Tapasya (Hindu & Jain & All Spiritual)
  JAIN_PARYUSHAN: {
    id: 'JAIN_PARYUSHAN',
    tags: ['ALL', 'DEVOTIONAL'],
    name: '卐 જૈન પર્યુષણ & સંવત્સરી (મિચ્છામિ દુક્કડમ્)',
    badgeIcon: '卐',
    colorPresets: [
      { name: 'Royal Tapasya', bg: '#FFFDF9', borderOuter: '#D97706', borderInner: '#FDE68A', headerBg: '#FEF3C7', headerBorder: '#F59E0B', primaryText: '#78350F', secondaryText: '#92400E', badgeText: '#B45309' }
    ],
    defaultData: {
      title: '।। મિચ્છામિ દુક્કડમ્ ।।',
      subHeader: '卐 પરમ પાવન પર્વાધિરાજ પર્યુષણ & સંવત્સરી 卐',
      personName: 'ક્ષમાપના પર્વ ૨૦૨૬',
      extraInfo1: 'પર્યુષણ: ૧૦ થી ૧૭ સપ્ટેમ્બર | સંવત્સરી: ૧૭ સપ્ટેમ્બર',
      extraInfo2: 'જાણે-અજાણે મન, વચન, કાયાથી થયેલ ભૂલો બદલ અંતઃકરણપૂર્વક ક્ષમા',
      venue: 'સમસ્ત જૈન શ્વેતાંબર-દિગંબર સમાજ, અમદાવાદ',
      footer: 'સર્વે જીવો પ્રત્યે મૈત્રીભાવ - ખામણેણા!',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'મંત્ર', subHeader: 'પર્વ વિગત', personName: 'તપસ્વી / નામ', extraInfo1: 'તારીખ ગાળો', extraInfo2: 'ક્ષમાપના સંદેશ', venue: 'સ્થળ', footer: 'નોંધ' },
    slogans: ['।। મિચ્છામિ દુક્કડમ્ - સર્વે જીવો પ્રત્યે મૈત્રીભાવ ।। 🙏', 'તપ એ જ સાચું જીવનધન છે 卐'],
    stickers: ['卐', 'ॐ', '🪔', '🚩', '✨', '💐', '🙏']
  },

  GANESH_CHATURTHI: {
    id: 'GANESH_CHATURTHI',
    tags: ['ALL', 'DEVOTIONAL'],
    name: '🐘 ગણેશ ચતુર્થી / ગણેશોત્સવ',
    badgeIcon: '🚩',
    colorPresets: [
      { name: 'Kesariya Bappa', bg: '#FFF7ED', borderOuter: '#EA580C', borderInner: '#FED7AA', headerBg: '#FFEDD5', headerBorder: '#F97316', primaryText: '#7C2D12', secondaryText: '#C2410C', badgeText: '#9A3412' }
    ],
    defaultData: {
      title: '।। ગણેશોત્સવ ૨૦૨૬ ।।',
      subHeader: '🌺 ભવ્ય ગણેશ સ્થાપના અને મહાઆરતી 🌺',
      personName: 'શ્રી ગણેશ યુવક મંડળ',
      extraInfo1: 'તારીખ: ૧૪ સપ્ટેમ્બર થી અનંત ચતુર્દશી',
      extraInfo2: 'રોજ સાંજે ૭:૩૦ કલાકે ભવ્ય મહાઆરતી & મોદક પ્રસાદ',
      venue: 'મેઈન ચોક, ઘાટલોડિયા, અમદાવાદ',
      footer: 'સર્વે ભક્તોને દર્શન અને પ્રસાદનો લાભ લેવા ભાવભર્યું નિમંત્રણ.',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'મહોત્સવ શીર્ષક', subHeader: 'આરતી વિગત', personName: 'મંડળ / આયોજક', extraInfo1: 'તારીખ', extraInfo2: 'સમય & પ્રસાદ', venue: 'સ્થાપના સ્થળ', footer: 'નોંધ' },
    slogans: ['।। વક્રતુંડ મહાકાય સૂર્યકોટિ સમપ્રભ ।। 🐘', 'ગણપતિ બાપ્પા મોરિયા, પુઢચ્યા વર્ષી લવકર યા!'],
    stickers: ['🐘', '🪔', '🚩', '✨', '💐', '🙏', '🌺']
  },

  JANMASHTAMI: {
    id: 'JANMASHTAMI',
    tags: ['ALL', 'DEVOTIONAL'],
    name: '🦚 કૃષ્ણ જન્માષ્ટમી / મટકી ફોડ',
    badgeIcon: '🦚',
    colorPresets: [
      { name: 'Mayur Pankh', bg: '#EFF6FF', borderOuter: '#2563EB', borderInner: '#BFDBFE', headerBg: '#DBEAFE', headerBorder: '#60A5FA', primaryText: '#1E3A8A', secondaryText: '#1D4ED8', badgeText: '#D97706' }
    ],
    defaultData: {
      title: '।। શ્રી કૃષ્ણ શરણં મમઃ ।।',
      subHeader: '🦚 ભવ્ય જન્માષ્ટમી મહોત્સવ & મટકી ફોડ 🦚',
      personName: 'ગોકુલાષ્ટમી જન્મોત્સવ ૨૦૨૬',
      extraInfo1: 'તારીખ: ૪ સપ્ટેમ્બર, ૨૦૨૬ (શ્રાવણ વદ આઠમ)',
      extraInfo2: 'રાત્રે ૧૨:૦૦ કલાકે કૃષ્ણ પ્રાગટ્ય, મહાઆરતી & પંજરી પ્રસાદ',
      venue: 'શ્રી રાધા કૃષ્ણ મંદિર, અમદાવાદ',
      footer: 'નંદ ઘેર આનંદ ભયો, જય કન્હૈયા લાલ કી!',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'મંત્ર', subHeader: 'ઉત્સવ વિગત', personName: 'મંદિર / મંડળ', extraInfo1: 'તારીખ', extraInfo2: 'સમય & પ્રસાદ', venue: 'સ્થળ', footer: 'જયઘોષ' },
    slogans: ['।। હાથી ઘોડા પાલખી, જય કન્હૈયા લાલ કી ।। 🦚', 'કૃષ્ણ જન્મોત્સવની હાર્દિક શુભકામનાઓ 🙏'],
    stickers: ['🦚', '🏺', '✨', '🪔', '🚩', '🙏']
  },

  MAHAVIR_JAYANTI: {
    id: 'MAHAVIR_JAYANTI',
    tags: ['ALL', 'DEVOTIONAL'],
    name: '卐 મહાવીર જન્મ કલ્યાણક (મહાવીર જયંતી)',
    badgeIcon: '卐',
    colorPresets: [
      { name: 'Sacred Gold', bg: '#FFFDF9', borderOuter: '#D97706', borderInner: '#FDE68A', headerBg: '#FEF3C7', headerBorder: '#F59E0B', primaryText: '#78350F', secondaryText: '#92400E', badgeText: '#B45309' }
    ],
    defaultData: {
      title: '।। જીવો અને જીવવા દો ।।',
      subHeader: '卐 ભગવાન મહાવીર સ્વામી જન્મ કલ્યાણક મહોત્સવ 卐',
      personName: 'શ્રી જૈન શ્વેતાંબર-દિગંબર સંઘ',
      extraInfo1: 'તારીખ: ૨ એપ્રિલ, ૨૦૨૬ (ચૈત્ર સુદ તેરસ)',
      extraInfo2: 'સવારે ભવ્ય શોભાયાત્રા, સ્નાત્ર મહોત્સવ & સ્વામીવાત્સલ્ય',
      venue: 'જૈન દેરાસર પરિસર, અમદાવાદ',
      footer: 'અહિંસા પરમો ધર્મ - જય જિનેન્દ્ર!',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'સંદેશ', subHeader: 'કલ્યાણક વિગત', personName: 'સંઘ નામ', extraInfo1: 'તારીખ', extraInfo2: 'કાર્યક્રમ', venue: 'સ્થળ', footer: 'નોંધ' },
    slogans: ['જીવો અને જીવવા દો - ભગવાન મહાવીર જન્મ કલ્યાણક 卐', 'અહિંસા, સંયમ અને તપ એ જ સાચો ધર્મ છે 🙏'],
    stickers: ['卐', '✨', '🪔', '💐', '🙏', '🕉️']
  },

  SHARAD_NAVRATRI: {
    id: 'SHARAD_NAVRATRI',
    tags: ['ALL', 'DEVOTIONAL', 'COMMON_FESTIVAL'],
    name: '💃 શારદીય નવરાત્રિ / રાસ-ગરબા',
    badgeIcon: '🪘',
    colorPresets: [
      { name: 'Royal Dandiya', bg: '#FAF5FF', borderOuter: '#9333EA', borderInner: '#F3E8FF', headerBg: '#F3E8FF', headerBorder: '#C084FC', primaryText: '#581C87', secondaryText: '#7E22CE', badgeText: '#A855F7' }
    ],
    defaultData: {
      title: '।। જય આદ્યશક્તિ માઁ ।।',
      subHeader: '✨ ભવ્ય શારદીય રાસ-ગરબા મહોત્સવ ૨૦૨૬ ✨',
      personName: 'નવરાત્રિ ગરબા નાઈટ્સ & પાસ',
      extraInfo1: 'તારીખ: ૧૧ થી ૨૦ ઓક્ટોબર, ૨૦૨૬ | રાત્રે ૮:૦૦ થી',
      extraInfo2: 'પાસ વિગત: Couple / Single Entry | લાઈવ ઓર્કેસ્ટ્રા',
      venue: 'ધ ગ્રાન્ડ પાર્ટી પ્લોટ, એસ.પી. રિંગ રોડ, અમદાવાદ',
      footer: 'આકર્ષક ડેઈલી પ્રિન્સ / પ્રિન્સેસ અને બેસ્ટ ડ્રેસ ઇનામો!',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'માંગલિક હેડિંગ', subHeader: 'ઇવેન્ટ શીર્ષક', personName: 'પાર્ટી પ્લોટ / આયોજક', extraInfo1: 'તારીખ & સમય', extraInfo2: 'પાસ વિગત', venue: 'ગરબા ગ્રાઉન્ડ', footer: 'વિશેષતા' },
    slogans: ['ચલો અંબાજી ના ચોકમાં - ભવ્ય રાસ-ગરબા મહોત્સવ 💃', 'મા આદ્યશક્તિ આપ સૌની મનોકામના પૂર્ણ કરે ✨'],
    stickers: ['🪘', '💃', '🕺', '🪔', '🚩', '✨', '🔥']
  },

  MAHA_SHIVRATRI: {
    id: 'MAHA_SHIVRATRI',
    tags: ['ALL', 'DEVOTIONAL'],
    name: '🔱 મહા શિવરાત્રી / શ્રાવણ પૂજન',
    badgeIcon: '🔱',
    colorPresets: [
      { name: 'Shiva Neelkanth', bg: '#F8FAFC', borderOuter: '#0284C7', borderInner: '#BAE6FD', headerBg: '#E0F2FE', headerBorder: '#0EA5E9', primaryText: '#0F172A', secondaryText: '#0369A1', badgeText: '#0284C7' }
    ],
    defaultData: {
      title: '।। ૐ નમઃ શિવાય ।।',
      subHeader: '🔱 મહા શિવરાત્રિ મહોત્સવ & ચાર પ્રહર પૂજા 🔱',
      personName: 'શ્રી મહાદેવ મંદિર ટ્રસ્ટ',
      extraInfo1: 'તારીખ: ૧૬ ફેબ્રુઆરી, ૨૦૨૬ (મહા વદ તેરસ)',
      extraInfo2: 'મહારુદ્રાભિષેક, રાત્રે ૧૨:૦૦ કલાકે મહાઆરતી & ભાંગ પ્રસાદ',
      venue: 'શ્રી સોમનાથ મહાદેવ મંદિર પરિસર, અમદાવાદ',
      footer: 'હર હર મહાદેવ! આપ સર્વે ભક્તો દર્શનનો લાભ લેવા પધારો.',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'મંત્ર', subHeader: 'પૂજા વિગત', personName: 'મંદિર / મંડળ', extraInfo1: 'તારીખ', extraInfo2: 'આરતી & પ્રસાદ', venue: 'સ્થળ', footer: 'જયઘોષ' },
    slogans: ['।। ૐ નમઃ શિવાય ।। હર હર મહાદેવ! 🔱', 'મહા શિવરાત્રિના પાવન પર્વની મંગલકામનાઓ'],
    stickers: ['🔱', '🌙', '🕉️', '🌿', '🪔', '✨', '🙏']
  },

  // National & Global Days
  NATIONAL_DAYS: {
    id: 'NATIONAL_DAYS',
    tags: ['ALL', 'NATIONAL_GLOBAL'],
    name: '🇮🇳 ૧૫ ઓગસ્ટ / ૨૬ જાન્યુઆરી (રાષ્ટ્રીય પર્વ)',
    badgeIcon: '🇮🇳',
    colorPresets: [
      { name: 'Tricolor Pride', bg: '#F8FAFC', borderOuter: '#EA580C', borderInner: '#16A34A', headerBg: '#FFEDD5', headerBorder: '#F97316', primaryText: '#0F172A', secondaryText: '#15803D', badgeText: '#EA580C' }
    ],
    defaultData: {
      title: 'HAPPY INDEPENDENCE & REPUBLIC DAY',
      subHeader: '🇮🇳 રાષ્ટ્ર ગૌરવ & શહીદોને સલામ 🇮🇳',
      personName: 'આઝાદી કા અમૃત મહોત્સવ',
      extraInfo1: 'ધ્વજવંદન સમય: સવારે ૮:૩૦ કલાકે',
      extraInfo2: 'રાષ્ટ્રગીત ગાન, સાંસ્કૃતિક કાર્યક્રમ & મિઠાઈ વિતરણ',
      venue: 'સોસાયટી / ક્લબ પરિસર, અમદાવાદ',
      footer: 'વંદે માતરમ્ - ભારત માતા કી જય!',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'હેડિંગ', subHeader: 'થીમ', personName: 'સંસ્થા / આયોજક', extraInfo1: 'ધ્વજવંદન સમય', extraInfo2: 'કાર્યક્રમ', venue: 'સ્થળ', footer: 'સંદેશ' },
    slogans: ['🇮🇳 વંદે માતરમ્ - ભારત માતા કી જય! 🇮🇳', 'શહીદોના બલિદાનને શત શત નમન 🫡'],
    stickers: ['🇮🇳', '🕊️', '🫡', '✨', '🎖️']
  },

  EID_FESTIVAL: {
    id: 'EID_FESTIVAL',
    tags: ['ALL', 'NATIONAL_GLOBAL'],
    name: '🌙 ઈદ-ઉલ-ફિત્ર / ઈદ મુબારક',
    badgeIcon: '🌙',
    colorPresets: [
      { name: 'Emerald Islamic', bg: '#F0FDF4', borderOuter: '#16A34A', borderInner: '#BBF7D0', headerBg: '#DCFCE7', headerBorder: '#4ADE80', primaryText: '#14532D', secondaryText: '#166534', badgeText: '#15803D' }
    ],
    defaultData: {
      title: 'EID MUBARAK',
      subHeader: '🌙 ઈદ-ઉલ-ફિત્ર ની હાર્દિક મુબારકબાદ 🌙',
      personName: 'સ્નેહ & ભાઈચારાનું પર્વ',
      extraInfo1: 'અલ્લાહ આપના પરિવાર પર સુખ, શાંતિ અને બરકત વરસાવે',
      extraInfo2: 'ખુશીઓ અને મહોબ્બતથી ભરેલી ઈદની શુભેચ્છાઓ ✨',
      venue: 'અમદાવાદ, ગુજરાત',
      footer: 'આપ સર્વેને દિલથી ઈદ મુબારક!',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'હેડિંગ', subHeader: 'શુભકામના સંદેશ', personName: 'શુભેચ્છક / પરિવાર', extraInfo1: 'સંદેશ ૧', extraInfo2: 'સંદેશ ૨', venue: 'સ્થળ', footer: 'નીચેનો સંદેશ' },
    slogans: ['🌙 આપ સૌને અને આપના પરિવારને દિલથી ઈદ મુબારક! 🌙', 'Eid Mubarak to you and your loved ones! ✨'],
    stickers: ['🌙', '⭐', '✨', '🕌', '💐', '🤝']
  },

  CHRISTMAS: {
    id: 'CHRISTMAS',
    tags: ['ALL', 'NATIONAL_GLOBAL'],
    name: '🎄 નાતાલ / મેરી ક્રિસમસ (૨૫ ડિસે)',
    badgeIcon: '🎄',
    colorPresets: [
      { name: 'Crimson Frost', bg: '#FFF1F2', borderOuter: '#E11D48', borderInner: '#FECDD3', headerBg: '#FFE4E6', headerBorder: '#F43F5E', primaryText: '#881337', secondaryText: '#9F1239', badgeText: '#BE123C' }
    ],
    defaultData: {
      title: 'MERRY CHRISTMAS & NEW YEAR',
      subHeader: '🎄 પ્રભુ ઈશુના જન્મ પર્વની શુભકામનાઓ 🎄',
      personName: 'જોય & સેલિબ્રેશન પાર્ટી',
      extraInfo1: 'તારીખ: ૨૫ ડિસેમ્બર, ૨૦૨૬',
      extraInfo2: 'કેરોલ્સ, કેક કટિંગ અને સાંતા ગિફ્ટ વિતરણ 🎁',
      venue: 'અમદાવાદ',
      footer: 'May this festive season bring peace and joy to your home!',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'હેડિંગ', subHeader: 'થીમ', personName: 'આયોજક', extraInfo1: 'તારીખ', extraInfo2: 'કાર્યક્રમ', venue: 'સ્થળ', footer: 'સંદેશ' },
    slogans: ['🎄 Merry Christmas & A Happy New Year! 🎅', 'જીવનમાં સદા પ્રેમ અને આનંદ રહે ✨'],
    stickers: ['🎄', '🎅', '🎁', '⭐', '❄️', '✨']
  },

  // Business & Social Invitations
  WEDDING: {
    id: 'WEDDING',
    tags: ['ALL', 'BUSINESS_SOCIAL'],
    name: '💍 શુભ લગ્ન કંકોત્રી / સગાઈ આમંત્રણ',
    badgeIcon: '卐',
    colorPresets: [
      { name: 'Kesariya Royal', bg: '#FFFBEB', borderOuter: '#B45309', borderInner: '#FDE68A', headerBg: '#FEF3C7', headerBorder: '#D97706', primaryText: '#78350F', secondaryText: '#9A3412', badgeText: '#92400E' }
    ],
    defaultData: {
      title: '।। શુભ લગ્ન આમંત્રણ ।।',
      subHeader: 'શુભ લગ્ન / સગાઈ મંગલ પત્રિકા',
      personName: 'ચિ. વરરાજા સંગ ચિ. કન્યા',
      extraInfo1: 'શુભ લગ્ન તારીખ: ૨૮ ઓગસ્ટ, ૨૦૨૬',
      extraInfo2: 'હસ્તમેળાપ: સાંજે ૭:૩૦ કલાકે | ભોજન સમારંભ: ૮:૩૦ થી',
      venue: 'ધ ગ્રાન્ડ હેરીટેજ પેલેસ રિસોર્ટ, અમદાવાદ',
      footer: 'સ્નેહીજનો તથા પરિવારજનોને પધારવા ભાવભર્યું નિમંત્રણ.',
      phone: '9876543210',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'મથાળું', subHeader: 'હેડલાઇન', personName: 'વર-કન્યાનું નામ', extraInfo1: 'તારીખ', extraInfo2: 'સમય / વિધિ', venue: 'મંગલ સ્થળ', footer: 'નિમંત્રક' },
    slogans: ['।। મંગલમ્ ભગવાન વિષ્ણુઃ મંગલમ્ ગરુડધ્વજઃ ।।', 'બે હૃદયનું મિલન, સ્નેહનું મંગલ પ્રસ્થાન ❤️'],
    stickers: ['卐', '🪔', '💍', '💐', '✨', '🥁', '❤️']
  },

  SHOP_OPENING: {
    id: 'SHOP_OPENING',
    tags: ['ALL', 'BUSINESS_SOCIAL'],
    name: '🛍️ દુકાન શુભારંભ / ઓફર સેલ',
    badgeIcon: '🛍️',
    colorPresets: [
      { name: 'Modern Crimson', bg: '#FFF1F2', borderOuter: '#E11D48', borderInner: '#FFE4E6', headerBg: '#FFE4E6', headerBorder: '#FB7185', primaryText: '#881337', secondaryText: '#9F1239', badgeText: '#BE123C' }
    ],
    defaultData: {
      title: 'GRAND OPENING CEREMONY',
      subHeader: '✨ આપનું હાર્દિક સ્વાગત છે ✨',
      personName: 'JD3 FASHION & LIFESTYLE HUB',
      extraInfo1: 'તારીખ: ૨૮ ઓગસ્ટ, ૨૦૨૬ | સમય: સવારે ૯:૦૦ થી',
      extraInfo2: '🎉 પ્રથમ ૧૦૦ ગ્રાહકો માટે ફ્લેટ 30% OFF! 🎉',
      venue: 'શોપ નં. 12, શિવમ આર્કેડ, ઘાટલોડિયા, અમદાવાદ',
      footer: 'સંપર્ક: 98989 00000 | ખાસ પધારી આશીર્વાદ આપવા વિનંતી.',
      phone: '9898900000',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'હેડિંગ', subHeader: 'ટેગલાઇન', personName: 'દુકાન નામ', extraInfo1: 'તારીખ & સમય', extraInfo2: 'ઓફર', venue: 'સરનામું', footer: 'સંપર્ક' },
    slogans: ['💥 ભવ્ય ઓપનિંગ - ખાસ 30% સુધીનું ડિસ્કાઉન્ટ 💥', 'નવી શરૂઆત, શ્રેષ્ઠ ગુણવત્તા, વિશ્વાસપાત્ર સેવા!'],
    stickers: ['🛍️', '🎉', '🔥', '✨', '📢', '🏷️', '⭐', '💥']
  },

  TUITION: {
    id: 'TUITION',
    tags: ['ALL', 'BUSINESS_SOCIAL'],
    name: '📚 ટ્યુશન એડમિશન ઓપન',
    badgeIcon: '📚',
    colorPresets: [
      { name: 'Ocean Classic', bg: '#F8FAFC', borderOuter: '#2563EB', borderInner: '#BFDBFE', headerBg: '#DBEAFE', headerBorder: '#3B82F6', primaryText: '#1E3A8A', secondaryText: '#1D4ED8', badgeText: '#DC2626' }
    ],
    defaultData: {
      title: 'SHREE ACADEMY OF EXCELLENCE',
      subHeader: '🎯 ADMISSION OPEN 2026-2027 🎯',
      personName: 'Std: 8th to 12th (Commerce & Science)',
      extraInfo1: 'વિષયો: Maths, Science, English, Accounts',
      extraInfo2: '✨ પર્સનલ ધ્યાન & વીકલી ટેસ્ટ સીરીઝ ✨',
      venue: 'ઘાટલોડિયા, અમદાવાદ | મો. 98989 00000',
      footer: 'પહેલા 20 વિદ્યાર્થીઓ માટે ખાસ 20% ડિસ્કાઉન્ટ!',
      phone: '9898900000',
      imageUrl: null,
      bgTextureUrl: null,
    },
    labels: { title: 'સંસ્થા નામ', subHeader: 'હેડલાઇન', personName: 'ધોરણ / વિગત', extraInfo1: 'વિષયો', extraInfo2: 'વિશેષતાઓ', venue: 'સરનામું', footer: 'ઓફર' },
    slogans: ['🎯 ઉજ્જવળ ભવિષ્યની મજબૂત શરૂઆત 🎯', 'શ્રેષ્ઠ પરિણામ & વ્યક્તિગત માર્ગદર્શનની ગેરંટી'],
    stickers: ['📚', '🎯', '💡', '🎓', '⭐', '✍️', '🏅']
  }
};

export default function App() {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  const [activeTag, setActiveTag] = useState('ALL');
  const [activeCategory, setActiveCategory] = useState('DIWALI');
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const [selectedFont, setSelectedFont] = useState(FONTS[0].family);
  const [canvasFormat, setCanvasFormat] = useState('PORTRAIT');
  const [frameShape, setFrameShape] = useState('CIRCLE');
  
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [showCornerBadges, setShowCornerBadges] = useState(true);
  const [customTextColor, setCustomTextColor] = useState('#4F46E5');
  const [elementOpacity, setElementOpacity] = useState(1);

  const [savedDrafts, setSavedDrafts] = useState(() => {
    const drafts = localStorage.getItem('designly_drafts');
    return drafts ? JSON.parse(drafts) : [];
  });

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('designly_data');
    return saved ? JSON.parse(saved) : ALL_FESTIVALS.DIWALI.defaultData;
  });

  useEffect(() => {
    localStorage.setItem('designly_data', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('designly_drafts', JSON.stringify(savedDrafts));
  }, [savedDrafts]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

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
  }, []);

  const handleCategoryChange = (catKey) => {
    setActiveCategory(catKey);
    setSelectedThemeIndex(0);
    setFormData(ALL_FESTIVALS[catKey].defaultData);
  };

  const handleReset = () => {
    setFormData(ALL_FESTIVALS[activeCategory].defaultData);
    setFontSizeOffset(0);
  };

  const handleSaveDraft = () => {
    const newDraft = {
      id: Date.now(),
      dateSaved: new Date().toLocaleDateString('gu-IN'),
      category: activeCategory,
      themeIdx: selectedThemeIndex,
      data: { ...formData }
    };
    setSavedDrafts([newDraft, ...savedDrafts.slice(0, 5)]);
    confetti({ particleCount: 40, spread: 40 });
  };

  const handleLoadDraft = (draft) => {
    setActiveCategory(draft.category);
    setSelectedThemeIndex(draft.themeIdx || 0);
    setFormData(draft.data);
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

    const customText = new fabric.IText(textValue, {
      left: staggeredLeft,
      top: staggeredTop,
      originX: 'center',
      originY: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      fontFamily: selectedFont,
      fill: customTextColor,
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

    const cat = ALL_FESTIVALS[activeCategory] || ALL_FESTIVALS.DIWALI;
    const theme = cat.colorPresets[selectedThemeIndex] || cat.colorPresets[0];

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasDimensions.width,
      height: canvasDimensions.height,
      backgroundColor: theme.bg,
    });

    fabricCanvasRef.current = canvas;
    renderTemplate(formData, activeCategory, selectedThemeIndex, canvasFormat, selectedFont, fontSizeOffset, showCornerBadges, frameShape);

    return () => {
      canvas.dispose();
    };
  }, [canvasFormat]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      renderTemplate(formData, activeCategory, selectedThemeIndex, canvasFormat, selectedFont, fontSizeOffset, showCornerBadges, frameShape);
    }
  }, [formData, activeCategory, selectedThemeIndex, canvasFormat, selectedFont, fontSizeOffset, showCornerBadges, frameShape]);

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

  const renderTemplate = async (data, catKey, themeIdx, format, fontFam, sizeOffset, withBadges, fShape) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const customObjects = canvas.getObjects().filter(obj => obj.selectable);

    const cat = ALL_FESTIVALS[catKey] || ALL_FESTIVALS.DIWALI;
    const theme = cat.colorPresets[themeIdx] || cat.colorPresets[0];
    const isStory = format === 'STORY';
    const cHeight = isStory ? 888 : 700;

    canvas.setDimensions({ width: 500, height: cHeight });
    canvas.clear();

    // Background Image
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
    if (withBadges && cat.badgeIcon) {
      const b1 = new fabric.FabricText(cat.badgeIcon, { left: 34, top: 34, fontSize: 16, fill: theme.badgeText, selectable: false });
      const b2 = new fabric.FabricText(cat.badgeIcon, { left: 450, top: 34, fontSize: 16, fill: theme.badgeText, selectable: false });
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
    const venueLabel = new fabric.FabricText('— શુભ સંદેશ / વિગત —', {
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
        setFormData((prev) => ({ ...prev, imageUrl: event.target.result }));
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

  const currentCat = ALL_FESTIVALS[activeCategory] || ALL_FESTIVALS.DIWALI;
  const activeStickers = currentCat.stickers || [];
  const activeSlogans = currentCat.slogans || [];

  // Filter festivals dynamically by Category Tag
  const filteredFestivals = Object.values(ALL_FESTIVALS).filter(cat => {
    if (activeTag === 'ALL') return true;
    return cat.tags && cat.tags.includes(activeTag);
  });

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col justify-between">
      {/* Top Navbar */}
      <nav className="w-full bg-white border-b border-slate-200 px-4 md:px-8 py-3 flex items-center justify-between shadow-sm sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <Sparkles size={18} />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-black text-slate-900 text-lg tracking-tight">
              Designly
            </span>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
              by JD3studio
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">All India Festivals & Events Hub</span>
        </div>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 flex flex-col items-center p-4 md:p-8">
        <header className="mb-6 text-center max-w-5xl">
          <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold mb-2 shadow-sm">
            <Sparkles size={14} /> ૧૦૦% ફ્રી - બધા જ ભારતીય તહેવારો, સામાજિક & બિઝનેસ પોસ્ટર ડિઝાઇનર
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-800">
            All-in-One Festivals & Events Studio
          </h1>
          <p className="text-slate-500 text-xs md:text-sm mt-0.5">કોઈપણ તહેવાર કે ઇવેન્ટ પસંદ કરો અને ૧-મિનિટમાં કસ્ટમ પોસ્ટર મેળવો</p>

          {/* Unified Category Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-4 max-w-5xl mx-auto">
            {CATEGORY_TAGS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTag(t.id)}
                className={`px-3 py-1 rounded-lg font-bold text-xs transition-all ${
                  activeTag === t.id
                    ? 'bg-slate-900 text-white shadow-md'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Festival Selection Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3 max-w-5xl mx-auto">
            {filteredFestivals.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-indigo-500/30 scale-105'
                      : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        </header>

        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Form Controls */}
          <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-4">
            
            <div className="space-y-3 pb-3 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                  <Palette size={14} className="text-indigo-600" /> કલર થીમ વેરિઅન્ટ:
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
                    <RotateCcw size={12} />
                  </button>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                {currentCat.colorPresets.map((preset, idx) => (
                  <button
                    key={preset.name}
                    onClick={() => {
                      setFormData(prev => ({ ...prev, bgTextureUrl: null }));
                      setSelectedThemeIndex(idx);
                    }}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition border ${
                      selectedThemeIndex === idx && !formData.bgTextureUrl
                        ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm' 
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {preset.name}
                  </button>
                ))}
              </div>

              {/* Ready-made Background Library */}
              <div>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1 mb-1.5">
                  <Sparkles size={13} className="text-indigo-600" /> પ્રી-સેટ બેકગ્રાઉન્ડ ટેક્સચર:
                </span>
                <div className="grid grid-cols-3 gap-1.5">
                  {PRESET_BACKGROUNDS.map((bg) => (
                    <button
                      key={bg.name}
                      onClick={() => setFormData(prev => ({ ...prev, bgTextureUrl: bg.value }))}
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
                <div className="grid grid-cols-4 gap-2">
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

              {/* Typography & Scaling */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
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
                <div className="flex items-center gap-2">
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
                    className="w-32 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>
              </div>

              {/* Slogans */}
              {activeSlogans.length > 0 && (
                <div className="pt-1">
                  <span className="text-xs font-bold text-slate-600 flex items-center gap-1 mb-1.5">
                    <Wand2 size={13} className="text-indigo-600" /> તહેવાર સ્લોગન્સ:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeSlogans.map((slogan, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAddCustomText(slogan)}
                        className="text-[11px] font-semibold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 px-2 py-1 rounded-md transition truncate max-w-full"
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
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
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
                  કોર્નર આઇકોન બેજ
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
                <label className="block text-xs font-bold text-slate-700 mb-1">{currentCat.labels.title}</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{currentCat.labels.subHeader}</label>
                <input
                  type="text"
                  value={formData.subHeader}
                  onChange={(e) => setFormData({ ...formData, subHeader: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{currentCat.labels.personName}</label>
                <input
                  type="text"
                  value={formData.personName}
                  onChange={(e) => setFormData({ ...formData, personName: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{currentCat.labels.extraInfo1}</label>
                  <input
                    type="text"
                    value={formData.extraInfo1}
                    onChange={(e) => setFormData({ ...formData, extraInfo1: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{currentCat.labels.extraInfo2}</label>
                  <input
                    type="text"
                    value={formData.extraInfo2}
                    onChange={(e) => setFormData({ ...formData, extraInfo2: e.target.value })}
                    className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{currentCat.labels.venue}</label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                  className="w-full p-2 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">{currentCat.labels.footer}</label>
                <input
                  type="text"
                  value={formData.footer}
                  onChange={(e) => setFormData({ ...formData, footer: e.target.value })}
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
                    onClick={() => setFormData(prev => ({ ...prev, imageUrl: null }))}
                    className="text-xs text-red-500 hover:text-red-700 block text-center mt-1"
                  >
                    ફોટો હટાવો
                  </button>
                )}
              </div>
            </div>

            {/* Direct Free Download Buttons */}
            <div className="space-y-2 pt-2">
              <div className="grid grid-cols-2 gap-3">
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

          {/* Live Preview */}
          <div className="space-y-6">
            <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md border border-slate-200">
              <div className="flex items-center justify-between w-full mb-3">
                <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span>લાઇવ પ્રિવ્યુ</span>
                  <span className="text-[11px] font-normal text-slate-400 flex items-center gap-1">
                    <Move size={11} /> ડબલ-ક્લિક કરીને ટાઈપ કરો | Delete key
                  </span>
                </h2>
                <span className="text-xs bg-indigo-100 text-indigo-800 font-semibold px-2 py-0.5 rounded">
                  {canvasDimensions.width} x {canvasDimensions.height} px
                </span>
              </div>

              <div 
                className="rounded-xl overflow-hidden shadow-xl border border-slate-300 transition-all duration-300 flex justify-center"
                style={{ 
                  width: `${canvasDimensions.width}px`, 
                  height: `${canvasDimensions.height}px` 
                }}
              >
                <canvas ref={canvasRef} />
              </div>
            </div>

            {/* Saved Drafts */}
            {savedDrafts.length > 0 && (
              <div className="bg-white p-4 rounded-2xl shadow-md border border-slate-200">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                  📁 Saved Drafts ({savedDrafts.length})
                </h3>
                <div className="grid grid-cols-3 gap-2">
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
      <footer className="w-full bg-white border-t border-slate-200 py-4 text-center mt-12">
        <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase flex items-center justify-center gap-1">
          POWERED BY <span className="text-indigo-600 font-bold hover:underline cursor-pointer">JD3studio</span>
        </p>
      </footer>
    </div>
  );
}