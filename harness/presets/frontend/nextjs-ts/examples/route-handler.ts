import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * 예: app/api/items/route.ts
 * 프리셋 기본 Route Handler 패턴.
 * - Zod 스키마로 입력 검증
 * - 공통 에러 응답 포맷
 * - 공개 엔드포인트면 `dynamic = 'force-dynamic'`, 캐시 가능하면 기본값
 */

const CreateItemSchema = z.object({
  name: z.string().min(1).max(120),
  priority: z.enum(['low', 'normal', 'high']).default('normal'),
});

type ApiError = { code: string; message: string; details?: unknown };

function errorResponse(status: number, error: ApiError): NextResponse {
  return NextResponse.json({ error }, { status });
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const search = request.nextUrl.searchParams.get('q') ?? '';
  return NextResponse.json({ items: [], query: search });
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = await request.json().catch(() => null);
  const parsed = CreateItemSchema.safeParse(body);

  if (!parsed.success) {
    return errorResponse(400, {
      code: 'invalid_payload',
      message: 'Invalid request body',
      details: parsed.error.flatten(),
    });
  }

  return NextResponse.json({ item: parsed.data }, { status: 201 });
}
