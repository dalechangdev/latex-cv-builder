import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

const API_BASE = env.API_BASE_URL ?? 'http://localhost:8000';

async function proxy(request: Request, path: string): Promise<Response> {
  const url = new URL(request.url);
  const upstream = `${API_BASE}/snippets${path ? `/${path}` : ''}${url.search}`;

  const init: RequestInit = { method: request.method, headers: request.headers };
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    init.body = await request.arrayBuffer();
  }

  const res = await fetch(upstream, init);
  return new Response(res.body, { status: res.status, headers: res.headers });
}

export const GET: RequestHandler = ({ request, params }) => proxy(request, params.path ?? '');
export const POST: RequestHandler = ({ request, params }) => proxy(request, params.path ?? '');
export const PATCH: RequestHandler = ({ request, params }) => proxy(request, params.path ?? '');
export const DELETE: RequestHandler = ({ request, params }) => proxy(request, params.path ?? '');
