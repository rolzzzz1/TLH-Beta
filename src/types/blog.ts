export interface TranslatedContent {
  en: string;
  hi: string;
}

export interface BlogPost {
  id: string;
  title: TranslatedContent;
  excerpt: TranslatedContent;
  content: TranslatedContent;
  author: TranslatedContent;
  category: string;
  categories: string[];
  imageUrl: string;
  createdAt: Date;
}

export interface Category {
  id: string;
  name: TranslatedContent;
  description: TranslatedContent;
}

export interface CategoryResponse {
  id: string;
  name: string;
  description: string;
} 