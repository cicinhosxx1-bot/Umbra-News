
import React from 'react';
import { SearchResult, NewsArticle } from '../types';
import { ArticleCard } from './ArticleCard';
import { Search, ExternalLink, Globe, ShieldCheck, Info } from 'lucide-react';

interface SearchViewProps {
  query: string;
  results: SearchResult | null;
  isLoading: boolean;
  onSelectArticle: (article: NewsArticle) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ query, results, isLoading, onSelectArticle }) => {
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center animate-pulse">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8 text-indigo-400 animate-bounce" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Escaneando a Web...</h2>
        <p className="text-slate-500">Buscando fontes e analisando narrativas para "{query}"</p>
      </div>
    );
  }

  if (!results || results.articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search className="w-8 h-8 text-slate-300" />
        </div>
        <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">Nenhum resultado para "{query}"</h2>
        <p className="text-slate-500">Tente termos mais genéricos ou verifique a ortografia.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Main Results Column */}
        <div className="flex-grow">
          <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-serif font-bold text-slate-900">
              Resultados para <span className="text-indigo-600">"{query}"</span>
            </h2>
            <span className="text-sm font-medium text-slate-400">
              {results.articles.length} análises geradas
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {results.articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onClick={onSelectArticle}
              />
            ))}
          </div>
        </div>

        {/* Sidebar Grounding Sources */}
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="bg-indigo-900 text-white rounded-3xl p-6 shadow-xl shadow-indigo-200">
            <div className="flex items-center gap-2 mb-6">
              <Globe className="w-5 h-5 text-indigo-300" />
              <h3 className="font-bold">Fontes Web (Grounding)</h3>
            </div>

            <p className="text-xs text-indigo-200 leading-relaxed mb-6 italic">
              "Para garantir a precisão, a Umbra cruzou dados das seguintes fontes originais via Google Search."
            </p>

            <div className="space-y-4">
              {results.groundingSources.map((source, idx) => (
                <a
                  key={idx}
                  href={source.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 group"
                >
                  <div className="flex items-start justify-between">
                    <span className="text-sm font-bold line-clamp-2 pr-4">{source.title}</span>
                    <ExternalLink className="w-4 h-4 text-indigo-300 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="mt-2 text-[10px] text-indigo-400 font-mono truncate">
                    {source.uri}
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2 text-indigo-300 mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-xs font-bold uppercase tracking-widest">IA Verificada</span>
              </div>
              <p className="text-[10px] text-indigo-400">
                Os links acima são as bases de dados usadas para construir as análises de viés apresentadas.
              </p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
            <Info className="w-5 h-5 text-amber-500 flex-shrink-0" />
            <p className="text-xs text-amber-700 leading-relaxed">
              As perspectivas geradas pela IA são sínteses das narrativas encontradas nestas fontes. Sempre verifique o conteúdo original para contexto pleno.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
