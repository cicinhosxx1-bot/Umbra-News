
import { NewsArticle, UserProfile, AppNotification, AdminPost } from './types';

export const MOCK_USER: UserProfile = {
  name: 'Alex Rivera',
  username: 'alex_umbra',
  email: 'alex.rivera@example.com',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
  bio: 'Entusiasta de tecnologia e política internacional. Buscando sempre o equilíbrio nas narrativas.',
  subscription: 'Pro',
  readingInsights: {
    biasDistribution: {
      'Left': 15,
      'Center-Left': 25,
      'Center': 40,
      'Center-Right': 15,
      'Right': 5
    },
    articlesRead: 142,
    factChecksVerified: 89
  },
  interests: ['Tecnologia', 'Economia Global', 'Mudanças Climáticas', 'Política'],
  savedArticleIds: ['1']
};

export const MOCK_ADMIN_POSTS: AdminPost[] = [
  {
    id: 'ap1',
    adminName: 'Equipe Umbra News',
    adminRole: 'Curadoria Oficial',
    content: '⚠️ Fato Verificado: Os dados do IBGE confirmam que a inflação de alimentos caiu 0,5% no último mês, contrariando narrativas alarmistas que circulam em redes sociais. Nossa equipe cruzou os dados brutos com analistas independentes.',
    timestamp: '1h atrás',
    likes: 1240,
    officialSourceUrl: 'https://www.ibge.gov.br',
    topic: 'Brasil'
  },
  {
    id: 'ap2',
    adminName: 'Sarah Jenkins',
    adminRole: 'Chefe de Fact-Checking',
    content: 'Sobre o rumor da nova IA da OpenAI: Não há evidências de que o modelo "Strawberry" será lançado esta semana. O post viral que originou isso veio de uma conta paródia. Fiquem atentos às fontes oficiais.',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
    timestamp: '3h atrás',
    likes: 856,
    officialSourceUrl: 'https://openai.com/news',
    topic: 'Tecnologia'
  }
];

export const MOCK_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'n1',
    type: 'FactCheckUpdate',
    title: 'Atualização de Verificação',
    message: 'Um artigo que você salvou sobre "Urban Housing" acaba de ser verificado por 3 novas fontes.',
    timestamp: '5m ago',
    isRead: false,
    articleId: '2'
  },
  {
    id: 'n2',
    type: 'Breaking',
    title: 'BREAKING NEWS',
    message: 'Novas sanções econômicas foram anunciadas afetando mercados emergentes.',
    timestamp: '15m ago',
    isRead: false,
    articleId: '1'
  }
];

export const MOCK_ARTICLES: NewsArticle[] = [
  {
    id: '1',
    title: 'Global Economic Shift: Emerging Markets Outpace Established Powerhouses',
    author: 'Elena Vance',
    source: 'Financial Observer',
    publishedAt: '2h ago',
    imageUrl: 'https://picsum.photos/800/400?random=1',
    content: 'A major transition is occurring in global finance...',
    aiSummary: 'A major transition is occurring in global finance as developing nations report record-breaking GDP growth...',
    analysis: {
      bias: 'Center',
      biasScore: 0,
      credibility: 4.8,
      sentiment: 'Neutral',
      factChecked: true,
      factCheckDetails: 'Verified by World Bank and IMF.'
    },
    perspectives: [
      {
        source: 'Progressive Pulse',
        bias: 'Left',
        headline: 'Developing Nations Finally Reclaiming Economic Sovereignty',
        summary: 'Decades of colonial economic structures are finally being dismantled.'
      }
    ]
  }
];
