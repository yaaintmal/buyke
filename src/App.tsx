// Hooks
import { useEffect, useState } from 'react';
import useShoppingList from './hooks/useShoppingList';
import useUIState from './hooks/useUIState';
import toast from 'react-hot-toast';
import {
  generateSharePayload,
  buildShareUrl,
  parseSharedPayload,
  copyToClipboard,
} from './lib/share';
import SharedListPreview from './components/SharedListPreview';
import { translations } from './i18n';
// Components
import Header from './components/Header';
import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';
import ErrorBanner from './components/ErrorBanner';
import Dock from './components/Dock';
import Settings from './components/Settings';
import Footer from './components/Footer';
// Context Providers
import { LanguageProvider } from './contexts/LanguageContext';
import { AvatarProvider } from './contexts/AvatarContext';
import { Toaster } from 'react-hot-toast';

function App() {
  const {
    items,
    loading,
    error,
    adding,
    handleAdd,
    handleToggle,
    handleUpdate,
    handleDelete,
    handleFactoryReset,
  } = useShoppingList();

  const [sharedPreviewItems, setSharedPreviewItems] = useState<
    | {
        name: string;
        quantity?: number;
        unit?: string;
        category?: string;
      }[]
    | null
  >(null);
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('shared');
      if (token) {
        const parsed = parseSharedPayload(token);
        if (parsed && parsed.length > 0) {
          // schedule setState to avoid synchronous effect update
          setTimeout(
            () =>
              setSharedPreviewItems(
                parsed as { name: string; quantity?: number; unit?: string; category?: string }[],
              ),
            0,
          );
        }
      }
    } catch {
      // no-op
    }
  }, []);

  const handleShare = async () => {
    try {
      const token = generateSharePayload(items);
      const url = buildShareUrl(token);
      // try clipboard API with fallback
      const copied = await copyToClipboard(url);
      const langKey = (localStorage.getItem('language') as 'en' | 'de') ?? 'en';
      if (copied) {
        toast.success(translations[langKey].shareSuccess);
      } else {
        // Fallback: show prompt so user can copy manually
        window.prompt(translations[langKey].share, url);
        toast.success(translations[langKey].shareSuccess);
      }
    } catch (e) {
      console.error(e);
      const langKey = (localStorage.getItem('language') as 'en' | 'de') ?? 'en';
      toast.error(translations[langKey].shareError);
    }
  };

  const handleImport = async (
    importItems: { name: string; quantity?: number; unit?: string; category?: string }[],
  ) => {
    try {
      for (const it of importItems) {
        await handleAdd({
          name: it.name,
          quantity: it.quantity ?? 1,
          unit: it.unit ?? 'pcs',
          category: it.category ?? 'Other',
        });
      }
      const langKey = (localStorage.getItem('language') as 'en' | 'de') ?? 'en';
      toast.success(translations[langKey].importSuccess);
      setSharedPreviewItems(null);
      const url = new URL(window.location.href);
      url.searchParams.delete('shared');
      window.history.replaceState({}, document.title, url.toString());
    } catch (e) {
      console.error(e);
      const langKey = (localStorage.getItem('language') as 'en' | 'de') ?? 'en';
      toast.error(translations[langKey].importError);
    }
  };
  const {
    filter,
    setFilter,
    showSettings,
    setShowSettings,
    theme,
    setTheme,
    extendedFunctions,
    setExtendedFunctions,
  } = useUIState();

  const filteredItems = items.filter((it) => {
    if (filter === 'all') return true;
    if (filter === 'open') return !it.bought;
    return it.bought;
  });

  return (
    <LanguageProvider>
      <AvatarProvider>
        <div className="app-root">
          <div className="card">
            <Header openCount={items.filter((i) => !i.bought).length} onShare={handleShare} />

            <main>
              <AddItemForm
                onAdd={handleAdd}
                adding={adding}
                extendedFunctions={extendedFunctions}
              />

              <div className="banner-area" aria-live="polite">
                {error && <ErrorBanner message={error} />}
              </div>

              <Dock active={filter} onChange={setFilter} onSettings={() => setShowSettings(true)} />

              <ItemList
                items={filteredItems}
                totalItems={items.length}
                filter={filter}
                loading={loading}
                onToggle={handleToggle}
                onDelete={handleDelete}
                onUpdate={handleUpdate}
                extendedFunctions={extendedFunctions}
              />

              {sharedPreviewItems && (
                <SharedListPreview
                  items={sharedPreviewItems}
                  onImport={handleImport}
                  onClose={() => setSharedPreviewItems(null)}
                />
              )}

              <Settings
                open={showSettings}
                onClose={() => setShowSettings(false)}
                theme={theme}
                onThemeChange={(t) => setTheme(t)}
                onFactoryReset={handleFactoryReset}
                extendedFunctions={extendedFunctions}
                onExtendedFunctionsChange={setExtendedFunctions}
              />
            </main>

            <Footer />
            <Toaster position="bottom-right" />
          </div>
        </div>
      </AvatarProvider>
    </LanguageProvider>
  );
}

export default App;
