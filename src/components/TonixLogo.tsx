import React from 'react';

interface TonixLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const TonixLogo: React.FC<TonixLogoProps> = ({ 
  className = '', 
  size = 48,
  showText = false
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Circular Emblem SVG Matching User's Design */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        style={{
          filter: 'drop-shadow(0 0 16px rgba(245, 158, 11, 0.35))'
        }}
      >
        <defs>
          {/* Outer Gold Metallic Gradient */}
          <linearGradient id="tonixGoldRing" x1="20" y1="20" x2="180" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#ffe699" />
            <stop offset="25%" stopColor="#d49439" />
            <stop offset="50%" stopColor="#fff2b2" />
            <stop offset="75%" stopColor="#b37424" />
            <stop offset="100%" stopColor="#ffd875" />
          </linearGradient>

          {/* Secondary Outer Rim Glow */}
          <linearGradient id="tonixRimGlow" x1="0" y1="100" x2="200" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
            <stop offset="100%" stopColor="#d97706" stopOpacity="0.8" />
          </linearGradient>

          {/* Dark Disc Background Gradient */}
          <radialGradient id="tonixDarkBg" cx="100" cy="100" r="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#22242c" />
            <stop offset="50%" stopColor="#14151a" />
            <stop offset="85%" stopColor="#0c0d11" />
            <stop offset="100%" stopColor="#050608" />
          </radialGradient>

          {/* Inner Backlight Bloom */}
          <radialGradient id="tonixBacklight" cx="100" cy="100" r="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.45" />
            <stop offset="40%" stopColor="#d97706" stopOpacity="0.25" />
            <stop offset="80%" stopColor="#b45309" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Text Letter Face Gradient */}
          <linearGradient id="tonixTextFace" x1="100" y1="75" x2="100" y2="120" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#262730" />
            <stop offset="45%" stopColor="#14151b" />
            <stop offset="100%" stopColor="#0d0e13" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="goldNeonGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="textGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="4" result="blur1" />
            <feGaussianBlur stdDeviation="8" result="blur2" />
            <feMerge>
              <feMergeNode in="blur2" />
              <feMergeNode in="blur1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ambient Backlight Halo behind ring */}
        <circle cx="100" cy="100" r="94" stroke="#f59e0b" strokeWidth="6" opacity="0.4" filter="url(#goldNeonGlow)" />

        {/* Outer Metallic Ring */}
        <circle cx="100" cy="100" r="92" stroke="url(#tonixGoldRing)" strokeWidth="4.5" fill="none" />
        <circle cx="100" cy="100" r="88" stroke="#ffe599" strokeWidth="0.8" opacity="0.65" fill="none" />

        {/* Main Dark Inner Textured Disc */}
        <circle cx="100" cy="100" r="87" fill="url(#tonixDarkBg)" />

        {/* Subtle stone/marble noise overlay */}
        <g opacity="0.12">
          <circle cx="100" cy="100" r="87" fill="#ffffff" />
          <path d="M40 70 Q90 120 150 70 T170 140" stroke="#000" strokeWidth="12" fill="none" filter="blur(6px)" />
          <path d="M60 140 Q110 80 160 130" stroke="#000" strokeWidth="10" fill="none" filter="blur(5px)" />
        </g>

        {/* Golden Central Backlight Bloom */}
        <circle cx="100" cy="100" r="70" fill="url(#tonixBacklight)" />

        {/* TONIX Glowing Silhouette (Backlight layer) */}
        <g filter="url(#textGlow)">
          <text
            x="100"
            y="108"
            textAnchor="middle"
            fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
            fontWeight="900"
            fontSize="46"
            letterSpacing="2.5"
            stroke="#f59e0b"
            strokeWidth="5"
            fill="#d97706"
            opacity="0.85"
          >
            TONIX
          </text>
        </g>

        {/* TONIX Foreground Main Text */}
        <text
          x="100"
          y="108"
          textAnchor="middle"
          fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          fontWeight="900"
          fontSize="46"
          letterSpacing="2.5"
          fill="url(#tonixTextFace)"
          stroke="#ffe49e"
          strokeWidth="1.6"
        >
          TONIX
        </text>

        {/* Subtle top inner reflection on TONIX */}
        <text
          x="100"
          y="107"
          textAnchor="middle"
          fontFamily="'Outfit', 'Plus Jakarta Sans', sans-serif"
          fontWeight="900"
          fontSize="46"
          letterSpacing="2.5"
          fill="none"
          stroke="#ffffff"
          strokeWidth="0.6"
          opacity="0.55"
        >
          TONIX
        </text>

        {/* Subtitle: T I N T   S T U D I O */}
        <text
          x="100"
          y="131"
          textAnchor="middle"
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontWeight="700"
          fontSize="11.5"
          letterSpacing="5"
          fill="#f5dfa8"
          opacity="0.95"
        >
          TINT STUDIO
        </text>

        {/* Inner edge rim shadow */}
        <circle cx="100" cy="100" r="87" stroke="#000000" strokeWidth="2.5" opacity="0.6" fill="none" />
      </svg>

      {/* Optional Side Text Label (when requested) */}
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="font-black text-xl tracking-wider text-white">
              TONIX<span className="text-amber-400">TINT</span>
            </span>
            <span className="text-[10px] uppercase font-extrabold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
              STUDIO
            </span>
          </div>
          <span className="text-[10px] text-slate-400 tracking-tight font-medium">
            Бишкек • Премиум Детейлинг
          </span>
        </div>
      )}
    </div>
  );
};
