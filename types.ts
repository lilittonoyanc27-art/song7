export interface Song {
  id: string;
  title: string;
  audioUrl: string;
  lyricsUrl: string;
  coverUrl?: string;     // Cover photo of the song / musical instruments
  iconName?: string;     // Instrument icon
  description?: string;  // Track classification (e.g. Lounge, Acoustic, Narrative)
}

export interface Folder {
  id: string;
  title: string;
  songs: Song[];
  coverUrl?: string;
  iconName?: string;
  description?: string;
}

