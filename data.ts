import { Song, Folder } from "./types";

export const songs: Song[] = [
  {
    id: "a-u-moey-devushki-1",
    title: "A u moey devushki",
    audioUrl: "https://xheftaljhwusyssqcwpg.supabase.co/storage/v1/object/public/songs7/A%20u%20moey%20devushki/A%20u%20moey%20devushki.mp3",
    lyricsUrl: "https://xheftaljhwusyssqcwpg.supabase.co/storage/v1/object/public/songs7/A%20u%20moey%20devushki/A%20u%20moey%20devushki.txt",
    coverUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=600",
    iconName: "Guitar",
    description: "Acoustic Background"
  },
  {
    id: "moy-lyubimiy-restoran-1",
    title: "Moy lyubimiy restoran",
    audioUrl: "https://xheftaljhwusyssqcwpg.supabase.co/storage/v1/object/public/songs7/Moy%20lyubimiy%20restoran/Moy%20lyubimiy%20restoran.mp3",
    lyricsUrl: "https://xheftaljhwusyssqcwpg.supabase.co/storage/v1/object/public/songs7/Moy%20lyubimiy%20restoran/Moy%20lyubimiy%20restoran.txt",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600",
    iconName: "Music",
    description: "Ambient Lounge Background"
  },
  {
    id: "oficiant-1",
    title: "Oficiant",
    audioUrl: "https://xheftaljhwusyssqcwpg.supabase.co/storage/v1/object/public/songs7/Oficiant/Oficiant.mp3",
    lyricsUrl: "https://xheftaljhwusyssqcwpg.supabase.co/storage/v1/object/public/songs7/Oficiant/Oficiant.txt",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600",
    iconName: "Disc",
    description: "Narrative Musical Background"
  }
];

export const folders: Folder[] = [
  {
    id: "a-u-moey-devushki",
    title: "A u moey devushki",
    description: "Акустический фон и гитарные композиции из категории 'A u moey devushki'",
    coverUrl: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=600",
    iconName: "Guitar",
    songs: [songs[0]]
  },
  {
    id: "moy-lyubimiy-restoran",
    title: "Moy lyubimiy restoran",
    description: "Лаунж стиль, расслабляющий фон и атмосферная музыка 'Moy lyubimiy restoran'",
    coverUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600",
    iconName: "Music",
    songs: [songs[1]]
  },
  {
    id: "oficiant",
    title: "Oficiant",
    description: "Динамичный и нарративный инструментальный фон из категории 'Oficiant'",
    coverUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=600",
    iconName: "Disc",
    songs: [songs[2]]
  }
];
