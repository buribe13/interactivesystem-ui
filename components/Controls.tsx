'use client';

import React, { useState, useEffect } from 'react';
import { Ecosystem } from '@/lib/ecosystem/Ecosystem';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Select } from './ui/Select';
import { Slider } from './ui/Slider';
import { Badge } from './ui/Badge';

interface ControlsProps {
  ecosystem: Ecosystem | null;
  onReset: () => void;
}

export function Controls({ ecosystem, onReset }: ControlsProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [speed, setSpeed] = useState(1.0);
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalAuthors: 0,
    totalReaders: 0,
    totalViews: 0,
    totalLikes: 0,
    totalShares: 0,
    trendingCount: 0,
  });

  useEffect(() => {
    if (!ecosystem) return;

    const interval = setInterval(() => {
      setStats(ecosystem.getStats());
    }, 500);

    return () => clearInterval(interval);
  }, [ecosystem]);

  useEffect(() => {
    if (ecosystem) {
      ecosystem.setUpdateSpeed(speed);
    }
  }, [speed, ecosystem]);

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ecosystem || !title || !author || !category) return;

    const tagArray = tags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    ecosystem.addArticle(title, author, category, tagArray);
    setTitle('');
    setTags('');
  };

  const handleRandomArticle = () => {
    if (!ecosystem) return;

    const titles = [
      'The Art of Minimalist Design',
      'Building Modern Web Applications',
      'Data-Driven Product Decisions',
      'The Psychology of User Experience',
      'Scaling Teams and Products',
      'Design Thinking in Practice',
      'Emerging Tech Trends',
      'Content Strategy Essentials',
    ];

    const authors = ecosystem.authors.map((a) => a.name);
    const categories = ecosystem.categories.map((c) => c.name);
    const allTags = ecosystem.tags.map((t) => t.name);

    const randomTitle = titles[Math.floor(Math.random() * titles.length)];
    const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    const randomTags = Array.from(
      { length: Math.floor(Math.random() * 3) + 1 },
      () => allTags[Math.floor(Math.random() * allTags.length)]
    );

    ecosystem.addArticle(randomTitle, randomAuthor, randomCategory, randomTags);
  };

  if (!ecosystem) {
    return (
      <div className="text-white p-4">
        <p>Ecosystem not initialized</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card title="Publish Article">
        <form onSubmit={handlePublish} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Article title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Author</label>
            <Select value={author} onChange={(e) => setAuthor(e.target.value)} required>
              <option value="">Select author</option>
              {ecosystem.authors.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
            <Select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select category</option>
              {ecosystem.categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Tags (comma-separated)</label>
            <Input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="UX, Design, Tech"
            />
          </div>

          <div className="flex gap-2">
            <Button type="submit" className="flex-1">
              Publish
            </Button>
            <Button type="button" variant="secondary" onClick={handleRandomArticle}>
              Random
            </Button>
          </div>
        </form>
      </Card>

      <Card title="Simulation Controls">
        <div className="space-y-4">
          <Slider
            label="Speed"
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
          />

          <Button variant="danger" onClick={onReset} className="w-full">
            Reset Ecosystem
          </Button>
        </div>
      </Card>

      <Card title="Statistics">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Articles</span>
            <Badge variant="info">{stats.totalArticles}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Authors</span>
            <Badge variant="info">{stats.totalAuthors}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Readers</span>
            <Badge variant="info">{stats.totalReaders}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Views</span>
            <Badge variant="success">{stats.totalViews}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Likes</span>
            <Badge variant="success">{stats.totalLikes}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Total Shares</span>
            <Badge variant="success">{stats.totalShares}</Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Trending</span>
            <Badge variant="warning">{stats.trendingCount}</Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}

