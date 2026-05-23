import React from "react";
import { Folder } from "./types";
import { 
  Guitar, 
  Music, 
  Disc, 
  Folder as FolderIcon, 
  FolderOpen, 
  Music2 
} from "lucide-react";
import { motion } from "motion/react";

interface FolderCardProps {
  folder: Folder;
  onClick: () => void;
}

const FolderCard: React.FC<FolderCardProps> = ({ folder, onClick }) => {
  const renderIcon = () => {
    switch (folder.iconName) {
      case "Guitar":
        return <Guitar className="w-8 h-8 text-[#F27D26] group-hover:scale-110 transition-transform duration-300" />;
      case "Music":
        return <Music className="w-8 h-8 text-orange-400 group-hover:scale-110 transition-transform duration-300" />;
      case "Disc":
        return <Disc className="w-8 h-8 text-[#E65100] group-hover:scale-110 transition-transform duration-300" />;
      default:
        return <FolderIcon className="w-8 h-8 text-[#F27D26] group-hover:scale-110 transition-transform duration-300" />;
    }
  };

  const getThemeColors = () => {
    switch (folder.id) {
      case "a-u-moey-devushki":
        return {
          bgGlow: "rgba(242, 125, 38, 0.08)",
          borderColor: "group-hover:border-[#F27D26]",
          textAccent: "text-[#F27D26]",
          btnBg: "bg-[#F27D26]/10 text-[#F27D26] hover:bg-[#F27D26]/20",
          bgOverlay: "from-orange-950/20 via-stone-900/90 to-stone-950"
        };
      case "moy-lyubimiy-restoran":
        return {
          bgGlow: "rgba(242, 125, 38, 0.08)",
          borderColor: "group-hover:border-[#F27D26]",
          textAccent: "text-orange-400",
          btnBg: "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20",
          bgOverlay: "from-orange-950/20 via-stone-900/90 to-stone-950"
        };
      case "oficiant":
        return {
          bgGlow: "rgba(230, 81, 0, 0.08)",
          borderColor: "group-hover:border-[#E65100]",
          textAccent: "text-[#E65100]",
          btnBg: "bg-[#E65100]/10 text-[#E65100] hover:bg-[#E65100]/20",
          bgOverlay: "from-red-950/20 via-stone-900/90 to-stone-950"
        };
      default:
        return {
          bgGlow: "rgba(242, 125, 38, 0.08)",
          borderColor: "group-hover:border-[#F27D26]",
          textAccent: "text-[#F27D26]",
          btnBg: "bg-[#F27D26]/10 text-[#F27D26] hover:bg-[#F27D26]/20",
          bgOverlay: "from-stone-950"
        };
    }
  };

  const themeColors = getThemeColors();

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className={`group relative overflow-hidden rounded-2xl border border-[#2A2A2E] bg-[#141417] p-6 cursor-pointer hover:bg-[#1A1A1E] hover:shadow-[0_12px_30px_rgba(0,0,0,0.6)] transition-all duration-300 ${themeColors.borderColor}`}
      style={{
        boxShadow: `inset 0 1px 1px rgba(255,255,255,0.03), 0 4px 20px ${themeColors.bgGlow}`
      }}
      onClick={onClick}
      id={`folder-card-${folder.id}`}
    >
      {/* Background Graphic Illustration Overlay */}
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 rounded-full bg-gradient-to-br from-white/3 to-transparent blur-3xl group-hover:scale-150 transition-transform duration-500" />

      {/* Album Artwork Minimal Panel */}
      <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-5 bg-[#0A0A0B] border border-[#2A2A2E] group-hover:border-[#F27D26]/30 shadow-inner">
        {folder.coverUrl ? (
          <>
            <img 
              src={folder.coverUrl} 
              alt={folder.title} 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${themeColors.bgOverlay}`} />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#0A0A0B]">
            <Music2 className="w-12 h-12 text-[#707075]" />
          </div>
        )}

        <div className="absolute top-4 right-4 flex p-2.5 rounded-xl bg-[#0A0A0B]/80 backdrop-blur-md border border-[#2A2A2E] shadow-lg">
          {renderIcon()}
        </div>

        <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#0A0A0B]/90 border border-[#2A2A2E] text-[11px] font-mono tracking-wider font-semibold uppercase text-[#707075]">
          <FolderIcon className="w-3.5 h-3.5 text-[#707075] group-hover:hidden" />
          <FolderOpen className="w-3.5 h-3.5 text-[#F27D26] hidden group-hover:inline-block" />
          <span>FOLDER</span>
        </div>
      </div>

      {/* Card Info */}
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="font-sans font-medium text-xl text-white group-hover:text-white mb-2 leading-snug tracking-tight">
            {folder.title}
          </h3>
          <p className="text-[#707075] text-sm line-clamp-2 min-h-[2.5rem] font-light leading-relaxed">
            {folder.description || `Музыкальный сборник треков и инструментальный фон по папке "${folder.title}".`}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#2A2A2E] my-4" />

        {/* Card Footer Actions */}
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-[#707075] uppercase tracking-tighter">
            {folder.songs.length} Track{folder.songs.length > 1 ? "s" : ""} • Instrumental
          </span>
          <div className={`flex items-center gap-1 text-xs font-medium px-3.5 py-1.5 rounded-lg transition-colors font-mono tracking-wide ${themeColors.btnBg}`}>
            <span>ОТКРЫТЬ</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FolderCard;
