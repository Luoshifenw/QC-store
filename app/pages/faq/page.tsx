import Link from 'next/link';

const faqs = [
  {
    question: 'How do I find my correct bra size?',
    answer: 'We recommend measuring your underbust and bust at the fullest part. Use our Size Guide to find your perfect fit. If you are between sizes, we suggest sizing up for a more comfortable fit.',
  },
  {
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of purchase. Items must be unworn, unwashed, and in original packaging with all tags attached. Final sale items cannot be returned.',
  },
  {
    question: 'Do you offer international shipping?',
    answer: 'Yes! We ship to most countries worldwide. International shipping rates are calculated at checkout based on destination and package weight.',
  },
  {
    question: 'How should I care for my lingerie?',
    answer: 'We recommend hand washing your lingerie in cold water with a gentle detergent. Lay flat to dry. Avoid using bleach or putting items in the dryer.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 5-7 business days. Express shipping takes 2-3 business days. International shipping times vary by destination.',
  },
  {
    question: 'Can I track my order?',
    answer: 'Yes, you will receive a tracking number via email once your order has shipped. You can use this to track your package.',
  },
  {
    question: 'Do you offer gift wrapping?',
    answer: 'Yes, we offer beautiful gift wrapping for an additional $5. Select the gift wrap option at checkout.',
  },
  {
    question: 'How do I contact customer service?',
    answer: 'You can reach our customer service team at support@aura-lingerie.com. We typically respond within 24 hours.',
  },
];

export default function FAQPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <nav className="mb-8 text-sm">
        <Link href="/" className="text-neutral-500 hover:text-neutral-900">Home</Link>
        <span className="mx-2 text-neutral-300">/</span>
        <span className="text-neutral-900">FAQ</span>
      </nav>

      <h1 className="text-4xl font-light text-neutral-900 mb-8">Frequently Asked Questions</h1>

      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-neutral-200 pb-6">
            <h2 className="text-lg font-medium text-neutral-900 mb-2">{faq.question}</h2>
            <p className="text-neutral-600">{faq.answer}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-neutral-50 p-6">
        <h3 className="text-lg font-medium text-neutral-900 mb-2">Still have questions?</h3>
        <p className="text-neutral-600 mb-4">
          Contact our customer service team for personalized assistance.
        </p>
        <Link href="/pages/contact" className="text-neutral-900 border-b border-neutral-900 pb-1 hover:text-neutral-600 transition">
          Contact Us
        </Link>
      </div>
    </div>
  );
}
