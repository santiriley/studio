import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { url } = body;

  if (!url) {
    return NextResponse.json({ error: 'URL is required' }, { status: 400 });
  }

  // In a real implementation, you would queue this for background processing.
  console.log(`Ingestion queued for URL: ${url}`);

  return NextResponse.json({ message: 'Ingestion process started' }, { status: 202 });
}
