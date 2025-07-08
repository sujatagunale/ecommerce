import React from 'react';
import Link from 'next/link';
import { getAllProducts } from '@/lib/actions/product';

async function ProductGrid() {
  const products = await getAllProducts();
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
      {products.map((product) => (
        <div key={product.id} className="group cursor-pointer">
          <div className="bg-gray-100 rounded-lg overflow-hidden mb-4 aspect-square flex items-center justify-center">
            <span className="text-gray-500">{product.name}</span>
          </div>
          <h3 className="font-medium mb-1">{product.name}</h3>
          <p className="text-gray-medium text-sm">US$ {product.price}</p>
        </div>
      ))}
    </div>
  );
}

export default async function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-foreground hover:text-accent transition-colors">Home</Link>
            <Link href="/products" className="text-foreground hover:text-accent transition-colors">Shop</Link>
            <Link href="#" className="text-foreground hover:text-accent transition-colors">Categories</Link>
            <Link href="#" className="text-foreground hover:text-accent transition-colors">Pages</Link>
          </nav>
          
          <div className="text-2xl font-bold tracking-wider">
            DEVSWAG
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:text-accent transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="p-2 hover:text-accent transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="p-2 hover:text-accent transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <button className="p-2 hover:text-accent transition-colors relative">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
              </svg>
              <span className="absolute -top-1 -right-1 bg-accent text-black text-xs rounded-full w-4 h-4 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <nav className="text-sm text-gray-medium mb-8">
          <Link href="/" className="hover:text-foreground transition-colors cursor-pointer">Home</Link>
          <span className="mx-2">→</span>
          <span className="text-foreground font-medium">Product Listing</span>
        </nav>

        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold">Developer Swag</h1>
            <div className="flex space-x-6">
              <button className="text-foreground border-b-2 border-accent pb-1 font-medium">Active</button>
              <button className="text-gray-medium hover:text-foreground transition-colors pb-1">Inactive</button>
            </div>
          </div>
          
          <button className="border border-gray-300 rounded px-4 py-2 text-sm hover:border-gray-400 transition-colors">
            Filter by
          </button>
        </div>

        <ProductGrid />

        <div className="flex items-center justify-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-foreground transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="flex space-x-2">
            <button className="w-8 h-8 rounded bg-foreground text-background text-sm font-medium">1</button>
            <button className="w-8 h-8 rounded text-gray-medium hover:text-foreground transition-colors text-sm">2</button>
            <button className="w-8 h-8 rounded text-gray-medium hover:text-foreground transition-colors text-sm">3</button>
            <span className="w-8 h-8 flex items-center justify-center text-gray-medium text-sm">...</span>
            <button className="w-8 h-8 rounded text-gray-medium hover:text-foreground transition-colors text-sm">8</button>
          </div>
          
          <button className="p-2 text-gray-400 hover:text-foreground transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
