/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string;
  readonly VITE_APP_SLOGAN?: string;

  // Defaults for first-time setup (optional)
  readonly VITE_DEFAULT_LANGUAGE?: 'en' | 'de';
  readonly VITE_DEFAULT_AVATAR?: 'v1' | 'v2' | 'v3';
  readonly VITE_DEFAULT_EXTENDED_FUNCTIONS?: 'true' | 'false';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.png';
