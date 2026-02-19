
import { GoogleGenAI, Type } from "@google/genai";
import { NewsArticle, SearchResult, NewsTopic } from "../types";
import { supabase } from "../lib/supabaseClient";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// URL da Edge Function no Supabase
const EDGE_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/google-news-rss`;

/**
 * Busca notícias reais via Edge Function (Google News RSS)
 */
const fetchFromGoogleNewsRSS = async (topic: string): Promise<NewsArticle[]> => {
  const response = await fetch(`${EDGE_FUNCTION_URL}?topic=${encodeURIComponent(topic)}`, {
    headers: {
      'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) throw new Error(`Edge Function error: ${response.status}`);

  const data = await response.json();

  if (!data.articles || data.articles.length === 0) {
    throw new Error('No articles returned from RSS');
  }

  return data.articles as NewsArticle[];
};

/**
 * Integração Principal: Gera o feed de notícias.
 * Tenta primeiro o Google News RSS via Edge Function.
 * Se falhar, usa o Gemini com Google Search Grounding como fallback.
 */
export const generateNewsFeed = async (topic: string = 'Economia'): Promise<NewsArticle[]> => {
  // Tentativa 1: Google News RSS via Supabase Edge Function
  try {
    console.log(`[NewsService] Buscando RSS para tópico: ${topic}`);
    const articles = await fetchFromGoogleNewsRSS(topic);
    console.log(`[NewsService] ✅ RSS retornou ${articles.length} artigos`);
    return articles;
  } catch (rssError) {
    console.warn(`[NewsService] ⚠️ RSS falhou, usando Gemini como fallback:`, rssError);
  }

  // Fallback: Gemini com Google Search Grounding
  try {
    const topicPrompt = topic === 'Economia'
      ? "as notícias mais importantes e reais de hoje sobre economia"
      : `notícias reais e recentes sobre o tópico: "${topic}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Atue como um editor senior do Google News. Identifique ${topic === 'Economia' ? '5' : '4'} ${topicPrompt}. 
      Para cada notícia, extraia dados reais via busca e gere uma análise de viés (Bias), um resumo executivo e duas perspectivas contrastantes. 
      Formate estritamente como JSON.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              author: { type: Type.STRING },
              source: { type: Type.STRING },
              publishedAt: { type: Type.STRING },
              imageUrl: { type: Type.STRING },
              content: { type: Type.STRING },
              aiSummary: { type: Type.STRING },
              analysis: {
                type: Type.OBJECT,
                properties: {
                  bias: { type: Type.STRING },
                  biasScore: { type: Type.NUMBER },
                  credibility: { type: Type.NUMBER },
                  sentiment: { type: Type.STRING },
                  factChecked: { type: Type.BOOLEAN }
                },
                required: ['bias', 'biasScore', 'credibility', 'sentiment', 'factChecked']
              },
              perspectives: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    source: { type: Type.STRING },
                    bias: { type: Type.STRING },
                    headline: { type: Type.STRING },
                    summary: { type: Type.STRING }
                  }
                }
              }
            },
            required: ['id', 'title', 'author', 'source', 'publishedAt', 'imageUrl', 'content', 'aiSummary', 'analysis', 'perspectives']
          }
        }
      }
    });

    const articles: NewsArticle[] = JSON.parse(response.text.trim());

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const groundingSources = groundingChunks
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web?.title || "Fonte de Notícia",
        uri: chunk.web?.uri || "#"
      }));

    return articles.map(article => ({ ...article, groundingSources }));
  } catch (error) {
    console.error("Error generating news feed:", error);
    throw error;
  }
};

/**
 * Integração de Pesquisa: Busca profunda no índice de notícias
 */
export const performSearch = async (query: string): Promise<SearchResult> => {
  // Tenta busca via RSS primeiro
  try {
    const articles = await fetchFromGoogleNewsRSS(query);
    return { articles, groundingSources: articles.flatMap(a => a.groundingSources || []) };
  } catch (_) {
    // Fallback para Gemini
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Pesquisa de Notícias Real-Time: "${query}". 
      Instruções:
      1. Use a ferramenta de busca para encontrar artigos recentes em portais de notícias.
      2. Retorne 3 artigos com análises de viés detalhadas.
      3. Liste as URLs originais nos metadados de grounding.
      4. Responda APENAS o JSON.`,
      config: {
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              author: { type: Type.STRING },
              source: { type: Type.STRING },
              publishedAt: { type: Type.STRING },
              imageUrl: { type: Type.STRING },
              content: { type: Type.STRING },
              aiSummary: { type: Type.STRING },
              analysis: {
                type: Type.OBJECT,
                properties: {
                  bias: { type: Type.STRING },
                  biasScore: { type: Type.NUMBER },
                  credibility: { type: Type.NUMBER },
                  sentiment: { type: Type.STRING },
                  factChecked: { type: Type.BOOLEAN }
                },
                required: ['bias', 'biasScore', 'credibility', 'sentiment', 'factChecked']
              },
              perspectives: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    source: { type: Type.STRING },
                    bias: { type: Type.STRING },
                    headline: { type: Type.STRING },
                    summary: { type: Type.STRING }
                  }
                }
              }
            },
            required: ['id', 'title', 'author', 'source', 'publishedAt', 'imageUrl', 'content', 'aiSummary', 'analysis', 'perspectives']
          }
        }
      }
    });

    const textResponse = response.text.trim();
    const articles: NewsArticle[] = JSON.parse(textResponse);

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    const groundingSources = groundingChunks
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web?.title || "Fonte de Notícia",
        uri: chunk.web?.uri || "#"
      }));

    return { articles, groundingSources };
  } catch (error) {
    console.error("Search failed:", error);
    throw error;
  }
};
