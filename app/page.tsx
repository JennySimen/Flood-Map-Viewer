'use client';

import { useEffect, useRef } from 'react';
import { Map, setWorkerUrl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

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
          'flooding': {
            type: 'raster',
            tiles: [
              'https://geoserver.gfm.eodc.eu/geoserver/gfm/wms?service=WMS&version=1.3.0&request=GetMap&layers=observed_flood_extent&styles=&crs=EPSG:3857&bbox={bbox-epsg-3857}&width=256&height=256&format=image/png&transparent=true&time=2026-07-01T00:00:00.000Z/2026-08-31T23:59:59.000Z'],
            tileSize: 256
          },
          satellite: {
            type: 'raster',
            tiles: ['https://tiles.maps.eox.at/wms?service=WMS&version=1.3.0&request=GetMap&layers=s2cloudless-2025_3857&styles=&crs=EPSG:3857&bbox={bbox-epsg-3857}&width=256&height=256&format=image/jpeg'],
            tileSize: 256,
            attribution: '<a href="https://cloudless.eox.at" target="_blank">EOxCloudless</a> by <a href="https://eox.at/" target="_blank">EOX IT Services GmbH</a> (Contains modified Copernicus Sentinel data 2025)',          },
        },
        layers: [
          { id: 'satellite-layer', type: 'raster', source: 'satellite' },{
          id: 'flood-layer',
          type: 'raster',
          source: 'flooding',
          paint: {}
        }]
      },
      zoom: 9,
      center: [14.9, 10.9],
    });

    return () => map.remove();
  }, []);

  return <div ref={containerRef} className="h-screen w-screen" />;
}
