import React, { useState } from "react";
import { folders } from "./data";
import { Folder } from "./types";
import FolderCard from "./FolderCard";
import SongCard from "./SongCard";
import { 
  Music, 
  Guitar, 
  Disc, 
  Search, 
  Radio, 
  Sparkles,
  Piano,
  ChevronLeft,
  Layers,
  Volume2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [selectedFolder, setSelectedFolder] = useState<Folder | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleBackToFolders = () => {
    setSelectedFolder(null);
    setSearchQuery("");
  };

  // Search logic depending on current state
  const filteredFolders = folders.filter((folder) =>
    folder.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSongs = selectedFolder
    ? selectedFolder.songs.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="relative min-h-screen bg-[#0A0A0B] text-[#E0E0E0] overflow-x-hidden pb-16">
      
      {/* BACKGROUND DECORATIVE GLOWS & MUSICAL INSTRUMENT PATTERNS */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Soft warmth gradient glows representing studio lights from "Sophisticated Dark" spec */}
        <div className="absolute top-[-100px] right-[-50px] w-96 h-96 bg-[#1A1A1E] rounded-full blur-[100px] opacity-40" />
        <div className="absolute bottom-[-100px] left-[-50px] w-[500px] h-[500px] bg-[#121214] rounded-full blur-[120px] opacity-30" />
        <div className="absolute top-1/3 right-[15%] w-[400px] h-[400px] rounded-full bg-[#1A1A1E]/40 blur-[120px]" />

        {/* Floating background musical symbols and instruments */}
        <div className="absolute top-[12%] left-[8%] opacity-[0.03] select-none text-white transform hover:rotate-12 transition-transform duration-700">
          <Guitar className="w-48 h-48 rotate-45" />
        </div>
        <div className="absolute bottom-[20%] left-[5%] opacity-[0.02] select-none text-white transform hover:scale-110 transition-transform duration-700">
          <Music className="w-56 h-56" />
        </div>
        <div className="absolute top-[40%] right-[6%] opacity-[0.03] select-none text-white transform hover:-rotate-12 transition-transform duration-700">
          <Disc className="w-44 h-44 animate-[spin_30s_linear_infinite]" />
        </div>
        <div className="absolute bottom-[10%] right-[10%] opacity-[0.025] select-none text-white">
          <Piano className="w-64 h-64" />
        </div>
        
        {/* Sound waves grid background pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#1A1A20_1px,transparent_1px),linear-gradient(to_bottom,#1A1A20_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25" 
        />
      </div>

      {/* FOREGROUND APP Workspace */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Ribbon Area - Sophisticated Dark layout */}
        <header className="border-b border-[#2A2A2E] bg-[#0A0A0B]/80 backdrop-blur-md sticky top-0 z-50 py-5 mb-10 transition-all">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 cursor-pointer" onClick={handleBackToFolders}>
              {/* Premium Pulsing Audio Logo Widget */}
              <div className="relative w-11 h-11 rounded-lg bg-gradient-to-br from-[#F27D26] to-[#E65100] flex items-center justify-center shadow-lg shadow-[#F27D26]/10">
                <Radio className="w-5.5 h-5.5 text-white animate-[pulse_2s_infinite]" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-stone-950 shadow" />
              </div>
              <div>
                <h1 className="font-serif italic text-2xl text-white tracking-wide flex items-center gap-1.5">
                  <span>Melody Vault</span>
                  <span className="text-xs font-mono font-medium not-italic ml-1 px-1.5 py-0.5 rounded-md bg-[#F27D26]/10 border border-[#F27D26]/20 text-[#F27D26]">v1.0</span>
                </h1>
                <p className="text-[10px] sm:text-xs font-mono text-[#707075] font-light leading-none mt-1 uppercase tracking-wider">
                  Supabase songs7 • Плеер Аудиофайлов
                </p>
              </div>
            </div>

            {/* Aesthetic Wave Indicator */}
            <div className="hidden sm:flex items-end gap-1 px-4 py-2 bg-[#141417] border border-[#2A2A2E] rounded-full h-8 overflow-hidden">
              <span className="w-0.5 bg-[#F27D26] h-2 animate-[bounce_1s_infinite_100ms]" />
              <span className="w-0.5 bg-[#E65100] h-4 animate-[bounce_1s_infinite_400ms]" />
              <span className="w-0.5 bg-rose-500 h-5 animate-[bounce_1s_infinite_200ms]" />
              <span className="w-0.5 bg-emerald-400 h-3 animate-[bounce_1s_infinite_600ms]" />
              <span className="w-0.5 bg-[#F27D26] h-1.5 animate-[bounce_1s_infinite_300ms]" />
              <span className="text-[10px] font-mono text-[#707075] ml-1.5 font-semibold">STUDIO ACTIVE</span>
            </div>
          </div>
        </header>

        {/* Main Workspace content */}
        <main className="min-h-[60vh] space-y-8">
          <AnimatePresence mode="wait">
            {!selectedFolder ? (
              // 1. FOLDERS MAIN DIRECTORY VIEW
              <motion.div
                key="folders-directory"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* Hero Catalogue Minimal Block */}
                <div className="relative rounded-2xl overflow-hidden border border-[#2A2A2E] bg-[#141417]/40 p-8 sm:p-10 backdrop-blur-md">
                  <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[#F27D26]/5 to-transparent blur-2xl rounded-l-full pointer-events-none" />
                  <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F27D26]/10 border border-[#F27D26]/20 text-xs font-mono font-medium text-[#F27D26] uppercase tracking-wide">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Sophisticated Dark</span>
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-serif italic text-white tracking-tight sm:leading-none">
                        Музыкальные папки
                      </h2>
                      <p className="text-[#A0A0A5] font-light text-sm max-w-xl leading-relaxed">
                        Выберите папку с инструментом для доступа к сборнику треков, текстам песен и аудио проигрывателям.
                      </p>
                    </div>

                    {/* Search query box */}
                    <div className="relative w-full md:w-72 shrink-0">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707075]" />
                      <input
                        type="text"
                        placeholder="Поиск папок..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-full border border-[#2A2A2E] bg-[#0A0A0B]/80 backdrop-blur-sm text-sm text-[#E0E0E0] placeholder-[#707075] focus:outline-none focus:border-[#F27D26]/50 focus:ring-1 focus:ring-[#F27D26]/30 transition-all"
                        id="search-folders-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Grid List displaying folders */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between px-1">
                    <span className="text-xs font-mono text-[#707075] font-medium tracking-wider uppercase">
                      Доступно папок: {filteredFolders.length} из {folders.length}
                    </span>
                    <span className="w-16 h-px bg-[#2A2A2E]" />
                  </div>

                  {filteredFolders.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#2A2A2E] bg-[#141417]/10 p-16 text-center text-[#707075]">
                      <Layers className="w-12 h-12 mb-4 text-[#2A2A2E] animate-pulse" />
                      <p className="font-medium text-[#707075] font-sans">Папки не найдены</p>
                      <button 
                        onClick={() => setSearchQuery("")} 
                        className="mt-3 text-xs text-[#F27D26] underline hover:text-orange-400 transition"
                      >
                        Сбросить поиск
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {filteredFolders.map((folder) => (
                        <FolderCard
                          key={folder.id}
                          folder={folder}
                          onClick={() => {
                            setSelectedFolder(folder);
                            setSearchQuery(""); // clear search query on transition
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ) : (
              // 2. CHOSEN FOLDER SONGS VIEW
              <motion.div
                key={`folder-songs-${selectedFolder.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-8"
              >
                {/* Back button and directory breadcrumbs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <button
                    onClick={handleBackToFolders}
                    id="back-to-folders-btn"
                    className="group flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#3A3A3E] bg-[#141417] text-sm tracking-wide font-medium text-[#A0A0A5] hover:text-white hover:border-[#F27D26]/40 hover:bg-[#1A1A1E] transition-all duration-200 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    <span>Назад к папкам</span>
                  </button>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#F27D26] bg-[#F27D26]/10 px-4 py-2 rounded-full border border-[#F27D26]/20 self-start sm:self-auto">
                    <span className="font-bold">MELODY VAULT</span>
                    <span className="opacity-50">•</span>
                    <span className="text-[#E0E0E0] uppercase">{selectedFolder.title}</span>
                  </div>
                </div>

                {/* Banner representing specific musical group folder */}
                <div className="relative rounded-2xl overflow-hidden border border-[#2A2A2E] bg-[#141417] p-8 md:p-12 shadow-2xl shadow-orange-950/5">
                  <div className="absolute inset-0 bg-radial-gradient from-[#F27D26]/5 to-transparent blur-3xl pointer-events-none" />
                  {selectedFolder.coverUrl && (
                    <>
                      <img 
                        src={selectedFolder.coverUrl} 
                        alt={selectedFolder.title} 
                        className="absolute inset-0 w-full h-full object-cover opacity-15 filter blur-xs scale-105 pointer-events-none"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#141417] via-[#141417]/90 to-transparent pointer-events-none" />
                    </>
                  )}

                  <div className="relative flex flex-col md:flex-row items-center gap-6 md:gap-8 justify-between">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                      {/* Animated Folder Visual Widget - Sophisticated shape */}
                      <div className="relative w-24 h-24 shrink-0 flex items-center justify-center rounded-2xl bg-[#0A0A0B] border border-[#2A2A2E] shadow-2xl group">
                        {selectedFolder.iconName === "Guitar" ? (
                          <Guitar className="w-12 h-12 text-[#F27D26]" />
                        ) : selectedFolder.iconName === "Disc" ? (
                          <Disc className="w-12 h-12 text-orange-500 animate-[spin_10s_linear_infinite]" />
                        ) : (
                          <Music className="w-12 h-12 text-orange-400" />
                        )}
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-[#141417] flex items-center justify-center border border-[#2A2A2E] text-[10px] font-mono text-[#F27D26] font-semibold shadow">
                          {selectedFolder.songs.length}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <span className="text-[#F27D26] text-xs font-bold uppercase tracking-[0.2em] block">SOPHISTICATED MUSIC VAULT</span>
                        <h1 className="text-3xl md:text-4xl font-serif italic text-white tracking-tight leading-none">
                          {selectedFolder.title}
                        </h1>
                        <p className="text-[#A0A0A5] font-light text-sm max-w-md leading-relaxed">
                          {selectedFolder.description}
                        </p>
                      </div>
                    </div>

                    {/* Simple search inside folder */}
                    <div className="relative w-full md:w-60 shrink-0">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#707075]" />
                      <input
                        type="text"
                        placeholder="Найти в папке..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-full border border-[#2A2A2E] bg-[#0A0A0B]/80 text-xs text-[#E0E0E0] placeholder-[#707075] focus:outline-none focus:border-[#F27D26]/50 focus:ring-1 focus:ring-[#F27D26]/35 transition-all"
                        id="search-folder-songs-input"
                      />
                    </div>
                  </div>
                </div>

                {/* Available songs */}
                <div className="space-y-6">
                  <h2 className="text-xs uppercase tracking-[0.2em] font-bold text-[#F27D26] flex items-center gap-2 px-1">
                    <Volume2 className="w-4 h-4" />
                    <span>СПИСОК ТРЕКОВ • {filteredSongs.length} из {selectedFolder.songs.length}</span>
                  </h2>

                  {filteredSongs.length === 0 ? (
                    <div className="flex flex-col items-center justify-center border border-[#2A2A2E] rounded-2xl bg-[#141417]/40 p-12 text-center text-[#707075]">
                      <Music className="w-12 h-12 mb-4 text-[#2A2A2E]" />
                      <p className="font-serif italic text-sm">В этой папке нет подходящих треков.</p>
                      {searchQuery && (
                        <button 
                          onClick={() => setSearchQuery("")} 
                          className="mt-3 text-xs text-[#F27D26] underline hover:text-orange-400 transition"
                        >
                          Сбросить поиск
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {filteredSongs.map((song, i) => (
                        <SongCard
                          key={song.id}
                          song={song}
                          index={i}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Humble Studio info footer block */}
        <footer className="mt-20 pt-8 border-t border-[#2A2A2E] text-center space-y-3">
          <p className="text-xs font-mono text-[#707075] leading-relaxed max-w-sm mx-auto">
            Музыкальный сборник интегрирован с постоянным облачным хранилищем Supabase Storage bucket <code className="text-[#E0E0E0] px-1 py-0.5 bg-[#141417] border border-[#2A2A2E] rounded">songs7</code>.
          </p>
          <div className="flex items-center justify-center gap-1 text-[10px] font-mono text-[#707075] uppercase tracking-widest">
            <span>© {new Date().getFullYear()}</span>
            <span>•</span>
            <span className="text-[#F27D26] font-medium hover:text-orange-400 transition cursor-default">MELODY VAULT STUDIO</span>
            <span>•</span>
            <span>Coded with Craft</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
