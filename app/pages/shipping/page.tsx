import Link from 'next/link';

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <nav className="mb-8 text-sm">
        <Link href="/" className="text-neutral-500 hover:text-neutral-900">Home</Link>
        <span className="mx-2 text-neutral-300">/</span>
        <span className="text-neutral-900">Shipping & Returns</span>
      </nav>

      <h1 className="text-4xl font-light text-neutral-900 mb-8">Shipping & Returns</h1>

      <div className="prose prose-neutral max-w-none">
        <h2 className="text-xl font-medium text-neutral-900 mt-8 mb-4">Shipping Information</h2>
        <p className="text-neutral-600 mb-4">
          We offer worldwide shipping to bring our elegant lingerie to women everywhere.
        </p>
        
        <h3 className="text-lg font-medium text-neutral-900 mt-6 mb-3">Shipping Rates</h3>
        <ul className="text-neutral-600 space-y-2 mb-6">
          <li>• <strong>Standard Shipping (5-7 business days):</strong> $5.99</li>
          <li>• <strong>Express Shipping (2-3 business days):</strong> $12.99</li>
          <li>• <strong>Free Shipping:</strong> On all orders over $100</li>
        </ul>

        <h3 className="text-lg font-medium text-neutral-900 mt-6 mb-3">International Shipping</h3>
        <p className="text-neutral-600 mb-4">
          We ship to most countries worldwide. International shipping rates are calculated at checkout based on destination and package weight.
        </p>

        <h2 className="text-xl font-medium text-neutral-900 mt-8 mb-4">Returns & Exchanges</h2>
        <p className="text-neutral-600 mb-4">
          We want you to love your AURA pieces. If you are not completely satisfied, we accept returns within 30 days of purchase.
        </p>

        <h3 className="text-lg font-medium text-neutral-900 mt-6 mb-3">Return Policy</h3>
        <ul className="text-neutral-600 space-y-2 mb-6">
          <li>• Items must be unworn, unwashed, and in original packaging</li>
          <li>• All tags must be attached</li>
          <li>• Final sale items cannot be returned</li>
          <li>• Shipping costs for returns are the responsibility of the customer</li>
        </ul>

        <h3 className="text-lg font-medium text-neutral-900 mt-6 mb-3">How to Return</h3>
        <ol className="text-neutral-600 space-y-2 list-decimal list-inside mb-6">
          <li>Contact us at returns@aura-lingerie.com with your order number</li>
          <li>We will provide a return shipping label</li>
          <li>Pack your items securely with original tags</li>
          <li>Drop off at your nearest post office</li>
        </ol>

        <p className="text-neutral-600">
          Refunds are processed within 5-7 business days of receiving your return. For questions, please contact our customer service team.
        </p>
      </div>
    </div>
  );
}
