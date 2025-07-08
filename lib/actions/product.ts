import { cache } from 'react';

const mockCategories = [
  { id: 1, name: 'T-Shirts', slug: 't-shirts' },
  { id: 2, name: 'Hoodies', slug: 'hoodies' },
  { id: 3, name: 'Stickers', slug: 'stickers' },
  { id: 4, name: 'Mugs', slug: 'mugs' },
  { id: 5, name: 'Accessories', slug: 'accessories' },
];

const mockProducts = [
  {
    id: 1,
    name: 'Frontend Dev Tee',
    slug: 'frontend-dev-tee',
    description: 'Perfect tee for frontend developers',
    price: '29.00',
    images: ['/images/frontend-tee.jpg'],
    categoryId: 1,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL'],
    category: { id: 1, name: 'T-Shirts', slug: 't-shirts' },
  },
  {
    id: 2,
    name: 'Code & Coffee Mug',
    slug: 'code-coffee-mug',
    description: 'Start your day with code and coffee',
    price: '21.00',
    images: ['/images/coffee-mug.jpg'],
    categoryId: 4,
    inStock: true,
    sizes: [],
    category: { id: 4, name: 'Mugs', slug: 'mugs' },
  },
  {
    id: 3,
    name: 'Git Sticker Pack',
    slug: 'git-sticker-pack',
    description: 'Collection of Git-themed stickers',
    price: '12.00',
    images: ['/images/git-stickers.jpg'],
    categoryId: 3,
    inStock: true,
    sizes: [],
    category: { id: 3, name: 'Stickers', slug: 'stickers' },
  },
  {
    id: 4,
    name: 'Debug Hoodie',
    slug: 'debug-hoodie',
    description: 'Cozy hoodie for debugging sessions',
    price: '65.00',
    images: ['/images/debug-hoodie.jpg'],
    categoryId: 2,
    inStock: true,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    category: { id: 2, name: 'Hoodies', slug: 'hoodies' },
  },
  {
    id: 5,
    name: 'API Keychain',
    slug: 'api-keychain',
    description: 'Keep your keys organized like your APIs',
    price: '8.00',
    images: ['/images/api-keychain.jpg'],
    categoryId: 5,
    inStock: true,
    sizes: [],
    category: { id: 5, name: 'Accessories', slug: 'accessories' },
  },
  {
    id: 6,
    name: 'Stack Overflow Mug',
    slug: 'stack-overflow-mug',
    description: 'For when you need help with your coffee',
    price: '24.00',
    images: ['/images/stackoverflow-mug.jpg'],
    categoryId: 4,
    inStock: true,
    sizes: [],
    category: { id: 4, name: 'Mugs', slug: 'mugs' },
  },
  {
    id: 7,
    name: 'Terminal Stickers',
    slug: 'terminal-stickers',
    description: 'Command line themed sticker collection',
    price: '15.00',
    images: ['/images/terminal-stickers.jpg'],
    categoryId: 3,
    inStock: true,
    sizes: [],
    category: { id: 3, name: 'Stickers', slug: 'stickers' },
  },
  {
    id: 8,
    name: 'Laptop Stand',
    slug: 'laptop-stand',
    description: 'Ergonomic stand for developers',
    price: '89.00',
    images: ['/images/laptop-stand.jpg'],
    categoryId: 5,
    inStock: true,
    sizes: [],
    category: { id: 5, name: 'Accessories', slug: 'accessories' },
  },
];

export const getAllProducts = cache(async () => {
  try {
    return mockProducts;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
});

export const getProductBySlug = cache(async (slug: string) => {
  try {
    const product = mockProducts.find(p => p.slug === slug);
    return product || null;
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    return null;
  }
});

export const getProductsByCategory = cache(async (categorySlug: string) => {
  try {
    const filtered = mockProducts.filter(p => p.category.slug === categorySlug);
    return filtered;
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return [];
  }
});

export const getAllCategories = cache(async () => {
  try {
    return mockCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
});
