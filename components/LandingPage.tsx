
import React from 'react';
import { ShieldCheck, Heart, Phone, ArrowRight, CheckCircle, Newspaper, Users, Star, AlertTriangle, ShieldAlert } from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const CHECKOUT_URL = "https://pay.cakto.com.br/jvc9om2_773711";

export const LandingPage: React.FC<LandingPageProps> = ({ onGetStarted }) => {
  const handleBuyNow = () => {
    window.open(CHECKOUT_URL, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100">
      {/* Top Bar / Brand */}
      <nav className="p-6 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Newspaper className="text-white w-7 h-7" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-slate-900">
            Umbra <span className="text-indigo-600">News</span>
          </h1>
        </div>
        <button 
          onClick={onGetStarted}
          className="bg-white border-2 border-indigo-600 text-indigo-600 font-bold px-6 py-2 rounded-xl hover:bg-indigo-50 transition-all shadow-sm"
        >
          Entrar na minha conta
        </button>
      </nav>

      {/* Hero Section */}
      <header className="px-6 py-12 md:py-20 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-red-50 text-red-700 rounded-full text-sm font-black mb-8 border border-red-100 uppercase tracking-widest animate-pulse">
          <ShieldAlert className="w-5 h-5" />
          Cuidado com as mentiras da internet!
        </div>
        
        <h2 className="text-4xl md:text-7xl font-serif font-black text-slate-900 leading-[1.1] mb-8">
          Pare de acreditar em <span className="text-red-600">Fake News</span> nas redes sociais. <br/>
          <span className="text-indigo-600">Veja a notícia verdadeira aqui.</span>
        </h2>
        
        <p className="text-xl md:text-2xl text-slate-600 mb-12 leading-relaxed max-w-4xl mx-auto font-medium">
          Você recebe vídeos e mensagens que parecem estranhas? Não seja mais enganado. O Umbra News usa tecnologia de ponta para separar o que é verdade do que é mentira, entregando a você apenas o que é real.
        </p>
        
        <div className="flex flex-col items-center gap-6 justify-center">
          <button 
            onClick={handleBuyNow}
            className="px-12 py-6 bg-indigo-600 text-white rounded-[2rem] text-2xl font-black shadow-2xl shadow-indigo-300 hover:bg-indigo-700 hover:scale-105 transition-all flex items-center justify-center gap-4 group"
          >
            QUERO ACESSAR AGORA <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
          </button>
          
          <div className="flex items-center gap-3 text-slate-500 font-bold text-lg">
            <span className="line-through text-slate-300">De R$ 49,90</span>
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg">Por apenas R$ 19,90/mês</span>
          </div>
        </div>
      </header>

      {/* Trust Section */}
      <section className="bg-indigo-900 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">Por que o Umbra News é ideal para você?</h3>
          <p className="text-indigo-200 text-xl max-w-2xl mx-auto font-medium">Investimos na sua paz de espírito e na segurança da sua família.</p>
        </div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 space-y-6 text-white hover:bg-white/20 transition-all">
            <div className="w-20 h-20 bg-emerald-500 text-white rounded-3xl flex items-center justify-center shadow-lg">
              <ShieldCheck className="w-12 h-12" />
            </div>
            <h4 className="text-2xl font-bold">Fatos, Não Boatos</h4>
            <p className="text-lg text-indigo-100 leading-relaxed opacity-80">
              Nós verificamos cada vírgula. Se está no Umbra, você pode confiar. Chega de repassar notícias falsas sem querer.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 space-y-6 text-white hover:bg-white/20 transition-all">
            <div className="w-20 h-20 bg-amber-500 text-white rounded-3xl flex items-center justify-center shadow-lg">
              <AlertTriangle className="w-12 h-12" />
            </div>
            <h4 className="text-2xl font-bold">Alerta de Golpe</h4>
            <p className="text-lg text-indigo-100 leading-relaxed opacity-80">
              Avisamos você imediatamente sobre golpes que estão circulando no WhatsApp contra aposentados e pensionistas.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md p-10 rounded-[2.5rem] border border-white/10 space-y-6 text-white hover:bg-white/20 transition-all">
            <div className="w-20 h-20 bg-indigo-500 text-white rounded-3xl flex items-center justify-center shadow-lg">
              <Star className="w-12 h-12" />
            </div>
            <h4 className="text-2xl font-bold">Leitura Fácil</h4>
            <p className="text-lg text-indigo-100 leading-relaxed opacity-80">
              Letras grandes e nada de propaganda chata. Um jornal limpo, focado no que importa: a sua informação.
            </p>
          </div>
        </div>
      </section>

      {/* Paid WhatsApp Section */}
      <section className="py-24 px-6 max-w-6xl mx-auto">
        <div className="bg-white rounded-[3.5rem] p-8 md:p-20 text-slate-900 flex flex-col md:flex-row items-center gap-16 shadow-2xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full -mr-32 -mt-32 opacity-50"></div>
          
          <div className="flex-grow space-y-8 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-black border border-emerald-100 uppercase">
              Benefício VIP do Assinante
            </div>
            <h3 className="text-4xl md:text-6xl font-serif font-black leading-tight text-slate-900">
              Grupo de Proteção <span className="text-emerald-600">no WhatsApp</span>
            </h3>
            <p className="text-xl md:text-2xl text-slate-600 leading-relaxed font-medium">
              Assine agora e tenha acesso ao nosso <span className="font-bold text-slate-900 italic">Grupo Exclusivo de Verificação</span>. Recebeu algo suspeito? Mande no grupo e nossos administradores verificam para você na hora.
            </p>
            <div className="flex flex-col gap-4">
              <button 
                onClick={handleBuyNow}
                className="inline-flex items-center justify-center gap-4 px-10 py-6 bg-emerald-600 text-white rounded-3xl font-black text-xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100"
              >
                <Phone className="w-7 h-7 fill-emerald-100" /> Assinar Acesso VIP + WhatsApp
              </button>
              <p className="text-slate-400 text-sm font-bold text-center md:text-left">
                * Acesso ao grupo incluso na assinatura de R$ 19,90/mês.
              </p>
            </div>
          </div>
          
          <div className="w-full md:w-2/5 flex flex-col gap-6 relative z-10">
             <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-200 shadow-inner">
                <h5 className="font-black text-slate-900 mb-6 text-xl">O que você ganha por 19,90:</h5>
                <ul className="space-y-5">
                  {[
                    "Notícias 100% Verdadeiras",
                    "Analise de Viés (Esquerda/Direita)",
                    "Alerta de Golpes Regionais",
                    "Grupo VIP de Verificação",
                    "Sem Propagandas Enganosas"
                  ].map(item => (
                    <li key={item} className="flex items-center gap-4 text-lg font-bold text-slate-700">
                      <CheckCircle className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-slate-100 text-center px-6">
        <h4 className="text-3xl md:text-5xl font-serif font-black mb-8">Sua verdade vale R$ 0,66 por dia?</h4>
        <p className="text-xl text-slate-500 mb-10 max-w-2xl mx-auto font-medium">
          Assine hoje e proteja sua mente e sua carteira contra as mentiras das redes sociais.
        </p>
        <button 
          onClick={handleBuyNow}
          className="px-12 py-6 bg-indigo-600 text-white rounded-3xl text-2xl font-black shadow-xl hover:bg-indigo-700 transition-all"
        >
          QUERO COMEÇAR AGORA
        </button>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-slate-400 border-t border-slate-200 bg-white">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
            < Newspaper className="text-indigo-600 w-5 h-5" />
          </div>
          <span className="font-serif font-bold text-slate-900">Umbra News</span>
        </div>
        <p className="mb-2 font-medium">© 2024 Umbra News - Jornalismo de Verdade para quem tem Sabedoria</p>
        <p className="text-xs">A segurança dos seus dados é nossa prioridade absoluta.</p>
      </footer>
    </div>
  );
};
