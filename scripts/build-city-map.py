#!/usr/bin/env python3
"""Prepare the local SVG's geographic data from two Overpass JSON exports.

Usage: python3 scripts/build-city-map.py BASE.json DETAIL.json
Coordinates remain longitude/latitude. OSM attribution and ODbL apply.
"""
import json
import math
import sys
from pathlib import Path

BBOX = [-8.426, 43.3555, -8.374, 43.392]
WEST, SOUTH, EAST, NORTH = BBOX
WIDTH = 760
SCALE = WIDTH / ((EAST - WEST) * math.cos(math.radians(43.374)))
HEIGHT = round((NORTH - SOUTH) * SCALE)


def project(point):
    lon, lat = point
    return ((lon - WEST) * math.cos(math.radians(43.374)) * SCALE, (NORTH - lat) * SCALE)


def simplify(points, tolerance=0.55):
    """Douglas–Peucker in SVG units, preserving endpoints."""
    if len(points) < 3:
        return points
    x1, y1 = project(points[0])
    x2, y2 = project(points[-1])
    dx, dy = x2 - x1, y2 - y1
    length = dx * dx + dy * dy
    furthest, index = 0, 0
    for i, point in enumerate(points[1:-1], 1):
        x, y = project(point)
        t = max(0, min(1, ((x - x1) * dx + (y - y1) * dy) / length)) if length else 0
        distance = (x - x1 - t * dx) ** 2 + (y - y1 - t * dy) ** 2
        if distance > furthest:
            furthest, index = distance, i
    if furthest > tolerance * tolerance:
        return simplify(points[:index + 1], tolerance)[:-1] + simplify(points[index:], tolerance)
    return [points[0], points[-1]]


def clip_polygon(points):
    """Clip a ring to the viewport, retaining real coastline vertices."""
    output = points[:-1] if points[0] == points[-1] else points[:]
    for axis, bound, sign in [(0, WEST, 1), (0, EAST, -1), (1, SOUTH, 1), (1, NORTH, -1)]:
        source, output = output, []
        if not source:
            break
        previous = source[-1]
        for point in source:
            previous_in = (previous[axis] - bound) * sign >= 0
            point_in = (point[axis] - bound) * sign >= 0
            if previous_in != point_in:
                t = (bound - previous[axis]) / (point[axis] - previous[axis])
                output.append([previous[j] + t * (point[j] - previous[j]) for j in range(2)])
            if point_in:
                output.append(point)
            previous = point
    if len(output) < 3:
        return []
    return simplify(output + [output[0]])


def area(points):
    projected = [project(p) for p in points]
    return abs(sum(a[0] * b[1] - b[0] * a[1] for a, b in zip(projected, projected[1:]))) / 2


def clip_line(points):
    """Liang–Barsky clipping; split a way if it leaves and re-enters the frame."""
    parts, current = [], []
    for a, b in zip(points, points[1:]):
        dx, dy = b[0] - a[0], b[1] - a[1]
        start, end = 0, 1
        for p, q in [(-dx, a[0] - WEST), (dx, EAST - a[0]), (-dy, a[1] - SOUTH), (dy, NORTH - a[1])]:
            if p == 0:
                if q < 0:
                    start, end = 1, 0
                    break
            elif p < 0:
                start = max(start, q / p)
            else:
                end = min(end, q / p)
        if start <= end:
            clipped_a = [a[0] + start * dx, a[1] + start * dy]
            clipped_b = [a[0] + end * dx, a[1] + end * dy]
            if current and current[-1] != clipped_a:
                parts.append(current)
                current = []
            if not current:
                current.append(clipped_a)
            current.append(clipped_b)
        elif current:
            parts.append(current)
            current = []
    if current:
        parts.append(current)
    return parts


def coordinates(way):
    return [[p['lon'], p['lat']] for p in way['geometry']]


def feature(kind, points, osm_id=None, name=None, polygon=False, **properties):
    if polygon and sum(a[0] * b[1] - b[0] * a[1] for a, b in zip(points, points[1:])) < 0:
        points = points[::-1]
    rounded = [[round(n, 7) for n in point] for point in points]
    return {
        'type': 'Feature',
        'properties': {'kind': kind, **({'osm_id': osm_id} if osm_id else {}), **({'name': name} if name else {}), **properties},
        'geometry': {'type': 'Polygon' if polygon else 'LineString', 'coordinates': [rounded] if polygon else rounded},
    }


base, detail = [json.loads(Path(path).read_text()) for path in sys.argv[1:3]]
ways = {way['id']: way for data in (base, detail) for way in data['elements'] if way['type'] == 'way' and 'geometry' in way}
coast = [coordinates(way) for way in ways.values() if way['tags'].get('natural') == 'coastline']
open_coast = [line for line in coast if line[0] != line[-1]]
starts = {tuple(line[0]): line for line in open_coast}
ends = {tuple(line[-1]) for line in open_coast}
chains = []
for line in open_coast:
    if tuple(line[0]) in ends:
        continue
    joined = line[:]
    visited = {tuple(line[0])}
    while tuple(joined[-1]) in starts:
        key = tuple(joined[-1])
        if key in visited:
            raise ValueError('Unexpected loop in the mainland coastline')
        visited.add(key)
        joined += starts[key][1:]
    chains.append(joined)
if len(chains) != 1:
    raise ValueError(f'Expected one mainland coastline; got {len(chains)}')

# The open chain runs from the port in the southeast to the western coast.
# Close it outside the viewport, on the land side, before clipping.
mainland = clip_polygon(chains[0] + [[-8.46, 43.32], [-8.36, 43.32], chains[0][0]])
features = [feature('land', mainland, polygon=True)]
for line in coast:
    if line[0] == line[-1]:
        ring = clip_polygon(line)
        if ring and area(ring) > 2:
            features.append(feature('island', ring, polygon=True))

for way in ways.values():
    tags = way['tags']
    points = coordinates(way)
    if 'highway' in tags:
        # Drop ways wholly outside the drawing and clip any crossing segments.
        xs, ys = zip(*points)
        if max(xs) < WEST or min(xs) > EAST or max(ys) < SOUTH or min(ys) > NORTH:
            continue
        road_type = tags['highway']
        kind = 'path' if road_type in ('footway', 'cycleway', 'path') else 'road'
        for segment in clip_line(points):
            features.append(feature(kind, simplify(segment), way['id'], tags.get('name'), road_type=road_type))
    elif points[0] == points[-1] and (tags.get('leisure') in ('park', 'garden') or tags.get('landuse') in ('grass', 'meadow', 'recreation_ground') or tags.get('natural') in ('grassland', 'beach', 'wood')):
        ring = clip_polygon(points)
        if ring and area(ring) > 4:
            features.append(feature('beach' if tags.get('natural') == 'beach' else 'park', ring, way['id'], tags.get('name'), polygon=True))

result = {
    'type': 'FeatureCollection', 'bbox': BBOX,
    'source': '© OpenStreetMap contributors', 'license': 'ODbL-1.0',
    'license_url': 'https://www.openstreetmap.org/copyright',
    'source_timestamp': base['osm3s']['timestamp_osm_base'],
    'projection': {'width': WIDTH, 'height': HEIGHT, 'reference_latitude': 43.374},
    'features': features,
}
target = Path(__file__).resolve().parents[1] / 'src/data/coruna-map.json'
target.write_text(json.dumps(result, ensure_ascii=False, separators=(',', ':')) + '\n')
print(f'{len(features)} geographic features → {target} ({target.stat().st_size:,} bytes), {WIDTH} × {HEIGHT}')
