'use client';

import React, { useMemo, useRef } from 'react';
import Sketch from 'react-p5';
import { Ecosystem } from '@/lib/ecosystem/Ecosystem';
import { createP5Sketch } from '@/lib/p5-sketch';
import type p5 from 'p5';

interface P5CanvasProps {
  ecosystem: Ecosystem | null;
}

export function P5Canvas({ ecosystem }: P5CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const sketchFunctions = useMemo(() => {
    if (!ecosystem) return null;
    try {
      return createP5Sketch(ecosystem);
    } catch (error) {
      console.error('Error creating p5 sketch:', error);
      return null;
    }
  }, [ecosystem]);

  const setup = (p: p5, canvasParentRef: Element) => {
    if (!sketchFunctions) {
      return;
    }
    
    // Get dimensions from the container
    let width = 1200;
    let height = 800;
    
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        width = Math.floor(rect.width);
        height = Math.floor(rect.height);
      }
    } else if (canvasParentRef) {
      const rect = canvasParentRef.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        width = Math.floor(rect.width);
        height = Math.floor(rect.height);
      }
    }
    
    // Ensure minimum dimensions
    if (width < 100) width = 1200;
    if (height < 100) height = 800;
    
    try {
      const sketch = sketchFunctions;
      sketch.setup(p, width, height);
      
      // Style canvas to fill container
      requestAnimationFrame(() => {
        const canvasElement = (p as any).canvas as HTMLCanvasElement | undefined;
        if (canvasElement && containerRef.current) {
          // Move canvas to our container if needed
          if (canvasElement.parentElement !== containerRef.current) {
            containerRef.current.appendChild(canvasElement);
          }
          
          // Make canvas fill container
          canvasElement.style.width = '100%';
          canvasElement.style.height = '100%';
          canvasElement.style.display = 'block';
          canvasElement.style.position = 'absolute';
          canvasElement.style.top = '0';
          canvasElement.style.left = '0';
        }
      });
    } catch (error) {
      console.error('Error in sketch.setup:', error);
    }
  };

  const draw = (p: p5) => {
    if (sketchFunctions) {
      try {
        sketchFunctions.draw(p);
      } catch (error) {
        console.error('Error in draw:', error);
      }
    }
  };

  const windowResized = (p: p5) => {
    if (sketchFunctions && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      sketchFunctions.windowResized?.(p, rect.width, rect.height);
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

  if (!ecosystem) {
    return (
      <div className="flex items-center justify-center h-full bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Initializing ecosystem...</p>
        </div>
      </div>
    );
  }

  if (!sketchFunctions) {
    return (
      <div className="flex items-center justify-center h-full bg-background">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Creating sketch...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full" 
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%',
        minHeight: '100%',
        backgroundColor: 'transparent'
      }}
    >
      <Sketch 
        setup={setup as any} 
        draw={draw as any} 
        windowResized={windowResized as any}
        mouseMoved={mouseMoved as any} 
        mousePressed={mousePressed as any} 
      />
    </div>
  );
}

