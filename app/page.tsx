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
        style: {
          version: 8,
          sources: {
              'wms-test-source': {
                  type: 'raster',
                  // use the tiles option to specify a WMS tile source URL
                  // https://maplibre.org/maplibre-style-spec/sources/
                  tiles: [
                      'https://ows.terrestris.de/osm/service?service=WMS&request=GetMap&version=1.1.1&layers=TOPO-WMS%2COSM-Overlay-WMS&styles=&format=image%2Fpng&transparent=true&info_format=text%2Fhtml&tiled=false&srs=EPSG:3857&bbox={bbox-epsg-3857}&width=256&height=256'
                  ],
                  tileSize: 256
              }
          },
          layers: [{
              id: 'wms-test-layer',
              type: 'raster',
              source: 'wms-test-source',
              paint: {}
          }]
      },
      zoom: 8,
      center: [-74.5447, 40.6892]
    });

    return () => map.remove();
  }, []);

  return <div ref={containerRef} className="h-screen w-screen" />;
}
