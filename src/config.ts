export type Lang = 'en' | 'de';
export type AvatarVersion = 'v1' | 'v2' | 'v3';

export const DEFAULT_LANGUAGE: Lang =
  (import.meta.env.VITE_DEFAULT_LANGUAGE as Lang | undefined) ?? 'de';
export const DEFAULT_AVATAR: AvatarVersion =
  (import.meta.env.VITE_DEFAULT_AVATAR as AvatarVersion | undefined) ?? 'v1';

export const DEFAULT_EXTENDED_FUNCTIONS: boolean = (() => {
  const v = import.meta.env.VITE_DEFAULT_EXTENDED_FUNCTIONS;
  if (v === 'true') return true;
  if (v === 'false') return false;
  return true; // existing default
})();
