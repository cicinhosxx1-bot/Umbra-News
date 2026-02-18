
import React from 'react';
import { NewsArticle } from '../types';
import { BiasIndicator } from './BiasIndicator';
import { CheckCircle2, Clock, MessageSquare, Share2 } from 'lucide-react';

interface ArticleCardProps {
  article: NewsArticle;
  onClick: (article: NewsArticle) => void;
  featured?: boolean;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick, featured = false }) => {
  if (featured) {
    return (
      <div
        onClick={() => onClick(article)}
        className="group relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl mb-8"
      >
        <div className="absolute top-4 left-4 z-10">
          <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider animate-pulse">
            🚨 Breaking News
          </span>
        </div>
        <div className="md:flex">
          <div className="md:w-3/5 h-64 md:h-96 relative overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h2 className="text-2xl md:text-4xl font-serif font-bold leading-tight mb-2 group-hover:underline">
                {article.title}
              </h2>
              <div className="flex items-center gap-4 text-sm font-medium opacity-90">
                <span>{article.source}</span>
                <span>•</span>
                <span>{article.publishedAt}</span>
              </div>
            </div>
          </div>
          <div className="md:w-2/5 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <BiasIndicator score={article.analysis.biasScore} label="Political Bias" />
              </div>
              <p className="text-slate-600 line-clamp-4 text-lg leading-relaxed mb-6 italic">
                "{article.aiSummary}"
              </p>
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-semibold text-slate-500">Fact-Checked</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <span className="text-xs">{article.perspectives.length} Perspectives</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onClick(article)}
      className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden cursor-pointer hover:border-slate-300 transition-all flex flex-col h-full"
    >
      <div className="h-40 overflow-hidden relative">
        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute top-2 right-2">
          {article.analysis.factChecked && (
            <div className="bg-white/90 backdrop-blur-sm p-1 rounded-full shadow-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </div>
          )}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center gap-2 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>{article.source}</span>
          <span>•</span>
          <span>{article.publishedAt}</span>
        </div>
        <h3 className="text-lg font-bold text-slate-900 leading-snug mb-2 flex-grow hover:text-indigo-600 transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-4">
          {article.aiSummary}
        </p>
        <div className="mt-auto pt-3 border-t border-slate-50 flex items-center justify-between">
          <div className="w-24">
            <BiasIndicator score={article.analysis.biasScore} />
          </div>
          <div className="flex gap-2">
            <MessageSquare className="w-3 h-3 text-slate-400" />
            <Share2 className="w-3 h-3 text-slate-400" />
          </div>
        </div>
      </div>
    </div>
  );
};
