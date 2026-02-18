
import React, { useState, useEffect } from 'react';
import { NewsArticle, AppNotification, SearchResult, NewsTopic, AdminPost } from '../types';
import { MOCK_ARTICLES, MOCK_NOTIFICATIONS } from '../constants';
import { generateNewsFeed, performSearch } from '../services/newsService';
import { supabase } from '../lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { ArticleCard } from '../components/ArticleCard';
import { ArticleDetail } from '../components/ArticleDetail';
import { UserProfile } from '../components/UserProfile';
import { NotificationsCenter } from '../components/NotificationsCenter';
import { SearchView } from '../components/SearchView';
import { AdminFeed } from '../components/AdminFeed';
import { LandingPage } from '../components/LandingPage';
import { AuthPage } from '../components/AuthPage';
import {
  Bell, Search, Newspaper, RefreshCw, Loader2,
  Sparkles, Home, ArrowLeft, X, Globe,
  Briefcase, Monitor, Music, Trophy, FlaskConical, HeartPulse, MapPin, User as UserIcon
} from 'lucide-react';

const TOPICS: { id: NewsTopic; label: string; icon: React.ReactNode }[] = [
  { id: 'Trending', label: 'Manchetes', icon: <Sparkles className="w-4 h-4" /> },
  { id: 'Mundo', label: 'Mundo', icon: <Globe className="w-4 h-4" /> },
  { id: 'Brasil', label: 'Brasil', icon: <MapPin className="w-4 h-4" /> },
  { id: 'Negócios', label: 'Negócios', icon: <Briefcase className="w-4 h-4" /> },
  { id: 'Tecnologia', label: 'Tech', icon: <Monitor className="w-4 h-4" /> },
  { id: 'Entretenimento', label: 'Cultura', icon: <Music className="w-4 h-4" /> },
  { id: 'Esportes', label: 'Esportes', icon: <Trophy className="w-4 h-4" /> },
  { id: 'Ciência', label: 'Ciência', icon: <FlaskConical className="w-4 h-4" /> },
  { id: 'Saúde', label: 'Saúde', icon: <HeartPulse className="w-4 h-4" /> },
];

type AppView = 'landing' | 'auth' | 'app';

const App: React.FC = () => {
  // Navigation State
  const [view, setView] = useState<AppView>('landing');
  const [currentPage, setCurrentPage] = useState<'feed' | 'profile' | 'search'>('feed');
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true); // true until session check completes

  // Data State
  const [articles, setArticles] = useState<NewsArticle[]>(MOCK_ARTICLES);
  const [selectedTopic, setSelectedTopic] = useState<NewsTopic>('Trending');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>(MOCK_NOTIFICATIONS);
  const [adminPosts, setAdminPosts] = useState<AdminPost[]>([]);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);

  const fetchAdminPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setAdminPosts(data.map(post => ({
          id: post.id,
          adminName: post.admin_name,
          adminRole: post.admin_role,
          content: post.content,
          imageUrl: post.image_url,
          timestamp: new Date(post.created_at).toLocaleDateString('pt-BR', {
            day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit'
          }),
          likes: post.likes || 0,
          officialSourceUrl: post.official_source_url,
          topic: post.topic
        })));
      }
    } catch (err) {
      console.error("Failed to fetch admin posts:", err);
    }
  };

  const fetchNews = async (topic: NewsTopic = selectedTopic) => {
    setIsLoading(true);
    setError(null);
    try {
      const freshArticles = await generateNewsFeed(topic);
      setArticles(freshArticles);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.warn("Failed to fetch from Gemini, using fallback mock data.", err);
      setError("Falha na geração via IA. Mostrando artigos locais.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsLoading(false);
    }
  };

  // Detect existing Supabase session on mount
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setAuthUser(session.user);
        setView('app');
      } else {
        setAuthUser(null);
        setView('landing');
      }
      setAuthLoading(false);
    });

    // Fallback: check for existing session on normal page load / refresh
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setAuthUser(session.user);
        setView('app');
      }
      setAuthLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);




  useEffect(() => {
    if (view === 'app') {
      fetchNews();
      fetchAdminPosts();
    }
  }, [selectedTopic, view]);

  const handleSearch = async (e?: React.FormEvent, overrideQuery?: string) => {
    if (e) e.preventDefault();
    const finalQuery = overrideQuery || searchQuery;
    if (!finalQuery.trim()) return;

    setCurrentPage('search');
    setIsSearching(true);
    setIsMobileSearchOpen(false);
    setError(null);

    try {
      const results = await performSearch(finalQuery);
      setSearchResults(results);
    } catch (err) {
      setError("A busca falhou. Tente novamente.");
      console.error(err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleTopicChange = (topic: NewsTopic) => {
    setSelectedTopic(topic);
    setCurrentPage('feed');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAuthUser(null);
    setView('landing');
    setCurrentPage('feed');
  };

  // Render Logic — aguarda sessão ser verificada antes de mostrar qualquer tela
  if (authLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-4">
        <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
          <Newspaper className="text-white w-7 h-7" />
        </div>
        <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
        <p className="text-slate-400 text-sm font-medium">Verificando sessão...</p>
      </div>
    );
  }

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('auth')} />;
  }

  if (view === 'auth') {
    return <AuthPage onLogin={() => setView('app')} onBack={() => setView('landing')} />;
  }

  // Build a user object merging Supabase auth data with defaults
  const currentUser = authUser ? {
    name: authUser.user_metadata?.full_name || authUser.email?.split('@')[0] || 'Leitor',
    username: authUser.email?.split('@')[0] || 'leitor',
    email: authUser.email || '',
    avatar: authUser.user_metadata?.avatar_url || `https://api.dicebear.com/8.x/avataaars/svg?seed=${authUser.id}`,
    bio: 'Leitor do Umbra News.',
    subscription: 'Free' as const,
    readingInsights: {
      biasDistribution: { 'Left': 20, 'Center-Left': 30, 'Center': 25, 'Center-Right': 15, 'Right': 10 },
      articlesRead: 0,
      factChecksVerified: 0,
    },
    interests: [],
    savedArticleIds: [],
  } : null;

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);
  const savedArticles = articles.filter(a => currentUser?.savedArticleIds.includes(a.id));
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const handleMarkRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const handleSelectNotification = (articleId: string) => {
    const article = articles.find(a => a.id === articleId) || searchResults?.articles.find(a => a.id === articleId);
    if (article) {
      setSelectedArticle(article);
      setShowNotifications(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => {
                setCurrentPage('feed');
                setSelectedTopic('Trending');
                setShowNotifications(false);
                setSearchQuery('');
              }}
            >
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:rotate-12 transition-all">
                <Newspaper className="text-white w-6 h-6" />
              </div>
              <h1 className="text-2xl font-serif font-bold tracking-tight text-slate-900 hidden sm:block">
                Umbra <span className="text-indigo-600">News</span>
              </h1>
            </div>

            <div className="flex items-center gap-2 md:gap-6">
              <form onSubmit={(e) => handleSearch(e)} className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Explorar tópicos..."
                  className="bg-slate-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 rounded-full py-2 pl-10 pr-4 text-sm w-72 transition-all outline-none"
                />
              </form>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={`p-2 transition-all rounded-full relative ${showNotifications ? 'bg-indigo-100 text-indigo-600' : 'text-slate-500 hover:bg-slate-100'}`}
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>}
                </button>
                {showNotifications && (
                  <NotificationsCenter
                    notifications={notifications}
                    onMarkRead={handleMarkRead}
                    onMarkAllRead={handleMarkAllRead}
                    onSelectNotification={handleSelectNotification}
                    onClose={() => setShowNotifications(false)}
                  />
                )}

                <button
                  onClick={() => { setCurrentPage('profile'); setShowNotifications(false); }}
                  className={`p-1 border-2 rounded-full transition-all ${currentPage === 'profile' ? 'border-indigo-500' : 'border-transparent hover:border-slate-200'}`}
                >
                  <img src={currentUser?.avatar || `https://api.dicebear.com/8.x/avataaars/svg?seed=umbra`} alt="Profile" className="w-8 h-8 rounded-full" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white border-t border-slate-100 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 py-2">
              {TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => handleTopicChange(topic.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${selectedTopic === topic.id ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  {topic.icon} {topic.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {currentPage === 'feed' && (
          <main className="mt-8 animate-in fade-in duration-700">
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
              <div className="flex flex-col">
                <h2 className="text-3xl font-serif font-bold text-slate-900">{TOPICS.find(t => t.id === selectedTopic)?.label}</h2>
                <p className="text-sm text-slate-500 mt-1">IA curando fatos reais via Google News Grounding</p>
              </div>
              <button onClick={() => fetchNews()} disabled={isLoading} className="p-2 bg-white border border-slate-200 rounded-xl text-slate-700 hover:text-indigo-600 disabled:opacity-50 transition-all">
                <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
              </button>
            </div>

            {isLoading && articles.length === 0 ? (
              <div className="h-96 w-full flex flex-col items-center justify-center gap-4 bg-white rounded-3xl border border-dashed border-slate-200 animate-pulse">
                <Loader2 className="w-6 h-6 text-indigo-600 animate-spin" />
                <p className="text-slate-400 font-bold text-sm">Escaneando o espectro de notícias...</p>
              </div>
            ) : (
              <>
                {selectedTopic === 'Trending' && featuredArticle && <ArticleCard article={featuredArticle} onClick={setSelectedArticle} featured />}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {(selectedTopic === 'Trending' ? otherArticles : articles).map((article) => (
                    <ArticleCard key={article.id} article={article} onClick={setSelectedArticle} />
                  ))}
                </div>

                {/* ADMIN FEED SECTION - Mural da Verdade */}
                {selectedTopic === 'Trending' && <AdminFeed posts={adminPosts} />}
              </>
            )}
          </main>
        )}

        {currentPage === 'profile' && currentUser && (
          <UserProfile
            user={currentUser}
            savedArticles={savedArticles}
            onSelectArticle={setSelectedArticle}
            onLogout={handleLogout}
          />
        )}
        {currentPage === 'search' && (
          <div className="mt-8">
            <button onClick={() => { setCurrentPage('feed'); setSearchQuery(''); }} className="flex items-center gap-2 text-slate-500 font-bold text-sm mb-6"><ArrowLeft className="w-4 h-4" /> Voltar</button>
            <SearchView query={searchQuery} isLoading={isSearching} results={searchResults} onSelectArticle={setSelectedArticle} />
          </div>
        )}
      </div>

      {selectedArticle && <ArticleDetail article={selectedArticle} onClose={() => setSelectedArticle(null)} />}

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 p-4 md:hidden flex justify-around z-50">
        <button onClick={() => { setCurrentPage('feed'); setSelectedTopic('Trending'); }} className={`p-2 ${currentPage === 'feed' ? 'text-indigo-600' : 'text-slate-400'}`}><Home className="w-6 h-6" /></button>
        <button onClick={() => setIsMobileSearchOpen(true)} className="p-2 text-slate-400"><Search className="w-6 h-6" /></button>
        <button onClick={() => { setCurrentPage('profile'); }} className={`p-2 ${currentPage === 'profile' ? 'text-indigo-600' : 'text-slate-400'}`}><UserIcon className="w-6 h-6" /></button>
      </div>

      {/* Mobile Search Overlay */}
      {isMobileSearchOpen && (
        <div className="fixed inset-0 bg-white z-[60] p-6 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-serif font-bold text-slate-900">Busca Inteligente</h2>
            <button onClick={() => setIsMobileSearchOpen(false)} className="p-2 bg-slate-100 rounded-full"><X className="w-6 h-6 text-slate-500" /></button>
          </div>
          <form onSubmit={(e) => handleSearch(e)} className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você quer verificar hoje?"
              className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-lg outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
            />
          </form>
          <div className="mt-10">
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Dúvidas Frequentes</h4>
            <div className="flex flex-wrap gap-2">
              {['Aposentadoria 2024', 'Preço da Cesta Básica', 'Vacinação Idosos', 'Novas Leis'].map(q => (
                <button
                  key={q}
                  onClick={() => { setSearchQuery(q); handleSearch(undefined, q); }}
                  className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium text-slate-600"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
