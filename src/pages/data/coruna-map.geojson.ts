import geography from '../../data/coruna-map.json';

export function GET() {
  return new Response(JSON.stringify(geography), {
    headers: { 'Content-Type': 'application/geo+json; charset=utf-8' },
  });
}
