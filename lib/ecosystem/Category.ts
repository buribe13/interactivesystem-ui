import { Article } from './Article';

export class Category {
  id: string;
  name: string;
  articles: Article[];
  trendingArticles: Article[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.articles = [];
    this.trendingArticles = [];
  }

  addArticle(article: Article): void {
    this.articles.push(article);
  }

  getTrendingArticles(): Article[] {
    // Return top 5 trending articles in this category
    this.trendingArticles = [...this.articles]
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, 5);
    return this.trendingArticles;
  }

  calculateCategoryTrend(): number {
    // Percentage of trending articles in this category
    const trendingCount = this.getTrendingArticles().length;
    return this.articles.length > 0 ? (trendingCount / this.articles.length) * 100 : 0;
  }
}

