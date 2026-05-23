/**
 * Resilient helpers for audio and lyrics URLs.
 * Handles fallback between "xheftaljhwusyssqcwpg.supabase.co" and "xheftaljhwusyssqcwvpg.supabase.co"
 */

export function getAlternativeUrl(url: string): string {
  if (url.includes("xheftaljhwusyssqcwpg.supabase.co")) {
    return url.replace("xheftaljhwusyssqcwpg.supabase.co", "xheftaljhwusyssqcwvpg.supabase.co");
  } else if (url.includes("xheftaljhwusyssqcwvpg.supabase.co")) {
    return url.replace("xheftaljhwusyssqcwvpg.supabase.co", "xheftaljhwusyssqcwpg.supabase.co");
  }
  return url;
}

export async function fetchLyrics(url: string): Promise<string> {
  const tryFetch = async (targetUrl: string) => {
    const res = await fetch(targetUrl);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    return await res.text();
  };

  try {
    return await tryFetch(url);
  } catch (error) {
    console.warn("First lyrics fetch failed, trying alternative domain...", error);
    const altUrl = getAlternativeUrl(url);
    if (altUrl !== url) {
      try {
        return await tryFetch(altUrl);
      } catch (secondError) {
        console.error("Alternative lyrics fetch also failed:", secondError);
        throw secondError;
      }
    }
    throw error;
  }
}
