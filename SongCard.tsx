import React, { useState } from "react";
import { Song } from "../types";
import { 
  Music, 
  Guitar, 
  Disc, 
  BookOpen, 
  Volume2, 
  AlertTriangle, 
  RefreshCw, 
  Copy, 
  Check, 
  Loader2,
  FileAudio
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { fetchLyrics, getAlternativeUrl } from "../utils";

interface SongCardProps {
  song: Song;
  index: number;
}

const SongCard: React.FC<SongCardProps> = ({ song, index }) => {
  const [lyricsOpen, setLyricsOpen] = useState(false);
  const [lyricsText, setLyricsText] = useState<string | null>(null);
  const [isLoadingLyrics, setIsLoadingLyrics] = useState(false);
  const [lyricsError, setLyricsError] = useState<string | null>(null);

  // Audio source resilience state
  const [currentAudioUrl, setCurrentAudioUrl] = useState(song.audioUrl);
  const [audioFailedOver, setAudioFailedOver] = useState(false);
  const [audioError, setAudioError] = useState(false);

  // Copy lyrics tracking state
  const [copied, setCopied] = useState(false);

  // Map instrument icons
  const renderInstrumentIcon = () => {
    switch (song.iconName) {
      case "Guitar":
        return <Guitar className="w-8 h-8 text-[#F27D26]" />;
      case "Music":
        return <Music className="w-8 h-8 text-orange-400" />;
      case "Disc":
        return <Disc className="w-8 h-8 text-[#E65100] animate-[spin_10s_linear_infinite]" />;
      default:
        return <Music className="w-8 h-8 text-[#F27D26]" />;
    }
  };

  // Safe lyrics toggler and fetcher
  const handleToggleLyrics = async () => {
    if (lyricsOpen) {
      setLyricsOpen(false);
      return;
    }

    if (lyricsText) {
      setLyricsOpen(true);
      return;
    }

    setIsLoadingLyrics(true);
    setLyricsError(null);

    try {
      const text = await fetchLyrics(song.lyricsUrl);
      setLyricsText(text);
      setLyricsOpen(true);
    } catch (err) {
      console.error(`Failed to load lyrics for song: ${song.title}`, err);
      setLyricsError("Текст песни пока не доступен.");
      setLyricsOpen(true); // Open to display the specified error message
    } finally {
      setIsLoadingLyrics(false);
    }
  };

  // Re-try lyrics fetcher trigger
  const handleRetryLyrics = async () => {
    setIsLoadingLyrics(true);
    setLyricsError(null);

    try {
      const text = await fetchLyrics(song.lyricsUrl);
      setLyricsText(text);
      setLyricsOpen(true);
    } catch (err) {
      setLyricsError("Текст песни пока не доступен.");
    } finally {
      setIsLoadingLyrics(false);
    }
  };

  // Handle resilient audio failover
  const handleAudioError = () => {
    if (audioFailedOver) {
      console.error(`Audio totally failed to load on both domains for: ${song.title}`);
      setAudioError(true);
      return;
    }

    const altUrl = getAlternativeUrl(currentAudioUrl);
    if (altUrl !== currentAudioUrl) {
      console.log(`Audio error detected for "${song.title}". Retrying using alternative URL:`, altUrl);
      setAudioFailedOver(true);
      setCurrentAudioUrl(altUrl);
    } else {
      setAudioError(true);
    }
  };

  // Handle copy to clipboard
  const handleCopyClipboard = () => {
    if (!lyricsText) return;
    navigator.clipboard.writeText(lyricsText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="rounded-2xl border border-[#2A2A2E] bg-[#141417] overflow-hidden hover:border-[#F27D26]/40 transition-all duration-300 shadow-xl"
      id={`song-file-${song.id}`}
    >
      {/* Outer Banner Content Panel */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          
          <div className="flex items-center gap-4">
            {/* Visual File Icon Plate with artwork */}
            <div className="relative w-16 h-16 rounded-xl bg-[#0A0A0B] border border-[#2A2A2E] flex items-center justify-center overflow-hidden shrink-0 group">
              {song.coverUrl ? (
                <>
                  <img 
                    src={song.coverUrl} 
                    alt={song.title} 
                    className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </>
              ) : (
                <FileAudio className="w-8 h-8 text-[#707075]" />
              )}
              {/* Overlay instrument logo badge */}
              <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                {renderInstrumentIcon()}
              </div>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif italic text-2xl text-white tracking-wide">
                {song.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[#707075]">
                <span className="text-[#F27D26]">{song.description || "Инструментальный фон"}</span>
                <span>•</span>
                <span>MP3 FILE</span>
              </div>
            </div>
          </div>

          {/* Indicators column */}
          <div className="flex flex-wrap items-center gap-2">
            {audioFailedOver && !audioError && (
              <span className="text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#F27D26] font-mono">
                Резервный канал
              </span>
            )}
            <span className="text-xs font-mono text-[#707075] px-2.5 py-1 rounded-full bg-[#0A0A0B] border border-[#2A2A2E]">
              Track {String(index + 1).padStart(2, "0")}
            </span>
          </div>

        </div>

        {/* Audio Interface Frame */}
        <div className="bg-[#0A0A0B] border border-[#2A2A2E] p-6 rounded-2xl shadow-inner flex flex-col md:flex-row md:items-center justify-between gap-5">
          {audioError ? (
            <div className="flex items-center gap-3 w-full py-1.5 text-rose-400 text-sm font-mono" id={`audio-error-${song.id}`}>
              <AlertTriangle className="w-5 h-5 shrink-0 animate-bounce" />
              <span>Не удалось загрузить аудио</span>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-1.5">
              <div className="flex justify-between items-center px-1 mb-1">
                <span className="text-[#E0E0E0] text-xs font-mono font-medium">{song.title}.mp3</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[#707075] text-[10px] font-mono uppercase tracking-wider">Ready / 320kbps</span>
                </div>
              </div>
              
              {/* Core audio controls element as requested by standard */}
              <audio 
                controls 
                src={currentAudioUrl}
                onError={handleAudioError}
                className="w-full h-10 accent-[#F27D26] filter invert opacity-95 hover:opacity-100 transition-opacity"
                id={`audio-${song.id}`}
              />
            </div>
          )}

          {/* Action trigger Button */}
          <button
            onClick={handleToggleLyrics}
            disabled={isLoadingLyrics}
            id={`lyrics-btn-${song.id}`}
            className={`md:shrink-0 w-full md:w-auto h-11 flex items-center justify-center gap-2 px-6 rounded-full font-bold text-sm tracking-wide transition-all duration-200 cursor-pointer ${
              lyricsOpen
                ? "bg-[#F27D26] text-white shadow-[0_4px_15px_rgba(242,125,38,0.3)] hover:bg-orange-600"
                : "bg-white text-black hover:bg-[#F27D26] hover:text-white"
            }`}
          >
            {isLoadingLyrics ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#F27D26]" />
                <span>Загрузка...</span>
              </>
            ) : (
              <>
                <BookOpen className="w-4 h-4" />
                <span>{lyricsOpen ? "Скрыть слова" : "Текст песни"}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable in-app Lyrics Drawer */}
      <AnimatePresence initial={false}>
        {lyricsOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="bg-[#0D0D0F] border-t border-[#2A2A2E] rounded-t-3xl overflow-hidden"
          >
            <div className="p-6 md:p-8 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-[#F27D26] uppercase text-xs tracking-widest font-bold flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4" />
                  <span>Слова трека • {song.title}</span>
                </h4>

                {lyricsText && (
                  <button
                    onClick={handleCopyClipboard}
                    className="flex items-center gap-1.5 text-xs text-[#A0A0A5] hover:text-white hover:bg-[#1A1A1E] py-1.5 px-3.5 rounded-full border border-[#2A2A2E] transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-mono">Скопировано!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Копировать</span>
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Lyrics Content view */}
              <div className="max-h-[350px] overflow-y-auto pr-2 custom-scrollbar py-2">
                {lyricsError ? (
                  <div className="flex flex-col items-center justify-center p-8 bg-[#0A0A0B]/60 border border-[#2A2A2E] rounded-xl text-center space-y-3" id={`lyrics-error-${song.id}`}>
                    <AlertTriangle className="w-8 h-8 text-[#707075]" />
                    <span className="text-sm font-medium text-[#707075]">
                      {lyricsError}
                    </span>
                    <button
                      onClick={handleRetryLyrics}
                      className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-full bg-[#141417] hover:bg-[#1A1A1E] border border-[#2A2A2E] text-stone-200 transition"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>Попробовать снова</span>
                    </button>
                  </div>
                ) : lyricsText ? (
                  <pre className="font-serif text-2xl text-[#A0A0A5] leading-relaxed max-w-2xl whitespace-pre-wrap break-words py-1">
                    {lyricsText}
                  </pre>
                ) : (
                  <div className="text-center text-[#707075] text-sm font-light py-6 animate-pulse">
                    Слова загружаются...
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SongCard;
