'use client';

import { useState, useEffect } from 'react';
import { Ecosystem } from '@/lib/ecosystem/Ecosystem';
import { initializeEcosystem } from '@/lib/initEcosystem';
import { P5Canvas } from '@/components/P5Canvas';
import { Controls } from '@/components/Controls';
import Link from 'next/link';

export default function Home() {
  const [ecosystem, setEcosystem] = useState<Ecosystem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize ecosystem on mount
    const init = () => {
      const eco = initializeEcosystem();
      setEcosystem(eco);
      setIsLoading(false);
    };

    init();
  }, []);

  const handleReset = () => {
    setIsLoading(true);
    const newEcosystem = initializeEcosystem();
    setEcosystem(newEcosystem);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-xl">Initializing ecosystem...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Media Content Ecosystem</h1>
              <p className="text-gray-400">
                An interactive simulation modeling how articles, authors, categories, tags, and readers interact
              </p>
            </div>
            <Link
              href="/documentation"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
            >
              Documentation
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-lg p-4 h-[800px]">
              <P5Canvas ecosystem={ecosystem} />
            </div>
          </div>
          <div className="lg:col-span-1">
            <Controls ecosystem={ecosystem} onReset={handleReset} />
          </div>
        </div>
      </div>
    </main>
  );
}

