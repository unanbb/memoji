import { createCategory, getCategories, isCategoryExists } from '@/lib/services/category.service';
import { validateCategoryName } from '@/utils/validateCategoryName';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json({ categories: Array.from(categories) }, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category } = body;

    if (typeof category !== 'string' || !validateCategoryName(category)) {
      return NextResponse.json({ error: 'Invalid category name' }, { status: 400 });
    }

    if (await isCategoryExists(category)) {
      throw new Error('Category already exists');
    }

    const newCategoryId = await createCategory(category);
    return NextResponse.json({ id: newCategoryId }, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}
