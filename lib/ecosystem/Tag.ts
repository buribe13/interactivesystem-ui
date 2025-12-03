import { Article } from './Article';

export class Tag {
  id: string;
  name: string;
  articles: Article[];

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
    this.articles = [];
  }

  addArticle(article: Article): void {
    if (!this.articles.find((a) => a.id === article.id)) {
      this.articles.push(article);
    }
  }

  getRelatedTags(allTags: Tag[]): Tag[] {
    // Find tags that co-occur with this tag
    const relatedTags: Tag[] = [];
    const articleIds = new Set(this.articles.map((a) => a.id));

    allTags.forEach((tag) => {
      if (tag.id !== this.id) {
        const hasCommonArticle = tag.articles.some((article) => articleIds.has(article.id));
        if (hasCommonArticle) {
          relatedTags.push(tag);
        }
      }
    });

    return relatedTags;
  }
}

