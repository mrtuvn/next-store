import { Button } from '@/components/atoms';
import type { Product } from '@/services/product.service';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow flex flex-col">
      <div className="aspect-square bg-gray-200 rounded-lg mb-4 overflow-hidden">
        {product.images[0] && (
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      
      <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.name}</h3>
      
      <p className="text-sm text-gray-500 mb-2 capitalize">{product.category}</p>
      
      <div className="flex items-center gap-2 mb-2">
        <span className="text-yellow-500">★</span>
        <span className="text-sm text-gray-600">
          {product.ratings.average.toFixed(1)} ({product.ratings.count})
        </span>
      </div>
      
      <p className="text-xl font-bold text-primary-600 mb-2">
        ${product.price.toFixed(2)}
      </p>
      
      <p className="text-sm text-gray-500 mb-4">
        {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
      </p>
      
      <Button
        onClick={() => onAddToCart(product)}
        fullWidth
        disabled={product.stock === 0}
        className="mt-auto"
      >
        {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
      </Button>
    </div>
  );
}

