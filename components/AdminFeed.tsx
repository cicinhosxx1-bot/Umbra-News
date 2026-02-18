
import React from 'react';
import { AdminPost } from '../types';
import { ShieldCheck, Heart, ExternalLink, MessageCircle, Share2, BadgeCheck } from 'lucide-react';

interface AdminFeedProps {
  posts: AdminPost[];
}

export const AdminFeed: React.FC<AdminFeedProps> = ({ posts }) => {
  return (
    <section className="mt-20 mb-10">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-indigo-600 rounded-lg">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-serif font-bold text-slate-900">Mural da Verdade</h2>
          <p className="text-sm text-slate-500 font-medium">Postagens oficiais verificadas pela nossa curadoria</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all flex flex-col">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center border-2 border-indigo-50">
                    <ShieldCheck className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-slate-900 text-sm">{post.adminName}</span>
                      <BadgeCheck className="w-4 h-4 text-blue-500 fill-blue-500 text-white" />
                    </div>
                    <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{post.adminRole}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium">{post.timestamp}</span>
              </div>

              <div className="mb-4">
                <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold uppercase mb-2">
                  #{post.topic}
                </span>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {post.content}
                </p>
              </div>

              {post.imageUrl && (
                <div className="rounded-2xl overflow-hidden mb-4 aspect-video">
                  <img src={post.imageUrl} className="w-full h-full object-cover" alt="Post content" />
                </div>
              )}
            </div>

            <div className="mt-auto px-6 py-4 bg-slate-50/50 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
                  <span className="text-xs font-bold">{post.likes.toLocaleString()}</span>
                </button>
                <button className="flex items-center gap-1.5 text-slate-500 hover:text-indigo-600 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-xs font-bold">Comentar</span>
                </button>
              </div>

              <a
                href={post.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all text-xs font-bold shadow-sm"
              >
                Fonte Oficial <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gradient-to-r from-indigo-900 to-slate-900 rounded-3xl text-center text-white relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform">
          <ShieldCheck className="w-24 h-24" />
        </div>
        <h3 className="text-xl font-bold mb-2">Quer denunciar uma Fake News?</h3>
        <p className="text-indigo-200 text-sm mb-4 max-w-md mx-auto">Nossa equipe de administradores analisa denúncias da comunidade em tempo real.</p>
        <button className="px-6 py-2 bg-white text-indigo-900 rounded-full font-bold text-sm hover:bg-indigo-50 transition-all">
          Enviar para Análise
        </button>
      </div>
    </section>
  );
};
