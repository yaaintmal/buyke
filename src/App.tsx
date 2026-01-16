// Hooks
import useShoppingList from './hooks/useShoppingList';
import useUIState from './hooks/useUIState';
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
    handleDelete,
    handleFactoryReset,
  } = useShoppingList();

  const { filter, setFilter, showSettings, setShowSettings, theme, setTheme } = useUIState();

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
            <Header openCount={items.filter((i) => !i.bought).length} />

            <main>
              <AddItemForm onAdd={handleAdd} adding={adding} />

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
              />

              <Settings
                open={showSettings}
                onClose={() => setShowSettings(false)}
                theme={theme}
                onThemeChange={(t) => setTheme(t)}
                onFactoryReset={handleFactoryReset}
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
