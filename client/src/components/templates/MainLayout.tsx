import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="text-xl font-bold text-primary-600">Next Store</div>
          <nav className="flex items-center gap-6">
            <a href="/" className="text-gray-700 hover:text-primary-600">Home</a>
            <a href="/cart" className="text-gray-700 hover:text-primary-600">Cart</a>
            <a href="/login" className="text-gray-700 hover:text-primary-600">Login</a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <p>&copy; 2024 Next Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default MainLayout;

