
import React from 'react';
import { UserProfile as UserProfileType, NewsArticle, BiasLevel } from '../types';
import {
  Settings, Award, BookOpen, ShieldCheck,
  ChevronRight, LogOut, PieChart, Star,
  Clock, Hash, Edit3, CheckCircle, Sparkles
} from 'lucide-react';

interface UserProfileProps {
  user: UserProfileType;
  savedArticles: NewsArticle[];
  onSelectArticle: (article: NewsArticle) => void;
  onLogout: () => void;
}

const CHECKOUT_URL = "https://pay.cakto.com.br/jvc9om2_773711";

export const UserProfile: React.FC<UserProfileProps> = ({ user, savedArticles, onSelectArticle, onLogout }) => {
  const biasColors: Record<BiasLevel, string> = {
    'Left': 'bg-blue-600',
    'Center-Left': 'bg-blue-400',
    'Center': 'bg-slate-400',
    'Center-Right': 'bg-red-400',
    'Right': 'bg-red-600'
  };

  const handleSubscribe = () => {
    window.open(CHECKOUT_URL, '_blank');
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 flex flex-col md:flex-row items-center gap-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-50 shadow-inner">
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          </div>
          <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-all">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-grow text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
            <h2 className="text-3xl font-serif font-bold text-slate-900">{user.name}</h2>
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider w-fit mx-auto md:mx-0">
              <Award className="w-3 h-3" /> {user.subscription}
            </span>
          </div>
          <p className="text-slate-500 mb-4 font-medium">@{user.username}</p>
          <p className="text-slate-600 leading-relaxed max-w-xl">
            {user.bio}
          </p>
        </div>

        <div className="flex flex-col gap-3 w-full md:w-auto">
          <button className="flex items-center justify-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-all">
            <Settings className="w-4 h-4" /> Configurações
          </button>
          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-2 px-6 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition-all active:bg-slate-100"
          >
            <LogOut className="w-4 h-4" /> Sair
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Stats & Subscription */}
        <div className="lg:col-span-1 space-y-8">

          {/* Premium Subscription Card */}
          <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-3xl p-6 shadow-xl shadow-indigo-200 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
              <Sparkles className="w-24 h-24" />
            </div>

            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-indigo-300" />
              Acesso à Verdade
            </h3>
            <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
              Desbloqueie fatos 100% verificados e ferramentas de combate a fake news.
            </p>

            <div className="mb-6">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold font-serif">R$ 19,90</span>
                <span className="text-indigo-200 text-sm font-medium">/ mês</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Busca com Grounding Real-time',
                'Detecção de Viés por IA',
                'Análises de Fact-Check Ilimitadas',
                'Experiência Sem Anúncios'
              ].map((benefit, i) => (
                <li key={i} className="flex items-center gap-2 text-xs font-medium text-indigo-50">
                  <CheckCircle className="w-3.5 h-3.5 text-indigo-300 flex-shrink-0" />
                  {benefit}
                </li>
              ))}
            </ul>

            <button
              onClick={handleSubscribe}
              className="w-full py-3 bg-white text-indigo-700 rounded-2xl font-bold text-sm hover:bg-indigo-50 transition-all shadow-lg active:scale-95"
            >
              Assinar Agora
            </button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
              <BookOpen className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">{user.readingInsights.articlesRead}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Lidos</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm text-center">
              <ShieldCheck className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-slate-900">{user.readingInsights.factChecksVerified}</div>
              <div className="text-[10px] text-slate-400 font-bold uppercase">Verificados</div>
            </div>
          </div>

          {/* Bias Insights Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-indigo-500" />
              Espectro de Leitura
            </h3>

            <div className="space-y-4">
              {Object.entries(user.readingInsights.biasDistribution).map(([label, value]) => (
                <div key={label} className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-slate-500 uppercase">
                    <span>{label}</span>
                    <span>{value}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${biasColors[label as BiasLevel]} transition-all duration-1000`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-400 italic leading-relaxed">
              * Baseado nos últimos 30 dias de leitura. Você tem consumido narrativas mais equilibradas este mês.
            </p>
          </div>
        </div>

        {/* Right Column: Saved Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden h-full">
            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
                Salvos para Depois
              </h3>
              <span className="text-sm font-medium text-slate-400">{savedArticles.length} artigos</span>
            </div>

            <div className="divide-y divide-slate-50">
              {savedArticles.length > 0 ? (
                savedArticles.map(article => (
                  <div
                    key={article.id}
                    onClick={() => onSelectArticle(article)}
                    className="p-6 hover:bg-slate-50 cursor-pointer transition-colors group"
                  >
                    <div className="flex gap-6">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
                        <img src={article.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="flex-grow">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                          <span>{article.source}</span>
                          <Clock className="w-3 h-3 ml-1" />
                          <span>Salvo há 2 dias</span>
                        </div>
                        <h4 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-indigo-600 transition-colors">
                          {article.title}
                        </h4>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${article.analysis.bias.includes('Left') ? 'bg-blue-100 text-blue-700' :
                            article.analysis.bias.includes('Right') ? 'bg-red-100 text-red-700' :
                              'bg-slate-100 text-slate-700'
                            }`}>
                            {article.analysis.bias.toUpperCase()}
                          </span>
                          {article.analysis.factChecked && (
                            <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600">
                              <ShieldCheck className="w-3 h-3" /> VERIFICADO
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center">
                  <Star className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                  <p className="text-slate-400 font-medium">Você ainda não salvou nenhum artigo.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
