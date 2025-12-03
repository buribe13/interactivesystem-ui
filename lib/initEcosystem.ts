import { Ecosystem } from './ecosystem/Ecosystem';
import { Author } from './ecosystem/Author';
import { Category } from './ecosystem/Category';
import { Tag } from './ecosystem/Tag';
import { Reader } from './ecosystem/Reader';

export function initializeEcosystem(): Ecosystem {
  const ecosystem = new Ecosystem();

  // Create authors
  const authors = [
    new Author('author-1', 'Sarah Chen', 1200),
    new Author('author-2', 'Marcus Johnson', 800),
    new Author('author-3', 'Emily Rodriguez', 1500),
    new Author('author-4', 'David Kim', 950),
  ];
  ecosystem.authors = authors;

  // Create categories
  const categories = [
    new Category('category-1', 'Technology'),
    new Category('category-2', 'Design'),
    new Category('category-3', 'Business'),
    new Category('category-4', 'Media'),
  ];
  ecosystem.categories = categories;

  // Create tags
  const tags = [
    new Tag('tag-1', 'UX'),
    new Tag('tag-2', 'UI'),
    new Tag('tag-3', 'Design'),
    new Tag('tag-4', 'Tech'),
    new Tag('tag-5', 'Product'),
    new Tag('tag-6', 'Web'),
    new Tag('tag-7', 'Mobile'),
    new Tag('tag-8', 'Strategy'),
  ];
  ecosystem.tags = tags;

  // Create readers
  const readers = [
    new Reader('reader-1', 'Alex'),
    new Reader('reader-2', 'Jordan'),
    new Reader('reader-3', 'Taylor'),
    new Reader('reader-4', 'Morgan'),
    new Reader('reader-5', 'Casey'),
  ];
  ecosystem.readers = readers;

  // Create initial articles with varied engagement
  const articleData = [
    {
      title: 'The Future of UI Design',
      author: 'Sarah Chen',
      category: 'Design',
      tags: ['UX', 'UI', 'Design'],
      views: 450,
      likes: 120,
      shares: 35,
    },
    {
      title: 'React Performance Optimization',
      author: 'Marcus Johnson',
      category: 'Technology',
      tags: ['Tech', 'Web', 'Product'],
      views: 320,
      likes: 85,
      shares: 22,
    },
    {
      title: 'Building Scalable Products',
      author: 'Emily Rodriguez',
      category: 'Business',
      tags: ['Product', 'Strategy', 'Business'],
      views: 280,
      likes: 95,
      shares: 18,
    },
    {
      title: 'Mobile-First Design Principles',
      author: 'Sarah Chen',
      category: 'Design',
      tags: ['Mobile', 'UX', 'Design'],
      views: 380,
      likes: 110,
      shares: 28,
    },
    {
      title: 'Web3 and the Future',
      author: 'David Kim',
      category: 'Technology',
      tags: ['Tech', 'Web', 'Strategy'],
      views: 210,
      likes: 45,
      shares: 12,
    },
    {
      title: 'Content Strategy for 2024',
      author: 'Emily Rodriguez',
      category: 'Media',
      tags: ['Strategy', 'Media', 'Product'],
      views: 195,
      likes: 60,
      shares: 15,
    },
    {
      title: 'Accessibility in Modern Web',
      author: 'Marcus Johnson',
      category: 'Technology',
      tags: ['UX', 'Web', 'Tech'],
      views: 265,
      likes: 75,
      shares: 20,
    },
    {
      title: 'Design Systems Deep Dive',
      author: 'Sarah Chen',
      category: 'Design',
      tags: ['Design', 'UI', 'Product'],
      views: 420,
      likes: 130,
      shares: 40,
    },
    {
      title: 'Startup Growth Hacks',
      author: 'David Kim',
      category: 'Business',
      tags: ['Business', 'Strategy', 'Product'],
      views: 180,
      likes: 50,
      shares: 10,
    },
    {
      title: 'Video Content Trends',
      author: 'Emily Rodriguez',
      category: 'Media',
      tags: ['Media', 'Strategy'],
      views: 150,
      likes: 40,
      shares: 8,
    },
    {
      title: 'CSS Grid Mastery',
      author: 'Marcus Johnson',
      category: 'Technology',
      tags: ['Web', 'Tech', 'UI'],
      views: 240,
      likes: 65,
      shares: 16,
    },
    {
      title: 'User Research Methods',
      author: 'Sarah Chen',
      category: 'Design',
      tags: ['UX', 'Design', 'Product'],
      views: 310,
      likes: 90,
      shares: 25,
    },
    {
      title: 'API Design Best Practices',
      author: 'David Kim',
      category: 'Technology',
      tags: ['Tech', 'Product', 'Web'],
      views: 200,
      likes: 55,
      shares: 14,
    },
    {
      title: 'Brand Identity Systems',
      author: 'Emily Rodriguez',
      category: 'Design',
      tags: ['Design', 'Strategy'],
      views: 175,
      likes: 48,
      shares: 11,
    },
    {
      title: 'Social Media Analytics',
      author: 'Marcus Johnson',
      category: 'Media',
      tags: ['Media', 'Strategy', 'Product'],
      views: 160,
      likes: 42,
      shares: 9,
    },
  ];

  // Add articles to ecosystem
  articleData.forEach((data) => {
    const article = ecosystem.addArticle(
      data.title,
      data.author,
      data.category,
      data.tags
    );

    // Set initial engagement
    article.views = data.views;
    article.likes = data.likes;
    article.shares = data.shares;
  });

  // Calculate initial trending scores
  ecosystem.updateTrending();

  return ecosystem;
}

