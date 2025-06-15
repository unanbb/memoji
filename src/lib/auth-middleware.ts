import { auth } from '@/auth';
import { type NextRequest, NextResponse } from 'next/server';

type RouteContext = {
  params: Promise<Record<string, string>>;
};

export function withAuth(
  handler: (
    req: NextRequest,
    context: { userId: string; params: Promise<Record<string, string>> },
  ) => Promise<Response>,
): (req: NextRequest, context: RouteContext) => Promise<Response> {
  return async (req, context) => {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return handler(req, {
      userId: session.user.id,
      params: context.params,
    });
  };
}
