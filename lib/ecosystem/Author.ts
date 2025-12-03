import { Article } from './Article';

export class Author {
  id: string;
  name: string;
  articles: Article[];
  followers: number;
  influenceScore: number;

  constructor(id: string, name: string, followers: number = 0) {
    this.id = id;
    this.name = name;
    this.articles = [];
    this.followers = followers;
    this.influenceScore = 0;
  }

  publishArticle(article: Article): void {
    this.articles.push(article);
    this.calculateInfluence();
  }

  calculateInfluence(): void {
    // Calculate total engagement across all articles
    const totalEngagement = this.articles.reduce(
      (sum, article) => sum + article.views + article.likes * 2 + article.shares * 3,
      0
    );

    // Influence = engagement + followers
    this.influenceScore = Math.log10(totalEngagement + this.followers * 10 + 1) * 10;
  }
}

