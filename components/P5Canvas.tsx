'use client';

import React, { useMemo } from 'react';
import Sketch from 'react-p5';
import { Ecosystem } from '@/lib/ecosystem/Ecosystem';
import { createP5Sketch } from '@/lib/p5-sketch';
import type p5 from 'p5';

interface P5CanvasProps {
  ecosystem: Ecosystem | null;
}

export function P5Canvas({ ecosystem }: P5CanvasProps) {
  const sketchFunctions = useMemo(() => {
    if (!ecosystem) return null;
    return createP5Sketch(ecosystem);
  }, [ecosystem]);

  const setup = (p: p5, canvasParentRef: Element) => {
    if (sketchFunctions) {
      const sketch = sketchFunctions;
      sketch.setup(p);
    }
  };

  const draw = (p: p5) => {
    if (sketchFunctions) {
      sketchFunctions.draw(p);
    }
  };

  const mouseMoved = (p: p5) => {
    if (sketchFunctions && sketchFunctions.mouseMoved) {
      sketchFunctions.mouseMoved(p);
    }
  };

  const mousePressed = (p: p5) => {
    if (sketchFunctions && sketchFunctions.mousePressed) {
      sketchFunctions.mousePressed(p);
    }
  };

  if (!ecosystem || !sketchFunctions) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-900 text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Initializing ecosystem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      <Sketch setup={setup} draw={draw} mouseMoved={mouseMoved} mousePressed={mousePressed} />
    </div>
  );
}

