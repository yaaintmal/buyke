import React, { createContext, useContext, useEffect, useState } from 'react';
import { DEFAULT_AVATAR } from '../config';

export type AvatarVersion = 'v1' | 'v2' | 'v3';
const StorageKey = 'avatarVersion';

const AvatarContext = createContext<{
  avatar: AvatarVersion;
  setAvatar: (v: AvatarVersion) => void;
}>({ avatar: DEFAULT_AVATAR, setAvatar: () => {} });

export const AvatarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [avatar, setAvatar] = useState<AvatarVersion>(() => {
    try {
      const s = localStorage.getItem(StorageKey) as AvatarVersion | null;
      if (s === 'v1' || s === 'v2' || s === 'v3') return s;
    } catch {
      // ignore
    }
    return DEFAULT_AVATAR;
  });

  useEffect(() => {
    try {
      localStorage.setItem(StorageKey, avatar);
    } catch {}
  }, [avatar]);

  return <AvatarContext.Provider value={{ avatar, setAvatar }}>{children}</AvatarContext.Provider>;
};

export function useAvatar() {
  return useContext(AvatarContext);
}
