import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const permissions = await prisma.permission.findMany({
      select: {
        id: true,
        name: true,
        parentId: true
      },
      orderBy: {
        name: 'asc'
      }
    });
    const serializedPermissions = permissions.map(permission => ({
      ...permission,
      id: permission.id.toString(),
      parentId: permission.parentId ? permission.parentId.toString() : null
    }));

    return NextResponse.json(serializedPermissions);
  } catch (error) {
    console.error('Error fetching permissions:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}