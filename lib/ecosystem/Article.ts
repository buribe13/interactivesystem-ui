import { Author } from './Author';
import { Category } from './Category';
import { Tag } from './Tag';

export class Article {
  id: string;
  title: string;
  author: Author;
  category: Category;
  tags: Tag[];
  publishDate: Date;
  views: number;
  likes: number;
  shares: number;
  trendingScore: number;
  selected: boolean = false;

  constructor(
    id: string,
    title: string,
    author: Author,
    category: Category,
    tags: Tag[],
    publishDate: Date = new Date()
  ) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.category = category;
    this.tags = tags;
    this.publishDate = publishDate;
    this.views = 0;
    this.likes = 0;
    this.shares = 0;
    this.trendingScore = 0;
  }

  calculateTrendingScore(): number {
    // Engagement score: weighted by interaction type
    const engagement = this.views * 1 + this.likes * 2 + this.shares * 3;

    // Time decay: newer articles get boost (decays over 24 hours)
    const hoursSincePublish = (Date.now() - this.publishDate.getTime()) / (1000 * 60 * 60);
    const timeDecay = Math.max(0, 1 - hoursSincePublish / 24);

    // Author influence multiplier
    const authorBoost = 1 + this.author.influenceScore * 0.1;

    // Calculate final trending score
    this.trendingScore = engagement * (1 + timeDecay * 0.5) * authorBoost;
    return this.trendingScore;
  }

  getRelatedArticles(allArticles: Article[]): Article[] {
    return allArticles.filter(
      (article) =>
        article.id !== this.id &&
        (article.category.id === this.category.id ||
          article.tags.some((tag) => this.tags.some((t) => t.id === tag.id)))
    );
  }

  addView(): void {
    this.views++;
  }

  addLike(): void {
    this.likes++;
  }

  addShare(): void {
    this.shares++;
  }
}

