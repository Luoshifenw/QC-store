import { ProductCard, type ProductCardProduct } from './ProductCard';

interface ProductGridProps {
  products: ProductCardProduct[];
  title?: string;
  subtitle?: string;
}

export function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  return (
    <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {(title || subtitle) && (
          <div className="text-center mb-8 md:mb-12">
            {title && <h2 className="text-2xl md:text-3xl font-light text-neutral-900">{title}</h2>}
            {subtitle && <p className="mt-3 md:mt-4 text-sm md:text-base text-neutral-500">{subtitle}</p>}
          </div>
        )}
        
        {/* 移动端 2 列，平板 3 列，桌面 4 列 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
