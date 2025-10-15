import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // In a real implementation, you would trigger a background job
  // to recalculate scores for all relevant companies.
  console.log('Recalculating all company scores.');

  return NextResponse.json({ message: 'Score recalculation started' }, { status: 200 });
}
