import { chromium } from 'playwright';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { latexToHtml, buildHtmlDocument } from '$lib/latexToHtml';

export const POST: RequestHandler = async ({ request }) => {
  let source: unknown;
  try {
    ({ source } = (await request.json()) as { source: unknown });
  } catch {
    return json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (typeof source !== 'string' || !source.trim()) {
    return json({ error: 'source is required' }, { status: 400 });
  }

  let browser;
  try {
    const html = buildHtmlDocument(latexToHtml(source));

    browser = await chromium.launch();
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load' });

    const pdfBytes = await page.pdf({
      format: 'Letter',
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      printBackground: true,
    });

    return new Response(new Uint8Array(pdfBytes), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
      },
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return json({ error: `PDF generation failed:\n${msg}` }, { status: 422 });
  } finally {
    await browser?.close();
  }
};
