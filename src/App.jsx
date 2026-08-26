import React, { useState, useEffect, useRef } from 'react';
import * as fabric from 'fabric';
import confetti from 'canvas-confetti';
import jsPDF from 'jspdf';
import { 
  Download, 
  Image as ImageIcon, 
  Sparkles, 
  Trophy, 
  GraduationCap, 
  Cake, 
  Flame,
  Palette,
  Smartphone,
  FileText,
  RotateCcw,
  Type,
  Printer,
  Sliders,
  BookmarkPlus,
  Trash2
} from 'lucide-react';

const FONTS = [
  { name: 'Gujarati Traditional (Rasa)', family: "'Rasa', serif" },
  { name: 'Gujarati Clean (Noto Sans)', family: "'Noto Sans Gujarati', sans-serif" },
  { name: 'Modern Sans (Poppins)', family: "'Poppins', sans-serif" },
  { name: 'Royal Classic (Cinzel)', family: "'Cinzel', serif" },
  { name: 'Luxury Serif (Playfair)', family: "'Playfair Display', serif" },
];

const CATEGORIES = {
  JAIN_TAPASYA: {
    id: 'JAIN_TAPASYA',
    name: 'જૈન તપસ્યા / પત્રિકા',
    icon: Flame,
    badgeIcon: '卐',
    colorPresets: [
      { name: 'Royal Gold', bg: '#FFFDF9', borderOuter: '#D97706', borderInner: '#FDE68A', headerBg: '#FEF3C7', headerBorder: '#F59E0B', primaryText: '#78350F', secondaryText: '#92400E', badgeText: '#B45309' },
      { name: 'Velvet Ruby', bg: '#FFF5F5', borderOuter: '#991B1B', borderInner: '#FECACA', headerBg: '#FEE2E2', headerBorder: '#EF4444', primaryText: '#7F1D1D', secondaryText: '#991B1B', badgeText: '#B91C1C' },
      { name: 'Sacred Ochre', bg: '#FFFBEB', borderOuter: '#B45309', borderInner: '#FCD34D', headerBg: '#FDE68A', headerBorder: '#D97706', primaryText: '#451A03', secondaryText: '#78350F', badgeText: '#92400E' }
    ],
    defaultData: {
      title: 'તપસ્યા પારણા મહોત્સવ',
      subHeader: '।। શ્રી શુભ અભિનંદન ।।',
      personName: 'દિવ્ય વાઘેલા',
      extraInfo1: 'તારીખ: ૨૮ ઓગસ્ટ, ૨૦૨૬',
      extraInfo2: 'વાર: શુક્રવાર',
      venue: 'શ્રી સંભવનાથ જૈન દેરાસર હોલ, અમદાવાદ',
      footer: 'સર્વે ધર્મપ્રેમી ભાઈઓ તથા બહેનોને પધારવા ભાવભર્યું નિમંત્રણ છે.',
      imageUrl: null,
    },
    labels: {
      title: 'ઇવેન્ટ / શીર્ષક',
      subHeader: 'સબ-હેડર / ટેગલાઇન',
      personName: 'તપસ્વીનું નામ',
      extraInfo1: 'તારીખ',
      extraInfo2: 'વાર / સમય',
      venue: 'શુભ સ્થળ',
      footer: 'આમંત્રક / નીચેની નોંધ',
    }
  },
  CRICKET: {
    id: 'CRICKET',
    name: 'ક્રિકેટ ટુર્નામેન્ટ',
    icon: Trophy,
    badgeIcon: '🏏',
    colorPresets: [
      { name: 'Midnight Neon', bg: '#0F172A', borderOuter: '#38BDF8', borderInner: '#1E293B', headerBg: '#1E293B', headerBorder: '#0284C7', primaryText: '#F8FAFC', secondaryText: '#38BDF8', badgeText: '#F59E0B' },
      { name: 'Cyber Turf', bg: '#064E3B', borderOuter: '#34D399', borderInner: '#065F46', headerBg: '#022C22', headerBorder: '#10B981', primaryText: '#ECFDF5', secondaryText: '#6EE7B7', badgeText: '#FBBF24' },
      { name: 'Blaze Red', bg: '#18181B', borderOuter: '#EF4444', borderInner: '#27272A', headerBg: '#27272A', headerBorder: '#DC2626', primaryText: '#FAFAFA', secondaryText: '#F87171', badgeText: '#FBBF24' }
    ],
    defaultData: {
      title: 'PREMIER CRICKET LEAGUE - 2026',
      subHeader: '🏆 MEGA BOX CRICKET TOURNAMENT 🏆',
      personName: 'વિનિંગ પ્રાઇઝ: ₹25,000/-',
      extraInfo1: 'એન્ટ્રી ફી: ₹1500 / ટીમ',
      extraInfo2: 'તારીખ: 10 થી 12 સપ્ટેમ્બર | લિમિટેડ 16 ટીમો',
      venue: 'ધ બોક્સ એરેના ટર્ફ, એસ.જી. હાઇવે, અમદાવાદ',
      footer: 'સંપર્ક / રજીસ્ટ્રેશન: 98765 43210 (દિવ્ય)',
      imageUrl: null,
    },
    labels: {
      title: 'ટુર્નામેન્ટનું નામ',
      subHeader: 'ટેગલાઇન',
      personName: 'મુખ્ય ઇનામ (Winning Prize)',
      extraInfo1: 'એન્ટ્રી ફી (Entry Fee)',
      extraInfo2: 'તારીખ અને સમય',
      venue: 'ગ્રાઉન્ડ / ટર્ફનું સરનામું',
      footer: 'સંપર્ક નંબર (Contact No)',
    }
  },
  TUITION: {
    id: 'TUITION',
    name: 'ટ્યુશન / એડમિશન ઓપન',
    icon: GraduationCap,
    badgeIcon: '📚',
    colorPresets: [
      { name: 'Ocean Classic', bg: '#F8FAFC', borderOuter: '#2563EB', borderInner: '#BFDBFE', headerBg: '#DBEAFE', headerBorder: '#3B82F6', primaryText: '#1E3A8A', secondaryText: '#1D4ED8', badgeText: '#DC2626' },
      { name: 'Emerald Scholar', bg: '#F0FDF4', borderOuter: '#059669', borderInner: '#A7F3D0', headerBg: '#DCFCE7', headerBorder: '#10B981', primaryText: '#064E3B', secondaryText: '#047857', badgeText: '#D97706' },
      { name: 'Sunset Focus', bg: '#FFF7ED', borderOuter: '#EA580C', borderInner: '#FED7AA', headerBg: '#FFEDD5', headerBorder: '#F97316', primaryText: '#7C2D12', secondaryText: '#C2410C', badgeText: '#2563EB' }
    ],
    defaultData: {
      title: 'SHREE TUITION CLASSES',
      subHeader: '🎯 ADMISSION OPEN 2026-2027 🎯',
      personName: 'Std: 8th to 12th (Commerce & Science)',
      extraInfo1: 'વિષયો: Maths, Science, English, Accounts',
      extraInfo2: '✨ સ્પેશિયલ પર્સનલ ધ્યાન & વીકલી ટેસ્ટ સીરીઝ ✨',
      venue: 'ઘાટલોડિયા, અમદાવાદ | મો. 98989 00000',
      footer: 'પહેલા 20 વિદ્યાર્થીઓ માટે ખાસ 20% ડિસ્કાઉન્ટ!',
      imageUrl: null,
    },
    labels: {
      title: 'ક્લાસિસ / સ્કૂલનું નામ',
      subHeader: 'હેડલાઇન / ઓફર',
      personName: 'ધોરણ (Standards / Batch)',
      extraInfo1: 'મુખ્ય વિષયો (Subjects)',
      extraInfo2: 'ખાસ વિશેષતાઓ (Features)',
      venue: 'સરનામું અને સંપર્ક',
      footer: 'ઓફર / નોંધ (Discount / Note)',
    }
  },
  BIRTHDAY: {
    id: 'BIRTHDAY',
    name: 'બર્થડે ઇન્વિટેશન',
    icon: Cake,
    badgeIcon: '🎈',
    colorPresets: [
      { name: 'Purple Magic', bg: '#FAF5FF', borderOuter: '#9333EA', borderInner: '#F3E8FF', headerBg: '#F3E8FF', headerBorder: '#C084FC', primaryText: '#581C87', secondaryText: '#7E22CE', badgeText: '#E11D48' },
      { name: 'Rose Blossom', bg: '#FFF1F2', borderOuter: '#E11D48', borderInner: '#FFE4E6', headerBg: '#FFE4E6', headerBorder: '#FB7185', primaryText: '#881337', secondaryText: '#BE123C', badgeText: '#7C3AED' },
      { name: 'Golden Confetti', bg: '#FFFDF0', borderOuter: '#CA8A04', borderInner: '#FEF08A', headerBg: '#FEF9C3', headerBorder: '#EAB308', primaryText: '#713F12', secondaryText: '#A16207', badgeText: '#C026D3' }
    ],
    defaultData: {
      title: 'YOU ARE INVITED!',
      subHeader: '🎉 BIRTHDAY CELEBRATION PARTY 🎉',
      personName: 'દિવ્ય વાઘેલા',
      extraInfo1: 'તારીખ: ૨૮ ઓગસ્ટ, ૨૦૨૬',
      extraInfo2: 'સમય: સાંજે ૭:૦૦ વાગ્યાથી',
      venue: 'ધ ગ્રાન્ડ હોટેલ & બેન્ક્વેટ, અમદાવાદ',
      footer: 'તમારા આશીર્વાદ અને હાજરી અમારા માટે અમૂલ્ય છે.',
      imageUrl: null,
    },
    labels: {
      title: 'ટાઇટલ (Party Invite)',
      subHeader: 'સબ-હેડર',
      personName: 'બર્થડે બોય / ગર્લનું નામ',
      extraInfo1: 'તારીખ',
      extraInfo2: 'સમય (Time)',
      venue: 'પાર્ટીનું સ્થળ (Venue)',
      footer: 'આમંત્રણ મેસેજ (Message)',
    }
  }
};

export default function App() {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  const [activeCategory, setActiveCategory] = useState('JAIN_TAPASYA');
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(0);
  const [selectedFont, setSelectedFont] = useState(FONTS[0].family);
  const [canvasFormat, setCanvasFormat] = useState('PORTRAIT');
  
  const [fontSizeOffset, setFontSizeOffset] = useState(0);
  const [showCornerBadges, setShowCornerBadges] = useState(true);

  const [savedDrafts, setSavedDrafts] = useState(() => {
    const drafts = localStorage.getItem('poster_maker_drafts');
    return drafts ? JSON.parse(drafts) : [];
  });

  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('poster_maker_data');
    return saved ? JSON.parse(saved) : CATEGORIES.JAIN_TAPASYA.defaultData;
  });

  useEffect(() => {
    localStorage.setItem('poster_maker_data', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('poster_maker_drafts', JSON.stringify(savedDrafts));
  }, [savedDrafts]);

  const handleCategoryChange = (catKey) => {
    setActiveCategory(catKey);
    setSelectedThemeIndex(0);
    setFormData(CATEGORIES[catKey].defaultData);
  };

  const handleReset = () => {
    setFormData(CATEGORIES[activeCategory].defaultData);
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

  const canvasDimensions = canvasFormat === 'PORTRAIT' 
    ? { width: 500, height: 700 } 
    : { width: 500, height: 888 };

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = new fabric.Canvas(canvasRef.current, {
      width: canvasDimensions.width,
      height: canvasDimensions.height,
      backgroundColor: CATEGORIES[activeCategory].colorPresets[selectedThemeIndex].bg,
    });

    fabricCanvasRef.current = canvas;
    renderTemplate(formData, activeCategory, selectedThemeIndex, canvasFormat, selectedFont, fontSizeOffset, showCornerBadges);

    return () => {
      canvas.dispose();
    };
  }, [canvasFormat]);

  useEffect(() => {
    if (fabricCanvasRef.current) {
      renderTemplate(formData, activeCategory, selectedThemeIndex, canvasFormat, selectedFont, fontSizeOffset, showCornerBadges);
    }
  }, [formData, activeCategory, selectedThemeIndex, canvasFormat, selectedFont, fontSizeOffset, showCornerBadges]);

  const cropToCircle = (imgUrl, size = 300) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const offCanvas = document.createElement('canvas');
        offCanvas.width = size;
        offCanvas.height = size;
        const ctx = offCanvas.getContext('2d');

        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
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

  const renderTemplate = async (data, catKey, themeIdx, format, fontFam, sizeOffset, withBadges) => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const cat = CATEGORIES[catKey];
    const theme = cat.colorPresets[themeIdx] || cat.colorPresets[0];
    const isStory = format === 'STORY';
    const cHeight = isStory ? 888 : 700;

    canvas.setDimensions({ width: 500, height: cHeight });
    canvas.clear();
    canvas.backgroundColor = theme.bg;

    // 1. Double Borders (Pixel-Perfect Alignment)
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

    // 2. Top Header Badge
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

    // 3. Photo Frame
    const circleCenterX = 250;
    const circleCenterY = isStory ? 220 : 175;
    const frameRadius = isStory ? 75 : 65;

    if (data.imageUrl) {
      try {
        const croppedDataUrl = await cropToCircle(data.imageUrl, 300);
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

          const photoBorder = new fabric.Circle({
            left: circleCenterX,
            top: circleCenterY,
            radius: frameRadius,
            originX: 'center',
            originY: 'center',
            fill: 'transparent',
            stroke: theme.borderOuter,
            strokeWidth: 3.5,
            selectable: false,
          });

          canvas.add(fImg, photoBorder);
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

    // 4. Sub-Header & Main Name
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

    // 5. Middle Info Card
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

    // 6. Venue Section
    const venueY = isStory ? 610 : 480;
    const venueLabel = new fabric.FabricText('— સરનામું / વિગત —', {
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

    // 7. Footer Note
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
    link.download = `${formData.title || 'design'}-${canvasFormat.toLowerCase()}.png`;
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
    pdf.save(`${formData.title || 'design'}-print.pdf`);
  };

  const currentCat = CATEGORIES[activeCategory];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-4 md:p-8">
      <header className="mb-6 text-center max-w-4xl">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-800 px-4 py-1.5 rounded-full text-sm font-semibold mb-2 shadow-sm">
          <Sparkles size={16} /> Multi-Category Pro Poster Studio
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-800">
          Smart Auto Design & Invitation Studio
        </h1>
        <p className="text-slate-600 mt-1">કેટેગરી પસંદ કરો, ફોન્ટ & કલર્સ સેટ કરો અને HD PNG / PDF ડાઉનલોડ કરો</p>

        {/* Category Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mt-5">
          {Object.values(CATEGORIES).map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm transition-all shadow-sm ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-indigo-500/30 scale-105'
                    : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                }`}
              >
                <Icon size={18} />
                {cat.name}
              </button>
            );
          })}
        </div>
      </header>

      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Form Controls */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-slate-200 space-y-4">
          
          {/* Top Bar: Controls */}
          <div className="space-y-3 pb-3 border-b border-slate-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
                <Palette size={14} className="text-indigo-600" /> કલર થીમ વેરિઅન્ટ:
              </span>
              <div className="flex items-center gap-2">
                <button 
                  onClick={handleSaveDraft} 
                  className="text-xs text-indigo-600 hover:text-indigo-800 font-bold flex items-center gap-1 bg-indigo-50 px-2 py-1 rounded transition"
                  title="Save as Draft"
                >
                  <BookmarkPlus size={13} /> સેવ ડ્રાફ્ટ
                </button>
                <button 
                  onClick={handleReset} 
                  className="text-xs text-slate-400 hover:text-red-500 flex items-center gap-1"
                  title="રીસેટ"
                >
                  <RotateCcw size={12} />
                </button>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {currentCat.colorPresets.map((preset, idx) => (
                <button
                  key={preset.name}
                  onClick={() => setSelectedThemeIndex(idx)}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-xs font-bold transition border ${
                    selectedThemeIndex === idx 
                      ? 'bg-indigo-50 border-indigo-600 text-indigo-700 shadow-sm' 
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {preset.name}
                </button>
              ))}
            </div>

            {/* Typography & Font Scaling Controls */}
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

            {/* Ratio & Badges Switcher */}
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

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">ફોટો અથવા લોગો</label>
              <label className="flex flex-col items-center justify-center border border-dashed border-slate-300 bg-slate-50 hover:bg-slate-100 rounded-xl p-2.5 cursor-pointer transition">
                <ImageIcon className="text-slate-400 mb-0.5" size={20} />
                <span className="text-[11px] font-semibold text-slate-600">ફોટો અપલોડ કરો (PNG/JPG)</span>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={handleDownloadPNG}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition text-xs active:scale-98"
            >
              <Download size={15} /> HD PNG
            </button>
            <button
              onClick={handleDownloadPDF}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md transition text-xs active:scale-98"
            >
              <Printer size={15} /> Print PDF
            </button>
          </div>
        </div>

        {/* Right Preview & Saved Drafts */}
        <div className="space-y-6">
          <div className="flex flex-col items-center bg-white p-6 rounded-2xl shadow-md border border-slate-200">
            <div className="flex items-center justify-between w-full mb-3">
              <h2 className="text-lg font-bold text-slate-800">લાઇવ પ્રિવ્યુ</h2>
              <span className="text-xs bg-indigo-100 text-indigo-800 font-semibold px-2 py-0.5 rounded">
                {canvasDimensions.width} x {canvasDimensions.height} px
              </span>
            </div>

            <div 
              className="rounded-xl overflow-hidden shadow-xl border border-slate-300 transition-all duration-300"
              style={{ 
                width: `${canvasDimensions.width}px`, 
                height: `${canvasDimensions.height}px` 
              }}
            >
              <canvas ref={canvasRef} />
            </div>
          </div>

          {/* Saved Drafts History Strip */}
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
    </div>
  );
}