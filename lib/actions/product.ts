import { db } from '@/db';
import { products, categories } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { cache } from 'react';

export const getAllProducts = cache(async () => {
  try {
    const result = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        price: products.price,
        images: products.images,
        categoryId: products.categoryId,
        inStock: products.inStock,
        sizes: products.sizes,
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
        },
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.inStock, true));
    
    return result;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
});

export const getProductBySlug = cache(async (slug: string) => {
  try {
    const result = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        price: products.price,
        images: products.images,
        categoryId: products.categoryId,
        inStock: products.inStock,
        sizes: products.sizes,
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
        },
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(products.slug, slug))
      .limit(1);
    
    return result[0] || null;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
});

export const getProductsByCategory = cache(async (categorySlug: string) => {
  try {
    const result = await db
      .select({
        id: products.id,
        name: products.name,
        slug: products.slug,
        description: products.description,
        price: products.price,
        images: products.images,
        categoryId: products.categoryId,
        inStock: products.inStock,
        sizes: products.sizes,
        category: {
          id: categories.id,
          name: categories.name,
          slug: categories.slug,
        },
      })
      .from(products)
      .leftJoin(categories, eq(products.categoryId, categories.id))
      .where(eq(categories.slug, categorySlug))
      .where(eq(products.inStock, true));
    
    return result;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
});

export const getAllCategories = cache(async () => {
  try {
    const result = await db.select().from(categories);
    return result;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
});
