import { auth } from '@/auth';
import { type NextRequest, NextResponse } from 'next/server';

export function withAuth<T = Record<string, string>>(
  handler: (req: NextRequest, context: { userId: string; params?: T }) => Promise<Response>,
) {
  return async (req: NextRequest, routeContext?: { params: T }) => {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return handler(req, {
      userId: session.user.id,
      params: routeContext?.params,
    });
  };
}
