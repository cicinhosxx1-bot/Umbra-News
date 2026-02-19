
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
    topic: 'Economia'
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

export const CATEGORY_SUBJECTS: Record<string, string[]> = {
  'Economia': [
    'Inflação', 'Dólar', 'Juros', 'Desemprego', 'PIB', 'Bolsa de Valores', 'Exportação', 'Importação',
    'Imposto de Renda', 'Privatização', 'Reforma Tributária', 'Salário Mínimo', 'Crédito', 'Endividamento',
    'Tesouro Direto', 'Petróleo', 'Agronegócio', 'Saneamento Básico', 'Energia Elétrica', 'Combustível',
    'Preço dos Alimentos', 'Poupança', 'Investimento', 'Mercado Financeiro', 'Câmbio', 'Receita Federal',
    'Déficit Público', 'Previdência Social', 'Banco Central', 'Indústria Nacional'
  ],
  'Política': [
    'Lula', 'Bolsonaro', 'STF', 'Moraes', 'Congresso Nacional', 'Câmara dos Deputados', 'Senado Federal',
    'Lira', 'Pacheco', 'Eleições', 'PT', 'PL', 'MDB', 'Ministério', 'Reforma Política', 'Impeachment',
    'Veto Presidencial', 'Orçamento Federal', 'Emenda Parlamentar', 'PEC', 'CPI', 'Partidos Políticos',
    'Governadores', 'Prefeitos', 'TSE', 'PGR', 'AGU', 'Decreto Presidencial', 'Medida Provisória', 'Projetos de Lei'
  ],
  'Tecnologia': [
    'Inteligência Artificial', 'ChatGPT', '5G', 'Redes Sociais', 'Cibersegurança', 'Bitcoin', 'Metaverso',
    'Starlink', 'Celular', 'Aplicativos', 'Google', 'Apple', 'Microsoft', 'Samsung', 'TikTok', 'Instagram',
    'YouTube', 'Computação em Nuvem', 'Big Data', 'Hackers', 'Privacidade de Dados', 'LGPD', 'Robótica',
    'Drones', 'Carros Elétricos', 'Energia Solar', 'Startup', 'E-commerce', 'Streaming', 'Deepfake'
  ],
  'Concursos e Emprego': [
    'INSS', 'Polícia Federal', 'Receita Federal', 'Banco do Brasil', 'Caixa Econômica', 'Correios',
    'IBGE', 'Exército', 'Marinha', 'Aeronáutica', 'TRF', 'TRT', 'TCU', 'CGU', 'ANATEL', 'ANVISA',
    'Petrobras', 'Eletrobras', 'Prefeituras', 'Governos Estaduais', 'Carteira de Trabalho', 'CLT',
    'MEI', 'Estágio', 'Aprendiz', 'Empregabilidade', 'Salário', 'Requalificação', 'Home Office', 'Terceirização'
  ],
  'Educação': [
    'ENEM', 'Prouni', 'FIES', 'SISU', 'Vestibular', 'MEC', 'Base Nacional Curricular', 'Alfabetização',
    'EAD', 'Pós-Graduação', 'Universidade', 'Escola Pública', 'Greve de Professores', 'Merenda Escolar',
    'Bullying', 'Cotas Raciais', 'Pibid', 'CAPES', 'Bolsas de Estudo', 'Analfabetismo', 'Educação Infantil',
    'Ensino Médio', 'Ensino Técnico', 'SENAI', 'SENAC', 'Livro Didático', 'Escola Cívico-Militar',
    'Homeschooling', 'IDEB', 'Creches'
  ],
  'Ciência e Saúde': [
    'SUS', 'Covid-19', 'Vacina', 'Dengue', 'Câncer', 'Diabetes', 'Saúde Mental', 'Plano de Saúde',
    'Remédios', 'Anvisa', 'Pesquisa Científica', 'Embrapa', 'Fiocruz', 'Transplante', 'Obesidade',
    'Alzheimer', 'HIV', 'Maternidade', 'Aborto', 'Eutanásia', 'Zika', 'Mpox', 'Antibióticos', 'Genoma',
    'Inteligência Artificial na Medicina', 'UPA', 'Pronto-Socorro', 'Médicos Sem Fronteiras',
    'Cannabis Medicinal', 'Saúde da Mulher'
  ],
  'Natureza': [
    'Amazônia', 'Desmatamento', 'Queimadas', 'Pantanal', 'Enchentes', 'Seca', 'Mudança Climática',
    'COP', 'IBAMA', 'ICMBio', 'Mata Atlântica', 'Cerrado', 'Poluição', 'Reciclagem', 'Energia Renovável',
    'Animais em Extinção', 'Lixo Plástico', 'Carbono', 'Agrotóxico', 'Rio São Francisco', 'Mananciais',
    'Parques Nacionais', 'Esgoto', 'Maré Vermelha', 'Chuvas', 'Deslizamentos', 'Pesca Predatória',
    'Garimpo Ilegal', 'Biodiversidade', 'Mar'
  ],
  'Cultura': [
    'Carnaval', 'Festa Junina', 'Funk', 'Forró', 'Literatura', 'Teatro', 'Museu', 'Patrimônio Histórico',
    'Folclore', 'Lei Rouanet', 'Axé', 'Samba', 'Capoeira', 'Arte de Rua', 'Grafite', 'Gastronomia',
    'Moda', 'Quadrinhos', 'Artesanato', 'Cultura Indígena', 'Quilombola', 'Cordel', 'Bumba-meu-boi',
    'Festival de Cinema', 'Bienal', 'LGBTQIA+', 'Diversidade Cultural', 'Língua Portuguesa',
    'Manifestações Populares', 'Religiões Afro-brasileiras'
  ],
  'Cinema': [
    'Oscar', 'Festival de Cannes', 'Cinema Brasileiro', 'Netflix', 'Amazon Prime', 'Disney+',
    'Globoplay', 'Lançamentos', 'Animação', 'Documentário', 'Ficção Científica', 'Terror',
    'Comédia', 'Drama', 'Curta-metragem', 'Roteiro', 'Direção', 'Atores', 'Atrizes', 'Bilheteria',
    'Streaming', 'Remake', 'Sequência', 'Premiações', 'Censura', 'Diversidade no Cinema',
    'Efeitos Especiais', 'Trilha Sonora', 'Crítica de Cinema', 'Cineclube'
  ],
  'Música': [
    'Sertanejo', 'Funk', 'Pagode', 'Forró', 'MPB', 'Rock Nacional', 'Rap', 'Gospel', 'Axé',
    'Baile Funk', 'Show ao Vivo', 'Spotify', 'Deezer', 'Clipe', 'Álbum', 'Remix', 'Feat',
    'Billboard', 'Grammy', 'Virada Cultural', 'Lollapalooza', 'Rock in Rio', 'Carnaval Musical',
    'Música Eletrônica', 'Indie', 'K-Pop', 'Trap', 'Piseiro', 'Brega Funk', 'Arrocha'
  ],
  'Bem Estar': [
    'Meditação', 'Yoga', 'Pilates', 'Corrida', 'Musculação', 'Alimentação Saudável', 'Vegano',
    'Detox', 'Sono', 'Saúde Mental', 'Ansiedade', 'Depressão', 'Autoestima', 'Mindfulness',
    'Hidratação', 'Skincare', 'Crossfit', 'Caminhada', 'Jejum Intermitente', 'Suplementos',
    'Fisioterapia', 'Psicologia', 'Terapia', 'Burnout', 'Postura', 'Ergonomia', 'Qualidade de Vida',
    'Autocuidado', 'Longevidade', 'Bem-estar no Trabalho'
  ],
  'Turismo e Viagem': [
    'Fernando de Noronha', 'Bonito', 'Chapada Diamantina', 'Lençóis Maranhenses', 'Pantanal',
    'Amazônia', 'Rio de Janeiro', 'São Paulo', 'Salvador', 'Fortaleza', 'Gramado', 'Foz do Iguaçu',
    'Manaus', 'Recife', 'Florianópolis', 'Maldivas', 'Europa', 'Disney', 'Passaporte', 'Visto',
    'Passagens Aéreas', 'Airbnb', 'Hotelaria', 'Turismo de Aventura', 'Ecoturismo', 'Cruzeiro',
    'Mochilão', 'Alta Temporada', 'Câmbio', 'Seguro Viagem'
  ]
};
