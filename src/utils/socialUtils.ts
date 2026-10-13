/**
 * Social Links & External Services Helpers
 */

export const OFFICIAL_INSTAGRAM_URL = 'https://www.instagram.com/tonix.kg?exln=MXUxZ3MzOTd1YnM3dA==';
export const OFFICIAL_INSTAGRAM_HANDLE = '@tonix.kg';

export function getInstagramUrl(handleOrUrl?: string): string {
  if (!handleOrUrl || !handleOrUrl.trim()) {
    return OFFICIAL_INSTAGRAM_URL;
  }
  const clean = handleOrUrl.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }
  const username = clean.replace(/^@/, '');
  if (username === 'tonix.kg' || username === 'tonix_tint_bishkek') {
    return OFFICIAL_INSTAGRAM_URL;
  }
  return `https://instagram.com/${username}`;
}

export function getInstagramUsername(handleOrUrl?: string): string {
  if (!handleOrUrl || !handleOrUrl.trim()) {
    return OFFICIAL_INSTAGRAM_HANDLE;
  }
  const clean = handleOrUrl.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    try {
      const url = new URL(clean);
      const segments = url.pathname.split('/').filter(Boolean);
      if (segments.length > 0) {
        return `@${segments[0]}`;
      }
    } catch {
      // ignore
    }
    return OFFICIAL_INSTAGRAM_HANDLE;
  }
  const cleanHandle = clean.startsWith('@') ? clean : `@${clean}`;
  if (cleanHandle === '@tonix_tint_bishkek') {
    return OFFICIAL_INSTAGRAM_HANDLE;
  }
  return cleanHandle;
}

export function getWhatsappUrl(phone?: string, text?: string): string {
  const digits = (phone || '+996 700 910 777').replace(/\D/g, '');
  const encodedText = text ? `?text=${encodeURIComponent(text)}` : '';
  return `https://wa.me/${digits}${encodedText}`;
}

// A map link set in the admin panel is used as is, unless it is just the city page
// (e.g. https://2gis.kg/bishkek); then the studio address is searched instead.
const isCityOnlyLink = (link?: string) => !link || /^https?:\/\/[^/]+\/(maps\/)?(\d+\/)?bishkek\/?$/i.test(link.trim());

export function get2gisUrl(link: string | undefined, address: string): string {
  return isCityOnlyLink(link) ? `https://2gis.kg/bishkek/search/${encodeURIComponent(address)}` : link!.trim();
}

export function getYandexMapsUrl(link: string | undefined, address: string): string {
  return isCityOnlyLink(link) ? `https://yandex.ru/maps/?text=${encodeURIComponent(address)}` : link!.trim();
}

export function getTelegramUrl(handleOrBot?: string): string {
  if (!handleOrBot) return 'https://t.me/tonix_tint_kg';
  const clean = handleOrBot.trim();
  if (clean.startsWith('http://') || clean.startsWith('https://')) return clean;
  return `https://t.me/${clean.replace(/^@/, '')}`;
}
