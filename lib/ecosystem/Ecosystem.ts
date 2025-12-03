import { Article } from './Article';
import { Author } from './Author';
import { Category } from './Category';
import { Tag } from './Tag';
import { Reader } from './Reader';

export class Ecosystem {
  articles: Article[];
  authors: Author[];
  categories: Category[];
  tags: Tag[];
  readers: Reader[];
  updateSpeed: number = 1.0; // Multiplier for update frequency
  lastUpdate: number = 0;
  updateInterval: number = 1000; // 1 second in milliseconds

  constructor() {
    this.articles = [];
    this.authors = [];
    this.categories = [];
    this.tags = [];
    this.readers = [];
  }

  addArticle(
    title: string,
    authorName: string,
    categoryName: string,
    tagNames: string[]
  ): Article {
    // Find or create author
    let author = this.authors.find((a) => a.name === authorName);
    if (!author) {
      author = new Author(`author-${Date.now()}`, authorName);
      this.authors.push(author);
    }

    // Find or create category
    let category = this.categories.find((c) => c.name === categoryName);
    if (!category) {
      category = new Category(`category-${Date.now()}`, categoryName);
      this.categories.push(category);
    }

    // Find or create tags
    const tags: Tag[] = tagNames.map((tagName) => {
      let tag = this.tags.find((t) => t.name === tagName);
      if (!tag) {
        tag = new Tag(`tag-${Date.now()}-${Math.random()}`, tagName);
        this.tags.push(tag);
      }
      return tag;
    });

    // Create article
    const article = new Article(
      `article-${Date.now()}`,
      title,
      author,
      category,
      tags,
      new Date()
    );

    // Register article in ecosystem
    this.articles.push(article);
    author.publishArticle(article);
    category.addArticle(article);
    tags.forEach((tag) => tag.addArticle(article));

    // Initial boost from author influence
    article.views = Math.floor(author.influenceScore / 10);

    return article;
  }

  updateTrending(): void {
    // Recalculate trending scores for all articles
    this.articles.forEach((article) => {
      article.calculateTrendingScore();
    });

    // Update author influence
    this.authors.forEach((author) => {
      author.calculateInfluence();
    });
  }

  simulateInteractions(): void {
    if (this.readers.length === 0 || this.articles.length === 0) return;

    // Random reader interactions
    const numInteractions = Math.floor(Math.random() * 3) + 1;

    for (let i = 0; i < numInteractions; i++) {
      const reader = this.readers[Math.floor(Math.random() * this.readers.length)];
      const article = this.articles[Math.floor(Math.random() * this.articles.length)];

      const action = Math.random();
      if (action < 0.7) {
        // 70% view
        reader.viewArticle(article);
      } else if (action < 0.9) {
        // 20% like
        reader.likeArticle(article);
      } else {
        // 10% share
        reader.shareArticle(article);
        this.applyViralSpread(article);
      }
    }
  }

  applyViralSpread(sharedArticle: Article): void {
    // When article is shared, boost related articles
    const relatedArticles = sharedArticle.getRelatedArticles(this.articles);
    relatedArticles.forEach((article) => {
      // Add random views to related articles
      const boost = Math.floor(Math.random() * 5) + 1;
      for (let i = 0; i < boost; i++) {
        article.addView();
      }
    });
  }

  tick(currentTime: number): void {
    // Throttle updates based on updateSpeed
    const adjustedInterval = this.updateInterval / this.updateSpeed;
    if (currentTime - this.lastUpdate < adjustedInterval) {
      return;
    }

    this.lastUpdate = currentTime;

    // Simulate random interactions
    this.simulateInteractions();

    // Update trending scores
    this.updateTrending();
  }

  setUpdateSpeed(speed: number): void {
    this.updateSpeed = Math.max(0.5, Math.min(3.0, speed));
  }

  reset(): void {
    this.articles = [];
    this.authors = [];
    this.categories = [];
    this.tags = [];
    this.readers = [];
  }

  getStats() {
    const totalViews = this.articles.reduce((sum, a) => sum + a.views, 0);
    const totalLikes = this.articles.reduce((sum, a) => sum + a.likes, 0);
    const totalShares = this.articles.reduce((sum, a) => sum + a.shares, 0);
    const trendingCount = this.articles.filter((a) => a.trendingScore > 50).length;

    return {
      totalArticles: this.articles.length,
      totalAuthors: this.authors.length,
      totalReaders: this.readers.length,
      totalViews,
      totalLikes,
      totalShares,
      trendingCount,
    };
  }
}

