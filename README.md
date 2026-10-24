# Flood Map Viewer

A web map built with Next.js, TypeScript and MapLibre that shows flood data from the Copernicus Global Flood Monitoring (GFM) service.

**Status:** work in progress. The GFM layer loads on the map. I'm still looking for a date with flooding in the Southwest region of Cameroon, and the date selector and legend are not built yet.

## What it does
- Shows an interactive map (MapLibre GL JS).
- Adds GFM's observed flood extent as a WMS layer on top of the basemap.

## Data
Flood data comes from the Copernicus Emergency Management Service's Global Flood Monitoring product, which maps flood extent from Sentinel-1 radar imagery. The map uses GFM's WMS-T service (WMS 1.3.0, EPSG:3857, PNG tiles).

Credit: Copernicus Emergency Management Service / GFM. Check the current Copernicus terms for the exact attribution wording.

## Stack
Next.js, TypeScript, MapLibre GL JS.

## Run it locally
```bash
npm install
npm run dev
```
Then open http://localhost:3000.

## Limitations
- GFM data exists only where a Sentinel-1 satellite passed on that date, so many places and dates have no data.
- Some areas, such as dense forest, can't be mapped reliably by radar.

## What I learned
- (your notes here)

## Next steps
- Find a date with flooding in the Southwest region and use it as the default.
- Add a date selector and a legend.
- Deploy to Vercel.
