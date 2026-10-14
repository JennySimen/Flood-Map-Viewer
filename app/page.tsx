'use client';

import { useEffect, useRef } from 'react';
import { Map, setWorkerUrl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

// The bundler rewrites the library's import.meta.url, so it can't locate its own
// worker. Serve the worker from /public and point it there explicitly.
setWorkerUrl('/maplibre-gl-worker.mjs');

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const map = new Map({
      container: containerRef.current,
      style: 'https://demotiles.maplibre.org/globe.json', // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 1, // starting zoom
    });

    return () => map.remove();
  }, []);

  return <div ref={containerRef} className="h-screen w-screen" />;
}
