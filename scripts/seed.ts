import { db } from '../db';
import { categories, products } from '../db/schema';

async function seed() {
  console.log('Starting database seed...');

  const categoryData = [
    { name: 'T-Shirts', slug: 't-shirts' },
    { name: 'Hoodies', slug: 'hoodies' },
    { name: 'Stickers', slug: 'stickers' },
    { name: 'Mugs', slug: 'mugs' },
    { name: 'Accessories', slug: 'accessories' },
  ];

  console.log('Inserting categories...');
  const insertedCategories = await db.insert(categories).values(categoryData).returning();

  const tshirtCategory = insertedCategories.find(c => c.slug === 't-shirts');
  const hoodieCategory = insertedCategories.find(c => c.slug === 'hoodies');
  const stickerCategory = insertedCategories.find(c => c.slug === 'stickers');
  const mugCategory = insertedCategories.find(c => c.slug === 'mugs');
  const accessoryCategory = insertedCategories.find(c => c.slug === 'accessories');

  const productData = [
    {
      name: 'Frontend Dev Tee',
      slug: 'frontend-dev-tee',
      description: 'Perfect tee for frontend developers who love clean code and pixel-perfect designs.',
      price: '29.00',
      images: ['/images/frontend-tee.jpg'],
      categoryId: tshirtCategory?.id,
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL'],
    },
    {
      name: 'Code & Coffee Mug',
      slug: 'code-coffee-mug',
      description: 'Start your coding sessions right with this premium ceramic mug.',
      price: '21.00',
      images: ['/images/coffee-mug.jpg'],
      categoryId: mugCategory?.id,
      inStock: true,
      sizes: ['Standard'],
    },
    {
      name: 'Git Sticker Pack',
      slug: 'git-sticker-pack',
      description: 'Collection of Git-themed stickers for your laptop and workspace.',
      price: '12.00',
      images: ['/images/git-stickers.jpg'],
      categoryId: stickerCategory?.id,
      inStock: true,
      sizes: ['Pack of 10'],
    },
    {
      name: 'Debug Hoodie',
      slug: 'debug-hoodie',
      description: 'Cozy hoodie for those long debugging sessions.',
      price: '65.00',
      images: ['/images/debug-hoodie.jpg'],
      categoryId: hoodieCategory?.id,
      inStock: true,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    },
    {
      name: 'API Keychain',
      slug: 'api-keychain',
      description: 'Minimalist keychain for API enthusiasts.',
      price: '8.00',
      images: ['/images/api-keychain.jpg'],
      categoryId: accessoryCategory?.id,
      inStock: true,
      sizes: ['One Size'],
    },
    {
      name: 'Stack Overflow Mug',
      slug: 'stack-overflow-mug',
      description: 'For developers who live on Stack Overflow.',
      price: '24.00',
      images: ['/images/stackoverflow-mug.jpg'],
      categoryId: mugCategory?.id,
      inStock: true,
      sizes: ['Standard'],
    },
    {
      name: 'Terminal Stickers',
      slug: 'terminal-stickers',
      description: 'Command line themed sticker collection.',
      price: '15.00',
      images: ['/images/terminal-stickers.jpg'],
      categoryId: stickerCategory?.id,
      inStock: true,
      sizes: ['Pack of 8'],
    },
    {
      name: 'Laptop Stand',
      slug: 'laptop-stand',
      description: 'Ergonomic laptop stand for better coding posture.',
      price: '89.00',
      images: ['/images/laptop-stand.jpg'],
      categoryId: accessoryCategory?.id,
      inStock: true,
      sizes: ['Universal'],
    },
    {
      name: 'Frontend Wall Clock',
      slug: 'frontend-wall-clock',
      description: 'Time management for frontend developers.',
      price: '45.00',
      images: ['/images/frontend-clock.jpg'],
      categoryId: accessoryCategory?.id,
      inStock: true,
      sizes: ['12 inch'],
    },
    {
      name: 'Backend Dark Roast',
      slug: 'backend-dark-roast',
      description: 'Premium coffee blend for backend developers.',
      price: '18.00',
      images: ['/images/backend-coffee.jpg'],
      categoryId: accessoryCategory?.id,
      inStock: true,
      sizes: ['250g'],
    },
    {
      name: 'Fullstack Desk Lamp',
      slug: 'fullstack-desk-lamp',
      description: 'Illuminate your full-stack development workspace.',
      price: '89.00',
      images: ['/images/fullstack-lamp.jpg'],
      categoryId: accessoryCategory?.id,
      inStock: true,
      sizes: ['Adjustable'],
    },
    {
      name: 'DevOps Coffee Kettle',
      slug: 'devops-coffee-kettle',
      description: 'Automate your coffee brewing process.',
      price: '125.00',
      images: ['/images/devops-kettle.jpg'],
      categoryId: accessoryCategory?.id,
      inStock: true,
      sizes: ['1.5L'],
    },
    {
      name: 'JavaScript Desk Light',
      slug: 'javascript-desk-light',
      description: 'Bright ideas for JavaScript developers.',
      price: '67.00',
      images: ['/images/js-light.jpg'],
      categoryId: accessoryCategory?.id,
      inStock: true,
      sizes: ['LED'],
    },
    {
      name: 'React Data Visualizer',
      slug: 'react-data-visualizer',
      description: 'Visualize your React component tree.',
      price: '156.00',
      images: ['/images/react-visualizer.jpg'],
      categoryId: accessoryCategory?.id,
      inStock: true,
      sizes: ['Digital'],
    },
    {
      name: 'Python Code Mug',
      slug: 'python-code-mug',
      description: 'Pythonic way to enjoy your beverages.',
      price: '42.00',
      images: ['/images/python-mug.jpg'],
      categoryId: mugCategory?.id,
      inStock: true,
      sizes: ['Standard'],
    },
  ];

  console.log('Inserting products...');
  await db.insert(products).values(productData);

  console.log('Database seed completed successfully!');
}

seed().catch((error) => {
  console.error('Error seeding database:', error);
  process.exit(1);
});
