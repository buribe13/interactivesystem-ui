"use client";

import React, { useMemo, useRef, useEffect } from "react";
import { Ecosystem } from "@/lib/ecosystem/Ecosystem";
import { createP5Sketch } from "@/lib/p5-sketch";
import type p5 from "p5";

interface P5CanvasProps {
  ecosystem: Ecosystem | null;
}

export function P5Canvas({ ecosystem }: P5CanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  const sketchFunctions = useMemo(() => {
    if (!ecosystem) return null;
    try {
      return createP5Sketch(ecosystem);
    } catch (error) {
      console.error("Error creating p5 sketch:", error);
      return null;
    }
  }, [ecosystem]);

  useEffect(() => {
    if (!sketchFunctions || !containerRef.current) return;

    let myP5: p5 | null = null;

    const initP5 = async () => {
      try {
        // Dynamically import p5 to ensure it only loads on the client
        const p5Module = await import("p5");
        const p5Constructor = p5Module.default;

        const sketch = (p: p5) => {
          p.setup = () => {
            // Get dimensions from the container
            let width = 1200;
            let height = 800;

            if (containerRef.current) {
              const rect = containerRef.current.getBoundingClientRect();
              if (rect.width > 0 && rect.height > 0) {
                width = Math.floor(rect.width);
                height = Math.floor(rect.height);
              }
            }

            // Ensure minimum dimensions
            if (width < 100) width = 1200;
            if (height < 100) height = 800;

            if (sketchFunctions.setup) {
              sketchFunctions.setup(p, width, height);
            } else {
              p.createCanvas(width, height);
            }

            // Style canvas to fill container
            const canvasElement = (p as any).canvas as
              | HTMLCanvasElement
              | undefined;
            if (canvasElement) {
              canvasElement.style.width = "100%";
              canvasElement.style.height = "100%";
              canvasElement.style.display = "block";
            }
          };

          p.draw = () => {
            if (sketchFunctions.draw) sketchFunctions.draw(p);
          };

          p.windowResized = () => {
            if (containerRef.current) {
              const rect = containerRef.current.getBoundingClientRect();
              if (sketchFunctions.windowResized) {
                sketchFunctions.windowResized(p, rect.width, rect.height);
              }
            }
          };

          if (sketchFunctions.mouseMoved) {
            p.mouseMoved = () => sketchFunctions.mouseMoved!(p);
          }

          if (sketchFunctions.mousePressed) {
            p.mousePressed = () => sketchFunctions.mousePressed!(p);
          }
        };

        // Create p5 instance
        if (containerRef.current) {
          // Clean up existing instance if any
          if (p5InstanceRef.current) {
            try {
              p5InstanceRef.current.remove();
            } catch (e) {
              // Ignore cleanup errors
            }
          }

          myP5 = new p5Constructor(sketch, containerRef.current);
          p5InstanceRef.current = myP5;
        }
      } catch (error) {
        console.error("Error initializing p5:", error);
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      initP5();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (myP5) {
        try {
          myP5.remove();
        } catch (e) {
          // Ignore cleanup errors
        }
        p5InstanceRef.current = null;
      }
    };
  }, [sketchFunctions]);

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
      className="w-full h-full relative"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "100%",
        backgroundColor: "transparent",
      }}
    />
  );
}
