
export type BiasLevel = 'Left' | 'Center-Left' | 'Center' | 'Center-Right' | 'Right';

export type NewsTopic = 'Economia' | 'Política' | 'Tecnologia' | 'Concursos e Emprego' | 'Educação' | 'Ciência e Saúde' | 'Natureza' | 'Cultura' | 'Cinema' | 'Música' | 'Bem Estar' | 'Turismo e Viagem';

export interface NewsPerspective {
  source: string;
  bias: BiasLevel;
  headline: string;
  summary: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  author: string;
  source: string;
  publishedAt: string;
  imageUrl: string;
  content: string;
  aiSummary: string;
  analysis: {
    bias: BiasLevel;
    biasScore: number; // -1 to 1
    credibility: number; // 0 to 5
    sentiment: 'Positive' | 'Neutral' | 'Negative';
    factChecked: boolean;
    factCheckDetails?: string;
  };
  perspectives: NewsPerspective[];
  groundingSources?: { title: string; uri: string }[];
}

export interface AdminPost {
  id: string;
  adminName: string;
  adminRole: string;
  content: string;
  imageUrl?: string;
  timestamp: string;
  likes: number;
  officialSourceUrl: string;
  topic: string;
}

export interface NewsFeedFilter {
  category: NewsTopic | 'For You';
}

export interface UserProfile {
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  subscription: 'Free' | 'Pro' | 'Premium';
  readingInsights: {
    biasDistribution: Record<BiasLevel, number>; // Porcentagem
    articlesRead: number;
    factChecksVerified: number;
  };
  interests: string[];
  savedArticleIds: string[];
}

export type NotificationType = 'Breaking' | 'FactCheckUpdate' | 'NarrativeShift' | 'Community';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  articleId?: string;
}

export interface SearchResult {
  articles: NewsArticle[];
  groundingSources: { title: string; uri: string }[];
}
