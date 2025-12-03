'use client';

import React, { useState, useEffect } from 'react';
import { Ecosystem } from '@/lib/ecosystem/Ecosystem';
import { Button } from './ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/Select';
import { Slider } from './ui/Slider';
import { Badge } from './ui/Badge';
import { Separator } from './ui/separator';

interface ControlsProps {
  ecosystem: Ecosystem | null;
  onReset: () => void;
}

export function Controls({ ecosystem, onReset }: ControlsProps) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [speed, setSpeed] = useState([1.0]);
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
      ecosystem.setUpdateSpeed(speed[0]);
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
      <Card>
        <CardHeader>
          <CardTitle>Publish Article</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePublish} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Article title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Select value={author} onValueChange={setAuthor} required>
                <SelectTrigger id="author">
                  <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent>
                  {ecosystem.authors.map((a) => (
                    <SelectItem key={a.id} value={a.name}>
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {ecosystem.categories.map((c) => (
                    <SelectItem key={c.id} value={c.name}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma-separated)</Label>
              <Input
                id="tags"
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Simulation Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="speed">Speed</Label>
              <span className="text-sm text-muted-foreground">{speed[0].toFixed(1)}x</span>
            </div>
            <Slider
              id="speed"
              min={0.5}
              max={3}
              step={0.1}
              value={speed}
              onValueChange={setSpeed}
            />
          </div>

          <Separator />

          <Button variant="destructive" onClick={onReset} className="w-full">
            Reset Ecosystem
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Articles</span>
              <Badge variant="info">{stats.totalArticles}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Authors</span>
              <Badge variant="info">{stats.totalAuthors}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Readers</span>
              <Badge variant="info">{stats.totalReaders}</Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Views</span>
              <Badge variant="success">{stats.totalViews}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Likes</span>
              <Badge variant="success">{stats.totalLikes}</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total Shares</span>
              <Badge variant="success">{stats.totalShares}</Badge>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Trending</span>
              <Badge variant="warning">{stats.trendingCount}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

