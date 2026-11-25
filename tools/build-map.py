#!/usr/bin/env python3
"""Membuat path SVG peta 15 kabupaten/kota Lampung dari GeoJSON BIG 2026.
Sumber: dmxsan/indonesia-admin-boundaries (data batas BIG, edisi 2026).
Jalankan: python3 tools/build-map.py path/ke/Lampung.geojson
"""
import json, math, re, sys, os
from shapely.geometry import shape

src = sys.argv[1] if len(sys.argv) > 1 else 'Lampung.geojson'
d = json.load(open(src))
feats = d['features']

xs, ys = [], []
for f in feats:
    g = shape(f['geometry'])
    polys = list(g.geoms) if g.geom_type == 'MultiPolygon' else [g]
    for p in polys:
        b = p.bounds
        xs += [b[0], b[2]]; ys += [b[1], b[3]]
minlon, maxlon, minlat, maxlat = min(xs), max(xs), min(ys), max(ys)
midlat = math.radians((minlat + maxlat) / 2)
cos = math.cos(midlat)
W, H = 800, 900
pad = 30
geo_w = (maxlon - minlon) * cos
geo_h = maxlat - minlat
scale = min((W - 2 * pad) / geo_w, (H - 2 * pad) / geo_h)
offx = (W - geo_w * scale) / 2
offy = (H - geo_h * scale) / 2

def project(lon, lat):
    return (offx + (lon - minlon) * cos * scale, offy + (maxlat - lat) * scale)

def slug(s):
    return re.sub(r'[^a-z0-9]+','-', s.lower().replace('kota ','')).strip('-')

tolerance = 0.0015
area_min = 2e-5
out = []
all_paths = []
for f in feats:
    name = f['properties']['WADMKK']
    g = shape(f['geometry']).simplify(tolerance, preserve_topology=True)
    polys = list(g.geoms) if g.geom_type == 'MultiPolygon' else [g]
    parts = []
    largest = None
    for p in polys:
        if p.area < area_min:
            continue
        if largest is None or p.area > largest.area:
            largest = p
        coords = list(p.exterior.coords)
        pt = [project(x, y) for x, y in coords]
        # drop duplicate closing point; close with Z
        if pt[0] == pt[-1]:
            pt = pt[:-1]
        seg = [f'M{pt[0][0]:.1f},{pt[0][1]:.1f}']
        for x, y in pt[1:]:
            seg.append(f'L{x:.1f},{y:.1f}')
        seg.append('Z')
        parts.append(''.join(seg))
    path = ''.join(parts)
    all_paths.append(path)
    rp = largest.representative_point() if largest else None
    cx, cy = project(rp.x, rp.y) if rp else (0, 0)
    b = shape(f['geometry']).bounds
    tl = project(b[0], b[3]); br = project(b[2], b[1])
    out.append({
        'id': slug(name), 'name': name, 'path': path,
        'cx': round(cx, 1), 'cy': round(cy, 1),
        'bbox': [round(tl[0], 1), round(tl[1], 1), round(br[0], 1), round(br[1], 1)],
    })

# Outer border path: use all parts, fill-rule evenodd not needed
js = 'window.RJ_MAP = ' + json.dumps({'width': W, 'height': H, 'regencies': out}, ensure_ascii=False, separators=(',', ':')) + ';\n'
os.makedirs('assets/js', exist_ok=True)
open('assets/js/map-data.js', 'w').write(js)
print('wrote assets/js/map-data.js', len(js), 'bytes', len(out), 'regencies')
# preview
preview = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="800" height="900"><rect width="100%" height="100%" fill="#F6F0E4"/>'
colors = ['#8A2B3D','#2F5D50','#C6933D','#6E4331','#A85A3C','#446B5C','#9E7B3E','#743C4B','#52705E','#B08446','#5B4A3F','#8C6B4C','#3E5C50','#A74E44','#6C7A52']
for i, r in enumerate(out):
    preview += f'<path d="{r["path"]}" fill="{colors[i%len(colors)]}" stroke="#F6F0E4" stroke-width="2"/>'
    preview += f'<text x="{r["cx"]}" y="{r["cy"]}" font-size="13" fill="white" text-anchor="middle">{r["name"]}</text>'
preview += '</svg>'
open('/private/var/folders/q0/ctvg6w9x65s42rmcdt10x96r0000gn/T/opencode/map-preview.svg','w').write(preview)
print('preview written')
