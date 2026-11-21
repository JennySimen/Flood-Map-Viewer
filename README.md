<img width="1915" height="871" alt="Screenshot 2026-11-21 184359" src="https://github.com/user-attachments/assets/a5ed7d0d-22a9-4309-bb9c-57cbd1f28d98" /># Flood Map Viewer

An interactive web map that shows flood water detected by the Copernicus Global Flood Monitoring (GFM) service, over a Sentinel-2 satellite basemap. Pick a year and month, and the map loads the flood detections for that window.

**Live demo:** [link here]

![Flood Map Viewer showing flood detections in the Far North Region of Cameroon](<img width="1915" height="871" alt="Screenshot 2026-11-21 184359" src="https://github.com/user-attachments/assets/29ca998c-d0f5-421d-b507-180a336c0874" />
)

## What it does
- Shows GFM's observed flood extent as a layer on top of a satellite basemap.
- A side panel lets you choose a year and a month. The map reloads the flood tiles for that window.
- A legend explains the colour: red means flood water.
- The map opens on the Far North Region of Cameroon (about 10.9°N, 14.9°E).

## Data
- **Flood layer:** Copernicus Emergency Management Service, Global Flood Monitoring (GFM). GFM maps flood extent automatically from Sentinel-1 radar imagery. The map requests it as WMS tiles (WMS 1.3.0, EPSG:3857).
- **Basemap:** EOxCloudless Sentinel-2 cloudless mosaic by EOX IT Services GmbH, requested as WMS tiles. It is used here under EOX's non-commercial terms, so this project is for personal and educational use.

## Stack
Next.js, TypeScript, React, MapLibre GL JS.

## Run it locally
```bash
npm install
npm run dev
```
Then open http://localhost:3000. You need Node.js 20 or newer. No API keys are needed.

## Limitations
- **Coverage is patchy.** A satellite only images a thin strip on each pass, so many places and dates show nothing. An empty map can mean no coverage, not no flooding.
- **A month combines several passes.** The map shows detections from every pass in the chosen month, drawn together. It is not a single moment.
- **Detections are automatic.** They come from GFM's radar algorithms and are not confirmed on the ground. GFM also publishes an exclusion mask for places where radar can't map floods reliably, which this project doesn't show yet.
- **Long ranges don't load.** A full-year range did not load from GFM's service in testing, so the picker works one month at a time.
- **The basemap is not current.** It is a cloudless mosaic, so it doesn't show today's conditions on the ground.

## Roadmap
- Containerise the app with Docker.
- Compare two months side by side.
- Optional layers, such as the reference water mask and the exclusion mask.

## Credits
- Flood data: Copernicus Emergency Management Service, Global Flood Monitoring (GFM).
- Basemap: [EOxCloudless](https://cloudless.eox.at) by [EOX IT Services GmbH](https://eox.at/) (Contains modified Copernicus Sentinel data 2025).
- Map library: [MapLibre GL JS](https://maplibre.org).
