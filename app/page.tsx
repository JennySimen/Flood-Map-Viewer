'use client';

import { useEffect, useRef, useState } from 'react';
import { Map, setWorkerUrl } from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import type { RasterTileSource } from 'maplibre-gl'
import DataPanel from './DataPanel';

setWorkerUrl('/maplibre-gl-worker.mjs');

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<Map | null>(null);

  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(8);

  const getStartDate = (year: number, month: number) => new Date(Date.UTC(year, month - 1, 1));

  const getEndDate = (year: number, month: number) => new Date(Date.UTC(year, month, 0, 23, 59, 59));

  const FLOOD_BASE = 'https://geoserver.gfm.eodc.eu/geoserver/gfm/wms';

  function floodTileUrl(year: number, month: number): string {
    const start = getStartDate(year, month).toISOString();
    const end = getEndDate(year, month).toISOString();

    const params = [
      'service=WMS',
      'version=1.3.0',
      'request=GetMap',
      'layers=observed_flood_extent',
      'styles=',
      'crs=EPSG:3857',
      'bbox={bbox-epsg-3857}',
      'width=256',
      'height=256',
      'format=image/png',
      'transparent=true',
      `time=${start}/${end}`,
    ];

    const url = `${FLOOD_BASE}?${params.join('&')}`;
    return url;
  }

  useEffect(() => {
    if (!containerRef.current) return;


    const map = new Map({
      container: containerRef.current,
      style: {
        version: 8,
        sources: {
          'flooding': {
            type: 'raster',
            tiles: [floodTileUrl(year, month)],
            tileSize: 256
          },
          satellite: {
            type: 'raster',
            tiles: ['https://tiles.maps.eox.at/wms?service=WMS&version=1.3.0&request=GetMap&layers=s2cloudless-2025_3857&styles=&crs=EPSG:3857&bbox={bbox-epsg-3857}&width=256&height=256&format=image/jpeg'],
            tileSize: 256,
            attribution: '<a href="https://cloudless.eox.at" target="_blank">EOxCloudless</a> by <a href="https://eox.at/" target="_blank">EOX IT Services GmbH</a> (Contains modified Copernicus Sentinel data 2025)',
          },
        },
        layers: [
          { id: 'satellite-layer', type: 'raster', source: 'satellite' }, {
            id: 'flood-layer',
            type: 'raster',
            source: 'flooding',
            paint: {}
          }]
      },
      zoom: 9,
      center: [14.9, 10.9],
    });

    mapRef.current = map;
    return () => map.remove();
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const source = map.getSource<RasterTileSource>('flooding');
    source?.setTiles([floodTileUrl(year, month)]);
  }, [year, month]);

  return (
    <div className="relative h-screen w-screen">
      <div ref={containerRef} className="h-full w-full" />
      <DataPanel  year={year} onYearChange={setYear} month={month} onMonthChange={setMonth}/>
    </div>
  );
}
