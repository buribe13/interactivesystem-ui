import { Article } from './Article';
import { Tag } from './Tag';

export class Reader {
  id: string;
  name: string;
  viewedArticles: Article[];
  likedArticles: Article[];
  interests: Tag[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.viewedArticles = [];
    this.likedArticles = [];
    this.interests = [];
  }

  viewArticle(article: Article): void {
    if (!this.viewedArticles.find((a) => a.id === article.id)) {
      this.viewedArticles.push(article);
      article.addView();
    }
  }

  likeArticle(article: Article): void {
    if (!this.likedArticles.find((a) => a.id === article.id)) {
      this.likedArticles.push(article);
      article.addLike();

      // Update interests based on liked articles
      article.tags.forEach((tag) => {
        if (!this.interests.find((t) => t.id === tag.id)) {
          this.interests.push(tag);
        }
      });
    }
  }

  shareArticle(article: Article): void {
    article.addShare();
  }

  getRecommendations(allArticles: Article[]): Article[] {
    // Suggest articles based on interests + trending
    const recommendations = allArticles
      .filter(
        (article) =>
          !this.viewedArticles.find((a) => a.id === article.id) &&
          (article.tags.some((tag) => this.interests.some((i) => i.id === tag.id)) ||
            article.trendingScore > 50)
      )
      .sort((a, b) => b.trendingScore - a.trendingScore)
      .slice(0, 5);

    return recommendations;
  }
}

