export async function GET() {
  return new Response(JSON.stringify({ ok: true, source: 'app-hosting' }), {
    headers: { 'content-type': 'application/json' },
    status: 200,
  });
}
