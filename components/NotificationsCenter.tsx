
import React from 'react';
import { AppNotification, NotificationType } from '../types';
import { 
  Bell, ShieldCheck, Zap, RefreshCw, 
  MessageSquare, Check, Trash2, X,
  ExternalLink
} from 'lucide-react';

interface NotificationsCenterProps {
  notifications: AppNotification[];
  onMarkRead: (id: string) => void;
  onMarkAllRead: () => void;
  onSelectNotification: (articleId: string) => void;
  onClose: () => void;
}

export const NotificationsCenter: React.FC<NotificationsCenterProps> = ({ 
  notifications, 
  onMarkRead, 
  onMarkAllRead, 
  onSelectNotification,
  onClose 
}) => {
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'FactCheckUpdate': return <ShieldCheck className="w-5 h-5 text-emerald-500" />;
      case 'Breaking': return <Zap className="w-5 h-5 text-amber-500" />;
      case 'NarrativeShift': return <RefreshCw className="w-5 h-5 text-indigo-500" />;
      case 'Community': return <MessageSquare className="w-5 h-5 text-slate-500" />;
      default: return <Bell className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="absolute top-full right-0 mt-4 w-96 bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-4 duration-300">
      <div className="p-5 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Bell className="w-4 h-4 text-indigo-600" />
          Notificações
        </h3>
        <div className="flex items-center gap-2">
          <button 
            onClick={onMarkAllRead}
            className="text-[10px] font-bold text-indigo-600 hover:text-indigo-700 uppercase tracking-wider px-2 py-1 hover:bg-indigo-50 rounded-lg transition-all"
          >
            Lidas
          </button>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-200 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>
        </div>
      </div>

      <div className="max-h-[450px] overflow-y-auto">
        {notifications.length > 0 ? (
          <div className="divide-y divide-slate-50">
            {notifications.map((notif) => (
              <div 
                key={notif.id}
                className={`p-5 transition-all cursor-pointer group hover:bg-slate-50 relative ${!notif.isRead ? 'bg-indigo-50/30' : ''}`}
                onClick={() => notif.articleId && onSelectNotification(notif.articleId)}
              >
                {!notif.isRead && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />
                )}
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                    !notif.isRead ? 'bg-white' : 'bg-slate-100'
                  }`}>
                    {getIcon(notif.type)}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${
                        notif.type === 'Breaking' ? 'text-amber-600' : 'text-slate-400'
                      }`}>
                        {notif.type}
                      </span>
                      <span className="text-[10px] text-slate-400 font-medium">{notif.timestamp}</span>
                    </div>
                    <h4 className={`text-sm font-bold mb-1 leading-tight group-hover:text-indigo-600 transition-colors ${
                      !notif.isRead ? 'text-slate-900' : 'text-slate-500'
                    }`}>
                      {notif.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed mb-3">
                      {notif.message}
                    </p>
                    {notif.articleId && (
                      <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 bg-indigo-50 w-fit px-2 py-1 rounded-md">
                        Ver Artigo <ExternalLink className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                     {!notif.isRead && (
                       <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onMarkRead(notif.id);
                        }}
                        className="p-1.5 bg-indigo-100 text-indigo-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all opacity-0 group-hover:opacity-100"
                        title="Marcar como lida"
                       >
                         <Check className="w-3.5 h-3.5" />
                       </button>
                     )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-100">
              <Bell className="w-6 h-6 text-slate-200" />
            </div>
            <p className="text-slate-400 text-sm font-medium">Tudo em dia!</p>
            <p className="text-slate-300 text-xs mt-1">Nenhuma nova notificação no momento.</p>
          </div>
        )}
      </div>
      
      <div className="p-4 bg-slate-50/50 border-t border-slate-50 text-center">
        <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
          Ver todas as atividades
        </button>
      </div>
    </div>
  );
};
