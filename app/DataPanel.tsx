"use client";

import { useState } from "react";

const YEARS = [2023, 2024, 2025, 2026];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

type Props = {
    year: number;
    onYearChange: (year: number) => void;
    month: number;
    onMonthChange: (month: number) => void;
};

const selectClass =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30";
const labelClass = "mb-1 block text-xs font-medium uppercase tracking-wide text-slate-500";

export default function DatePanel({ year, onYearChange, month, onMonthChange }: Props) {
    const [aboutOpen, setAboutOpen] = useState(false);

    return (
        <div className="absolute left-4 top-4 z-10 max-h-[calc(100vh-2rem)] w-64 overflow-y-auto rounded-xl border border-white/40 bg-white/95 p-4 text-slate-900 shadow-lg">
            <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                <h2 className="flex-1 text-base font-semibold">Flood detections</h2>
                <button
                    type="button"
                    onClick={() => setAboutOpen(true)}
                    aria-label="About this map and missing data"
                    className="flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 text-xs text-slate-500 transition hover:bg-slate-100"
                >
                    i
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label htmlFor="year-select" className={labelClass}>Year</label>
                    <select
                        id="year-select"
                        className={selectClass}
                        value={year}
                        onChange={(e) => onYearChange(Number(e.target.value))}
                    >
                        {YEARS.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="month-select" className={labelClass}>Month</label>
                    <select
                        id="month-select"
                        className={selectClass}
                        value={month}
                        onChange={(e) => onMonthChange(Number(e.target.value))}
                    >
                        {MONTHS.map((m, i) => (
                            <option key={m} value={i + 1}>
                                {m}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <p className="mt-3 text-xs text-slate-500">
                Showing {MONTHS[month - 1]} {year}
            </p>

            <div className="mt-3 flex items-center gap-2">
                <span className="h-3.5 w-3.5 shrink-0 rounded-sm bg-[#E84C78]" aria-hidden />
                <span className="text-xs text-slate-700">Floodwater</span>
            </div>

            <button
                type="button"
                onClick={() => setAboutOpen((o) => !o)}
                aria-expanded={aboutOpen}
                className="mt-4 flex w-full items-center justify-between border-t border-slate-200 pt-3 text-xs font-medium uppercase tracking-wide text-slate-500"
            >
                About this map
                <span aria-hidden>{aboutOpen ? "−" : "+"}</span>
            </button>

            {aboutOpen && (
            <div className="mt-3">
                <h3 className="mb-1 text-xs font-medium uppercase tracking-wide text-slate-500">Location</h3>
                <p className="text-sm">Far North Region, Cameroon</p>
                <p className="mb-3 text-xs text-slate-500">Centred on about 10.9°N, 14.9°E</p>
                <p className="text-xs leading-relaxed text-slate-600">
                    Flood water detected by the Copernicus Global Flood Monitoring (GFM) service from
                    Sentinel-1 radar, shown over a Sentinel-2 satellite basemap. Coverage is patchy
                    because it depends on satellite passes.
                </p>
                <p className="mt-2 rounded-md bg-amber-50 px-2 py-1.5 text-xs leading-relaxed text-amber-800">
                    No flood detections shown can mean no satellite coverage, not necessarily no flooding.
                </p>
            </div>
            )}
        </div>
    );
}
