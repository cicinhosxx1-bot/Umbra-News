
import React, { useState } from 'react';
import { NewsArticle } from '../types';
import { BiasIndicator } from './BiasIndicator';
import {
  X, CheckCircle2, ShieldCheck, TrendingUp, User,
  Calendar, ExternalLink, Quote, Info, ChevronDown,
  ChevronUp, MessageSquare, Heart, CornerDownRight,
  Smile, ShieldAlert, RefreshCw, Globe
} from 'lucide-react';

interface ArticleDetailProps {
  article: NewsArticle;
  onClose: () => void;
}

export const ArticleDetail: React.FC<ArticleDetailProps> = ({ article, onClose }) => {
  const [showFullText, setShowFullText] = useState(false);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md p-4 md:p-10 flex justify-center items-start animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl relative overflow-hidden flex flex-col my-auto animate-in zoom-in-95 duration-300">

        {/* Header/Banner */}
        <div className="h-64 md:h-80 relative flex-shrink-0">
          <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/10 to-transparent"></div>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md z-20"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Wrapper */}
        <div className="px-6 md:px-12 pb-12 -mt-20 relative z-10">
          {/* Main Title Card */}
          <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-slate-100 mb-8">
            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
              <span className="flex items-center gap-1.5 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full font-bold">
                {article.source}
              </span>
              <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> {article.author}</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {article.publishedAt}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900 leading-tight mb-8">
              {article.title}
            </h1>

            {/* Umbra Analysis Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-indigo-500" />
                  Political Bias
                </div>
                <BiasIndicator score={article.analysis.biasScore} />
                <div className="text-sm font-semibold text-slate-700 text-center">
                  {article.analysis.bias}
                </div>
              </div>

              <div className="space-y-3 border-y md:border-y-0 md:border-x border-slate-200 px-0 md:px-6 py-4 md:py-0">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  Credibility Score
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-slate-900">{article.analysis.credibility}</span>
                  <span className="text-slate-400 font-medium">/ 5.0</span>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 w-full rounded-full ${i < Math.floor(article.analysis.credibility) ? 'bg-emerald-500' : 'bg-slate-200'}`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider">
                  <ShieldAlert className="w-4 h-4 text-blue-500" />
                  Sentiment & Verification
                </div>
                <div className="flex flex-col gap-2">
                  <div className={`inline-flex items-center justify-center gap-2 px-3 py-1 rounded-lg text-xs font-bold border ${article.analysis.factChecked ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-amber-50 border-amber-200 text-amber-700'
                    }`}>
                    {article.analysis.factChecked ? '✓ FACT-CHECKED' : 'UNDER REVIEW'}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-600 px-3 py-1 bg-white rounded-lg border border-slate-100">
                    <Smile className="w-3.5 h-3.5 text-slate-400" />
                    Sentiment: <span className="font-bold">{article.analysis.sentiment}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Summary */}
            <div className="relative mb-8">
              <div className="absolute -left-4 top-0 bottom-0 w-1 bg-indigo-500 rounded-full"></div>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs uppercase tracking-widest mb-3">
                <Quote className="w-4 h-4" />
                30s AI Summary
              </div>
              <p className="text-xl text-slate-700 leading-relaxed font-medium italic">
                "{article.aiSummary}"
              </p>
            </div>

            {/* Collapsible Content */}
            <div className="border-t border-slate-50 pt-6">
              <button
                onClick={() => setShowFullText(!showFullText)}
                className="flex items-center justify-center w-full gap-2 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-600 font-bold text-sm transition-all"
              >
                {showFullText ? (
                  <>Hide Full Text <ChevronUp className="w-4 h-4" /></>
                ) : (
                  <>Ver Texto Completo <ChevronDown className="w-4 h-4" /></>
                )}
              </button>

              {showFullText && (
                <div className="prose prose-slate max-w-none mt-8 animate-in slide-in-from-top-4 duration-300">
                  <p className="text-slate-600 leading-loose text-lg whitespace-pre-wrap">
                    {article.content || "The full journalistic report explores the nuances of this development, citing primary data sources and expert interviews to provide a comprehensive view of the situation..."}
                  </p>
                  <div className="mt-8 flex justify-center">
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-full font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all"
                    >
                      Read original at {article.source} <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Grounding Sources Section - Mandatory for Google Search tool */}
          {article.groundingSources && article.groundingSources.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 mb-6">
                <Globe className="w-6 h-6 text-indigo-500" />
                Fontes de Pesquisa (Grounding)
              </h2>
              <div className="flex flex-wrap gap-3">
                {article.groundingSources.map((source, idx) => (
                  <a
                    key={idx}
                    href={source.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-indigo-50 border border-slate-200 rounded-xl text-slate-700 hover:text-indigo-600 font-bold text-xs transition-all shadow-sm"
                  >
                    {source.title} <ExternalLink className="w-3 h-3" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Multi-Perspective Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 mb-8">
              <RefreshCw className="w-6 h-6 text-indigo-500" />
              Outras Perspectivas
              <div className="group relative">
                <Info className="w-4 h-4 text-slate-300 cursor-help" />
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-3 bg-slate-900 text-white text-[10px] rounded-xl shadow-xl z-30">
                  Umbra analyzes multiple sources to show how different media outlets frame the same event.
                </div>
              </div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {article.perspectives.map((p, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-lg transition-all border-l-4 border-l-indigo-300">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold px-2 py-1 bg-white rounded-lg border border-slate-100 text-slate-600 shadow-sm">
                      {p.source}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${p.bias.includes('Left') ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                      }`}>
                      {p.bias.toUpperCase()}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 mb-3 leading-tight">
                    {p.headline}
                  </h4>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {p.summary}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Discussion Section */}
          <div className="border-t border-slate-100 pt-10">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3">
                <MessageSquare className="w-6 h-6 text-indigo-500" />
                Discussão (moderada)
              </h2>
              <span className="text-xs font-medium text-slate-400">Civil and moderated community</span>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex-shrink-0"></div>
                <div className="flex-grow">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-slate-900">Eduardo M.</span>
                      <span className="text-[10px] text-slate-400">15m ago</span>
                    </div>
                    <p className="text-slate-600 text-sm">A análise de viés está correta, mas sinto que falta citar o impacto regional específico para o setor de serviços.</p>
                  </div>
                  <div className="flex items-center gap-4 px-2">
                    <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-red-500 transition-colors">
                      <Heart className="w-3.5 h-3.5" /> 12
                    </button>
                    <button className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-indigo-600 transition-colors">
                      <MessageSquare className="w-3.5 h-3.5" /> Responder
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 ml-12">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center">
                  <CornerDownRight className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="flex-grow">
                  <div className="bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100 mb-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-indigo-900">Umbra Bot <span className="bg-indigo-600 text-white px-1.5 py-0.5 rounded text-[8px] ml-1 uppercase">Mod</span></span>
                      <span className="text-[10px] text-indigo-400">10m ago</span>
                    </div>
                    <p className="text-indigo-700 text-sm italic">Ótima observação, Eduardo. Estamos processando dados regionais para atualizar o "Mapa de Narrativas" na Fase 3 do nosso roadmap.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <textarea
                  placeholder="Adicionar um comentário civilizado..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none h-24"
                />
                <div className="flex justify-end mt-2">
                  <button className="px-6 py-2 bg-slate-900 text-white rounded-full text-sm font-bold hover:bg-slate-800 transition-all">
                    Enviar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
