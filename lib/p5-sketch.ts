import p5 from 'p5';
import { Ecosystem } from './ecosystem/Ecosystem';
import { Article } from './ecosystem/Article';
import { Author } from './ecosystem/Author';
import { Category } from './ecosystem/Category';

interface VisualArticle {
  article: Article;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  pulsePhase: number;
}

interface VisualAuthor {
  author: Author;
  x: number;
  y: number;
  angle: number;
}

export function createP5Sketch(ecosystem: Ecosystem) {
  let selectedArticle: Article | null = null;
  let hoveredArticle: Article | null = null;
  let visualArticles: VisualArticle[] = [];
  let visualAuthors: VisualAuthor[] = [];
  let categoryRegions: { category: Category; x: number; y: number; width: number; height: number }[] = [];
  let p5Instance: p5 | null = null;

  const setup = (p: p5) => {
    p5Instance = p;
    p.createCanvas(1200, 800);
    p.colorMode(p.HSB, 360, 100, 100, 100);
    initializeVisuals(p);
  };

  const initializeVisuals = (p: p5) => {
    // Initialize category regions
    const cols = 2;
    const rows = 2;
    const regionWidth = p.width / cols;
    const regionHeight = (p.height - 100) / rows; // Leave space for stats bar

    ecosystem.categories.forEach((category, index) => {
      const col = index % cols;
      const row = Math.floor(index / cols);
      categoryRegions.push({
        category,
        x: col * regionWidth,
        y: 50 + row * regionHeight, // Start below stats bar
        width: regionWidth,
        height: regionHeight,
      });
    });

    // Initialize author positions in a circle
    const centerX = p.width / 2;
    const centerY = p.height / 2;
    const radius = Math.min(p.width, p.height) * 0.3;

    ecosystem.authors.forEach((author, index) => {
      const angle = (p.TWO_PI / ecosystem.authors.length) * index;
      visualAuthors.push({
        author,
        x: centerX + p.cos(angle) * radius,
        y: centerY + p.sin(angle) * radius,
        angle,
      });
    });

    // Initialize article visuals
    updateArticleVisuals(p);
  };

  const updateArticleVisuals = (p: p5) => {
    visualArticles = ecosystem.articles.map((article) => {
      const existing = visualArticles.find((va) => va.article.id === article.id);
      const region = categoryRegions.find((r) => r.category.id === article.category.id);

      if (!region) return null as any;

      const targetX = region.x + region.width / 2 + (Math.random() - 0.5) * region.width * 0.6;
      const targetY = region.y + region.height / 2 + (Math.random() - 0.5) * region.height * 0.6;

      return {
        article,
        x: existing?.x ?? targetX,
        y: existing?.y ?? targetY,
        targetX,
        targetY,
        size: Math.max(10, Math.min(50, article.trendingScore / 5)),
        pulsePhase: existing?.pulsePhase ?? Math.random() * p.TWO_PI,
      };
    }).filter(Boolean);
  };

  const draw = (p: p5) => {
    p.background(220, 20, 15); // Dark blue-gray background

    // Update ecosystem
    ecosystem.tick(p.millis());

    // Update visuals
    updateArticleVisuals(p);

    // Draw stats bar
    drawStatsBar(p);

    // Draw category regions
    drawCategoryRegions(p);

    // Draw connections (author-article)
    drawConnections(p);

    // Draw articles
    drawArticles(p);

    // Draw authors
    drawAuthors(p);

    // Draw tooltip
    if (hoveredArticle) {
      drawTooltip(p, hoveredArticle);
    }

    // Draw selected article info
    if (selectedArticle) {
      drawSelectedInfo(p, selectedArticle);
    }
  };

  const drawStatsBar = (p: p5) => {
    p.push();
    p.fill(220, 30, 20);
    p.rect(0, 0, p.width, 50);
    p.fill(0, 0, 100);
    p.textAlign(p.LEFT, p.CENTER);
    p.textSize(12);

    const stats = ecosystem.getStats();
    const statsText = [
      `Articles: ${stats.totalArticles}`,
      `Authors: ${stats.totalAuthors}`,
      `Views: ${stats.totalViews}`,
      `Likes: ${stats.totalLikes}`,
      `Shares: ${stats.totalShares}`,
      `Trending: ${stats.trendingCount}`,
    ];

    const spacing = p.width / statsText.length;
    statsText.forEach((text, i) => {
      p.text(text, i * spacing + 10, 25);
    });
    p.pop();
  };

  const drawCategoryRegions = (p: p5) => {
    categoryRegions.forEach((region) => {
      p.push();
      const hue = (region.category.id.charCodeAt(0) * 50) % 360;
      p.fill(hue, 30, 25, 30);
      p.noStroke();
      p.rect(region.x, region.y, region.width, region.height);

      // Category label
      p.fill(hue, 50, 80);
      p.textAlign(p.CENTER, p.TOP);
      p.textSize(16);
      p.text(region.category.name, region.x + region.width / 2, region.y + 10);
      p.pop();
    });
  };

  const drawConnections = (p: p5) => {
    p.push();
    p.stroke(0, 0, 50, 20);
    p.strokeWeight(1);

    // Author-article connections
    visualAuthors.forEach((vAuthor) => {
      const authorArticles = ecosystem.articles.filter((a) => a.author.id === vAuthor.author.id);
      authorArticles.forEach((article) => {
        const vArticle = visualArticles.find((va) => va.article.id === article.id);
        if (vArticle) {
          p.line(vAuthor.x, vAuthor.y, vArticle.x, vArticle.y);
        }
      });
    });

    // Related article connections (only for trending articles)
    visualArticles.forEach((vArticle) => {
      if (vArticle.article.trendingScore > 50) {
        const related = vArticle.article.getRelatedArticles(ecosystem.articles);
        related.slice(0, 2).forEach((relatedArticle) => {
          const vRelated = visualArticles.find((va) => va.article.id === relatedArticle.id);
          if (vRelated && relatedArticle.trendingScore > 30) {
            p.stroke(200, 50, 60, 30);
            p.line(vArticle.x, vArticle.y, vRelated.x, vRelated.y);
          }
        });
      }
    });
    p.pop();
  };

  const drawArticles = (p: p5) => {
    visualArticles.forEach((vArticle) => {
      p.push();

      // Smooth movement
      vArticle.x = p.lerp(vArticle.x, vArticle.targetX, 0.05);
      vArticle.y = p.lerp(vArticle.y, vArticle.targetY, 0.05);

      // Update pulse phase
      vArticle.pulsePhase += 0.1;

      // Calculate color based on engagement
      const engagement = vArticle.article.views + vArticle.article.likes * 2 + vArticle.article.shares * 3;
      const maxEngagement = 1000;
      const hue = p.map(Math.min(engagement, maxEngagement), 0, maxEngagement, 200, 0); // Blue to red
      const saturation = 60 + (vArticle.article.trendingScore > 50 ? 30 : 0);
      const brightness = 70 + (vArticle.article.trendingScore > 50 ? 20 : 0);

      // Pulse effect for trending articles
      let size = vArticle.size;
      if (vArticle.article.trendingScore > 50) {
        size *= 1 + Math.sin(vArticle.pulsePhase) * 0.2;
      }

      // Draw article circle
      p.fill(hue, saturation, brightness, 80);
      p.stroke(hue, saturation, 100, 100);
      p.strokeWeight(selectedArticle?.id === vArticle.article.id ? 3 : 1);
      p.circle(vArticle.x, vArticle.y, size);

      // Draw title on hover/select
      if (hoveredArticle?.id === vArticle.article.id || selectedArticle?.id === vArticle.article.id) {
        p.fill(0, 0, 100);
        p.textAlign(p.CENTER, p.BOTTOM);
        p.textSize(10);
        p.text(vArticle.article.title.substring(0, 30), vArticle.x, vArticle.y - size / 2 - 5);
      }

      p.pop();
    });
  };

  const drawAuthors = (p: p5) => {
    visualAuthors.forEach((vAuthor) => {
      p.push();
      p.fill(300, 50, 70);
      p.noStroke();
      p.circle(vAuthor.x, vAuthor.y, 15);

      // Author name
      p.fill(0, 0, 100);
      p.textAlign(p.CENTER, p.TOP);
      p.textSize(10);
      p.text(vAuthor.author.name.substring(0, 15), vAuthor.x, vAuthor.y + 10);
      p.pop();
    });
  };

  const drawTooltip = (p: p5, article: Article) => {
    const vArticle = visualArticles.find((va) => va.article.id === article.id);
    if (!vArticle) return;

    p.push();
    p.fill(0, 0, 20, 90);
    p.rect(p.mouseX + 10, p.mouseY - 60, 200, 80, 5);

    p.fill(0, 0, 100);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(11);
    p.text(`Title: ${article.title}`, p.mouseX + 15, p.mouseY - 55);
    p.text(`Views: ${article.views} | Likes: ${article.likes} | Shares: ${article.shares}`, p.mouseX + 15, p.mouseY - 40);
    p.text(`Trending: ${article.trendingScore.toFixed(1)}`, p.mouseX + 15, p.mouseY - 25);
    p.text(`Author: ${article.author.name}`, p.mouseX + 15, p.mouseY - 10);
    p.pop();
  };

  const drawSelectedInfo = (p: p5, article: Article) => {
    p.push();
    p.fill(0, 0, 10, 95);
    p.rect(10, p.height - 150, 300, 140, 5);

    p.fill(0, 0, 100);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(12);
    p.textStyle(p.BOLD);
    p.text('Selected Article', 20, p.height - 140);
    p.textStyle(p.NORMAL);
    p.textSize(10);
    p.text(`Title: ${article.title}`, 20, p.height - 125);
    p.text(`Author: ${article.author.name}`, 20, p.height - 110);
    p.text(`Category: ${article.category.name}`, 20, p.height - 95);
    p.text(`Tags: ${article.tags.map((t) => t.name).join(', ')}`, 20, p.height - 80);
    p.text(`Views: ${article.views} | Likes: ${article.likes} | Shares: ${article.shares}`, 20, p.height - 65);
    p.text(`Trending Score: ${article.trendingScore.toFixed(2)}`, 20, p.height - 50);
    p.text(`Published: ${article.publishDate.toLocaleDateString()}`, 20, p.height - 35);
    p.pop();
  };

  const mouseMoved = (p: p5) => {
    hoveredArticle = null;
    visualArticles.forEach((vArticle) => {
      const dist = p.dist(p.mouseX, p.mouseY, vArticle.x, vArticle.y);
      if (dist < vArticle.size / 2) {
        hoveredArticle = vArticle.article;
      }
    });
  };

  const mousePressed = (p: p5) => {
    visualArticles.forEach((vArticle) => {
      const dist = p.dist(p.mouseX, p.mouseY, vArticle.x, vArticle.y);
      if (dist < vArticle.size / 2) {
        selectedArticle = selectedArticle?.id === vArticle.article.id ? null : vArticle.article;
      }
    });
  };

  return {
    setup,
    draw,
    mouseMoved,
    mousePressed,
  };
}
