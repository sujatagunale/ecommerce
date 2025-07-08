import { getAllProducts, getAllCategories } from '@/lib/actions/product';

async function CategorySection() {
  const categories = await getAllCategories();
  
  return (
    <section className="py-8 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6">
            <button className="text-foreground border-b-2 border-accent pb-2 font-medium">All</button>
            {categories.map((category) => (
              <button key={category.id} className="text-gray-medium hover:text-foreground transition-colors pb-2">
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <select className="border border-gray-300 rounded px-3 py-2 text-sm">
              <option>Filter</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}

async function ProductGrid() {
  const products = await getAllProducts();
  
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(0, 8).map((product) => (
            <div key={product.id} className="group">
              <div className="relative bg-gray-light rounded-lg overflow-hidden mb-4">
                <div className="aspect-square flex items-center justify-center">
                  <span className="text-gray-500">{product.name}</span>
                </div>
                {product.name === 'Frontend Dev Tee' && (
                  <span className="absolute top-3 left-3 bg-accent text-black text-xs px-2 py-1 rounded">New</span>
                )}
                {product.name === 'Code & Coffee Mug' && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">-15%</span>
                )}
                {product.name === 'API Keychain' && (
                  <span className="absolute top-3 left-3 bg-accent text-black text-xs px-2 py-1 rounded">New</span>
                )}
                {product.name === 'Stack Overflow Mug' && (
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded">-20%</span>
                )}
              </div>
              <h3 className="font-medium mb-2">{product.name}</h3>
              <p className="text-gray-medium">
                {product.name === 'Code & Coffee Mug' ? (
                  <>
                    <span className="line-through mr-2">$25</span>
                    <span>${product.price}</span>
                  </>
                ) : product.name === 'Stack Overflow Mug' ? (
                  <>
                    <span className="line-through mr-2">$30</span>
                    <span>${product.price}</span>
                  </>
                ) : (
                  `$${product.price}`
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <header className="border-b border-gray-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-foreground hover:text-accent transition-colors">Home</a>
            <a href="/products" className="text-foreground hover:text-accent transition-colors">Shop</a>
            <a href="#" className="text-foreground hover:text-accent transition-colors">Categories</a>
            <a href="#" className="text-foreground hover:text-accent transition-colors">Pages</a>
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

      <section className="bg-gray-light py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="hidden md:flex flex-col space-y-2 text-sm text-gray-medium mb-8">
              <span>01</span>
              <span>02</span>
              <span>03</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              CODE. DRINK.<br />
              DEPLOY. REPEAT.
            </h1>
            
            <p className="text-lg text-gray-medium max-w-md">
              Minimal developer swag to make your setup & you stand out.
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="bg-white rounded-lg p-8 shadow-sm">
              <div className="w-64 h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Dev Mug Showcase</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategorySection />

      <ProductGrid />

      <footer className="bg-gray-light py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-gray-medium">
                <li><a href="#" className="hover:text-foreground transition-colors">Help & Contact Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Returns & Refunds</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Shipping Info</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-medium">
                <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Social Media</h3>
              <ul className="space-y-2 text-gray-medium">
                <li><a href="#" className="hover:text-foreground transition-colors">Twitter</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">GitHub</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">YouTube</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">LinkedIn</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Profile</h3>
              <ul className="space-y-2 text-gray-medium">
                <li><a href="#" className="hover:text-foreground transition-colors">My Account</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Orders</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Wishlist</a></li>
                <li><a href="#" className="hover:text-foreground transition-colors">Checkout</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-300 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-medium text-sm">
              © 2024 DevSwag. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-medium hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" className="text-gray-medium hover:text-foreground transition-colors">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z.017 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
