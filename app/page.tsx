'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Ecosystem } from '@/lib/ecosystem/Ecosystem';
import { initializeEcosystem } from '@/lib/initEcosystem';
import { Controls } from '@/components/Controls';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Skeleton } from '@/components/ui/skeleton';

// Dynamically import P5Canvas with SSR disabled to avoid p5.js SSR issues
const P5Canvas = dynamic(() => import('@/components/P5Canvas').then(mod => ({ default: mod.P5Canvas })), {
  ssr: false,
  loading: () => (
    <Card className="h-full">
      <CardContent className="flex items-center justify-center h-full min-h-[800px]">
        <div className="text-center space-y-4">
          <Skeleton className="h-12 w-12 rounded-full mx-auto" />
          <p className="text-muted-foreground">Loading canvas...</p>
        </div>
      </CardContent>
    </Card>
  ),
});

export default function Home() {
  const [ecosystem, setEcosystem] = useState<Ecosystem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize ecosystem on mount
    console.log('Page: useEffect triggered');
    
    let mounted = true;
    
    const init = () => {
      console.log('Page: Initializing ecosystem...');
      try {
        const eco = initializeEcosystem();
        console.log('Page: Ecosystem initialized', {
          articles: eco.articles.length,
          authors: eco.authors.length,
          categories: eco.categories.length,
          tags: eco.tags.length,
          readers: eco.readers.length
        });
        
        if (mounted) {
          setEcosystem(eco);
          setIsLoading(false);
          console.log('Page: State updated - loading set to false');
        }
      } catch (error) {
        console.error('Error initializing ecosystem:', error);
        if (error instanceof Error) {
          console.error('Error message:', error.message);
          console.error('Error stack:', error.stack);
        }
        // Always set loading to false, even on error
        if (mounted) {
          setIsLoading(false);
          // Set a minimal ecosystem to prevent infinite loading
          try {
            setEcosystem(new Ecosystem());
          } catch (e) {
            console.error('Failed to create empty ecosystem:', e);
          }
        }
      }
    };

    // Initialize immediately
    init();

    // Fallback timeout - force loading to false after 3 seconds
    const timeout = setTimeout(() => {
      console.warn('Page: Initialization timeout - forcing loading to false');
      if (mounted) {
        setIsLoading(false);
      }
    }, 3000);

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, []);

  const handleReset = () => {
    setIsLoading(true);
    const newEcosystem = initializeEcosystem();
    setEcosystem(newEcosystem);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
            <Skeleton className="h-16 w-16 rounded-full" />
            <p className="text-lg font-medium">Initializing ecosystem...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">Media Content Ecosystem</h1>
            <p className="text-muted-foreground max-w-2xl">
              An interactive simulation modeling how articles, authors, categories, tags, and readers interact
            </p>
          </div>
          <Button asChild>
            <Link href="/documentation">
              Documentation
            </Link>
          </Button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
          <div className="lg:col-span-3">
            <Card className="h-[800px] overflow-hidden">
              <CardContent className="p-0 h-full w-full" style={{ position: 'relative', overflow: 'hidden' }}>
                <P5Canvas ecosystem={ecosystem} />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-1">
            <Controls ecosystem={ecosystem} onReset={handleReset} />
          </div>
        </div>
      </div>
    </main>
  );
}

