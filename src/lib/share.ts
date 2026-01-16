import type { ShoppingItem } from '../api';

// Encode/decode helpers for Unicode-safe base64
const encode = (str: string) => {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    try {
      return window.btoa(unescape(encodeURIComponent(str)));
    } catch {
      return '';
    }
  }
  // Fallback: base64 via globalThis at runtime (not human-friendly in Node)
  return '';
};

const decode = (b64: string) => {
  try {
    if (typeof window !== 'undefined' && typeof window.atob === 'function') {
      return decodeURIComponent(escape(window.atob(b64)));
    }
    return null;
  } catch {
    return null;
  }
};

export const generateSharePayload = (items: ShoppingItem[]) => {
  // Only include essential fields to keep URL short
  const payload = items.map((it) => ({
    name: it.name,
    quantity: it.quantity,
    unit: it.unit,
    category: it.category,
  }));
  return encode(JSON.stringify(payload));
};

export const parseSharedPayload = (
  token: string,
): { name: string; quantity?: number; unit?: string; category?: string }[] | null => {
  const decoded = decode(token);
  if (!decoded) return null;
  try {
    const parsed = JSON.parse(decoded);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
};

export const buildShareUrl = (token: string) => {
  const url = new URL(window.location.href);
  url.searchParams.set('shared', token);
  return url.toString();
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (
      typeof navigator !== 'undefined' &&
      navigator.clipboard &&
      typeof navigator.clipboard.writeText === 'function'
    ) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    // Fallback using temporary textarea and execCommand
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      const ok = document.execCommand('copy');
      return ok;
    } finally {
      document.body.removeChild(textarea);
    }
  } catch {
    return false;
  }
};
