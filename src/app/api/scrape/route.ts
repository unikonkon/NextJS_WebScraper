import { NextRequest, NextResponse } from 'next/server';
import { fetchHtmlContent } from '@/utils/scraper';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL parameter is required' }, { status: 400 });
    }

    // Use the scraper utility to fetch content
    const { html, styles, imageUrls } = await fetchHtmlContent(url);

    return NextResponse.json({
      html,
      styles,
      imageUrls,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error scraping URL:', error);
    return NextResponse.json({
      error: 'Failed to scrape URL',
      message: (error as Error).message
    }, { status: 500 });
  }
}
