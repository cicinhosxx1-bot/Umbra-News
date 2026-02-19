import React from 'react';
import { Newspaper, Instagram, Twitter, Github } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-white border-t border-slate-200 pt-12 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-100">
                                <Newspaper className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-serif font-bold text-slate-900">
                                Umbra <span className="text-indigo-600">News</span>
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm max-w-xs">
                            A verdade levada a sério. Curadoria inteligente de notícias para manter você sempre bem informado.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Plataforma</h3>
                        <ul className="space-y-2 text-sm text-slate-600">
                            <li><button className="hover:text-indigo-600 transition-colors">Sobre Nós</button></li>
                            <li><button className="hover:text-indigo-600 transition-colors">Termos de Uso</button></li>
                            <li><button className="hover:text-indigo-600 transition-colors">Privacidade</button></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4">Siga-nos</h3>
                        <div className="flex gap-4">
                            <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                                <Twitter className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                                <Instagram className="w-5 h-5" />
                            </button>
                            <button className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-indigo-50 hover:text-indigo-600 transition-all">
                                <Github className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-xs">
                        © {new Date().getFullYear()} Umbra News. Todos os direitos reservados.
                    </p>
                    <div className="flex items-center gap-1 text-slate-400 text-xs">
                        Feito com <span className="text-red-400 text-lg">♥</span> para o Brasil
                    </div>
                </div>
            </div>
        </footer>
    );
};
