"use client";

import React, { useState, useRef, ChangeEvent } from 'react';
import { toJpeg } from 'html-to-image';

const APPLE_PRESETS: string[] = [
  'radial-gradient(circle at 0% 0%, #00c6ff 0%, transparent 50%), radial-gradient(circle at 100% 100%, #0072ff 0%, transparent 50%), #1a2a6c',
  'radial-gradient(circle at 80% 0%, #ff7eb3 0%, transparent 60%), radial-gradient(circle at 10% 100%, #32008a 0%, transparent 60%), #6a0dad',
  'radial-gradient(circle at 100% 0%, #89f7fe 0%, transparent 50%), radial-gradient(circle at 0% 100%, #66a6ff 0%, transparent 50%), #243b55',
  'radial-gradient(circle at 80% 20%, #f6d365 0%, transparent 50%), radial-gradient(circle at 20% 80%, #ff5e62 0%, transparent 50%), #ff9966',
  'radial-gradient(circle at 50% 0%, #00ff87 0%, transparent 60%), radial-gradient(circle at 0% 100%, #60efff 0%, transparent 50%), #0061ff',
  'radial-gradient(circle at 20% 0%, #ff0844 0%, transparent 50%), radial-gradient(circle at 80% 100%, #ffb199 0%, transparent 50%), #ff2d55',
  'radial-gradient(circle at 90% 10%, #a18cd1 0%, transparent 60%), radial-gradient(circle at 10% 90%, #fbc2eb 0%, transparent 60%), #8fd3f4',
  'radial-gradient(circle at 10% 10%, #f43b47 0%, transparent 50%), radial-gradient(circle at 90% 90%, #453a94 0%, transparent 50%), #1f1c2c',
  'radial-gradient(circle at 50% 20%, #4facfe 0%, transparent 60%), radial-gradient(circle at 50% 80%, #00f2fe 0%, transparent 60%), #0b090a',
  'radial-gradient(circle at 80% 80%, #ff9a9e 0%, transparent 60%), radial-gradient(circle at 20% 20%, #fecfef 0%, transparent 60%), #f5576c',
  'radial-gradient(circle at 20% 20%, #2b00ff 0%, transparent 50%), radial-gradient(circle at 80% 80%, #ff0055 0%, transparent 50%), #0a0a0a',
  'radial-gradient(circle at 10% 90%, #00ff88 0%, transparent 50%), radial-gradient(circle at 90% 10%, #00b3ff 0%, transparent 50%), #051014',
  'radial-gradient(circle at 50% 50%, #7b2ff7 0%, transparent 50%), radial-gradient(circle at 0% 0%, #f107a3 0%, transparent 50%), #0d0212',
  'radial-gradient(circle at 100% 0%, #ff5e00 0%, transparent 50%), radial-gradient(circle at 0% 100%, #ff9900 0%, transparent 50%), #140500',
  'radial-gradient(circle at 50% 0%, #00d2ff 0%, transparent 50%), radial-gradient(circle at 50% 100%, #3a7bd5 0%, transparent 50%), #050b14',
  'radial-gradient(circle at 80% 20%, #e0c3fc 0%, transparent 50%), radial-gradient(circle at 20% 80%, #8ec5fc 0%, transparent 50%), #090a0f',
  'radial-gradient(circle at 0% 50%, #f12711 0%, transparent 50%), radial-gradient(circle at 100% 50%, #f5af19 0%, transparent 50%), #140400',
  'radial-gradient(circle at 20% 0%, #11998e 0%, transparent 50%), radial-gradient(circle at 80% 100%, #38ef7d 0%, transparent 50%), #02120b',
  'radial-gradient(circle at 90% 10%, #654ea3 0%, transparent 50%), radial-gradient(circle at 10% 90%, #eaafc8 0%, transparent 50%), #0f0814',
  'radial-gradient(circle at 10% 10%, #ff0844 0%, transparent 50%), radial-gradient(circle at 90% 90%, #ffb199 0%, transparent 50%), #120003',
  'radial-gradient(circle at 50% 20%, #c31432 0%, transparent 50%), radial-gradient(circle at 50% 80%, #240b36 0%, transparent 50%), #000000',
  'radial-gradient(circle at 80% 80%, #1d976c 0%, transparent 50%), radial-gradient(circle at 20% 20%, #93f9b9 0%, transparent 50%), #05140e',
  'radial-gradient(circle at 0% 100%, #8e2de2 0%, transparent 50%), radial-gradient(circle at 100% 0%, #4a00e0 0%, transparent 50%), #080014',
  'radial-gradient(circle at 50% 50%, #000428 0%, transparent 50%), radial-gradient(circle at 0% 0%, #004e92 0%, transparent 50%), #00010a',
  'radial-gradient(circle at 100% 100%, #1f1c2c 0%, transparent 50%), radial-gradient(circle at 0% 100%, #928dab 0%, transparent 50%), #09080d'
];

const SPOTIFY_PRESETS: string[] = [
  'linear-gradient(135deg, #1DB954 0%, #191414 100%)',
  'linear-gradient(to bottom right, #ff4b2b, #ff416c)',
  'linear-gradient(to bottom, #8A2387, #E94057, #F27121)',
  'radial-gradient(circle at top left, #4A00E0, #8E2DE2)',
  'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
  'radial-gradient(circle at center, #11998e, #38ef7d)',
  'linear-gradient(to bottom right, #fc4a1a, #f7b733)',
  'linear-gradient(135deg, #FF0099, #493240)',
  'radial-gradient(circle at bottom right, #00B4DB, #0083B0)',
  'linear-gradient(to bottom, #000000, #434343)',
  'linear-gradient(to bottom, #1E1E1E, #000000)',
  'linear-gradient(to right, #434343 0%, #000000 100%)',
  'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)',
  'linear-gradient(135deg, #141e30, #243b55)',
  'linear-gradient(to bottom right, #2b1055, #753a88)',
  'linear-gradient(135deg, #000000, #53346D)',
  'linear-gradient(to bottom, #141414, #000000)',
  'linear-gradient(to bottom right, #111111, #222222)',
  'linear-gradient(135deg, #2C3E50, #000000)',
  'radial-gradient(circle at top right, #333333, #000000)',
  'linear-gradient(to bottom, #052b05, #000000)',
  'linear-gradient(135deg, #300000, #000000)',
  'linear-gradient(to bottom right, #001f3f, #000000)',
  'radial-gradient(circle at bottom left, #290a59, #000000)',
  'linear-gradient(to top, #1a0000, #000000)'
];

const AlignLeftIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M3 21V19H21V21H3ZM3 17V15H15V17H3ZM3 13V11H21V13H3ZM3 9V7H15V9H3ZM3 5V3H21V5H3Z"/>
  </svg>
);

const AlignCenterIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M3 21V19H21V21H3ZM7 17V15H17V17H7ZM3 13V11H21V13H3ZM7 9V7H17V9H7ZM3 5V3H21V5H3Z"/>
  </svg>
);

const AlignRightIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M3 21V19H21V21H3ZM9 17V15H21V17H9ZM3 13V11H21V13H3ZM9 9V7H21V9H9ZM3 5V3H21V5H3Z"/>
  </svg>
);

export default function CoverArtCreator() {
  const [platform, setPlatform] = useState<'apple' | 'spotify'>('apple');
  const [title, setTitle] = useState<string>('Rock');
  const [subtitle, setSubtitle] = useState<string>('Classics');
  
  const [bgString, setBgString] = useState<string>(APPLE_PRESETS[1]);
  const [activePresetIndex, setActivePresetIndex] = useState<number>(1);
  const [isAdvanced, setIsAdvanced] = useState<boolean>(false);
  const [color1, setColor1] = useState<string>('#ff7eb3');
  const [color2, setColor2] = useState<string>('#32008a');
  const [color3, setColor3] = useState<string>('#6a0dad');
  const [titleColor, setTitleColor] = useState<string>('#ffffff');
  const [subtitleColor, setSubtitleColor] = useState<string>('#ffffff');

  const [image, setImage] = useState<string | null>(null);
  const [expandImage, setExpandImage] = useState<boolean>(false);
  const [grainIntensity, setGrainIntensity] = useState<number>(20);

  const [verticalPos, setVerticalPos] = useState<'top' | 'center' | 'bottom'>('center');
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('center');
  const [showAppLogo, setShowAppLogo] = useState<boolean>(true);

  const artRef = useRef<HTMLDivElement>(null);

  const isSpotify = platform === 'spotify';
  const currentPresets = isSpotify ? SPOTIFY_PRESETS : APPLE_PRESETS;

  const handlePlatformChange = (newPlatform: 'apple' | 'spotify') => {
    setPlatform(newPlatform);
    if (newPlatform === 'spotify') {
      setBgString(SPOTIFY_PRESETS[0]);
      setActivePresetIndex(0);
    } else {
      setBgString(APPLE_PRESETS[1]);
      setActivePresetIndex(1);
    }
    setImage(null);
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setExpandImage(false);
  };

  const handlePresetSelect = (preset: string, index: number) => {
    setBgString(preset);
    setActivePresetIndex(index);
    setImage(null);
  };

  const handleCustomColorChange = (c1: string, c2: string, c3: string) => {
    setColor1(c1);
    setColor2(c2);
    setColor3(c3);
    setBgString(`radial-gradient(circle at 80% 0%, ${c1} 0%, transparent 70%), radial-gradient(circle at 10% 100%, ${c2} 0%, transparent 70%), ${c3}`);
    setActivePresetIndex(-1);
    setImage(null);
  };

  const handleDownload = async () => {
    if (artRef.current === null) return;
    try {
      const dataUrl = await toJpeg(artRef.current, { 
        quality: 1, 
        pixelRatio: 1,
        width: 3000,
        height: 3000,
        style: {
          transform: 'scale(1)',
          transformOrigin: 'top left'
        }
      });
      const link = document.createElement('a');
      link.download = `${title}-${platform}-cover.jpg`.toLowerCase().replace(/\s+/g, '-');
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error(err);
    }
  };

  const theme = {
    bgApp: isSpotify ? '#121212' : '#f5f5f7',
    sidebar: isSpotify ? 'rgba(15, 15, 15, 0.65)' : 'rgba(255, 255, 255, 0.75)',
    sidebarShadow: isSpotify ? 'inset 0 1px 1px rgba(255,255,255,0.05), 10px 0 30px rgba(0,0,0,0.5)' : 'inset 0 1px 1px rgba(255,255,255,0.8), 10px 0 30px rgba(0,0,0,0.05)',
    text: isSpotify ? '#ffffff' : '#1d1d1f',
    textSecondary: isSpotify ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
    border: isSpotify ? 'rgba(255,255,255,0.08)' : 'rgba(0, 0, 0, 0.08)',
    inputBg: isSpotify ? 'rgba(0,0,0,0.5)' : 'rgba(0, 0, 0, 0.04)',
    inputShadow: isSpotify ? 'inset 0 1px 4px rgba(0,0,0,0.5)' : 'inset 0 1px 4px rgba(0,0,0,0.05), 0 1px 0 rgba(255,255,255,0.8)',
    accent: isSpotify ? '#1DB954' : '#0071e3',
    trackEmpty: isSpotify ? 'rgba(255,255,255,0.1)' : 'rgba(0, 0, 0, 0.1)'
  };

  return (
    <main className="app-container" style={{ backgroundColor: theme.bgApp }}>
      
      {!isSpotify && (
        <div 
          className="liquid-bg-anim" 
          style={{ 
            position: 'fixed', 
            top: 0, left: 0, width: '100vw', height: '100vh', 
            background: bgString, 
            opacity: 0.25, 
            filter: 'blur(100px) saturate(150%)', 
            zIndex: 0, 
            transition: 'opacity 0.6s ease',
            pointerEvents: 'none'
          }} 
        />
      )}

      <aside className="app-sidebar" style={{ background: theme.sidebar, borderRight: `1px solid ${theme.border}`, boxShadow: theme.sidebarShadow }}>
        
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-0.5px', color: theme.text, margin: 0 }}>
            Playlist Creator
          </h1>
        </div>

        <div style={{ display: 'flex', background: theme.inputBg, padding: '4px', borderRadius: '10px', marginBottom: '32px', border: `1px solid ${theme.border}` }}>
          <button 
            onClick={() => handlePlatformChange('apple')}
            style={{ flex: 1, padding: '8px 0', borderRadius: '6px', border: 'none', background: !isSpotify ? '#fff' : 'transparent', color: !isSpotify ? theme.text : theme.textSecondary, boxShadow: !isSpotify ? '0 2px 4px rgba(0,0,0,0.05), 0 1px 1px rgba(0,0,0,0.05)' : 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          >
            Apple Music
          </button>
          <button 
            onClick={() => handlePlatformChange('spotify')}
            style={{ flex: 1, padding: '8px 0', borderRadius: '6px', border: 'none', background: isSpotify ? '#333' : 'transparent', color: isSpotify ? '#fff' : theme.textSecondary, boxShadow: isSpotify ? '0 2px 4px rgba(0,0,0,0.2)' : 'none', fontSize: '13px', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1)' }}
          >
            Spotify
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1 }}>
          
          <div>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: theme.textSecondary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Textos da Capa</span>
            <div style={{ background: theme.inputBg, borderRadius: '12px', overflow: 'hidden', border: `1px solid ${theme.border}` }}>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Título principal" style={{ width: '100%', padding: '16px', border: 'none', borderBottom: `1px solid ${theme.border}`, fontSize: '15px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', color: theme.text, background: 'transparent' }} />
              <input type="text" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} placeholder="Subtítulo opcional" style={{ width: '100%', padding: '16px', border: 'none', fontSize: '15px', outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit', color: theme.text, background: 'transparent' }} />
            </div>
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: theme.textSecondary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Fundo Predefinido</span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px' }}>
              {currentPresets.map((preset, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                  <button
                    onClick={() => handlePresetSelect(preset, index)}
                    style={{
                      width: '44px',
                      height: '44px',
                      borderRadius: '50%',
                      background: preset,
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0,
                      boxShadow: activePresetIndex === index && !image
                        ? (isSpotify ? `0 0 0 2px ${theme.sidebar}, 0 0 0 4px ${theme.accent}` : `0 0 0 2px #fff, 0 0 0 4px ${theme.accent}`)
                        : '0 2px 4px rgba(0,0,0,0.1)',
                      transition: 'transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.2s',
                      transform: activePresetIndex === index && !image ? 'scale(1.05)' : 'scale(1)'
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${theme.border}`, paddingTop: '20px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600, color: theme.text }}>Criação Avançada</span>
            <button 
              onClick={() => setIsAdvanced(!isAdvanced)}
              style={{ width: '51px', height: '31px', borderRadius: '16px', background: isAdvanced ? theme.accent : theme.trackEmpty, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', padding: 0 }}
            >
              <div style={{ width: '27px', height: '27px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', left: isAdvanced ? '22px' : '2px', transition: 'left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)', boxShadow: '0 3px 8px rgba(0,0,0,0.15), 0 1px 1px rgba(0,0,0,0.16)' }} />
            </button>
          </div>

          {isAdvanced && (
            <div className="advanced-panel">
              
              <div>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: theme.textSecondary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Detalhes & Cores</span>
                <div style={{ background: theme.inputBg, borderRadius: '12px', border: `1px solid ${theme.border}`, boxShadow: theme.inputShadow }}>
                  {!isSpotify && (
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${theme.border}` }}>
                      <span style={{ fontSize: '15px', color: theme.text }}>Mostrar Logo na Capa</span>
                      <button 
                        onClick={() => setShowAppLogo(!showAppLogo)}
                        style={{ width: '51px', height: '31px', borderRadius: '16px', background: showAppLogo ? theme.accent : theme.trackEmpty, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', padding: 0 }}
                      >
                        <div style={{ width: '27px', height: '27px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', left: showAppLogo ? '22px' : '2px', transition: 'left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)', boxShadow: '0 3px 8px rgba(0,0,0,0.15), 0 1px 1px rgba(0,0,0,0.16)' }} />
                      </button>
                    </div>
                  )}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${theme.border}` }}>
                    <span style={{ fontSize: '15px', color: theme.text }}>Cor do Título</span>
                    <input type="color" value={titleColor} onChange={(e) => setTitleColor(e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${theme.border}` }}>
                    <span style={{ fontSize: '15px', color: theme.text }}>Cor do Subtítulo</span>
                    <input type="color" value={subtitleColor} onChange={(e) => setSubtitleColor(e.target.value)} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${theme.border}` }}>
                    <span style={{ fontSize: '15px', color: theme.text }}>Cor Destaque</span>
                    <input type="color" value={color1} onChange={(e) => handleCustomColorChange(e.target.value, color2, color3)} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${theme.border}` }}>
                    <span style={{ fontSize: '15px', color: theme.text }}>Cor Acento</span>
                    <input type="color" value={color2} onChange={(e) => handleCustomColorChange(color1, e.target.value, color3)} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
                    <span style={{ fontSize: '15px', color: theme.text }}>Cor Base</span>
                    <input type="color" value={color3} onChange={(e) => handleCustomColorChange(color1, color2, e.target.value)} />
                  </div>
                </div>
              </div>

              <div>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: theme.textSecondary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Imagem de Fundo</span>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <label style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', background: image ? theme.inputBg : (isSpotify ? '#333' : '#fff'), color: image ? theme.text : (isSpotify ? '#fff' : '#000'), padding: '14px', borderRadius: '12px', fontSize: '14px', fontWeight: 600, cursor: 'pointer', border: `1px solid ${theme.border}`, transition: 'all 0.2s', boxShadow: image ? theme.inputShadow : (isSpotify ? 'none' : '0 2px 8px rgba(0,0,0,0.05)') }}>
                    <input type="file" accept="image/*" onChange={handleImageUpload} hidden />
                    {image ? 'Trocar Imagem' : 'Fazer Upload'}
                  </label>
                  {image && (
                    <button onClick={handleRemoveImage} style={{ padding: '14px 16px', borderRadius: '12px', background: '#ff3b30', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '14px', boxShadow: '0 4px 12px rgba(255, 59, 48, 0.2)' }}>
                      Remover
                    </button>
                  )}
                </div>

                {image && (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', background: theme.inputBg, borderRadius: '12px', marginTop: '12px', border: `1px solid ${theme.border}`, boxShadow: theme.inputShadow }}>
                    <div>
                      <span style={{ fontSize: '15px', color: theme.text, display: 'block', fontWeight: 600 }}>Estender Cenário</span>
                      <span style={{ fontSize: '12px', color: theme.textSecondary }}>Simula preenchimento espacial</span>
                    </div>
                    <button 
                      onClick={() => setExpandImage(!expandImage)}
                      style={{ width: '51px', height: '31px', borderRadius: '16px', background: expandImage ? theme.accent : theme.trackEmpty, border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.3s', padding: 0 }}
                    >
                      <div style={{ width: '27px', height: '27px', borderRadius: '50%', background: '#fff', position: 'absolute', top: '2px', left: expandImage ? '22px' : '2px', transition: 'left 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)', boxShadow: '0 3px 8px rgba(0,0,0,0.15), 0 1px 1px rgba(0,0,0,0.16)' }} />
                    </button>
                  </div>
                )}
              </div>

              {isSpotify && (
                <div>
                  <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: theme.textSecondary, marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Configuração do Texto</span>
                  <div style={{ background: theme.inputBg, borderRadius: '12px', border: `1px solid ${theme.border}` }}>
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderBottom: `1px solid ${theme.border}` }}>
                      <span style={{ fontSize: '15px', color: theme.text }}>Posição Vertical</span>
                      <div style={{ display: 'flex', background: theme.trackEmpty, borderRadius: '6px', padding: '2px' }}>
                        <button 
                          onClick={() => setVerticalPos('top')}
                          style={{ padding: '4px 10px', borderRadius: '4px', border: 'none', background: verticalPos === 'top' ? '#444' : 'transparent', color: verticalPos === 'top' ? '#fff' : '#aaa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                        >
                          Topo
                        </button>
                        <button 
                          onClick={() => setVerticalPos('center')}
                          style={{ padding: '4px 10px', borderRadius: '4px', border: 'none', background: verticalPos === 'center' ? '#444' : 'transparent', color: verticalPos === 'center' ? '#fff' : '#aaa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                        >
                          Meio
                        </button>
                        <button 
                          onClick={() => setVerticalPos('bottom')}
                          style={{ padding: '4px 10px', borderRadius: '4px', border: 'none', background: verticalPos === 'bottom' ? '#444' : 'transparent', color: verticalPos === 'bottom' ? '#fff' : '#aaa', fontSize: '12px', fontWeight: 600, cursor: 'pointer' }}
                        >
                          Base
                        </button>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
                      <span style={{ fontSize: '15px', color: theme.text }}>Alinhamento</span>
                      <div style={{ display: 'flex', background: theme.trackEmpty, borderRadius: '8px', padding: '4px', gap: '4px' }}>
                        <button 
                          onClick={() => setTextAlign('left')}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '32px', borderRadius: '6px', border: 'none', background: textAlign === 'left' ? '#444' : 'transparent', color: textAlign === 'left' ? '#fff' : '#aaa', cursor: 'pointer' }}
                        >
                          <AlignLeftIcon />
                        </button>
                        <button 
                          onClick={() => setTextAlign('center')}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '32px', borderRadius: '6px', border: 'none', background: textAlign === 'center' ? '#444' : 'transparent', color: textAlign === 'center' ? '#fff' : '#aaa', cursor: 'pointer' }}
                        >
                          <AlignCenterIcon />
                        </button>
                        <button 
                          onClick={() => setTextAlign('right')}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '32px', borderRadius: '6px', border: 'none', background: textAlign === 'right' ? '#444' : 'transparent', color: textAlign === 'right' ? '#fff' : '#aaa', cursor: 'pointer' }}
                        >
                          <AlignRightIcon />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              )}

              <div>
                <span style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: theme.textSecondary, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Filtro de Granulação</span>
                <div style={{ padding: '12px 0' }}>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={grainIntensity} 
                    onChange={(e) => setGrainIntensity(Number(e.target.value))}
                    className="apple-pro-slider"
                    style={{ background: `linear-gradient(to right, ${theme.accent} 0%, ${theme.accent} ${grainIntensity}%, ${theme.trackEmpty} ${grainIntensity}%, ${theme.trackEmpty} 100%)` }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px', fontSize: '11px', color: theme.textSecondary, fontWeight: 500 }}>
                    <span>Limpo</span>
                    <span>Analógico</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

        <button 
          onClick={handleDownload}
          style={{ width: '100%', padding: '16px', background: isSpotify ? '#1DB954' : '#000', color: '#fff', border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '16px', fontWeight: 600, fontFamily: 'inherit', marginTop: '24px', transition: 'all 0.2s', boxShadow: isSpotify ? 'none' : '0 4px 12px rgba(0,0,0,0.15)' }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(0.98)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Exportar Capa
        </button>
      </aside>

      <section className="app-preview-section">
        <div className="preview-scaler" style={{ boxShadow: '0 30px 60px rgba(0,0,0,0.3)', borderRadius: isSpotify ? '0px' : '24px', backgroundColor: '#000' }}>
          
          <div ref={artRef} style={{ width: '3000px', height: '3000px', background: bgString, transform: 'scale(0.166666667)', transformOrigin: 'top left', position: 'relative', overflow: 'hidden', fontFamily: isSpotify ? "'Spotify Font 1', sans-serif" : "'SF Pro Custom', sans-serif" }}>
            
            {image && (
              <>
                {expandImage && (
                  <img src={image} alt="blur-bg" style={{ position: 'absolute', top: '-10%', left: '-10%', width: '120%', height: '120%', objectFit: 'cover', filter: 'blur(100px) brightness(0.6)', zIndex: 1 }} />
                )}
                <img src={image} alt="uploaded" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: expandImage ? 'contain' : 'cover', zIndex: 2 }} />
              </>
            )}

            <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 3, opacity: isAdvanced ? grainIntensity / 100 : 0.2, mixBlendMode: 'overlay', transition: 'opacity 0.3s' }}>
              <filter id="noise">
                <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 0.5 0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#noise)"/>
            </svg>

            {isSpotify ? (
              <div style={{ 
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 4, 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: verticalPos === 'top' ? 'flex-start' : (verticalPos === 'bottom' ? 'flex-end' : 'center'),
                alignItems: textAlign === 'left' ? 'flex-start' : (textAlign === 'right' ? 'flex-end' : 'center'),
                padding: '160px', boxSizing: 'border-box'
              }}>
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: textAlign === 'left' ? 'flex-start' : (textAlign === 'right' ? 'flex-end' : 'center') }}>
                  <h1 style={{ fontFamily: "'Spotify Font 1', sans-serif", fontSize: '420px', margin: 0, fontWeight: 900, color: titleColor, letterSpacing: '-12px', lineHeight: '0.9', textAlign: textAlign, width: '100%' }}>{title}</h1>
                  {subtitle && (
                    <h2 style={{ fontFamily: "'Spotify Font 1', sans-serif", fontSize: '180px', margin: '40px 0 0 0', fontWeight: 500, color: subtitleColor, letterSpacing: '-4px', textAlign: textAlign, width: '100%' }}>{subtitle}</h2>
                  )}
                </div>
              </div>
            ) : (
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 4, padding: '240px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
                  {showAppLogo && (
                    <div style={{ height: '240px', width: 'auto', filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.3))' }}>
                      <img src="/images/logo2.png" alt="Apple Music" style={{ height: '100%', width: 'auto', objectFit: 'contain' }} />
                    </div>
                  )}
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <h1 style={{ fontFamily: "'SF Pro Custom', sans-serif", fontSize: '520px', lineHeight: '0.9', margin: 0, fontWeight: 800, color: titleColor, letterSpacing: '-16px' }}>{title}</h1>
                  {subtitle && (
                    <h2 style={{ fontFamily: "'SF Pro Custom', sans-serif", fontSize: '480px', lineHeight: '0.9', margin: '20px 0 0 0', fontWeight: 500, color: subtitleColor, letterSpacing: '-12px', opacity: 0.95 }}>{subtitle}</h2>
                  )}
                </div>
              </div>
            )}
            
          </div>
        </div>
      </section>
    </main>
  );
}