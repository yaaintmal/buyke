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
import ChooseListModal from './components/ChooseListModal';
import { translations } from './i18n';
import type { CreateItemPayload } from './api';
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
import { DEFAULT_LANGUAGE } from './config';
import { Toaster } from 'react-hot-toast';

function App() {
  const [sharedPreviewItems, setSharedPreviewItems] = useState<CreateItemPayload[] | null>(null);
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const token = url.searchParams.get('shared');
      if (token) {
        const parsed = parseSharedPayload(token);
        if (parsed && parsed.length > 0) {
          // schedule setState to avoid synchronous effect update
          setTimeout(() => setSharedPreviewItems(parsed as unknown as CreateItemPayload[]), 0);
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
      const langKey = (localStorage.getItem('language') as 'en' | 'de') ?? DEFAULT_LANGUAGE;
      if (copied) {
        toast.success(translations[langKey].shareSuccess);
      } else {
        // Fallback: show prompt so user can copy manually
        window.prompt(translations[langKey].share, url);
        toast.success(translations[langKey].shareSuccess);
      }
    } catch (e) {
      console.error(e);
      const langKey = (localStorage.getItem('language') as 'en' | 'de') ?? DEFAULT_LANGUAGE;
      toast.error(translations[langKey].shareError);
    }
  };

  const handleCopyListLink = async () => {
    if (!currentListId) return;
    try {
      const url = currentListId;
      const copied = await copyToClipboard(url);
      const langKey = (localStorage.getItem('language') as 'en' | 'de') ?? DEFAULT_LANGUAGE;
      if (copied) {
        toast.success(translations[langKey].copyListSuccess);
      } else {
        // Fallback prompt
        window.prompt(translations[langKey].share, url);
        toast.success(translations[langKey].copyListSuccess);
      }
    } catch (e) {
      console.error(e);
      const langKey = (localStorage.getItem('language') as 'en' | 'de') ?? DEFAULT_LANGUAGE;
      toast.error(translations[langKey].copyListError);
    }
  };

  const handleImport = async (importItems: CreateItemPayload[]) => {
    try {
      for (const it of importItems) {
        await handleAdd({
          name: it.name,
          quantity: it.quantity ?? 1,
          unit: it.unit ?? 'pcs',
          category: it.category ?? 'Other',
        });
      }
      const langKey = (localStorage.getItem('language') as 'en' | 'de') ?? DEFAULT_LANGUAGE;
      toast.success(translations[langKey].importSuccess);
      setSharedPreviewItems(null);
      const url = new URL(window.location.href);
      url.searchParams.delete('shared');
      window.history.replaceState({}, document.title, url.toString());
    } catch (e) {
      console.error(e);
      const langKey = (localStorage.getItem('language') as 'en' | 'de') ?? DEFAULT_LANGUAGE;
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
    currentListId,
    setCurrentListId,
  } = useUIState();

  // show the choose-list modal on every page load until the user dismisses or selects a list this session
  // If we are loading from a URL with list ID, start with modal closed
  const [showChooseModal, setShowChooseModal] = useState(() => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (url.searchParams.get('list')) return false;
    }
    return true;
  });

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
  } = useShoppingList(currentListId ?? undefined);

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
            <Header
              openCount={items.filter((i) => !i.bought).length}
              onShare={handleShare}
              listId={currentListId ?? undefined}
              onCopyList={handleCopyListLink}
            />

            <main>
              <AddItemForm
                onAdd={handleAdd}
                adding={adding}
                extendedFunctions={extendedFunctions}
              />

              <ChooseListModal
                open={showChooseModal}
                onClose={() => setShowChooseModal(false)}
                onListSelected={(id) => {
                  setCurrentListId(id);
                  setShowChooseModal(false);
                }}
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
